import { createApp } from 'vue'
import store from './store'

import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'

import './assets/main.css'
// 引入全局样式
import '@/styles/index.less'
import 'ant-design-vue/dist/antd.css'
const app = createApp(App)

app.use(store)
app.use(router)
app.use(Antd)

app.mount('#app')
