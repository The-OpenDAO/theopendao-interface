<script lang="ts">
import { defineComponent, inject, onMounted, ref } from 'vue'
import Modal from './Modal.vue'
import WalletConnectIcon from './logos/WalletConnect.vue'
import MetaMaskIcon from './logos/MetaMask.vue'
import WalletLinkIcon from './logos/WalletLink.vue'
import BitskiIcon from './logos/Bitski.vue'
import CloverIcon from './logos/Clover.vue'
import { useBoard } from '../composables/useBoard'
import { useWallet, WalletName } from '../composables/useWallet'
import { Metamask } from '../wallets/metamask'
import { Walletconnect } from '../wallets/walletconnect'
import { Walletlink } from '../wallets/walletlink'
import { Bitski } from 'bitski'
import { CloverConnector } from '@clover-network/clover-connector'
const clover = new CloverConnector({ supportedChainIds: [1] })

import Web3 from 'web3'
const opts = {
  clientId: '8a3708b0-73e0-46ab-b5c4-b50e4167d013',
  callbackUrl: window.location.href.split('#')[0] + 'callback.html',
  extraBitskiOptions: '',
}
const bitski = new Bitski(opts.clientId, opts.callbackUrl)

const BitskiProvider = bitski.getProvider()
const web3 = new Web3(BitskiProvider)

export default defineComponent({
  components: {
    Modal,
    MetaMaskIcon,
    WalletConnectIcon,
    WalletLinkIcon,
    BitskiIcon,
    CloverIcon,
  },
  inject: ['infuraId'],
  setup() {
    const { boardOpen, close } = useBoard()
    const { connect, status } = useWallet()

    const metamaskDisabled = ref(true)
    const walletconnectDisabled = ref(true)
    const walletlinkDisabled = ref(true)
    const bitskiDisabled = ref(true)
    const infuraId = inject('infuraId') as string
    const appName = inject('appName') as string

    // check metamask and walletconnect available
    onMounted(async () => {
      if (await Metamask.check()) {
        metamaskDisabled.value = false
      }
      if (infuraId && (await Walletconnect.check())) {
        walletconnectDisabled.value = false
      }
      if (infuraId && appName && (await Walletlink.check())) {
        walletlinkDisabled.value = false
      }
      //if (await bitski.check()) {
      // bitskiDisabled.value = false
      //}
    })

    const loadingOpen = ref(false)
    const openLoading = () => {
      loadingOpen.value = true
    }
    const closeLoading = () => {
      loadingOpen.value = false
    }

    const connectWallet = async (wallet: WalletName) => {
      try {
        switch (wallet) {
          case 'metamask':
            await connectMetamask()
            break
          case 'walletconnect':
            await connectWalletconnect()
            break
          case 'walletlink':
            await connectWalletlink()
            break
          case 'bitski':
            await connectBitski()
            break
          case 'clover':
            await connectClover()
            break
        }
      } catch (e: any) {
        console.error(e.message)
      } finally {
        closeLoading()
      }
    }

    const connectMetamask = async () => {
      if (metamaskDisabled.value) return
      // Prevent from closing the board while clicking disabled wallet
      close()
      openLoading()
      await connect('metamask')
    }

    const connectWalletconnect = async () => {
      if (walletconnectDisabled.value) return
      // Prevent from closing the board while clicking disabled wallet
      close()
      openLoading()
      await connect('walletconnect', infuraId)
    }

    const connectWalletlink = async () => {
      if (walletlinkDisabled.value) return
      // Prevent from closing the board while clicking disabled wallet
      close()
      openLoading()
      await connect('walletlink', infuraId, appName)
    }

    const connectBitski = async () => {
      close()
      openLoading()
      console.log('trigger bitski')
      await connect('bitski')
    }
    const connectClover = async () => {
      close()
      openLoading()
      await connect('clover')
    }
    return {
      status,
      boardOpen,
      metamaskDisabled,
      walletconnectDisabled,
      walletlinkDisabled,
      bitskiDisabled,
      close,
      connectWallet,

      // pending modal
      loadingOpen,
      openLoading,
      closeLoading,
    }
  },
})
</script>

