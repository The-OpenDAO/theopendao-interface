<template>
  <div class="wrapper">
    <section class="section roadmap">
      <SectionTitle :text="$t('roadmap.title')" />
      <div class="content">
        <div class="timeline">
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
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts" scoped>
import SectionTitle from './SectionTitle.vue'
</script>

<style lang="scss">
.wrapper {
  width: 100vw;
  background-image: url(@/assets/images/distribution-bg.png);
  background-position: top center;
  background-size: cover;
  background-repeat: no-repeat;
  .roadmap {
    padding-bottom: 100px;
    .content {
      padding-top: 40px;
    }
    .timeline {
      width: 100%;
      position: relative;
      .line {
        content: ' ';
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
