<template>
  <div id="app">
    <Header />
    <router-view></router-view>
    <!-- <Footer /> -->
    <vdapp-board />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
// import Footer from '@/components/Footer.vue'
</script>

<style lang="scss">
#app {
  background: #18191d;
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .section {
    width: 1200px;
    padding-bottom: 100px;
  }
}
@media only screen and (max-width: 767px) {
  #app {
    width: 100vw;
    overflow: hidden;
    .section {
      width: 100vw;
      padding-left: 20px;
      padding-right: 20px;
      padding-bottom: 50px;
    }
  }
}

.coming-place {
  position: relative;
  top: -5px;
  .coming-label {
    position: absolute;
    white-space: nowrap;
    top: 14px;
    left: 50%;
    transform: translate(-50%, 2px);
    font-size: 12px;
    font-family: D-DIN;
    font-weight: 400;
    color: #7d8085;
  }
}

.el-drawer.ltr {
  width: 100vw !important;
  background: #25262b;
  .el-drawer__close {
    .icon {
      color: #fff;
      font-weight: bold !important;
      width: 1.3rem !important;
      height: 1.3rem !important;
    }
  }
}
.el-drawer__body {
  padding: unset !important;
  overflow-y: scroll;
}
.el-dropdown__popper.el-popper {
  border: 1px solid #1e1f23 !important;
  background: #1e1f23 !important;
  margin: -24px 0 0 0 !important;
  width: 120px;
  .el-dropdown-menu {
    background: #1e1f23 !important;
    font-size: 16px;
    font-family: D-DIN;
    font-weight: bold;
    padding: 0 !important;
    overflow: hidden;
    //color: #FFFFFF;
    //line-height: 60px;
    .el-dropdown-menu__item:focus,
    .el-dropdown-menu__item:not(.is-disabled):hover {
      background: #26272c;
      a {
        color: #fff !important;
      }
    }
  }
  .el-popper__arrow::before {
    border: 1px solid #1e1f23 !important;
    background: #1e1f23 !important;
  }
  .el-dropdown-menu__item {
    width: 100%;
    min-height: 51px;
    line-height: 51px;
    text-align: center;
    font-size: 16px;
    font-family: D-DIN;
    font-weight: bold;
    color: #ccc;
    a {
      width: 100%;
      height: 51px;
      line-height: 51px;
      text-align: center;
      font-size: 16px;
      font-family: D-DIN;
      font-weight: bold;
      color: #ccc;
    }
  }
  .el-dropdown-menu__item--divided {
    margin-top: unset !important;
    border-top: 1px solid #2a2b2f !important;
  }
}

.el-menu {
  font-family: D-DIN-Bold;
  font-weight: bold;
  color: #ffffff;
  span {
    font-size: 24px !important;
  }
  svg {
    width: 1.6rem !important;
    height: 1.6rem !important;
  }
  .el-sub-menu .el-sub-menu__icon-arrow {
    margin-top: -9px !important;
  }
  .el-sub-menu__title,
  .el-menu-item {
    .el-icon {
      display: none !important;
    }
    .el-sub-menu__icon-arrow {
      display: block !important;
    }
  }
  .el-menu-item.is-disabled {
    opacity: 0.25 !important;
  }
  .el-sub-menu .el-menu-item {
    padding-left: 20px !important;
    height: 56px !important;
    background: #1e1f23;
    font-size: 20px;
    font-family: D-DIN;
    font-weight: 400;
    color: #ffffff;
    opacity: 0.6;
  }
}
.el-dropdown__popper.el-popper {
  //background: #000!important;
}
</style>
