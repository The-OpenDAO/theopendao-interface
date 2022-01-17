<template>
  <div class="">
    <el-button class="add-btn" type="primary" size="large" @click="addSos">
      <AddIcon />
      {{ $t('common.add') }} $SOS
    </el-button>
    <el-button class="add-btn" type="primary" size="large" @click="addVesos">
      <AddIcon />
      {{ $t('common.add') }} $veSOS
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { AddTokenToMetamask } from '@/utils/index'
import AddIcon from '@/components/icons/Add.vue'

const sosAddress = import.meta.env.VITE_APP_SOS_ADDRESS
const stakeAddress = import.meta.env.VITE_APP_STAKE_ADDRESS
function addSos() {
  AddTokenToMetamask({
    address: sosAddress,
    symbol: 'SOS',
    decimals: 18,
    image: 'https://www.theopendao.com/img/token-1.png',
  })
}

function addVesos() {
  AddTokenToMetamask({
    address: stakeAddress,
    symbol: 'veSOS',
    decimals: 18,
    image: 'https://www.theopendao.com/img/token-veSOS.png',
  })
}
</script>
