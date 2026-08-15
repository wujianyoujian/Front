# qiankun 全局样式冲突复现仓库

复现 **qiankun 微前端** 下，Vue（Element Plus）与 React（Ant Design）组件库**全局样式互相覆盖**的问题，并通过 `strictStyleIsolation` + **自定义沙箱补丁** 解决。

## 目录结构

```
qiankun-demo/
├── main/          # 主应用（Vue3 + qiankun，端口 7100）
├── vue-app/       # 微应用（Vue3 + Element Plus，端口 7101）
└── react-app/     # 微应用（React18 + Ant Design，端口 7102）
```

## 安装与运行

```bash
cd qiankun-demo
pnpm install

# 三个终端分别启动（或一个终端用 pnpm dev 并行启动）
pnpm dev:main      # 主应用 http://localhost:7100
pnpm dev:vue       # 微应用 http://localhost:7101
pnpm dev:react     # 微应用 http://localhost:7102
```

访问 **http://localhost:7100** 查看效果。

## 复现步骤

### 场景一：复现「全局样式互相覆盖」

`main/src/qiankun.ts` 里保持 `STRICT_MODE = false`（默认）：

1. 页面左侧 Vue 应用渲染 Element Plus 的按钮/输入框，右侧 React 应用渲染 Ant Design 的按钮/输入框
2. 打开 DevTools → Elements，检查 `body` / `button` / `*` 等元素，会发现 **Element Plus 的全局 reset 和 Ant Design 的 reset.css 同时存在，后加载的覆盖先加载的**
3. 视觉表现：两个应用的字体、按钮 hover、输入框边框等基础样式互相干扰

> 本质原因：qiankun 的 JS 沙箱（ProxySandbox）只隔离 `window`/全局变量，**不隔离 CSS**。
> 两个库的 `<style>` 都注入到同一个 `document.head`，同名选择器（`body`、`*`、`button`、`a`）互相覆盖。

### 场景二：开启 `strictStyleIsolation`

把 `STRICT_MODE` 改成 `true`，刷新页面：

1. ✅ 两个应用的基础样式不再互相污染（Shadow DOM 隔离生效）
2. ❌ **但弹窗「裸奔」**：点击「打开 Dialog」/「打开 Modal」，弹窗出现在页面里但**没有样式**

> 原因：`strictStyleIsolation` 用 Shadow DOM 包裹微应用，样式只在 shadow root 内生效。
> 但 Element Plus 的 Dialog/Message、Ant Design 的 Modal/message 是 **Portal 组件**，
> 默认 `document.body.appendChild` 挂到 body，跑到 shadow root 外面，拿不到 shadow 内的样式。

### 场景三：`strictStyleIsolation` + 自定义沙箱补丁（最终方案）

两个微应用里已经内置了 `patch-portal.ts`，**自动生效**：

```ts
// vue-app/src/patch-portal.ts（react-app 同理）
export function patchPortal(container: HTMLElement) {
  const target = container.shadowRoot || container
  const original = document.body.appendChild.bind(document.body)

  document.body.appendChild = function (node) {
    if (isPortalNode(node)) {          // 识别 el-dialog / ant-modal 等弹层
      return target.appendChild(node)  // 重定向回 shadow root
    }
    return original(node)
  }
}
```

在微应用的 `mount` 生命周期里调用 `patchPortal(container)`，弹层就被拉回 shadow root 内，**样式恢复正常，且两个应用彻底互不影响**。

## 解决原理总结

| 方案 | 作用 | 局限 |
|------|------|------|
| JS 沙箱（默认） | 隔离 window/全局变量 | **不管 CSS**，全局样式互相污染 |
| `strictStyleIsolation` | Shadow DOM 彻底隔离样式 | Portal 弹层挂到 body 会丢样式 |
| 自定义沙箱补丁 | 把 Portal 弹层重定向回 shadow root | 需维护弹层类名清单 |

**组合拳**：`strictStyleIsolation`（隔离全局样式）+ `patchPortal`（修复 Portal 弹层）= 彻底解决。

## 补充：替代方案

- **`experimentalStyleIsolation: true`**：不用 Shadow DOM，而是给所有选择器加 `div[data-qiankun="appName"]` 前缀。但对 Ant Design v5（CSS-in-JS 运行时动态注入）可能漏加前缀，不如 strict + patch 稳。
- **库级配置**：Element Plus 用 `append-to`，Ant Design 用 `ConfigProvider getPopupContainer`，把弹层挂到应用容器内。这是最"正"的做法，但需要逐个配置；patch 是通用兜底。

## 关键文件清单

- `main/src/qiankun.ts` — 主应用注册 + `STRICT_MODE` 开关
- `vue-app/src/patch-portal.ts` — Vue 端沙箱补丁
- `react-app/src/patch-portal.ts` — React 端沙箱补丁
- `vue-app/src/main.ts` / `react-app/src/main.tsx` — qiankun 生命周期 + 调用补丁
