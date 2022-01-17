<template>
  <section class="section data-board">
    <SectionTitle text="DATA BOARD" />
    <p class="board-title">
      Trading Volume
      <span>/ 24h</span>
    </p>
    <p class="board-value">
      $9,052,420
      <span>
        <img src="@/assets/images/increase.png" alt="" />
        10%
      </span>
    </p>
    <EchartsV2 ref="BoardEcharts" />
  </section>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import SectionTitle from './SectionTitle.vue'
import EchartsV2 from './EchartsV2.vue'
import { getCMCdata } from '@/api/graphql'
const BoardEcharts = ref(null)
onMounted(() => {
  BoardEcharts.value.drawEcharts('board')
  //gettest()
})
async function gettest() {
  let url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/categories'
  let qs = {
    start: '1',
    limit: '500',
    id: '605e2ce9d41eae1066535f7c', //example   we should find sos id
    slug: 'ethereum',
    symbol: 'ETH',
  }
  const data = await getCMCdata(url, qs)
  console.log(data)
}
</script>

<style lang="scss" scoped>
.data-board {
  text-align: center;
  width: 100vw;
  .board-title {
    font-size: 24px;
    font-weight: 400;
    color: #ffffff;
    opacity: 0.4;
    span {
      font-size: 18px;
    }
  }
  .board-value {
    margin-top: 20px;
    height: 32px;
    font-size: 34px;
    font-weight: bold;
    color: #ffffff;
    line-height: 32px;
    display: flex;
    justify-content: center;
    span {
      margin-left: 16px;
      display: flex;
      height: 13px;
      font-size: 18px;
      font-weight: bold;
      color: #35c784;
      img {
        width: 10px;
        height: 9px;
        margin: 11.5px 5px;
      }
    }
  }
}
</style>
