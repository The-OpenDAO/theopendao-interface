<template>
  <section class="section distribution">
    <!-- title -->
    <SectionTitle :text="$t('distribution.title')" />

    <!-- desc -->
    <div class="section-desc">
      {{ $t('distribution.desc') }}
    </div>

    <!-- content -->
    <Content />

    <!-- chart -->
    <Chart />
  </section>
</template>

<script setup lang="ts">
import SectionTitle from '../SectionTitle.vue'
import Content from './Content.vue'
import Chart from './Chart.vue'
</script>

<style lang="scss" scoped>
// .wrapper {
//   width: 100vw;
//   background-image: url(@/assets/images/distribution-bg.png);
//   background-position: top center;
//   background-size: contain;
//   background-repeat: no-repeat;
// }
.distribution {
  padding-bottom: 80px!important;
  .section-desc {
    text-align: center;
    font-size: 20px;
    font-weight: 400;
    color: #ffffff;
    opacity: 0.4;
    padding-bottom: 40px;
  }
}
</style>
