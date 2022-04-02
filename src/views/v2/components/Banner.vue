<template>
  <div id="sos" class="banner-bg">
    <img class="banner-left" src="@/assets/images/banner-left.png" alt="" />
    <img class="banner-right" src="@/assets/images/banner-right.png" alt="" />
    <section class="section bannner">
      <div class="banner-box">
        <p class="banner-title">{{ $t("banner.theOpenDAO") }}</p>
        <p class="banner-desc max650">{{ $t("banner.bannerDesc1") }}</p>
        <p class="banner-title">{{ $t("banner.SOS") }}</p>
        <p class="banner-desc max530">{{ $t("banner.bannerDesc2") }}</p>
        <div class="banner-data">
          <div class="banner-data-box">
            <p class="banner-data-title">{{ $t("banner.tvt") }}</p>
            <p class="banner-data-value">$ {{ data.totalVolume }}</p>
            <img src="@/assets/images/volume.png" alt="" />
          </div>
          <div class="banner-data-box">
            <p class="banner-data-title">{{ $t("banner.fdv") }}</p>
            <p class="banner-data-value">$ {{ data.marketCap }}</p>
            <img src="@/assets/images/value.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { getMarketInfo, getTotalVolume } from "@/api/index";
import { formatNumber } from "@/utils/index";

const data = reactive({
  totalVolume: "",
  marketCap: "",
});

onMounted(async () => {
  const info = await getMarketInfo();
  data.marketCap = formatNumber(info.market_data.fully_diluted_valuation.usd);
  data.totalVolume = formatNumber(await getTotalVolume());
});
</script>

<style lang="scss" scoped>
.banner-bg {
  width: 100vw;
  background-image: url(@/assets/images/banner_new.png);
  background-position: center;
  display: flex;
  justify-content: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
  .banner-left {
    position: absolute;
    left: 0;
    bottom: -90px;
  }
  .banner-right {
    position: absolute;
    right: 0;
    top: 0px;
  }
  .max650 {
    max-width: 650px;
  }
  .max530 {
    max-width: 530px;
  }
  .bannner {
    // width: 800px!important;
    // height: 800px;
    .banner-box {
      margin: 140px auto 0 auto;
      text-align: left;
      .banner-title {
        margin-top: 35px;
        font-size: 70px;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
      }
      .banner-desc {
        font-size: 22px;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.8);
        line-height: 33px;
      }
      .banner-data {
        margin-top: 60px;
        display: flex;
        .banner-data-box:first-child {
          margin-left: 0px !important;
        }
        .banner-data-box {
          margin: 0 15px;
          width: 320px;
          min-height: 100px;
          background: #2a2b30;
          box-shadow: 0px 59px 87px 0px rgb(0 0 0 / 19%);
          border-radius: 10px;
          text-align: left;
          padding: 23px 90px 23px 30px;
          position: relative;
          .banner-data-title {
            font-size: 20px;
            font-weight: 400;
            color: #ffffff;
            opacity: 0.4;
          }
          .banner-data-value {
            font-size: 28px;
            font-weight: bold;
            color: #ffffff;
            //line-height: 51px;
          }
          img {
            width: 55px;
            position: absolute;
            top: 50%;
            right: 31px;
            transform: translate(0px, -50%);
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 1750px) {
  .banner-bg {
    .banner-right {
      width: 700px;
    }
  }
}
@media only screen and (max-width: 1180px) {
  .banner-bg {
    .banner-right {
      display: none;
    }
  }
}

@media only screen and (max-width: 767px) {
  html:lang(rs) .banner-bg .bannner .banner-box .banner-data .banner-data-box,
  html:lang(thai) .banner-bg .bannner .banner-box .banner-data .banner-data-box,
  html:lang(ro) .banner-bg .bannner .banner-box .banner-data .banner-data-box,
  html:lang(es) .banner-bg .bannner .banner-box .banner-data .banner-data-box {
    height: unset;
    min-height: 90px;
    .banner-data-title {
      word-break: break-all;
      max-width: 200px;
    }
  }

  // html:lang(de) .how-to-buy .left .tip span {
  //   max-width: 380px;
  // }
  .banner-bg {
    .bannner {
      // height: 800px;
      .banner-box {
        .banner-title {
          font-size: 40px;
        }
        .banner-data {
          flex-direction: column;
          .banner-data-box:first-child {
            margin-left: auto !important;
          }
          .banner-data-box {
            margin: 10px auto;
            width: 300px;
            height: 90px;
            padding: 18px 0 18px 15px;
            .banner-data-title {
              font-size: 20px;
              max-width: 230px;
            }
            .banner-data-value {
              font-size: 26px;
            }
            img {
              width: 53px;
              right: 15px;
            }
          }
        }
      }
    }
  }
}
</style>
