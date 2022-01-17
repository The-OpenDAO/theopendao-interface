<template>
  <section class="section sos-chain-network">
    <SectionTitle id="sos-chain" :text="$t('sosChain.title')" />
    <div class="content">
      <!-- Bridge -->
      <div class="item">
        <div class="item-inner">
          <div class="left">
            <div class="title">{{ $t('sosChain.bridge') }}</div>
            <div class="desc">{{ $t('sosChain.bridgeDesc') }}</div>
          </div>
          <div class="right">
            <img src="@/assets/images/sos-chain-network/bridge.png" alt="" />
          </div>
        </div>
      </div>

      <!-- DEX -->
      <div class="item">
        <div class="item-inner">
          <div class="left">
            <div class="title">{{ $t('sosChain.dex') }}</div>
            <div class="desc">{{ $t('sosChain.dexDesc') }}</div>
          </div>
          <div class="right">
            <img src="@/assets/images/sos-chain-network/dex.png" alt="" />
          </div>
        </div>
      </div>

      <!-- Lending -->
      <div class="item">
        <div class="item-inner">
          <div class="left">
            <div class="title">{{ $t('sosChain.lending') }}</div>
            <div class="desc">{{ $t('sosChain.lendingDesc') }}</div>
          </div>
          <div class="right">
            <img src="@/assets/images/sos-chain-network/lending.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionTitle from './SectionTitle.vue'
</script>

<style lang="scss" scoped>
.sos-chain-network {
  padding-bottom: 100px;
  .content {
    display: grid;
    grid-template-columns: 33.33% 33.33% 33.33%;
    .item {
      padding: 20px;

      .item-inner {
        height: 100%;
        display: flex;
        align-items: center;
        background: #1e1f23;
        &:hover {
          // box-shadow: 5px 5px 10px #aaaaaa;
        }
        .left {
          flex: 1;
          padding: 40px 0 40px 40px;
          .title {
            font-size: 40px;
            font-weight: bold;
          }
          .desc {
            font-size: 14px;
            font-weight: 400;
            opacity: 0.4;
            padding-top: 10px;
          }
        }
        .right {
          flex: 1;
        }
      }
    }
  }
}
@media only screen and (max-width: 767px) {
  .sos-chain-network {
    .content {
      grid-template-columns: 100%;
      .item {
        padding: 10px 0;
        .item-inner {
          .left {
            .title {
              font-size: 24px;
            }
          }
        }
      }
    }
  }
}
</style>
