<template>
  <section class="section partners">
    <SectionTitle :text="$t('partners.title')" />
    <div class="content">
      <div v-for="item in list" class="item" @click="openUrl(item.url)">
        <div class="item-inner">
          <img :src="getImageUrl(item.img)" alt="" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionTitle from '../SectionTitle.vue'
import { list, getImageUrl } from './data'
function openUrl(url) {
  window.open(url)
}
</script>

<style lang="scss" scoped>
.partners {
  .content {
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    .item {
      padding: 10px;
      cursor: pointer;
      .item-inner {
        background: #1e1f23;
        border-radius: 10px;
      }
    }
  }
}
@media only screen and (max-width: 767px) {
  .partners {
    .content {
      grid-template-columns: 50% 50%;
    }
  }
}
</style>
