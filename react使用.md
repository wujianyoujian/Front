# React 使用 面试题库

## 一、React 基础

- 1. 什么是虚拟 DOM？它与真实 DOM 有什么区别？为什么虚拟 DOM 能提升性能？
- 2. React 的 Diff 算法原理是什么？key 的作用是什么？
- 3. React Fiber 架构是什么？解决了什么问题？时间切片和可中断渲染是如何实现的？
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
