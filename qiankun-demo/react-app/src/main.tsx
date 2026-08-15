import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
// 引入 antd 全局 reset，和 Element Plus 的全局 reset 形成冲突，便于复现
import 'antd/dist/reset.css'
import App from './App'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import { patchPortal } from './patch-portal'

let root: ReactDOM.Root | null = null
let restore: (() => void) | null = null

function render(props: any = {}) {
  const { container } = props

  const shadowRoot = container?.shadowRoot || container
  const mountEl =
    shadowRoot?.querySelector('#root') ||
    shadowRoot ||
    document.getElementById('root')

  root = ReactDOM.createRoot(mountEl as any)
  root.render(
    <ConfigProvider>
      <App />
    </ConfigProvider>
  )

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
    root?.unmount()
    root = null
  },
})

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render()
}
