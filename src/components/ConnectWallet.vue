<script setup lang="ts">
import { useBoard, useEthers, displayEther, shortenAddress, useEthersHooks } from '@/vue-dapp/index'
import { computed, h, onMounted, reactive, ref, watch } from 'vue'
const { open } = useBoard()
const { address, balance, isActivated } = useEthers()
const { onActivated, onDeactivated, onChanged } = useEthersHooks()
defineProps({
  fixed: Boolean,
})
onMounted(async () => {
  changeNetworks()
})
// watch(error, error => {
//   errorRef.value.openError('Failed to connect', error, false)
// })
onDeactivated(() => {
  console.log('deactivated', 'useEthHooks------')
})
const wallet = reactive({
  address: '',
})
const emit = defineEmits(['getAddress'])
onActivated(async ({ provider, address }) => {
  console.log('onActivated', 'useEthHooks------', provider, address)
  wallet.address = address
  emit('getAddress', address)
})
onChanged(data => {
  console.log('change useEthHooks------', data)
  wallet.address = data.address
  emit('getAddress', data.address)
  // debounceLogin(data.address)
})
function changeNetworks() {
  const chainID = import.meta.env.VITE_APP_CHAIN_ID
  ethereum
    .request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${chainID}` }],
    })
    .then(permissions => {
      console.log('successful')
    })
    .catch(error => {
      // errorRef.value.openError('Failed to connect', error.message, false)
      console.log('failed')
    })
}
</script>

<template>
  <div class="connect">
    <div>
      <div class="connect-top connecting" @click="open()" v-if="wallet.address == ''">
        <img src="@/assets/images/wallet.png" alt />
        <span class="connect-style-disable">{{ $t('header.wallet') }}</span>
      </div>
      <div class="connect-top connected" v-else>
        <img src="@/assets/images/wallet.png" alt />
        <span class="connect-style">{{ shortenAddress(wallet.address) }}</span>
      </div>
    </div>
  </div>
  <!-- <div v-if="isActivated" class="flex items-center">
    <div
      class="sm:hidden py-2 px-3 rounded-2xl inline-block bg-gray-100"
    >{{ shortenAddress(address) }}</div>
    <div class="hidden sm:flex py-1 px-2 flex items-center rounded-3xl border border-solid">
      <div class="px-1 mr-1">{{ displayEther(balance) }} ETH</div>
      <div class="py-2 px-3 rounded-2xl inline-block bg-gray-100">{{ shortenAddress(address) }}</div>
    </div>
  </div>
  <button v-else @click="open" class="btn">Connect Wallet</button> -->
</template>
<style lang="scss" scoped>
$themeColor: #00c38bff;
html:lang(fr) .connect, html:lang(it) .connect  {
  img{
    left: 28px!important;
  }
  .connect-style-disable{
    padding-left: 65px!important;
  }
}
.metamask-img {
  // margin-top: 15px;
  width: 45px !important;
  // transform: translateX(-14px);
}
.button-format {
  cursor: pointer;
  width: 200px;
  height: 48px;
  border-radius: 4px;
  background: $themeColor;
  line-height: 48px;
  transition: all 0.4s ease;
  font-size: 18px;
  font-family: 'GothamRnd';
  font-weight: 500;
  color: #ffffff;
  // transform: translate(-14px, 0);
  margin: 25px 0 0 0;
  // transform: translate(40px, 0px);
}
.button-format:hover {
  color: #000;
  background: #7c7c7c;
}
.address {
  font-family: 'GothamRnd';
  font-size: 18px;
  height: 48px;
  line-height: 48px;
  text-align: left;
  margin: 5px 0 0px 0;
}
.connect-top {
  height: 56px;
  border-radius: 28px;
  position: relative;
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  img {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .connect-style {
    font-size: 20px;
    font-family: D-DIN;
    font-weight: bold;
    color: #add1ff;
    line-height: 56px;
  }
  .connect-style-disable {
    font-size: 20px;
    font-family: D-DIN;
    font-weight: bold;
    color: #add1ff;
    line-height: 56px;
  }
}
.connecting {
  width: 186px;
  background: url(@/assets/images/wallet-border-186.png);
  img {
    left: 45px;
  }
  .connect-style {
    padding-left: 87px;
  }
  .connect-style-disable {
    padding-left: 87px;
  }
}
.connected {
  width: 210px;
  background: url(@/assets/images/wallet-border-210.png);
  img {
    left: 31px;
  }
  .connect-style {
    padding-left: 74px;
  }
  .connect-style-disable {
    padding-left: 74px;
  }
}
.connect {
  min-height: 48px;
}
.header-wrapper {
  // width: 100vw;
  border-bottom: 1px solid #edeff3;
  box-sizing: border-box;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    padding: 0 20px;
    height: 80px;
    .left {
      display: flex;
      text-align: left;
      img {
        height: 50px;
      }
    }
    .center {
      position: relative;
    }
    .search-select {
      width: 500px !important;
      max-width: 60vw !important;
    }
    .right {
      display: flex;
      align-items: center;
      .icon {
        padding-left: 20px;
        cursor: pointer;
      }
    }
  }
  .btn {
    color: #fff;
    // width: 90px;
    // height: 38px;
    background: #3f434e;
    border-radius: 10px;
    margin: 25px 0 20px 0;
  }
}
@media only screen and (max-width: 767px) {
}
</style>
