<template>
  <section id="staking" class="section staking">
    <SectionTitle :text="$t('stake.title')" />

    <!-- desc -->
    <div class="desc" v-html="$t('stake.desc')"></div>

    <!-- audit -->
    <a target="_blank" href="https://www.certik.com/projects/opendao" class="audit">
      <img src="@/assets/images/certik.png" />
      <span>{{ $t('stake.auditReport') }}</span>
      <el-icon class="arrow"><arrow-right-bold /></el-icon>
    </a>
    <!-- stake form -->
    <div class="stake-from">
      <div class="left">
        <!-- apr -->
        <div class="apr">
          <div class="label">{{ $t('stake.stakingAPR') }}</div>
          <div class="value">{{ apr }}%</div>
        </div>

        <!-- tab -->
        <div class="tab">
          <div class="item" :class="{ active: data.isStake }" @click="toggleStake(true)">{{ $t('stake.stake') }}</div>
          <div class="item" :class="{ active: !data.isStake }" @click="toggleStake(false)">{{ $t('stake.unStake') }}</div>
        </div>

        <!-- price -->
        <div class="price">
          <div class="label">
            <span v-if="data.isStake">{{ $t('stake.stakeTitle') }}</span>
            <span v-else>{{ $t('stake.unStakeTitle') }}</span>
          </div>
          <div class="value">1 $veSOS = {{ rate }} $SOS</div>
        </div>

        <!-- input -->
        <div class="input">
          <input v-model="data.inputValue" type="text" :placeholder="$t('stake.enterVal')" />
          <button class="max-btn" @click="handleMaxBtnClick">{{ $t('stake.max') }}</button>
        </div>

        <!-- button -->
        <el-button v-if="address && data.isStake && shouldApprove" :disabled="!address" size="large" color="#4E7DD3" class="approve-btn" @click="handleApprove">
          {{ $t('stake.approve') }}
        </el-button>
        <el-button
          v-else-if="data.isStake"
          :disabled="!address || Number(data.inputValue) <= 0 || Number(data.inputValue) > Number(data.sosBalance)"
          size="large"
          color="#4E7DD3"
          class="approve-btn"
          @click="handleSubmitStake"
        >
          {{ $t('stake.stakeTitle') }}
        </el-button>
        <el-button
          v-else
          :disabled="!address || Number(data.inputValue) <= 0 || Number(data.inputValue) > Number(data.veSosBalance)"
          size="large"
          color="#4E7DD3"
          class="approve-btn"
          @click="handleSubmitUnstake"
        >
          {{ $t('stake.unStakeTitle') }}
        </el-button>
      </div>

      <!-- right -->
      <div class="right">
        <div class="inner">
          <div class="item tvl">
            <div class="title">{{ $t('common.tvl') }}</div>
            <div class="value">{{ tvl }} $SOS</div>
          </div>
          <div class="item">
            <div class="title">{{ $t('stake.balance') }}</div>
            <div class="info">
              <img src="@/assets/images/SOS.png" />
              <div v-if="sosBalance" class="value">
                <div>{{ sosBalance }}</div>
                <div class="symbol">$SOS</div>
              </div>
              <div v-else-if="!address" class="value connect-btn" @click="open">{{ $t('stake.connectWallet') }}</div>
              <el-skeleton class="skeleton" v-else :rows="1" animated style="margin-top: 10px" />
            </div>
          </div>
          <div class="item">
            <div class="title">{{ $t('stake.staked') }}</div>
            <div class="info">
              <img src="@/assets/images/veSOS.png" />
              <div v-if="veSosBalance" class="value">
                <div>{{ veSosBalance }}</div>
                <div class="symbol">$veSOS</div>
                <div class="veSOStoSOS">≈ {{ veSOStoSOS }} $SOS</div>
              </div>
              <div v-else-if="!address" class="value connect-btn" @click="open">{{ $t('stake.connectWallet') }}</div>
              <el-skeleton class="skeleton" v-else :rows="1" animated style="margin-top: 10px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <SubmittedModal ref="submittedModal" />
</template>

<script setup lang="ts">
import SectionTitle from './SectionTitle.vue'
import { ArrowRightBold } from '@element-plus/icons-vue'

