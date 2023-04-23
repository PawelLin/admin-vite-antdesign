import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import router from './router'
import component from './components'
import '@/assets/less/common.less'
import App from './App.vue'
import 'ant-design-vue/dist/antd.variable.min.css'

const pinia = createPinia()
pinia.use(piniaPersist)
createApp(App).use(pinia).use(router).use(component).mount('#app')
