import { loadMicroApp } from 'qiankun'

/**
 * ⭐ 复现开关
 * ------------------------------------------------------------------
 * false = 不隔离样式（默认 JS 沙箱，CSS 全局共享）—— 复现「全局样式互相覆盖」
 * true  = strictStyleIsolation（Shadow DOM 隔离）—— 配合微应用里的 patch 解决
 *
 * 改成 true 后刷新页面，观察：
 *   1. 两个应用的基础样式不再互相污染 ✅
 *   2. 但 Element Plus 的 Dialog / Ant Design 的 Modal 弹窗「裸奔」（丢样式）
 *      因为弹层默认挂到了 document.body，跑到 shadow root 外面了。
 *      微应用里的 patch-portal.ts 就是用来修复这个问题的。
 * ------------------------------------------------------------------
 */
const STRICT_MODE = true

let vueApp: ReturnType<typeof loadMicroApp> | null = null
let reactApp: ReturnType<typeof loadMicroApp> | null = null

export function loadApps() {
  // 先卸载旧的实例（切换模式时用）
  vueApp?.unmount?.()
  reactApp?.unmount?.()

  vueApp = loadMicroApp({
    name: 'vueApp',
    entry: '//localhost:7101',
    container: '#vue-container',
    strictStyleIsolation: STRICT_MODE,
  })

  reactApp = loadMicroApp({
    name: 'reactApp',
    entry: '//localhost:7102',
    container: '#react-container',
    strictStyleIsolation: STRICT_MODE,
  })
}
