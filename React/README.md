# react

## 闭包问题
每次state 更新，函数组件都会重新执行，生成新的闭包环境，而setTimeout，或者 setInterval 等 获取是创建定时器时候的闭包变量
一直不会发生变化，
解决方法，使用useEffect 中deps 进行监听依赖，fn 就会发生新函数，重建闭包，使用ref 维护可以获取到最新的值，或者使用函数式赋值，拿到最新的值

为啥函数式赋值可以拿到最新的值，因为它只是传入一个函数，当时并没有直接执行，到 pending 上拿到最新的值，才开始执行的

--- 

React 的闭包问题，本质是：函数组件每次渲染都会重新执行一遍，生成一批新的闭包，闭包捕获的是它出生那一刻的 state 快照。
 
  举个例子，经典的那个 counter：我在 setTimeout 里写 setCount(count + 1)，快速点五次按钮，五个回调捕获的都是同一次渲染里的 count，
  所以最后只加了 1。这就是闭包陷阱——我以为我读的是最新值，其实读的是创建闭包那一次渲染的值。
 
  解法一般是三个：
 
  第一，函数式更新，setCount(prev => prev + 1)。为什么它一定拿到最新值？因为这里传的不是一个值，是一个函数，React 不会立刻执行它，
  而是把它放进更新队列，等真正处理这次更新的时候，才用当时最新的 state 去执行。所以它天然绕过了快照。
 
  第二，useEffect 的依赖数组。把用到的变量写进 deps，变量一变 effect 重建，闭包就刷新了；同时要 return 清理函数，把旧定时器清掉，不
  然内存泄漏。
 
  第三，useRef。ref 是同一个对象，不会被闭包冻结，适合"想读最新值、但不想因为这个值触发重新渲染"的场景。
 
  最后补一个加分点：闭包和竞态经常一起出现，比如异步请求旧结果覆盖新结果。我在做 AI 应用的流式渲染时特别容易踩——SSE 数据一段段回来
  ，回调里如果读了旧 state，渲染就会错乱。所以现在我写异步逻辑，都会下意识检查闭包捕获的是不是最新值。

## 事件合成
react 自己封装的一套事件系统，将所有的事件委托到根容器 root 上统一监听，
比如 onClick 是click 冒泡到 root 上，根据 click 上实际触发的dom，拿到对应的fiber 对象，执行对应方法，也会模拟冒泡， 根据fiber 的return 指针，来获取 父fiber，收集所有的事件

跨浏览器兼容，事件对象，事件行为，在各浏览器不一致
性能优化
统一事件接口，跨端支持
内部调度配合，事件统一在react 的调度器里面触发

## 常用hook

### useRef 原理

在 fiber 节点上的 hook 链表 存了一个 { current: initial } 对象，整个生命周期只创建一次，每次state 更新引发函数重新执行，都是返回的同一个引用对象，如果jsx 上的 props 有ref属性，在commit 的时候 会将最新的dom 赋给 ref.current ，脱离react 的渲染体系 

### useState 原理
1. 在 fiber 上  的 memoizedState 的链表上的, 返回 [hook.state, dispath]，
2. dispath 是在第一次执行创建的，然后持久化存在，每次保持的同一个引用
3. 每次dispath，都是将当前update，放到 hook 的 queue 上 pending上，先进行计算，看当前，如果不一致，就调度重新渲染
4. 在render 阶段，函数组件执行，会执行pending 队列的update，算出最新的值，赋值到 memoizedState 上，然后返回

### useEffect 原理 和 useEffectLayout 原理

在 fiber 上  的memoizedState 的链表上的, 是一个对象，包含（回调函数，依赖，清理）

在render 会 根据 新旧fiber 上当前 hook的deps 是否发生变化 来标记是否需要执行

在commit 阶段，moutation 阶段 useEffectLayout 会执行上一轮的 cleanup 
在 layout 执行 回调函数，可以拿到最新的dom，后面 useEffect() 的执行和清除放到 异步任务中，异步执行

### useMemo 和 useCallback
都是用依赖数组做缓存优化的hook，存在 fiber 的memoizedState 的链表 上，useMemo 是用来缓存计算结果的，useCallBack 缓存函数引用，每次执行 根据Object.is 来对比 deps 是否相同，相同就复用，不相同，就重新执行，或者创建

## 并发和时间切片
一种可以中断，可以抢占，可恢复（高优先级任务 可以打断低优先级任务）
把长渲染任务拆分成5ms 的小片，每次执行让出主线程，浏览器乘机可以进行输入和绘制

## 什么是fiber
是react 16 引入的最新协调数据结果，也是一个链表对象，一个最小的工作单元，由组件渲染 运行 createElement 函数 成 element 对象，经过协调，成fiber 对象。可中断，可恢复，通过 return 指向 父fiber，child 指向 children的第一个fiber，sibling执行兄弟fiber

alternate，双指针缓存

根据每次更新，标志当前fiber 更新的Lane[0001 0010]，会冒泡到父级的 childLane [0011]

lanes，childlanes


## 状态管理

### zustand 的原理

### redux

## lazy 的原理
懒加载

## react 虚拟dom

## diff 算法

## 如何理解受控组件和非受控组件

## react 19 的 新特性

## 优化
衡量哪里需要优化，看火焰图，是否重复渲染

1. 减少渲染次数
2. 降低单次渲染成本 （虚拟列表，代码分割）
3. 减少主线程堵塞