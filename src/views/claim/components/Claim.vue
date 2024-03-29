<template>
  <section class="section claim">
    <div class="info">
      <!-- left -->
      <div class="left">
        <img class="title" src="@/assets/images/claim/title.png" alt="" />
        <div class="desc">
          <p>Energy is neither destroyed or created, it is passed from one form to another.</p>
          <p>The amount of kinetic energy that has burst forth from the OpenDAO has been incredible. The diverse NFT community remains dormant no longer.</p>
          <p>
            We are working together to improve the NFT experience for creators, collectors, traders, investors, veterans, and beginners. As we focus on the bright future that we
            are creating through assembling the building blocks of a strong and vibrant system, we want to reward the members of the community who have already begun to take part
            in helping to lay its foundation.
          </p>
          <p>The OpenDAO Genesis Membership NFT Collection are tokens exclusively mintable by the LP providers on Sushi based on the snapshot taken at block 14152105(11:00 AM UTC 6th Feb 2022).</p>
        </div>
      </div>

      <!-- right -->
      <div class="right">
        <a target="_blank" href="https://opensea.io/collection/opendao-genesis-membership">
          <div class="gotoOpensea">
            OpenSea
          </div>
        </a>
        <div class="desc">
          Holding this token may entitle the owner access to airdrops, early access to future collections, early access to curated drops and various other benefits.
        </div>
        <div class="list">
          <div class="item">
            <div class="tier">TIER 1</div>
            <div class="tier-info">Threshold: 1200.07 (SOS-WETH)SLP Mint 1x for 4 NFTs</div>
          </div>
          <div class="item">
            <div class="tier">TIER 2</div>
            <div class="tier-info">Threshold: 330.63 (SOS-WETH)SLP Mint 1x for tier 2,3&4 NFTs</div>
          </div>
          <div class="item">
            <div class="tier">TIER 3</div>
            <div class="tier-info">Threshold: 96.74 (SOS-WETH)SLP Mint 1x for tier 3&4 NFTs</div>
          </div>
          <div class="item">
            <div class="tier">TIER 4</div>
            <div class="tier-info">Threshold: 31.18 (SOS-WETH)SLP Mint 1x for tier 4 NFT</div>
          </div>
        </div>
        <div class="tips">*Additional perks may apply to holders with a complete collection of all 4 NFTs.</div>
        <p class="desc">
          Together, we are creating a robust ecosystem composed of many dynamic parts that will help to secure the future of NFTs in a self-sustaining way. This monumental effort
          made by many is the beating heart and welcoming soul of OpenDAO. This powerful movement is what you — the genesis stakers — are investing in. What innovations and wonders
          will we create next?
        </p>
      </div>
    </div>
    <div class="claim-feild">
      <div v-if="!data.proofs" style="color: #f56c6c">You are not eligible to claim SOS Genesis Membership NFTs.</div>
      <template v-else>
        <img src="@/assets/images/claim/l.png" class="hide-mobile" alt="" />
        <el-button v-if="!address" class="claim-btn claimed" @click="open">Connect Wallet</el-button>
        <el-button v-else-if="network.chainId != chainID" class="claim-btn claimed">NETWORK ERROR</el-button>
        <el-button v-else-if="data.claimed" class="claim-btn claimed" disabled>CLAIMED</el-button>
        <el-button v-else-if="claimStatus == 'NOT START'" class="claim-btn claimed" disabled>NOT START</el-button>
        <el-button v-else-if="claimStatus == 'CLAIM END'" class="claim-btn claimed" disabled>CLAIM END</el-button>
        <el-button v-else class="claim-btn" @click="claim">CLAIM</el-button>
        <img src="@/assets/images/claim/r.png" class="hide-mobile" alt="" />
      </template>
    </div>
  </section>

  <SubmittedModal ref="submittedModal" />
</template>

<script setup lang="ts">
import openDAOMembershipNFT_ABI from '@/abi/openDAOMembershipNFT.json'
import { Contract, utils, BigNumber, constants, providers } from 'ethers'
import { useBoard, useEthers, useEthersHooks } from '@/vue-dapp/index'
import { reactive, onMounted, computed, ref, h } from 'vue'

import SubmittedModal from '@/components/SubmittedModal.vue'
import { ElNotification, ElMessageBox, ElMessage } from 'element-plus'
import { getMembershipProofAPI } from '@/api/index'

const chainID = import.meta.env.VITE_APP_CHAIN_ID

const { open } = useBoard()

const { signer } = useEthers()
const { address, balance, isActivated, network } = useEthers()
const { onActivated, onDeactivated, onChanged } = useEthersHooks()

const etherscanBaseURL = import.meta.env.VITE_APP_ETHERSCAN_BASEURL

