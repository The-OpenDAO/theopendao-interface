<template>
  <!-- content -->
  <div class="content">
    <div class="item item-1">
      <div class="item-inner">
        <img class="item-icon" src="@/assets/images/distribution-1.png" />
        <div class="item-title">{{ $t('distribution.sosToken') }}</div>
        <div class="item-desc">{{ $t('distribution.sosTotal') }}</div>
        <div class="item-main">
          <div class="item-main-content item-main-1">
            <div class="percent">50%</div>
            <div class="desc">{{ $t('distribution.airdrop') }}</div>
          </div>
          <div class="item-main-content item-main-2">
            <div class="percent">20%</div>
            <div class="desc">{{ $t('distribution.stakingIncentive') }}</div>
          </div>
          <div class="item-main-content item-main-3">
            <div class="percent">20%</div>
            <div class="desc">{{ $t('distribution.openDAOTreasury') }}</div>
          </div>
          <div class="item-main-content item-main-4">
            <div class="percent">10%</div>
            <div class="desc">{{ $t('distribution.LPIncentive') }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="item item-2">
      <div class="item-inner">
        <img class="item-icon" src="@/assets/images/distribution-2.png" />
        <div class="item-title">{{ $t('distribution.airdrop') }}</div>
        <div class="item-desc">{{ $t('distribution.analyticsTime') }}</div>
        <div class="item-main">
          <div class="datas">
            <div class="datas-item">
              <div class="datas-item-title">305K+</div>
              <div class="datas-item-desc">{{ $t('distribution.usersClaimed') }}</div>
            </div>
            <div class="datas-item">
              <div class="datas-item-title">620K+</div>
              <div class="datas-item-desc">{{ $t('distribution.transactions') }}</div>
            </div>
            <div class="datas-item">
              <div class="datas-item-title">210K+</div>
              <div class="datas-item-desc">{{ $t('distribution.holders') }}</div>
            </div>
          </div>
          <div class="link">
            <a href="https://dune.xyz/0xroll/OpenDAO" target="_blank">
              DUNE ANALYTICS
              <el-icon class="arrow"><arrow-right-bold /></el-icon>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="item item-3">
      <div class="item-inner">
        <img class="item-icon" src="@/assets/images/distribution-3.png" />
        <div class="item-title">{{ $t('distribution.openDAO') }}</div>
        <div class="item-desc">{{ $t('distribution.openDAOTitle') }}</div>
        <div class="item-main">
          <ul>
            <li v-for="(item, index) in 4">
              {{ $t(`distribution.openDAODesc${index + 1}`) }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DocumentAdd, ArrowRightBold, Right } from '@element-plus/icons-vue'
</script>

<style lang="scss" scoped>
.content {
  display: grid;
  grid-template-columns: 33.33% 33.33% 33.33%;
  .item {
    padding: 0 14px;
    .item-inner {
      background-color: #1e1f23;
      padding: 30px 20px;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
      .item-icon {
        width: 210px;
      }
      .item-title {
        font-size: 34px;
        font-weight: bold;
        color: #ffffff;
        padding-top: 20px;
        padding-bottom: 10px;
      }
      .item-desc {
        font-size: 16px;
        font-weight: 400;
        color: #ffffff;
        opacity: 0.4;
        padding-bottom: 20px;
      }
      .item-main {
        align-self: stretch;
        flex-grow: 1;
      }
    }
  }

  .item-1 {
    .item-main {
      width: 100%;
      padding: 40px 10px 0 10px;
      display: grid;
      grid-template-columns: 50% 50%;
      .item-main-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 6px;
        .percent {
          font-size: 24px;
          font-weight: bold;
          padding-bottom: 10px;
        }
        .desc {
          font-size: 14px;
          font-weight: 400;
          opacity: 0.6;
          text-align: center;

        }
      }
      .item-main-1 {
        border-bottom: 1px solid #4b4c51;
        border-right: 1px solid #4b4c51;
      }
      .item-main-2 {
        border-bottom: 1px solid #4b4c51;
      }
      .item-main-3 {
        border-right: 1px solid #4b4c51;
      }
    }
  }
  .item-2 {
    .item-main {
      display: flex;
      flex-direction: column;
      .datas {
        display: flex;
        .datas-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          .datas-item-title {
            font-size: 24px;
            font-weight: bold;
            color: #ffffff;
          }
          .datas-item-desc {
            font-size: 12px;
            font-weight: 400;
            color: #ffffff;
            opacity: 0.6;
            text-align: center;
          }
        }
      }
      .link {
        flex-grow: 2;
        display: flex;
        justify-content: center;
        align-items: center;
        a {
          font-size: 20px;
          font-weight: 400;
          color: #4e7dd3;
          text-align: center;
          display: flex;
          align-items: center;
        }
      }
    }
  }

  .item-3 {
    .item-main {
      padding-left: 20px;
      ul {
        list-style-type: disc;
        li {
          font-size: 16px;
          line-height: 24px;
          font-weight: 400;
          color: #ffffff;
        }
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .content {
    grid-template-columns: 100%;
    .item {
      padding-bottom: 40px;
      a {
        padding: 40px 0 20px 0;
      }
      .item-title {
        text-align: center;
      }
      .desc{
        text-align: center;
      }
    }
  }
}
</style>
