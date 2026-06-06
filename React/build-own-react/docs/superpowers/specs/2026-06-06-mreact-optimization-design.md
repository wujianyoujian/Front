# MReact 优化设计文档

## 背景

MReact 是一个手写的 React 迷你实现，包含 fiber 架构、hooks、时间切片调度。现有实现存在 bug、性能问题和结构耦合，本次按优先级逐步修复和优化。

## 改动清单（按执行顺序）

### 改动 1 — commitEffect 死代码 bug

**文件**: `src/MReact/reconciler.js:52`

**问题**: `let stack = []` 初始化为空，下方 `while (stack.length)` 立即退出，所有 `useEffect` 回调永远不执行。

**改法**: `let stack = []` → `let stack = [fiber]`

**为什么**: stack 需要有初始元素才能进入循环遍历 fiber 树。

---

### 改动 2 — commitWork 删除时用错变量

**文件**: `src/MReact/reconciler.js:112`

**问题**: `commitDeletion(fiber, domParent)` 传的是函数参数 `fiber`（整棵子树入口），而不是当前遍历到的节点 `f`，导致删除时总是删错节点。

**改法**: `commitDeletion(fiber, domParent)` → `commitDeletion(f, domParent)`

**为什么**: stack 遍历用 `f` 代表当前节点，删除应该针对 `f`。

---

### 改动 3 — 批量更新

**文件**: `src/MReact/hooks.js`（setState 调用处）

**问题**: 同一事件处理函数里调 3 次 `setCount`，每次都触发 `scheduleRerender()`，导致 3 次完整重渲染。

**改法**: 在 `scheduleRerender` 内部用 `Promise.resolve().then()` 延迟实际调度，同一个微任务周期内多次调用只触发一次重渲染。

**为什么**: 浏览器事件回调是同步的，多个 setState 在同一调用栈内完成后，microtask 才执行，此时合并所有更新一次性渲染。

---

### 改动 4 — bailout 检查

**文件**: `src/MReact/reconciler.js`

**问题**: `scheduleRerender` 无论是否有真实更新都会重建整棵 wipRoot 树。

**改法**: 在 `scheduleRerender` 里检查触发更新的 fiber 是否真的有待处理的 update queue，没有则跳过。

**为什么**: hooks.js 的 useState 已经做了 `Object.is` bailout，但 scheduleRerender 在它之前就开始重建树了，提前检查可以避免无效工作。

---

### 改动 5 — useReducer

**文件**: `src/MReact/hooks.js`

**问题**: `useState` 是独立实现，与 `useReducer` 逻辑重复。

**改法**: 
1. 实现 `useReducer(reducer, initialState)`
2. `useState(init)` 改为调用 `useReducer((s, a) => typeof a === 'function' ? a(s) : a, init)`

**为什么**: useState 本质是 reducer 为 `(s, a) => a` 的 useReducer，统一实现消除重复逻辑。

---

### 改动 6 — key-based diff

**文件**: `src/MReact/reconciler.js`，`reconcileChildren` 函数

**问题**: 现在按下标逐一对比新旧 fiber，列表中间插入元素会导致其后所有节点打 PLACEMENT 重建。

**改法**: 
1. 遍历旧 fiber 链表，构建 `Map<key, oldFiber>`
2. 新元素优先按 `key` 查找匹配的旧 fiber，找到则 UPDATE，找不到则 PLACEMENT
3. 遍历结束后 Map 中剩余的旧 fiber 标记 DELETION

**为什么**: key 是元素身份标识，按 key 匹配让移动/插入操作复用已有 DOM，而不是全部销毁重建。

---

### 改动 7 — 提取 runtime.js 消除 getter/setter 耦合

**文件**: 新建 `src/MReact/runtime.js`

**问题**: reconciler.js 导出 8 个 getter/setter 供 hooks.js 跨模块访问共享状态，耦合重。

**改法**: 
- 新建 `runtime.js`，导出 `{ wipFiber, workInProgressHook, currentHook }` 的读写接口
- reconciler.js 和 hooks.js 都从 `runtime.js` import，不再互相依赖

**为什么**: 共享状态放在单独模块，依赖方向清晰（两者都依赖 runtime，互不依赖）。

---

### 改动 8 — reconciler.js 职责拆分

**拆分目标**:
- `scheduler.js` — workLoop、scheduleRerender、requestIdleCallback 驱动
- `reconciler.js` — reconcileChildren、performUnitOfWork、updateFunctionComponent、updateHostComponent
- `commit.js` — commitRoot、commitWork、commitDeletion、commitEffect、commitLayoutEffect

**为什么**: 三个阶段（调度/协调/提交）职责不同，拆开后每个文件只做一件事，便于理解和修改。

---

## 执行顺序

```
改动1 → 改动2 → 改动3 → 改动4 → 改动5 → 改动6 → 改动7 → 改动8
```

前四个是 bug 修复和性能，互不依赖，必须在结构重组（7、8）之前完成。
改动 5 依赖改动 4 完成后的 hooks 结构。
改动 7、8 是纯结构重组，不改变任何行为，放最后。
