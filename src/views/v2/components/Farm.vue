<template>
  <section class="section farm">
    <SectionTitle :text="$t('farm.title')" />
    <p class="lp-desc" v-html="$t('farm.desc')"></p>
    <div class="short-layout">
      <div class="short-layout-left">
        <div class="LP-currency">
          <div class="LP-currency-item" v-for="(item, index) in LP.currencyList" :key="index" :class="LP.activeClass == index ? 'active' : ''" @click="getItem(index, item.name)">
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="short-layout-right">
        <div class="LP-locked">
          <span class="LP-locked-title">{{ $t('common.tvl') }}:&nbsp;&nbsp;</span>
          <span v-if="LP.activeClass == 0">${{ tvl }}</span>
          <span v-else-if="LP.activeClass == 1">{{ tvl }}&nbsp;ETH</span>
        </div>
        <div class="LP-locked">
          <span class="LP-locked-title">{{ $t('common.apy') }}:&nbsp;&nbsp;</span>
          <span>{{ apy }}%</span>
        </div>
      </div>
    </div>
    <EchartsV2 ref="LPEcharts" />
  </section>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, computed } from 'vue'
import SectionTitle from './SectionTitle.vue'
import EchartsV2 from './EchartsV2.vue'
import { getData } from '@/api/graphql'
import { formatMoney, compare, AprToApy } from '@/utils/index.js'

import { Contract, utils, BigNumber, constants, providers } from 'ethers'
import stakeABI from '@/abi/stake.json'

import { formatNumber } from '@/utils/index'

import dayjs from 'dayjs'

import { log } from 'console'
const LPEcharts = ref(null)
onMounted(() => {
  getTotalSupply()
  getPoolInfo()
  getEthPrice()
  getSushiPerBlock()
  getBlockPerDay()

  getOpenDaotvl()
  SOSchange()

  tvlHour()
})
const stakeAddress = import.meta.env.VITE_APP_STAKE_ADDRESS
const infuraId = import.meta.env.VITE_INFURA_ID

const LP = reactive({
  currencyList: [{ name: 'USD' }, { name: 'ETH' }],
  activeClass: 0, //-1 is unactive
  LockTime: 'all',
  APYTime: 'all',
  timeInterval: [
    { label: 'All', value: 'all' },
    { label: '5H', value: '5h' },
  ],

  totalSupply: 0,
  reserveUSD: 0,
  reserveETH: 0,
  slpBalance: 0,
  TVL: 0,
  sos_price: 0,
  sushi_price: 0,
  totalAllocPoint: 0,
  allocPoint: 0,
  sushiPerBlock: 0,
  averageBlockTime: 0,
  BlockPerDay: 0,
  SushiPerDay: 0,
  SOSPerDay: 0,
  APY: 0,
  ethPrice: 0,
})
const openDao = reactive({
  tvl: 0,
  sosToUSD: 0,
  sosToETH: 0,
})

function getItem(index, name) {
  LP.activeClass = index
  tvlHour()
}
const tvl = computed(() => {
  var TVL = 0
  if (LP.activeClass == 0) {
    TVL = (LP.slpBalance / 1e18 / LP.totalSupply) * LP.reserveUSD
  } else {
    TVL = (LP.slpBalance / 1e18 / LP.totalSupply) * LP.reserveETH
  }
  if (TVL >= 1000000) {
    if (TVL >= 100000000) {
      TVL = formatMoney(TVL / 100000000) + ' ' + 'bil'
    } else {
      TVL = formatMoney(TVL / 1000000) + ' ' + 'mil'
    }
  } else {
    TVL = formatMoney(TVL)
  }
  return TVL
})

const apy = computed(() => {
  var APY = 0
  let SushiPerDay = (LP.allocPoint * LP.sushiPerBlock * LP.BlockPerDay) / LP.totalAllocPoint / 1e18 / 365
  let sosRewardsPerBlock = LP.rewardPerSecond * LP.averageBlockTime
  let SOSPerDay = (LP.rewardPerSecond / 1e18) * LP.averageBlockTime * LP.BlockPerDay
  let TVL = Number((LP.slpBalance / 1e18 / LP.totalSupply) * LP.reserveETH)
  let APR = Number(((LP.sos_price * SOSPerDay + LP.sushi_price * SushiPerDay) / TVL) * 36500)
  APY = AprToApy(APR)
  return APY
})

