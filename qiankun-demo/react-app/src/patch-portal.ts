/**
 * 自定义沙箱补丁（React / Ant Design 版）
 * ------------------------------------------------------------------
 * 与 vue-app 的 patch-portal.ts 同理：
 *   Ant Design 的 Modal / message / notification / Tooltip / Dropdown 等
 *   Portal 组件默认挂到 document.body，strictStyleIsolation 下会跑到
 *   shadow root 外面导致样式丢失，这里劫持 appendChild 重定向回去。
 * ------------------------------------------------------------------
 */

const PORTAL_CLASSES = [
  'ant-modal',
  'ant-message',
  'ant-notification',
  'ant-tooltip',
  'ant-dropdown',
  'ant-popover',
  'ant-select-dropdown',
  'ant-picker-dropdown',
]

function isPortalNode(node: any): boolean {
  const cls = (node?.className || node?.getAttribute?.('class') || '').toString()
  return PORTAL_CLASSES.some((c) => cls.includes(c))
}

export function patchPortal(container: HTMLElement): () => void {
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
