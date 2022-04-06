<template>
  <div class="wrapper">
    <section class="section roadmap">
      <SectionTitle :text="$t('roadmap.title')" />

      <div class="content" v-if="scrrenWidth > 760">
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
              The OpenDAO Genesis Membership utility NFT
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
              The OpenDAO P2E 2.0 gaming metaverse(BigTime)
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
              The OpenDAO PFP collection
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
      </div>
      <div class="roadmap-phone-box" v-else>
        <div class="roadmap-phone">
          <div>
            <img src="@/assets/images/roadmap/roadmap-1.png" alt="" />
          </div>
          <div class="roadmap-box-left road-map-Q1">
            <div class="roadmap-title">2021 Q4</div>
            <ul class="roadmap-ul">
              <li class="roadmap-list">
                <div class="roadmap-point"></div>
                Fair distribution: 0 tokens reserved for founding team, no
                private or public sale, just a free fair airdrop
              </li>
              <li class="roadmap-list">
                <div class="roadmap-point"></div>
                DAO governance improvement proposals - Building the largest DAO
                in WEB3/NFT
              </li>
              <li class="roadmap-list">
                <div class="roadmap-point"></div>
                Ecosystem building - Developer and marketing grants alongside
                creator curation
              </li>
            </ul>
          </div>
        </div>
        <div class="roadmap-phone">
          <div>
            <img src="@/assets/images/roadmap/roadmap-2.png" alt="" />
          </div>
          <div class="roadmap-box-left road-map-Q1">
            <div class="roadmap-title">2022 Q1</div>
            <ul class="roadmap-ul">
              <li class="roadmap-list">
                <div class="roadmap-point"></div>
                The OpenDAO Genesis Membership utility NFT
              </li>
              <li class="roadmap-list">
                <div class="roadmap-point"></div>
                SOSMarket - Autonomous NFT Prediction Market Protocol(Cash out
                your NFT knowledge)
              </li>
              <li class="roadmap-list">
                <div class="roadmap-point"></div>
                721starter - Get early access to the NFTs of tomorrow
              </li>
              <li class="roadmap-list">
                <div class="roadmap-point"></div>
                The OpenDAO P2E 2.0 gaming metaverse(BigTime)
              </li>
            </ul>
          </div>
        </div>
        <div class="roadmap-phone">
          <div>
            <img src="@/assets/images/roadmap/roadmap-3.png" alt="" />
          </div>
          <div class="roadmap-box-left road-map-Q1">
            <div class="roadmap-title">2022 Q2</div>
            <ul class="roadmap-ul">
              <li class="roadmap-list">
                <div class="roadmap-point"></div>
                0 fee NFT Escrow/Exchange on ETH network
              </li>
              <li class="roadmap-list">
                <div class="roadmap-point"></div>
                The OpenDAO PFP collection
              </li>
            </ul>
          </div>
        </div>
        <div class="roadmap-phone">
          <div>
            <img src="@/assets/images/roadmap/roadmap-4.png" alt="" />
          </div>
          <div class="roadmap-box-left road-map-Q1">
            <div class="roadmap-title">TBD</div>
            <ul class="roadmap-ul">
              <li class="roadmap-list">
                <div class="roadmap-point"></div>
                Soschain - Bridge/DEX/Lending
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts" scoped>
import SectionTitle from "./SectionTitle.vue";
const scrrenWidth = document.body.clientWidth;
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
    background-image: url(@/assets/images/roadmap/roadmap-bg-1.png);
    background-repeat: no-repeat;
    background-position: top;
    .roadmap {
      .roadmap-phone-box {
        background-image: url(@/assets/images/roadmap/roadmap-bg-2.png);
        background-repeat: no-repeat;
        background-position: 0 180%;
        .roadmap-box-left,
        .roadmap-box-right {
          margin-left: 15px;
          .roadmap-point {
            width: 4px;
            height: 4px;
            min-width: 4px;
            background: #ffffff;
            border-radius: 50%;
            margin: 6px 6px 0 6px;
            display: inline-block;
          }
          .roadmap-title {
            font-size: 24px;
            font-weight: bold;
            color: #ffffff;
            padding-left: 15px;
          }
          .roadmap-list {
            margin-top: 10px;
            font-weight: 400;
            color: #ffffff;
            opacity: 0.5;
            display: flex;
          }
        }
        .roadmap-phone {
          padding-top: 40px;
          width: 100%;
          display: flex;
          img {
            min-width: 66.75px;
            width: 66.75px;
            height: 75px;
          }
        }
      }
    }
  }
}
</style>