async function getTotalSupply() {
  let url = '/subgraphs/name/sushiswap/exchange'
  let query = '{\r\n pairs(where: {id: "0xb84c45174bfc6b8f3eaecbae11dee63114f5c1b2"}){\r\n name\r\n totalSupply\r\n reserveUSD\r\n reserveETH\r\n }\r\n }\r\n'
  const data = await getData(url, query)
  let object = data.data.pairs[0]
  LP.reserveETH = object.reserveETH
  LP.reserveUSD = object.reserveUSD
  LP.totalSupply = object.totalSupply
}
async function getPoolInfo() {
  let url = '/subgraphs/name/sushiswap/master-chefv2'
  let query = `{\r\n pools(where: {pair:"0xb84c45174bfc6b8f3eaecbae11dee63114f5c1b2"}) {\r\n masterChef {\r\n id\r\n totalAllocPoint \r\n } \r\n id\r\n pair\r\n slpBalance \r\n allocPoint \r\n rewarder{\r\n id\r\n rewardToken\r\n rewardPerSecond\r\n timestamp\r\n block\r\n }\r\n }\r\n}`
  const data = await getData(url, query)
  let sos = data.data.pools[0]
  LP.slpBalance = sos.slpBalance
  LP.allocPoint = sos.allocPoint
  LP.totalAllocPoint = sos.masterChef.totalAllocPoint
  LP.rewardPerSecond = sos.rewarder.rewardPerSecond
}
async function getEthPrice() {
  let url = '/subgraphs/name/sushiswap/exchange'
  let query = `{\r\n tokens(where: {symbol_in:["SUSHI", "SOS"]}) {\r\n derivedETH \r\n } \r\n }`
  //let query = `{\r\n masterChef(id:"0xc2edad668740f1aa35e4d8f227fb8e17dca888cd"){\r\n id \r\n sushiPerBlock \r\n } \r\n }`
  const data = await getData(url, query)
  let object = data.data.tokens
  LP.sos_price = object[0].derivedETH
  LP.sushi_price = object[1].derivedETH
}
async function getSushiPerBlock() {
  let url = '/subgraphs/name/sushiswap/master-chef'
  let query = `{\r\n masterChef(id:"0xc2edad668740f1aa35e4d8f227fb8e17dca888cd"){\r\n id \r\n sushiPerBlock \r\n } \r\n }`
  const data = await getData(url, query)
  LP.sushiPerBlock = data.data.masterChef.sushiPerBlock
}
async function getBlockPerDay() {
  var gt = Math.round(Number(new Date() / 1000 - 3600 * 6))
  var lt = Math.round(Number(new Date() / 1000))
  let url = '/subgraphs/name/blocklytics/ethereum-blocks'
  let query = `{\r\n blocks(\r\n timestamp_gt: ${gt}, \r\n timestamp_lt:${lt}, \r\n orderBy: number, \r\n orderDirection: desc) {\r\n number \r\n timestamp \r\n }\r\n}`
  const data = await getData(url, query)
  let blocks = data.data.blocks.sort(compare('timestamp'))
  // console.log(blocks);
  const averageBlockTime = blocks?.reduce(
    (previousValue, currentValue, currentIndex) => {
      if (previousValue.timestamp) {
        const difference = previousValue.timestamp - currentValue.timestamp

        previousValue.averageBlockTime = previousValue.averageBlockTime + difference
      }
      previousValue.timestamp = currentValue.timestamp
      if (currentIndex === blocks.length - 1) {
        return previousValue.averageBlockTime / blocks.length
      }
      return previousValue
    },
    { timestamp: null, averageBlockTime: 0 }
  )
  LP.averageBlockTime = averageBlockTime
  // console.log(averageBlockTime);
  LP.BlockPerDay = (3600 * 24) / averageBlockTime
}
// get opendao tvl  of sos
async function getOpenDaotvl() {
  const provider = new providers.InfuraProvider('homestead', infuraId)
  const stakeContract = new Contract(stakeAddress, stakeABI, provider)
  openDao.tvl = await stakeContract.getSOSPool()
}
async function SOSchange() {
  let url = '/subgraphs/name/sushiswap/exchange'
  let query = `{\r\n  tokens(where: {symbol_in:["SOS"]}) {\r\n derivedETH \r\n }\r\n}`
  const data_derivedETH = await getData(url, query)
  openDao.sosToETH = data_derivedETH.data.tokens[0].derivedETH
  let ethQuery = `{\r\n  bundles(first: 5) {\r\n id \r\n  ethPrice \r\n }\r\n} `
  const data_ethPrice = await getData(url, ethQuery)
  openDao.sosToUSD = data_ethPrice.data.bundles[0].ethPrice * openDao.sosToETH
  LP.ethPrice = data_ethPrice.data.bundles[0].ethPrice
}
const openDaotvl = computed(() => {
  if (openDao.tvl) {
    return formatNumber(parseInt(utils.formatEther(openDao.tvl)))
  } else {
    return 0
  }
})
const tvlUSD = computed(() => {
  if (openDao.tvl && openDao.sosToUSD) {
    return formatNumber(parseInt(utils.formatEther(openDao.tvl) * openDao.sosToUSD))
  } else {
    return 0
  }
})
const tvlETH = computed(() => {
  if (openDao.tvl && openDao.sosToETH) {
    return formatNumber(parseInt(utils.formatEther(openDao.tvl) * openDao.sosToETH))
  } else {
    return 0
  }
})

