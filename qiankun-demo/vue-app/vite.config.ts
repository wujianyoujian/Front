import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun'

export default defineConfig({
  plugins: [
    vue(),
    // 微应用插件：dev 模式下提供 CORS + UMD 生命周期注入
    qiankun('vueApp', { useDevMode: true }),
  ],
  server: {
    port: 7101,
    // 关键：允许主应用跨域加载
    headers: { 'Access-Control-Allow-Origin': '*' },
    origin: 'http://localhost:7101',
  },
})