import { reactive, onMounted, computed, ref, h } from 'vue'
import { useBoard, useEthers, useEthersHooks } from '@/vue-dapp/index'
import { Contract, utils, BigNumber, constants, providers } from 'ethers'
import erc20ABI from '@/abi/erc20.json'
import stakeABI from '@/abi/stake.json'
import SubmittedModal from '@/components/SubmittedModal.vue'
import { ElNotification } from 'element-plus'
import { formatNumber } from '@/utils/index'

const { open } = useBoard()

const { signer } = useEthers()
const { address, balance, isActivated } = useEthers()
const { onActivated, onDeactivated, onChanged } = useEthersHooks()

const etherscanBaseURL = import.meta.env.VITE_APP_ETHERSCAN_BASEURL

const sosAddress = import.meta.env.VITE_APP_SOS_ADDRESS
const stakeAddress = import.meta.env.VITE_APP_STAKE_ADDRESS
const infuraId = import.meta.env.VITE_INFURA_ID
const chainName = import.meta.env.VITE_APP_CHAIN_NAME

const yearReward = 20000000000000

const submittedModal = ref(null)

const data = reactive({
  isStake: true,
  inputValue: '',
  loading: true,
  tvl: '',
  veSosTotalSupply: '',
  sosBalance: '',
  veSosBalance: '',
  allowance: '',
  sosToUSD: null,
  isUSD: false,
})

const tvl = computed(() => {
  if (data.tvl) {
    return formatNumber(parseInt(data.tvl))
  } else {
    return 0
  }
})
const veSOStoSOS = computed(() => {
  let veSosBalance = parseInt(data.veSosBalance)
  let rate = Number((Number(data.tvl) / Number(data.veSosTotalSupply)).toFixed(4))
  let vesostosos = formatNumber((veSosBalance * rate).toFixed(2))
  if (data.tvl) {
    return vesostosos
  } else {
    return 0
  }
})
// const tvlUSD = computed(() => {
//   if (data.tvl && data.sosToUSD) {
//     return formatNumber(parseInt(data.tvl * data.sosToUSD))
//   } else {
//     return 0
//   }
// })

const apr = computed(() => {
  const time = new Date().getTime() / 1000
  if (time < 1641380400 || time > 1672916400) return 0
  if (Number(data.tvl) > 0) {
    return formatNumber(Number(((yearReward * 100) / Number(data.tvl)).toFixed(2)))
  } else {
    return 0
  }
})

const rate = computed(() => {
  if (data.tvl && Number(data.veSosTotalSupply) > 0) {
    return Number((Number(data.tvl) / Number(data.veSosTotalSupply)).toFixed(4))
  } else {
    return 1
  }
})

const sosBalance = computed(() => {
  if (data.sosBalance) {
    return formatNumber(parseInt(data.sosBalance))
  } else {
    return 0
  }
})

// const sosBalanceUSD = computed(() => {
//   if (data.sosBalance) {
//     return formatNumber(parseInt(data.sosBalance * data.sosToUSD))
//   } else {
//     return 0
//   }
// })

const veSosBalance = computed(() => {
  if (data.veSosBalance) {
    return formatNumber(parseInt(data.veSosBalance))
  } else {
    return 0
  }
})

// const veSosBalanceUSD = computed(() => {
//   if (data.veSosBalance) {
//     return formatNumber(parseInt(data.veSosBalance * (data.tvl / data.veSosTotalSupply) * data.sosToUSD))
//   } else {
//     return 0
//   }
// })

const shouldApprove = computed(() => {
  // return !Number(data.allowance) || utils.formatEther(data.allowance) < data.stakeValue
  return !Number(data.allowance)
})

onMounted(() => {
  getData()
  setInterval(() => {
    getData()
  }, 15000)
})

onActivated(() => {
  getData()
})

onChanged(() => {
  getData()
})

function showMinedNotification(hash) {
  ElNotification({
    // duration: 1000000000,
    type: 'success',
    title: 'Transcation is mined',
    message: h('a', { href: `${etherscanBaseURL}/tx/${hash}`, style: 'color: #00c38b', target: '_blank' }, 'View on Etherscan'),
  })
}

