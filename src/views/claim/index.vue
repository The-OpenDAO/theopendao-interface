<template>
  <div class="claim-page">
    <Claim />
    <MembershipDetail />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Claim from './components/Claim.vue'
import MembershipDetail from './components/MembershipDetail.vue'
import Footer from '@/components/Footer.vue'
</script>

<style lang="scss">
.claim-page {
  width: 100vw;
  background-size: contain;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(@/assets/images/claim/bg.png);
  padding-top: 80px;
}
</style>
