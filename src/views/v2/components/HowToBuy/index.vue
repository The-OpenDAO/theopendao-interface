<template>
  <div id="how-to-buy" class="wrapper">
    <section class="section how-to-buy">
      <!-- left -->
      <div class="left">
        <SectionTitle :text="$t('howToBuy.title')" />
        <div class="desc">
          {{ $t('howToBuy.desc') }}
        </div>
        <div class="tip">
          <span>{{ $t('howToBuy.youCanBuy') }}</span>
          <LongArrowDownIcon class="arrow" />
        </div>
        <AddBtns class="hide-mobile btns" />
      </div>

      <!-- right -->
      <div class="right">
        <div class="list">
          <div v-for="item in list" class="item">
            <div class="item-border">
              <div class="item-inner" @click="openUrl(item.url)">
                <div class="logo">
                  <img :src="getImageUrl(item.name)" />
                  <span>{{ item.name }}</span>
                </div>
                <el-icon class="arrow"><arrow-right-bold /></el-icon>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddBtns class="hide-pc mobile-btns" />
    </section>
  </div>
</template>

<script setup lang="ts">
import SectionTitle from '../SectionTitle.vue'
import { ArrowRightBold } from '@element-plus/icons-vue'
import { list, getImageUrl } from './data.ts'
import LongArrowDownIcon from '@/components/icons/LongArrowDown.vue'
import AddBtns from './AddBtns.vue'

function openUrl(url) {
  window.open(url)
}
</script>

<style lang="scss" scoped>
html:lang(fr) .how-to-buy .left .tip span {
  max-width: 380px;
}
.wrapper {
  width: 100vw;
  display: flex;
  justify-content: center;
  background-image: url(@/assets/images/how-to-buy-bg.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
.how-to-buy {
  display: flex;
  padding: 100px 0 100px;

  .left {
    flex: 1;
    .title {
      align-items: baseline;
      padding-top: 0;
    }
    .desc {
      font-size: 20px;
      font-weight: 400;
      opacity: 0.4;
      max-width: 410px;
    }
    .tip {
      font-size: 40px;
      font-weight: bold;
      display: flex;
      align-items: center;
      padding: 40px 0;
      span {
        padding-right: 20px;
        text-align: center;
      }
      .arrow {
        transform: rotate(-90deg);
      }
    }
    :deep(.btns .add-btn) {
      width: 40%;
      padding-bottom: 8px;
    }
  }
  .right {
    flex: 1;
    .list {
      display: grid;
      grid-template-columns: 33.33% 33.33% 33.33%;
      .item {
        padding: 10px;
        .item-border {
          box-sizing: border-box;
          padding: 1px;
          border-radius: 10px;
          &:hover {
            background-image: linear-gradient(0deg, #6996e0, #9fd1ff);
            color: #add1ff;
          }
          .item-inner {
            cursor: pointer;
            padding: 10px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #27282d;
            border-radius: 10px;
            .logo {
              display: flex;
              align-items: center;
              img {
                width: 30px;
              }
              span {
                padding-left: 10px;
              }
            }
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .how-to-buy {
    flex-direction: column;
    padding: 50px 0 50px;
    .left {
      .title {
        align-items: center;
      }
      .desc {
        text-align: center;
      }
      .tip {
        flex-direction: column;
        font-size: 30px;
        span {
          padding-bottom: 20px;
          padding-right: unset;
        }
        .arrow {
          transform: rotate(0deg);
        }
      }
    }

    .right {
      .list {
        display: grid;
        grid-template-columns: 50% 50%;
        .item {
          .item-inner {
            padding: 10px;
          }
        }
      }
    }

    .mobile-btns {
      display: flex;
      justify-content: center;
      padding-top: 40px;
    }
  }
}
</style>
