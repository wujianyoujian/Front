import { createApp } from 'vue'
import App from './App.vue'
import { loadApps } from './qiankun'

createApp(App).mount('#app')
loadApps()
