/**
 * 自定义沙箱补丁（Vue / Element Plus 版）
 * ------------------------------------------------------------------
 * 背景：
 *   strictStyleIsolation 用 Shadow DOM 隔离样式后，微应用渲染在 shadow root 内，
 *   它的样式也只在 shadow root 内生效。
 *
 * 问题：
 *   Element Plus 的 Dialog / Message / Notification / Popper / Dropdown 等
 *   「Portal 弹层」默认通过 document.body.appendChild 挂到 body，
 *   跑到 shadow root 外面，导致拿不到 shadow 内的样式 —— 弹窗「裸奔」。
 *
 * 解决：
 *   劫持 document.body.appendChild，把已知的弹层节点重定向回 shadow root 内。
 * ------------------------------------------------------------------
 */

const PORTAL_CLASSES = [
  'el-dialog',
  'el-message',
  'el-notification',
  'el-popper',
  'el-overlay',
  'el-popover',
  'el-tooltip',
  'el-dropdown',
  'el-select-dropdown',
]

function isPortalNode(node: any): boolean {
  const cls = (node?.className || node?.getAttribute?.('class') || '').toString()
  return PORTAL_CLASSES.some((c) => cls.includes(c))
}

/**
 * 应用补丁
 * @param container qiankun mount 时传入的容器（shadow host）
 * @returns 恢复函数，卸载时调用
 */
export function patchPortal(container: HTMLElement): () => void {
  // strictStyleIsolation 下容器是 shadow host，弹层要挂到 shadowRoot 里
  const target = (container as any).shadowRoot || container

  const originalAppendChild = document.body.appendChild.bind(document.body)

  document.body.appendChild = function (node: any) {
    if (isPortalNode(node)) {
      return target.appendChild(node)
    }
    return originalAppendChild(node)
  } as typeof document.body.appendChild

  return () => {
    document.body.appendChild = originalAppendChild
  }
}
