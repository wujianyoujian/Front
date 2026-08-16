import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import qiankun from 'vite-plugin-qiankun'

export default defineConfig({
  plugins: [
    react(),
    qiankun('reactApp', { useDevMode: true }),
  ],
  server: {
    port: 7102,
    headers: { 'Access-Control-Allow-Origin': '*' },
    origin: 'http://localhost:7102',
  },
})
