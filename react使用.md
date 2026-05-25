# React 使用 面试题库

## 一、React 基础

- 1. 什么是虚拟 DOM？它与真实 DOM 有什么区别？为什么虚拟 DOM 能提升性能？✅ 2026-05-21 00:00 75分

  **答：** 组件在内存中生成的dom树，不会直接渲染到页面上，避免重复渲染。虚拟 DOM 是用 JS 对象描述真实 DOM 结构的树，每个节点包含 type、props、children。与真实 DOM 区别：真实 DOM 是浏览器 C++ 对象，操作代价高（触发重排/重绘），虚拟 DOM 是普通 JS 对象，操作代价极低。性能提升原理：状态变化时先在内存生成新虚拟 DOM 树，通过 Diff 算法对比新旧树找出差异，只把差异 patch 到真实 DOM，批量最小化 DOM 操作。虚拟 DOM 真正价值还在于声明式开发体验和跨平台能力。

  **延伸 A：** 虚拟 DOM 一定比直接操作真实 DOM 快吗？ → 不一定。简单/少量 DOM 操作时更慢（有 vnode 创建和 Diff 额外开销）；首次渲染时不如直接 innerHTML；极高频更新（动画、Canvas）时 Diff 成瓶颈。虚拟 DOM 优势在中等复杂度、频繁局部更新场景，保证性能下限。

  **延伸 B：** Svelte 不用虚拟 DOM，React 用虚拟 DOM，两者取舍？ → Svelte 编译时生成精确 DOM 操作，无运行时开销，包体积小；React 运行时 Diff，换来并发模式、Suspense 等动态调度能力。大型复杂应用选 React，追求极致包体积选 Svelte。
- 2. React 的 Diff 算法原理是什么？key 的作用是什么？✅ 2026-05-21 00:00 59分

  **答：** 不知道。Diff 算法通过三个启发式假设将 O(n³) 降为 O(n)：①同层比较，跨层级节点直接删除重建；②不同类型组件直接销毁重建；③同级节点用 key 标识复用。key 的作用是让 React 识别列表中哪个节点是哪个，避免顺序变化时全量更新。不能用 index 作 key，会导致顺序变化时状态错乱，应用业务 id。
- 3. React Fiber 架构是什么？解决了什么问题？时间切片和可中断渲染是如何实现的？✅ 2026-05-24 00:00 59分

  **答：** 双向链表结构（纠正：是单向链表，三个指针 child/sibling/return），可中断不了解。Fiber 是 React 16 重写的协调引擎，每个组件对应一个 fiber 节点（JS 对象）。解决了 React 15 Stack Reconciler 递归同步遍历无法中断导致主线程卡顿的问题。可中断原理：把递归改成循环+链表，每处理完一个 fiber 检查剩余时间，不够则暂停让出主线程，用 MessageChannel 模拟 requestIdleCallback 实现时间切片（每片约 5ms）。还维护 current/workInProgress 双缓冲树，构建完成后 commit 阶段一次性切换。

  **延伸 A：** Lane 模型优先级如何工作？ → 用二进制位表示优先级通道，SyncLane=最高（flushSync），InputContinuousLane=用户输入，DefaultLane=普通setState，TransitionLane=useTransition，IdleLane=最低。位运算合并比较高效，调度时取最高优先级 lane 先执行，低优先级任务被打断后保留队列等待。 → 用户回答：不懂

  **延伸 B：** commit 阶段分哪几个子阶段？ → 三个子阶段：①BeforeMutation（变更前）：执行 getSnapshotBeforeUpdate，调度 useEffect；②Mutation（变更）：真正操作 DOM，执行 useLayoutEffect 清理函数，完成后切换 current 树；③Layout（变更后）：执行 useLayoutEffect 回调（同步，DOM 已更新），执行 componentDidMount/Update，异步调度 useEffect 的清理和回调。 → 用户回答：不懂
- 4. React 组件的生命周期有哪些阶段？Class 组件和函数组件的生命周期有何不同？
- 5. React 中受控组件和非受控组件的区别是什么？各自适用什么场景？

## 二、Hooks 深度考察

- 6. 为什么 React 要引入 Hooks？解决了 Class 组件的哪些问题？
- 7. useState 的底层原理是什么？为什么 Hooks 不能在条件语句或循环中调用？
- 8. useEffect 和 useLayoutEffect 的区别是什么？各自的执行时机如何？
- 9. useCallback 和 useMemo 的区别是什么？什么时候应该使用它们？
- 10. useRef 有哪些使用场景？它和 useState 的核心区别是什么？
- 11. 如何设计一个自定义 Hook？请举例说明设计原则。
- 12. useReducer 和 useState 的区别是什么？什么场景下应该用 useReducer？

## 三、组件渲染与优化

- 13. React.memo、PureComponent 和 shouldComponentUpdate 的区别是什么？
- 14. 如何避免 React 组件不必要的重渲染？有哪些优化手段？
- 15. React.lazy 和 Suspense 如何实现懒加载？原理是什么？
- 16. 长列表如何优化？虚拟列表的原理是什么？
- 17. React 中的 Context API 有什么性能问题？如何优化？

## 四、React 18 新特性

- 18. React 18 的自动批处理（Automatic Batching）是什么？和之前版本有何不同？
- 19. useTransition 和 useDeferredValue 的使用场景和区别是什么？
- 20. React 18 的并发模式（Concurrent Mode）是什么？带来了哪些变化？
- 21. React 18 的 Streaming SSR 和 Selective Hydration 是什么？

## 五、状态管理

- 22. Redux 的核心原理是什么？单向数据流是如何工作的？
- 23. Redux 中间件机制是什么？redux-thunk 和 redux-saga 的区别？
- 24. Redux Toolkit（RTK）相比原生 Redux 有哪些优势？
- 25. Zustand、Jotai、Recoil 等轻量状态管理库与 Redux 的对比，各自适用什么场景？
- 26. Context + useReducer 能替代 Redux 吗？有什么局限性？

## 六、React Router

- 27. BrowserRouter 和 HashRouter 的区别是什么？各自的实现原理？
- 28. React Router v6 相比 v5 有哪些重大变化？
- 29. 如何实现路由懒加载？useNavigate、useParams、useLocation 的使用场景？

## 七、SSR 与 Next.js

- 30. CSR、SSR、SSG、ISR 的区别是什么？各自适用什么场景？
- 31. Next.js 的 App Router 和 Pages Router 有什么区别？
- 32. React Server Components（RSC）是什么？和 Client Components 的区别？
- 33. 什么是 Hydration？Hydration 错误如何排查和解决？

## 八、React 19 新特性

- 34. React 19 引入了哪些新特性？use() Hook、Actions、useOptimistic 分别是什么？
- 35. useFormStatus 和 useActionState 的使用场景是什么？

## 九、手写题

- 36. 手写实现一个简版 useState（基于闭包和链表思想）
- 37. 手写实现一个简版 useEffect（依赖对比）
- 38. 手写实现一个自定义 useFetch Hook（含取消请求、loading、error 状态）
- 39. 手写实现简版 Virtual DOM 和 Diff 算法
- 40. 手写实现 React 简版事件委托机制