<template>
  <Modal :modalOpen="boardOpen" @close="close">
    <div v-click-outside="close">
      <div class="wallet-herader">
        <span class="wallet-herader-text">Connect Wallet</span>
        <div class="wallet-close" @click="close">
          <img src="@/assets/images/close.png" alt />
        </div>
      </div>
      <div @click="connectWallet('metamask')" class="wallet-item" :class="metamaskDisabled ? 'wallet-disabled' : ''">
        <div class="item">
          <div class="wallet-name">MetaMask</div>
          <MetaMaskIcon class="logo" />
        </div>
      </div>
      <div @click="connectWallet('walletconnect')" class="wallet-item" :class="walletconnectDisabled ? 'wallet-disabled' : ''">
        <div class="item">
          <div class="wallet-name">WalletConnect</div>
          <WalletConnectIcon class="logo" />
        </div>
      </div>

      <div @click="connectWallet('walletlink')" class="wallet-item" :class="walletlinkDisabled ? 'wallet-disabled' : ''">
        <div class="item">
          <div class="wallet-name">Coinbase Wallet</div>
          <WalletLinkIcon class="logo" />
        </div>
      </div>
      <div @click="connectWallet('bitski')" class="wallet-item">
        <div class="item">
          <div class="wallet-name">Bitski Wallet</div>
          <BitskiIcon class="logo" />
        </div>
      </div>
      <div @click="connectWallet('clover')" class="wallet-item">
        <div class="item">
          <div class="wallet-name">Clover Wallet</div>
          <CloverIcon class="logo" />
        </div>
      </div>
    </div>
  </Modal>

  <Modal :modalOpen="loadingOpen">
    <div class="loading-modal" v-if="status === 'connecting'">
      <p>Pending Call Request</p>
      <p>Approve or reject request using your wallet</p>
    </div>

    <!-- loading between connected to isActivated -->
    <div v-if="status === 'connected'"></div>
  </Modal>
</template>

<style scoped>
.wallet-herader {
  height: 70px;
  background: #26272c;
  border-radius: 4px 4px 0px 0px;
  position: relative;
}
.wallet-herader-text {
  font-family: D-DIN-Bold;
  font-weight: bold;
  color: #ffffff;
  display: block;
  font-size: 24px;
  line-height: 70px;
  text-align: center;
}
.wallet-close {
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.wallet-item {
  border-radius: 4px;
  background: #26272c;
  display: flex;
  justify-content: center;
  padding-top: 1.7rem;
  padding-bottom: 1.7rem;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  margin: 1rem;
  border-radius: 0.75rem;
  cursor: pointer;
}
.wallet-name {
  font-family: D-DIN-Bold;
  color: #ffffff;
  font-size: 20px;
  line-height: 38px;
}
.wallet-item:hover {
  /* background-color: rgba(243, 244, 246, 0.664); */
}

@media (min-width: 640px) {
  .wallet-item {
    width: 24rem;
  }
}

.item {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 30px;
  /* display: flex;
  flex-direction: column;
  justify-content: center; */
  align-items: center;
  font-size: 1.5rem;
  line-height: 2rem;
}

.item > :not([hidden]) ~ :not([hidden]) {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.line {
  color: #e5e7eb;
  border-width: 0px;
  border-bottom-width: 1px;
  border-style: solid;
}

.logo {
  width: 50px;
  height: 50px;
}

.wallet-disabled {
  opacity: 0.5;
}

.wallet-disabled:hover {
  background-color: rgba(255, 255, 255, 0.623);
  cursor: default;
}

.loading-modal {
  width: 20rem;
  padding: 2.5rem;
  text-align: center;
}

.loading-modal > p:first-child {
  font-size: 1.25rem;
  line-height: 1.75rem;
}

@media (min-width: 640px) {
  .loading-modal {
    width: auto;
  }
}
</style>
