<template>
  <el-dialog v-model="data.isOpen" custom-class="submit-dialog" title="" :width="400" center>
    <div class="flex-center">
      <img src="@/assets/images/success-icon.png" alt />
    </div>
    <div class="data-title">
      <!-- <span>Failed to connect</span> -->
      <span>Transaction Submitted</span>
    </div>
    <div class="data-desc">
      <a :href="`${etherscanBaseURL}/tx/${data.hash}`" target="_blank">View on Etherscan</a>
    </div>
    <div class="flex-center">
      <div class="confirm-button" @click="data.isOpen = false">Close</div>
    </div>
  </el-dialog>
</template>

<script setup>
import { onMounted, computed, reactive, ref, watch } from 'vue'
// import {NModal,NCard} from 'naive-ui'
import { utils } from 'ethers'
const etherscanBaseURL = import.meta.env.VITE_APP_ETHERSCAN_BASEURL

// expore the function to father
defineExpose({ open })

function open(hash) {
  data.isOpen = true
  data.hash = hash
}

const data = reactive({
  isOpen: false,
  hash: '',
})
</script>

<style lang="scss">
.submit-dialog {
  background-color: #26272c;
}
.flex-center {
  display: flex;
  justify-content: center;
}
.data-title {
  font-size: 20px;
  padding-top: 20px;
  font-family: 'GothamRnd';
  font-weight: 500;
  color: #fff;
  line-height: 38px;
  text-align: center;
}
.data-desc {
  font-size: 16px;
  font-family: 'GothamRnd';
  font-weight: 500;
  color: #4e7dd3;
  line-height: 25px;
  opacity: 0.5;
  text-align: center;
  padding: 20px 0;
}
.confirm-button {
  width: 200px;
  height: 48px;
  background: #4e7dd3;
  border-radius: 4px;
  font-size: 18px;
  font-family: 'GothamRnd';
  font-weight: 500;
  color: #ffffff;
  line-height: 48px;
  text-align: center;
  cursor: pointer;
}
@media only screen and (max-width: 767px) {
  .traits_list {
    column-count: 1 !important;
  }
}
</style>
