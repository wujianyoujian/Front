# React 完整流程

---

## 一、触发更新

有三种入口：

- 首次渲染：`ReactDOM.render(<App />, container)`
- 状态更新：`setState` / `useState` 的 dispatch
- 强制更新：context value 变化、`forceUpdate`

每次触发都会创建一个新的 `wipRoot`，把它设为 `nextUnitOfWork`，进入调度。

---

## 二、调度阶段（Scheduler）

React 用自己实现的 Scheduler 包（不是 `requestIdleCallback`，因为兼容性问题），核心思路一样：

- 按优先级排任务队列（lane 模型）
- 高优先级任务可以打断低优先级
- 时间切片：每 5ms 检查一次是否让出主线程

当前简化实现直接用 `requestIdleCallback`，原理相同。

---

## 三、Render 阶段（可中断）

也叫 reconcile 阶段，在内存里构建新的 fiber 树，不操作真实 DOM。

**入口：`performUnitOfWork`，每次处理一个 fiber 节点**

每个节点分两步：

### beginWork — 处理当前节点

根据 fiber 类型分发：

```
HostRoot          → 处理根节点
FunctionComponent → 执行函数组件，触发 hooks
HostComponent     → 原生 DOM 节点（div、span 等）
ContextProvider   → 入栈，比较 value，propagateContextChange
```

核心产物：
- 执行函数组件，得到子元素
- 调用 `reconcileChildren` 做 diff，给子 fiber 打 effectTag
- `useState` / `useEffect` 等 hooks 在这里执行，构建 hook 链表

**diff 策略（reconcileChildren）：**

```
同类型节点 → UPDATE，复用旧 DOM
新节点     → PLACEMENT，需要新建
旧节点消失 → DELETION，加入 deletions 数组
```

### completeWork — 节点回溯时

- 原生节点：创建真实 DOM（但不挂载）
- ContextProvider：出栈，恢复 `_currentValue`
- 把当前节点的 effectTag 向上冒泡，收集到父节点的 `effectList`（React 真实实现用链表收集，避免 commit 时再遍历整棵树）

**遍历顺序：**

```
beginWork:    从上往下，child 方向
completeWork: 从下往上，sibling → parent 方向
```

---

## 四、Commit 阶段（不可中断）

拿到 render 阶段产出的 fiber 树和 effectList，同步操作真实 DOM。分三个子阶段：

### Before Mutation（DOM 变更前）

- 执行 `getSnapshotBeforeUpdate`（class 组件）
- 调度 `useEffect` 的清理和执行（异步，标记到队列里，还没真正执行）

### Mutation（操作真实 DOM）

根据 effectTag 处理：

```
PLACEMENT  → appendChild / insertBefore
UPDATE     → updateDom（精确更新属性、事件）
DELETION   → removeChild + 执行 useLayoutEffect cleanup + 执行 useEffect cleanup
```

这个阶段结束后，`currentRoot = wipRoot`，双缓冲切换完成。

### Layout（DOM 变更后，绘制前）

- 执行 `useLayoutEffect` 的 cleanup（上一次的）
- 执行 `useLayoutEffect` 的 create（本次的）
- 执行 `componentDidMount` / `componentDidUpdate`（class 组件）

---

## 五、浏览器绘制

Layout 阶段结束，JS 主线程空闲，浏览器 paint，用户看到更新后的界面。

---

## 六、异步 useEffect

绘制完成后，通过 `MessageChannel` 触发（比 `setTimeout` 优先级高）：

- 执行上次的 `useEffect` cleanup
- 执行本次的 `useEffect` create

---

## 完整时序

```
触发更新
  → Scheduler 调度
  → Render 阶段（可中断）
      → beginWork × N（构建 fiber 树，执行 hooks）
      → completeWork × N（收集 effectList）
  → Commit 阶段（不可中断）
      → Before Mutation
      → Mutation（操作真实 DOM）
      → currentRoot = wipRoot（双缓冲切换）
      → Layout（useLayoutEffect）
  → 浏览器 paint
  → useEffect（异步执行）
```

---

## 双缓冲的作用

React 始终维护两棵树：

| | 说明 |
|---|---|
| `currentRoot` | 当前屏幕上显示的树 |
| `wipRoot` | 正在构建的新树 |

每个 fiber 通过 `alternate` 互相指向对方。render 阶段在 wip 树上操作，中断也不影响屏幕。commit 完成后两棵树身份互换。
