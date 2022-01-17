<template>
  <div class="title">
    <div class="text">{{ text }}</div>
    <div class="line"></div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  text: {
    type: String,
  },
})
</script>

<style lang="scss" scoped>
.title {
  font-size: 60px;
  font-weight: bold;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 40px;
  padding-top: 100px;
  .line {
    margin-top: 25.5px;
    width: 120px;
    height: 6px;
    background: #4e7dd3;
    border-radius: 3px;
  }
}
@media only screen and (max-width: 767px) {
  .title {
    font-size: 40px;
    padding-top: 50px;
  }
}
</style>