const openDAOMembershipNFTAddress = import.meta.env.VITE_APP_MEMBERSHIP_NFT_ADDRESS

const submittedModal = ref(null)

const data = reactive({
  tier: 0,
  proofs: [1],
  claimed: false,
  claimEndTime: 0,
})

const claimStatus = computed(() => {
  const date = new Date()
  if (Number(data.claimEndTime) == 0) {
    return 'NOT START'
  } else if (date.getTime() / 1000 < Number(data.claimEndTime)) {
    return 'START'
  } else {
    return 'CLAIM END'
  }
})

function showMinedNotification(hash) {
  ElNotification({
    // duration: 1000000000,
    type: 'success',
    title: 'Transcation is mined',
    message: h('a', { href: `${etherscanBaseURL}/tx/${hash}`, style: 'color: #00c38b', target: '_blank' }, 'View on Etherscan'),
  })
}

onActivated(() => {
  console.log('onActivated')
  getClaimEndTime()
  getClaimStatus()
  getMembershipProof()
})

onChanged(() => {
  console.log('onChanged')

  getClaimStatus()
  getMembershipProof()
})

function getOpenDAOMembershipNFTContract() {
  return new Contract(openDAOMembershipNFTAddress, openDAOMembershipNFT_ABI, signer.value)
}

async function getMembershipProof() {
  const res = await getMembershipProofAPI(address.value)
  data.tier = res.tier
  data.proofs = res.proofs
  console.log(res)
}

async function getClaimStatus() {
  const NFTContract = getOpenDAOMembershipNFTContract()
  data.claimed = await NFTContract._claimed(address.value)
}

async function getClaimEndTime() {
  const NFTContract = getOpenDAOMembershipNFTContract()
  data.claimEndTime = await NFTContract._claimEndTime()
}

async function claim() {
  if (!data.proofs) return
  // const date = new Date()
  // if (date.getTime() / 1000 > data.claimEndTime) return showMessage()
  try {
    const NFTContract = getOpenDAOMembershipNFTContract()
    const tx = await NFTContract.claimMembershipNFTs(data.tier, data.proofs)
    submittedModal.value.open(tx.hash)
    await tx.wait(1)
    showMinedNotification(tx.hash)
    getClaimStatus()
  } catch (err) {
    ElNotification({
      // duration: 1000000000,
      type: 'error',
      title: 'Claim error',
      // message: h('a', { href: `${etherscanBaseURL}/tx/${hash}`, style: 'color: #00c38b', target: '_blank' }, 'View on Etherscan'),
    })
  }
}

const showMessage = () => {
  ElMessageBox.confirm(`It's not claim time`, 'Warning', {
    confirmButtonText: 'OK',
    showCancelButton: false,
    type: 'warning',
  })
    .then(() => {})
    .catch(() => {})
}
</script>

<style lang="scss">
.claim {
  .info {
    display: flex;
    color: #b8b8b8;
    p {
      padding-bottom: 20px;
      font-size: 18px;
      font-weight: 400;
      line-height: 27px;
    }
    .left {
      flex: 1;
      padding: 30px;
      .title {
        margin-bottom: 25px;
      }
    }
    .right {
      flex: 1;
      padding: 30px;
      padding-top: 80px;
      .gotoOpensea{
        width: 200px;
        height: 56px;
        background: #0069ff;
        border-radius: 10px;
        color: #fff;
        line-height: 56px;
        font-weight: bold;
        text-align: center;
        font-size: 24px;
        margin-bottom: 20px;
      }
      .title {
        font-size: 24px;
        font-weight: bold;
        color: #ffffff;
        line-height: 32px;
      }
      .tips {
        font-size: 16px;
        font-weight: 400;
        color: #c83f55;
        line-height: 27px;
        padding-bottom: 20px;
      }
      .list {
        padding: 20px 0;
        .item {
          .tier {
            width: 80px;
            height: 30px;
            background: #ffffff;
            color: #000;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 30px 0 20px 0;
          }
          .tier-info {
            font-size: 18px;
            font-weight: 400;
            color: #b8b8b8;
            line-height: 27px;
          }
        }
      }
    }
  }

  .claim-feild {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 80px 0;
    img {
      width: 150px;
    }
    .claim-btn {
      width: 230px;
      height: 56px;
      background: #006eff;
      border-radius: 28px;
      color: #fff;
      border: none;
      font-size: 26px;
      font-weight: bold;
    }
    .claimed {
      background: #6c83a1;
    }
  }
}

@media only screen and (max-width: 767px) {
  .claim {
    .info {
      flex-direction: column;
    }

    .claim-feild {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 80px 0;
      img {
        width: 20vw;
      }
      .claim-btn {
        width: 60vw;
      }
    }
  }
}
</style>
