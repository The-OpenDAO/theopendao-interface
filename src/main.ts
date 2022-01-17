import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'virtual:windi.css'
import '@/assets/style/index.scss'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { VueDapp } from '@/vue-dapp'
import * as echarts from 'echarts'

import { i18n } from '@/locales/index'

import VueGtag from 'vue-gtag-next'

const app = createApp(App)
app.config.globalProperties.echarts = echarts
app.use(router)
app.use(ElementPlus)
app.use(VueDapp, {
  infuraId: '9aa3d95b3bc440fa88ea12eaa4456161',
  appName: 'OpenDao',
})

// google analysics G-DFL3QQW0XF
app.use(VueGtag, {
  property: {
    id: 'G-DFL3QQW0XF',
  },
})

app.use(i18n)

app.mount('#app')
