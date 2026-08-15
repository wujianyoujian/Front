import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import { patchPortal } from './patch-portal'

let app: ReturnType<typeof createApp> | null = null
let restore: (() => void) | null = null

function render(props: any = {}) {
  const { container } = props

  // strictStyleIsolation 下，应用 HTML 在 container 的 shadowRoot 内
  const shadowRoot = container?.shadowRoot || container
  const mountEl = shadowRoot?.querySelector('#app') || shadowRoot || '#app'

  app = createApp(App)
  // 全局引入 Element Plus：一次性注入全部样式（正好用于演示全局样式污染）
  app.use(ElementPlus)
  app.mount(mountEl as any)

  // ⭐ 打补丁：把 Portal 弹层重定向回 shadow root 内
  if (container) {
    restore = patchPortal(container)
  }
}

renderWithQiankun({
  bootstrap() {},
  mount(props: any) {
    render(props)
  },
  update() {},
  unmount() {
    restore?.()
    restore = null
    app?.unmount()
    app = null
  },
})

// 单独运行（不经过 qiankun 加载）时，正常挂载到 #app
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render()
}