function toggleStake(isStake: boolean) {
  data.isStake = isStake
  data.inputValue = ''
}

function getSosContract() {
  return new Contract(sosAddress, erc20ABI, signer.value)
}

function getStakeContract() {
  return new Contract(stakeAddress, stakeABI, signer.value)
}

function getData() {
  console.log('getDatas')

  getTVL()
  getVeSosTotalSupply()
  SOSperUSD()

  if (signer.value) {
    // console.log('getDatas')
    getSosBalance()
    getVeSosBalance()
    getAllowance()
  }
}

async function getTVL() {
  const provider = new providers.InfuraProvider(chainName, infuraId)
  const stakeContract = new Contract(stakeAddress, stakeABI, provider)
  const res = await stakeContract.getSOSPool()
  data.tvl = utils.formatEther(res.toString())
  data.loading = false
}

async function getVeSosTotalSupply() {
  const provider = new providers.InfuraProvider(chainName, infuraId)
  const stakeContract = new Contract(stakeAddress, stakeABI, provider)
  const res = await stakeContract.totalSupply()
  data.veSosTotalSupply = utils.formatEther(res.toString())
}

async function getSosBalance() {
  const sosContract = getSosContract()
  const res = await sosContract.balanceOf(address.value)
  data.sosBalance = utils.formatEther(res.toString())
  console.log('sosBalance', data.sosBalance)
}

async function getVeSosBalance() {
  const stakeContract = getStakeContract()
  const res = await stakeContract.balanceOf(address.value)
  data.veSosBalance = utils.formatEther(res.toString())
  console.log('veSosBalance', data.veSosBalance)
}

async function getAllowance() {
  const sosContract = getSosContract()
  const res = await sosContract.allowance(address.value, stakeAddress)
  data.allowance = utils.formatEther(res.toString())
}

async function handleMaxBtnClick() {
  if (data.isStake) {
    data.inputValue = data.sosBalance
  } else {
    data.inputValue = data.veSosBalance
  }
}

async function handleApprove() {
  const sosContract = getSosContract()
  const tx = await sosContract.approve(stakeAddress, constants.MaxUint256)
  submittedModal.value.open(tx.hash)
  await tx.wait(1)
  showMinedNotification(tx.hash)
  getAllowance()
}

async function handleSubmitStake() {
  console.log('stake')
  const value = utils.parseEther(`${data.inputValue}`)
  const stakeContract = getStakeContract()
  const gas = await stakeContract.estimateGas.enter(value)
  const tx = await stakeContract.enter(value, { gasLimit: Number(gas) > 82256 ? gas : 82256 })
  data.inputValue = ''
  submittedModal.value.open(tx.hash)
  await tx.wait(1)
  showMinedNotification(tx.hash)
  getData()
}

async function handleSubmitUnstake() {
  console.log('unstake')
  const value = utils.parseEther(`${data.inputValue}`)
  const stakeContract = getStakeContract()
  const tx = await stakeContract.leave(value)
  data.inputValue = ''
  submittedModal.value.open(tx.hash)
  await tx.wait(1)
  showMinedNotification(tx.hash)
  getData()
}

function SOSperUSD() {
  var myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  var graphql = JSON.stringify({
    query: `{\r\n  tokens(where: {symbol_in:["SOS"]}) {\r\n    derivedETH \r\n  }\r\n}`,
    variables: {},
  })
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: graphql,
    redirect: 'follow',
  }

  fetch('https://api.thegraph.com/subgraphs/name/sushiswap/exchange', requestOptions)
    .then(response => response.text())
    .then(result => {
      var data_derivedETH = JSON.parse(result)
      var object_derivedETH = data_derivedETH.data.tokens
      var graphql_eth = JSON.stringify({
        query: `{\r\n  bundles(first: 5) {\r\n id \r\n  ethPrice \r\n  }\r\n}`,
        variables: {},
      })
      var requestOptions_eth = {
        method: 'POST',
        headers: myHeaders,
        body: graphql_eth,
        redirect: 'follow',
      }
      fetch('https://api.thegraph.com/subgraphs/name/sushiswap/exchange', requestOptions_eth)
        .then(response => response.text())
        .then(result => {
          var data_ethPrice = JSON.parse(result)
          data.sosToUSD = data_ethPrice.data.bundles[0].ethPrice * object_derivedETH[0].derivedETH
        })
        .catch(error => console.log('error', error))
    })
    .catch(error => console.log('error', error))
}
</script>

