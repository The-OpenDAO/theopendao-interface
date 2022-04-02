<template>
  <div class="wrapper">
    <section class="section roadmap">
      <SectionTitle :text="$t('roadmap.title')" />
      <div class="content">
        <img class="roadmap-img" src="@/assets/images/roadmap.png" alt="" />
        <div class="roadmap-box-left road-map-Q1">
          <div class="roadmap-title">2021 Q4</div>
          <ul class="roadmap-ul">
            <li class="roadmap-list">
              <div class="roadmap-point"></div>
              Fair distribution: 0 tokens reserved for founding team,
              <br />
              no private or public sale, just a free fair airdrop
            </li>
            <li class="roadmap-list">
              <div class="roadmap-point"></div>
              DAO governance improvement proposals - Building
              <br />
              the largest DAO in WEB3/NFT
            </li>
            <li class="roadmap-list">
              <div class="roadmap-point"></div>
              Ecosystem building - Developer and marketing
              <br />
              grants alongside creator curation
            </li>
          </ul>
        </div>
        <div class="roadmap-box-left road-map-Q2">
          <div class="roadmap-title">2022 Q1</div>
          <ul class="roadmap-ul">
            <li class="roadmap-list">
              <div class="roadmap-point"></div>
              OpenDAO Genesis Membership utility NFT
            </li>
            <li class="roadmap-list">
              <div class="roadmap-point"></div>
              SOSMarket - Autonomous NFT Prediction Market
              <br />
              Protocol(Cash out your NFT knowledge)
            </li>
            <li class="roadmap-list">
              <div class="roadmap-point"></div>
              721starter - Get early access to the NFTs of tomorrow
            </li>
            <li class="roadmap-list">
              <div class="roadmap-point"></div>
              OpenDAO P2E 2.0 gaming metaverse(BigTime)
            </li>
          </ul>
        </div>
        <div class="roadmap-box-right road-map-Q3">
          <div class="roadmap-title">2022 Q2</div>
          <ul class="roadmap-ul">
            <li class="roadmap-list">
              0 fee NFT Escrow/Exchange on ETH network
              <div class="roadmap-point"></div>
            </li>
            <li class="roadmap-list">
              OpenDAO PFP collection
              <div class="roadmap-point"></div>
            </li>
          </ul>
        </div>
        <div class="roadmap-box-right road-map-Q4">
          <div class="roadmap-title">TBD</div>
          <ul class="roadmap-ul">
            <li class="roadmap-list">
              Soschain - Bridge/DEX/Lending
              <div class="roadmap-point"></div>
            </li>
          </ul>
        </div>

        <!-- <div class="timeline">
          <div class="line"></div>
          <div class="list">
            <div v-for="index in 7" :key="index" class="timeline-item">
              <div class="point">
                <img src="@/assets/images/timeline-dot.png" alt="" />
              </div>
              <div class="inner">
                <div class="item-content">{{ $t(`roadmap.content${index}`) }}</div>
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </section>
  </div>
</template>

<script setup lang="ts" scoped>
import SectionTitle from "./SectionTitle.vue";
</script>

<style lang="scss">
.wrapper {
  width: 100vw;
  border-top: unset !important;
  .roadmap {
    padding-bottom: 100px;
    .content {
      background-image: url(@/assets/images/roadmap-bg.png);
      background-repeat: no-repeat;
      padding-top: 40px;
      position: relative;
      // width: 1440px;
      .roadmap-img {
        margin: 0 auto;
      }
      .road-map-Q1 {
        bottom: 80px;
        left: 300px;
      }
      .road-map-Q2 {
        right: -30px;
        top: 280px;
      }
      .road-map-Q3 {
        left: 170px;
        top: 60px;
      }
      .road-map-Q4 {
        right: 180px;
        top: 60px;
      }
      .roadmap-box-left,
      .roadmap-box-right {
        position: absolute;
        .roadmap-point {
          width: 4px;
          height: 4px;
          background: #ffffff;
          border-radius: 50%;
          margin: 6px 6px 0 6px;
          display: inline-block;
        }
        .roadmap-title {
          font-size: 24px;
          font-weight: bold;
          color: #ffffff;
        }
        .roadmap-ul {
          // list-style-type: disc;
          // padding-left: 16px;
        }
        .roadmap-list {
          margin-top: 10px;
          font-weight: 400;
          color: #ffffff;
          opacity: 0.5;
          display: flex;
        }
      }
      .roadmap-box-right {
        text-align: right;
        .roadmap-list {
          justify-content: flex-end;
        }
      }
    }
    .timeline {
      width: 100%;
      position: relative;
      .line {
        content: " ";
        display: block;
        height: 130%;
        width: 4px;
        margin-left: -2px;
        background: linear-gradient(0deg, transparent, #6996e0, transparent);
        position: absolute;
        left: 50%;
        top: -50px;
      }
      .timeline-item {
        display: flex;
        width: 100%;
        position: relative;
        .point {
          position: absolute;
          z-index: 1;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 24px;
            position: relative;
            // top: 20px;
          }
        }
        .inner {
          width: 50%;
          .item-content {
            padding-top: 20px;
            padding-bottom: 20px;
          }
        }
      }
      .timeline-item:nth-child(2n + 1) {
        text-align: right;
        padding-right: 30px;
        position: relative;
      }
      .timeline-item:nth-child(2n) {
        flex-direction: row-reverse;
        text-align: left;
        padding-left: 30px;
        padding-left: 30px;
      }
    }
  }
}
@media only screen and (max-width: 1440px) {
  .wrapper {
    .roadmap {
      .content {
        width: unset !important;
        .roadmap-img {
          margin: 0 auto 0 20px;
        }
        .road-map-Q1 {
          bottom: 80px;
          left: 230px;
        }
        .road-map-Q2 {
          right: 30px;
          top: 280px;
        }
        .road-map-Q3 {
          left: 110px;
          top: 60px;
        }
        .road-map-Q4 {
          right: 240px;
          top: 60px;
        }
      }
    }
  }
}
@media only screen and (max-width: 767px) {
  .wrapper {
    .roadmap {
      .timeline {
        .line {
          height: 120%;
        }
      }
    }
  }
}
</style>
