<template>
  <!-- chart -->
  <div class="chart">
    <!-- left -->
    <div class="left">
      <div class="item">
        <div class="dot" style="background: -webkit-linear-gradient(bottom, #2070f6, #58a8ff)"></div>
        <div class="percent">50%</div>
        <div class="desc">{{ $t('distribution.airdrop') }}</div>
      </div>
      <div class="item">
        <div class="dot" style="background: -webkit-linear-gradient(bottom, #efb15b, #f8c945)"></div>
        <div class="percent">20%</div>
        <div class="desc">{{ $t('distribution.stakingIncentive') }}</div>
      </div>
      <div class="item">
        <div class="dot" style="background: -webkit-linear-gradient(bottom, #8bc049, #b5dd66)"></div>
        <div class="percent">20%</div>
        <div class="desc">{{ $t('distribution.openDAOTreasury') }}</div>
      </div>
      <div class="item">
        <div class="dot" style="background: -webkit-linear-gradient(bottom, #4c26b8, #7d31da)"></div>
        <div class="percent">10%</div>
        <div class="desc">{{ $t('distribution.LPIncentive') }}</div>
      </div>
      <div class="item">
        <div class="dot" style="background: -webkit-linear-gradient(bottom, #676767, #808080)"></div>
        <div class="team">
          <div class="percent">0%</div>
          <div class="desc">{{ $t('distribution.foundingTeam') }}</div>
        </div>
      </div>
    </div>

    <!-- right -->
    <div class="right">
      <div class="inner">
        <div class="item">
          <div class="percent-bar" style="height: 50%; background: -webkit-linear-gradient(bottom, #2070f6, #58a8ff)"></div>
          <div class="percent-value">50%</div>
        </div>
        <div class="item">
          <div class="percent-bar" style="height: 20%; background: -webkit-linear-gradient(bottom, #efb15b, #f8c945)"></div>
          <div class="percent-value">20%</div>
        </div>
        <div class="item">
          <div class="percent-bar" style="height: 20%; background: -webkit-linear-gradient(bottom, #8bc049, #b5dd66)"></div>
          <div class="percent-value">20%</div>
        </div>
        <div class="item">
          <div class="percent-bar" style="height: 10%; background: -webkit-linear-gradient(bottom, #4c26b8, #7d31da)"></div>
          <div class="percent-value">10%</div>
        </div>
        <div class="item">
          <div class="percent-bar" style="height: 1%; background: -webkit-linear-gradient(bottom, #676767, #808080)"></div>
          <div class="percent-value">0%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.chart {
  display: flex;
  padding-top: 40px;
  .left {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    padding-left: 20px;
    .item {
      width: 33.33%;
      padding: 20px 0;
      .dot {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
      .percent {
        font-size: 30px;
        font-weight: 400;
        padding-top: 10px;
        padding-bottom: 10px;
      }
      .desc {
        font-size: 18px;
        font-weight: 400;
        opacity: 0.4;
      }
      .team {
        display: flex;
        align-items: baseline;
        width: 200%;
        .percent {
          font-size: 60px;

          padding-right: 10px;
        }
      }
    }
  }
  .right {
    flex: 1;
    .inner {
      display: flex;
      justify-content: space-around;
      .item {
        width: 60px;
        height: 340px;
        background: #27282d;
        border-radius: 10px;
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
        overflow: hidden;
        .percent-bar {
          width: 100%;
        }
        .percent-value {
          padding-bottom: 6px;
        }
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  html:lang(it) .item  {
    padding: 20px 2px!important;
  }
  .chart {
    flex-direction: column-reverse;
  }
}
</style>