<style lang="scss" scoped>
.staking {
  .desc {
    font-size: 20px;
    font-weight: 400;
    line-height: 26px;
    text-align: center;
    :deep(span) {
      opacity: 0.4;
    }
    :deep(a) {
      text-decoration: underline;
      color: #4e7dd3;
    }
  }

  .audit {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 400;
    color: #4e7dd3;
    padding-top: 20px;
    img {
      width: 22px;
    }
    span {
      padding: 0 10px;
    }
  }

  .stake-from {
    display: flex;
    align-items: stretch;
    padding-top: 40px;
    .left {
      flex: 3;
      background: #1e1f23;
      border-radius: 10px;
      padding: 40px;
      align-self: stretch;
      .apr {
        display: flex;
        justify-content: space-between;
        padding-bottom: 10px;
        .label {
          font-size: 24px;
          font-weight: 400;
          opacity: 0.4;
        }
        .value {
          font-size: 30px;
          font-weight: bold;
        }
      }

      .tab {
        display: flex;
        background: #3a3b40;
        border-radius: 10px;
        padding: 2px;

        .item {
          flex: 1;
          text-align: center;
          padding: 20px;
          cursor: pointer;
        }
        .active {
          background: #1e1f23;
          border-radius: 10px;
        }
      }

      .price {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 30px 0;
        .label {
          font-size: 34px;
          font-weight: bold;
        }
        .value {
          display: flex;
          align-items: center;
          font-size: 18px;
          font-weight: 400;
          background: #303236;
          border-radius: 10px;
          padding: 4px 20px;
        }
      }

      .input {
        width: 100%;
        position: relative;
        input {
          width: 100%;
          height: 66px;
          background: #313237;
          border: 2px solid #48484d;
          border-radius: 10px;
          font-size: 20px;
          padding-left: 20px;
        }
        input:focus {
          box-shadow: 0px 0px 0px;
          outline: none;
          border: 2px solid #4e7dd3;
        }

        .max-btn {
          position: absolute;
          right: 20px;
          top: 20px;
          background: #4e7dd3;
          border-radius: 10px;
          padding: 5px 10px;
        }
      }

      .approve-btn {
        width: 100%;
        margin-top: 40px;
        color: #fff;
        height: 50px;
      }
    }
    .right {
      flex: 2;
      align-self: stretch;
      padding-left: 20px;
      .inner {
        background: #1e1f23;
        border-radius: 10px;
        padding: 20px 0;
        .tvl {
          .value {
            font-weight: bold;
            font-size: 26px;
          }
        }
        .item {
          padding: 12px 40px;
          .title {
            font-size: 30px;
            font-weight: 400;
            opacity: 0.6;
            padding-bottom: 10px;
          }
          .info {
            display: flex;
            align-items: center;
            position: relative;
            img {
              width: 80px;
            }
            .value {
              padding-left: 20px;
              div {
                font-size: 26px;
                font-weight: bold;
              }
              .symbol {
                opacity: 0.6;
              }
              .veSOStoSOS {
                position: absolute;
                font-size: 18px;
                opacity: 0.4;
                margin-top: 5px;
              }
            }
            .connect-btn {
              color: #4e7dd3;
              cursor: pointer;
            }
            .skeleton {
              padding-left: 20px;
            }
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .staking {
    .stake-from {
      flex-direction: column-reverse;
      .left {
        padding: 20px;
        .price {
          padding: 20px 0;
          .label {
            font-size: 24px;
          }
          .value {
            font-size: 14px;
          }
        }
      }
      .right {
        padding-left: 0px;
        padding-bottom: 20px;
        .inner {
          .item {
            .title {
              font-size: 28px;
            }
            .info {
              img {
                width: 60px;
              }
              .value {
                padding-left: 20px;
                div {
                  font-size: 20px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