async function tvlHour() {
  let url = '/subgraphs/name/sushiswap/exchange'
  let query = `{\r\n tokens(where: {symbol:"SOS"}) {\r\n id \r\n symbol \r\n name \r\n decimals \r\n totalSupply \r\n volume \r\n volumeUSD \r\n untrackedVolumeUSD \r\n txCount \r\n liquidity \r\n derivedETH \r\n basePairsDayData{\r\n id \r\n date \r\n reserveUSD} \r\n }\r\n}`
  const data = await getData(url, query)
  const echarts = data.data.tokens[0]
  let xDate = []
  let yDate = []
  var cur = ''
  let Arr = echarts.basePairsDayData.filter(el => el.id.startsWith('0xb84c45174bfc6b8f3eaecbae11dee63114f5c1b2'))
  Arr.forEach(element => {
    xDate.push(dayjs(element.date * 1000).format('MMM DD'))
    if (LP.activeClass == 0) {
      yDate.push((element.reserveUSD / 1000000).toFixed(2))
      cur = 'usd'
    } else {
      yDate.push((element.reserveUSD / LP.ethPrice).toFixed(2))
      cur = 'eth'
    }
  })
  LPEcharts.value.drawEcharts('farm', xDate, yDate, cur)
}
</script>

<style lang="scss" scoped>
.farm {
  width: 100vw;
  text-align: center;
  :deep(.lp-desc) {
    font-size: 20px;
    font-weight: 400;
    color: #ffffff;
    span {
      opacity: 0.4;
    }
    a {
      color: #4e7dd3;
    }
  }
  .short-layout {
    display: flex;
    justify-content: space-between;
    .LP-currency {
      display: flex;
      width: 148px;
      height: 50px;
      background: #1e1f23;
      border-radius: 10px;
      line-height: 50px;
      font-size: 18px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.6);
      cursor: pointer;
      .active {
        color: #fff;
        background: #4e7dd3;
        border-radius: 10px;
        margin: 4px 4px 4px 4px;
        line-height: 42px;
      }
      .LP-currency-item {
        width: 50%;
        text-align: center;
      }
    }
    .short-layout-right {
      display: flex;
      .LP-locked {
        margin-left: 40px;
        font-size: 24px;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        line-height: 50px;
        .LP-locked-title {
          opacity: 0.4;
          font-weight: 400;
        }
      }
    }
  }
}
@media only screen and (max-width: 767px) {
  .short-layout {
    margin-top: 20px;
    flex-direction: column;
    .short-layout-right {
      flex-direction: column;
      .LP-locked {
        margin: unset !important;
        text-align: left;
        font-size: 20px;
      }
      .LP-locked-title{
        font-size: 22px;
      }
    }
  }
}
</style>
