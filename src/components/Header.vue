<template>
  <header class="header-wrapper hide-mobile header-pc">
    <div class="bg" :style="{ opacity: header.opacity }"></div>
    <div class="header">
      <a class="logo" @click="goAnchor('#sos')">
        <Logo class="logo-style" />
        <span>SOS</span>
      </a>
      <Menu />
      <div class="header-right-area">
        <el-dropdown class="header-language" @visible-change="arrow" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ currentLocal.name }}
            <el-icon class="el-icon--right arrow" :class="header.status == true ? 'arrowActive' : 'arrowUnactive'">
              <arrow-right />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="(item, index) in locals" :disabled="item.disabled" :command="item.key" v-show="item.key != currentLocal.key" :divided="index > 0">
                {{ item.name }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <ConnectWallet :fixed="true" />
      </div>
    </div>
  </header>
  <header class="header hide-pc">
    <div class="header-box-phone">
      <div @click="handclick" class="menu">
        <div class="menu-hor"></div>
        <div class="menu-hor"></div>
        <div class="menu-hor"></div>
      </div>
      <div>
        <ConnectWallet :fixed="true" />
      </div>
    </div>

    <el-drawer v-model="header.draw" direction="ltr">
      <el-row class="tac">
        <el-col :span="24">
          <el-menu active-text-color="#fff" background-color="#25262B" class="el-menu-vertical-demo" default-active="1" text-color="#fff">
            <el-sub-menu index="1">
              <template #title>
                <el-icon><location /></el-icon>
                <span>{{ $t('header.sosChain') }}</span>
              </template>
              <el-menu-item index="1-2" disabled>{{ $t('common.bridge') }}</el-menu-item>
              <el-menu-item index="1-3" disabled>DEX</el-menu-item>
              <el-menu-item index="1-4-1" disabled>{{ $t('common.lending') }}</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="2">
              <el-icon><document /></el-icon>
              <span>
                <a target="_blank" href="https://www.sosmarket.io/">{{ $t('header.sosMarket') }}</a>
              </span>
            </el-menu-item>
            <el-menu-item index="3">
              <el-icon><document /></el-icon>
              <span><a target="_blank" href="https://www.721.com/">721Starter</a></span>
            </el-menu-item>
            <el-menu-item index="4">
              <a @click="goAnchor('#staking')">
                <el-icon><document /></el-icon>
                <span>{{ $t('header.staking') }}</span>
              </a>
            </el-menu-item>
            <el-sub-menu index="5">
              <template #title>
                <el-icon><location /></el-icon>
                <span>{{ $t('header.community') }}</span>
              </template>
              <el-menu-item><a target="_blank" href="https://theopendao.notion.site/Open-DAO-687ee5f27633438c8629735a43372f20">Notion</a></el-menu-item>
              <el-menu-item><a target="_blank" href="https://forum.theopendao.com">Forum</a></el-menu-item>
              <el-menu-item><a target="_blank" href="https://snapshot.org/#/theopendao.eth">Snapshot</a></el-menu-item>
              <el-menu-item><a target="_blank" href="https://discord.gg/opendao">Discord</a></el-menu-item>
              <el-menu-item><a target="_blank" href="https://twitter.com/The_OpenDAO">Twitter</a></el-menu-item>
              <el-menu-item><a target="_blank" href="https://t.me/theopendao_official">Telegram</a></el-menu-item>
              <!-- <el-menu-item><a target="_blank" href="https://www.instagram.com/the_opendao/ ">Instagram</a></el-menu-item> -->
              <!-- <el-menu-item><a target="_blank" href="https://www.tiktok.com/@theopendao">TikTok</a></el-menu-item> -->
              <!-- <el-menu-item><a target="_blank" href="https://www.twitch.tv/theopendao">Twitch</a></el-menu-item> -->
              <!-- <el-menu-item><a target="_blank" href="https://www.youtube.com/channel/UCNQr3meUv9CQRZq0L8050IA">YouTube</a></el-menu-item> -->
            </el-sub-menu>
            <el-sub-menu index="6">
              <template #title>
                <el-icon><location /></el-icon>
                <span>$SOS</span>
              </template>
              <el-menu-item>
                <a @click="goAnchor('#how-to-buy')">{{ $t('header.buy') }}</a>
              </el-menu-item>
              <el-menu-item><a target="_blank" href="https://etherscan.io/token/0x3b484b82567a09e2588A13D54D032153f0c0aEe0">Etherscan</a></el-menu-item>
              <el-menu-item>
                <a target="_blank" href="https://www.certik.com/projects/opendao">{{ $t('header.audit') }}</a>
              </el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="7">
              <template #title>
                <el-icon><location /></el-icon>
                <span>{{ $t('header.language') }}</span>
              </template>
              <el-menu-item v-for="(item, index) in locals" :disabled="item.disabled" @click="setI18nLanguage(item.key)">{{ item.name }}</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-col>
      </el-row>
    </el-drawer>
  </header>
</template>

<script setup lang="ts" scoped>
import { onMounted, computed, reactive, ref, watch } from 'vue'
import { setI18nLanguage, locals, currentLocal } from '@/locales/index'
import { goAnchor } from '@/utils/index'
const header = reactive({
  draw: false,
  opacity: 0,
  status: false,
})
import ConnectWallet from './ConnectWallet.vue'
import Menu from './Menu.vue'
import { ArrowRight, Location, Document } from '@element-plus/icons-vue'
import Logo from './icons/Logo.vue'
function handclick() {
  console.log(111)
  header.draw = true
  console.log(header.draw)
}

function arrow(status) {
  header.status = status
}

const handleCommand = (command: string | number | object) => {
  console.log(command)
  setI18nLanguage(command)
}

onMounted(() => {
  const lang = localStorage.getItem('lang')
  if (lang) {
    setI18nLanguage(lang)
  }
  window.addEventListener(
    'scroll',
    e => {
      var scrollTop = e.target.documentElement.scrollTop || e.target.body.scrollTop
      if (scrollTop > 40) {
        header.opacity = (scrollTop - 40) * 0.01
      } else {
        header.opacity = 0
      }
    },
    true
  )
})
</script>

<style lang="scss">
.header-pc {
  padding: 10px 40px;
}
.arrowActive {
  transform: rotateZ(-90deg);
  transition: all 0.4s ease;
}
.arrowUnactive {
  transform: rotateZ(90deg);
  transition: all 0.4s ease;
}
.bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #18191d;
  z-index: -1;
  left: 0;
  top: 0;
}
.header-wrapper {
  position: fixed;
  width: 100vw;
  z-index: 100;
  .header {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    z-index: 49;
    .logo {
      display: flex;
      .logo-style {
        margin-top: 4px;
        height: 50px;
      }
      span {
        display: block;
        font-size: 30px;
        line-height: 55px;
        margin-left: 10px;
        font-weight: bolder;
        letter-spacing: 3px;
      }
    }
    .el-dropdown-link {
      font-size: 18px;
      font-family: D-DIN;
      font-weight: bold;
      color: #ffffff;
      line-height: 60px;
      .arrow {
        padding-top: 3px;
        padding-left: 3px;
      }
    }
  }
  .header-right-area {
    display: flex;
    .header-language {
      margin-right: 40px;
    }
  }
}

@media only screen and (max-width: 767px) {
  .header {
    width: 100vw;
    padding: 10px 0;
    background: #25262b;
    .header-box-phone {
      display: flex;
      justify-content: space-between;
      padding: 0 30px;
      width: 100vw;
    }
    .menu {
      padding-top: 11px;
      cursor: pointer;
      .menu-hor {
        width: 34px;
        height: 4px;
        background: #ffffff;
        margin: 5.5px 0;
      }
    }
  }
}
</style>
