<template>
  <section id="multi-signer" class="section multi">
    <SectionTitle :text="$t('multi.title')" />
    <div class="content">
      <div v-for="signer in signerList" class="signer">
        <div class="signer-user">
          <img :src="getImageUrl(signer.img)" alt="" />
          <span>{{ signer.name }}</span>
        </div>
        <div>
          <el-progress :percentage="signer.val" color="red" />
        </div>
      </div>
      <div class="view-to-snap">
        <a target="_blank" href="https://snapshot.org/#/theopendao.eth/proposal/0xf56c77c8a01b329307868bda6b769e9f6f55397f9eb90d289a755c8531936e5e">
          <el-button type="primary">{{ $t('multi.button') }}</el-button>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionTitle from "../SectionTitle.vue";
import { signerList, getImageUrl } from "./data";
</script>

<style lang="scss" scoped>
.multi {
  .content {
    width: 1200px;
    height: 908px;
    background: #1e1f23;
    border-radius: 10px;
    padding: 60px;
    .signer {
      display: flex;
      flex: 1;
      justify-content: space-between;
      margin-bottom: 40px;
      .signer-user {
        display: flex;
        span {
          padding-left: 15px;
          display: block;
          height: 40px;
          font-size: 24px;
          font-weight: bold;
          color: #ffffff;
          line-height: 40px;
        }
      }
    }
    .view-to-snap{
      margin-top: 10px;
      width: 100%;
      display: flex;
      justify-content: center;
      ::v-deep .el-button--primary{
        width: 500px;
        height: 56px;
        background: #4E7DD3;
        border-radius: 10px;
        border: 1px solid #4E7DD3;
        font-size: 20px;
        font-family: D-DIN;
        font-weight: bold;
        color: #FFFFFF;
      }
    }

    .el-progress--line {
      width: 500px;
      ::v-deep .el-progress-bar__outer {
        background-color: #35373d;
      }
      ::v-deep .el-progress-bar__inner {
        background: linear-gradient(90deg, #4E81DE 0%, #00F2FE 100%)!important;
      }
    }
    ::v-deep .el-progress__text{
      padding-left: 30px;
      span{
        height: 40px;
        font-size: 24px;
        font-family: D-DIN;
        font-weight: bold;
        color: #FFFFFF;
        line-height: 40px;
      }
    }
  }
}
@media only screen and (max-width: 767px) {
  .multi {
    .content {
      width: 100%;
      height: unset;
      padding: 20px 10px;
      .signer{
        flex-wrap: wrap;
        margin-bottom: 20px;
        .signer-user span{
          font-size: 18px;
        }
      }
      .view-to-snap{
        ::v-deep .el-button--primary{
          width: 80vw;
        }
      }
      .el-progress--line{
        width: 85vw;
      }
      ::v-deep .el-progress__text{
        padding-left: 15px;
        span{
          font-size: 20px!important;
        }
      }
    }
  }
}
</style>
