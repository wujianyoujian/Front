# RxJS 面试题库

## 基础概念

- 1. 什么是 RxJS？它解决了什么问题？
- 2. 什么是响应式编程（Reactive Programming）？与命令式编程有什么区别？
- 3. 什么是 Observable？它和 Promise 有什么区别？
- 4. 什么是 Observer？它有哪些方法？
- 5. 什么是 Subscription？如何取消订阅？为什么要取消订阅？
- 6. 什么是 Subject？它和 Observable 有什么区别？
- 7. BehaviorSubject、ReplaySubject、AsyncSubject 分别是什么？有什么区别？
- 8. 什么是冷 Observable（Cold）和热 Observable（Hot）？举例说明。
- 9. 什么是 Operator（操作符）？RxJS 中操作符是如何工作的？
- 10. 什么是 Scheduler？RxJS 中有哪些内置 Scheduler？

## 创建类操作符

- 11. of、from、fromEvent、interval、timer 分别如何使用？有什么区别？
- 12. create（new Observable）如何手动创建一个 Observable？
- 13. defer 操作符的作用是什么？什么场景下使用？
- 14. range、generate 操作符的用途是什么？
- 15. EMPTY、NEVER、throwError 分别代表什么？

## 转换类操作符

- 16. map 和 pluck 有什么区别？
- 17. mergeMap（flatMap）的作用是什么？什么场景下使用？
- 18. switchMap 的作用是什么？和 mergeMap 有什么区别？
- 19. concatMap 的作用是什么？和 mergeMap 有什么区别？
- 20. exhaustMap 的作用是什么？适合什么场景？
- 21. scan 和 reduce 有什么区别？
- 22. buffer、bufferTime、bufferCount 的区别是什么？
- 23. window、windowTime 和 buffer 系列有什么区别？

## 过滤类操作符

- 24. filter、take、takeUntil、takeWhile 分别如何使用？
- 25. debounceTime 和 throttleTime 的区别是什么？各适合什么场景？
- 26. distinctUntilChanged 的作用是什么？
- 27. skip、skipUntil、skipWhile 的用途是什么？
- 28. first、last、elementAt 的区别是什么？

## 组合类操作符

- 29. merge、concat、zip、combineLatest 的区别是什么？
- 30. forkJoin 的作用是什么？和 Promise.all 有什么区别？
- 31. withLatestFrom 和 combineLatest 有什么区别？
- 32. race 操作符的作用是什么？
- 33. startWith 和 endWith 的用途是什么？

## 错误处理

- 34. catchError 如何使用？和 try/catch 有什么区别？
- 35. retry 和 retryWhen 的区别是什么？如何实现指数退避重试？
- 36. finalize 操作符的作用是什么？

## 工具类操作符

- 37. tap（do）操作符的作用是什么？为什么不能用它来修改数据？
- 38. delay 和 delayWhen 的区别是什么？
- 39. timeout 和 timeoutWith 的用途是什么？
- 40. toArray 操作符的作用是什么？

## 多播（Multicast）

- 41. 什么是多播（Multicast）？和单播有什么区别？
- 42. publish、share、shareReplay 的区别是什么？
- 43. refCount 的作用是什么？
- 44. multicast 操作符如何使用？

## 实战与原理

- 45. 如何用 RxJS 实现一个搜索框的防抖请求，并取消上一次未完成的请求？
- 46. 如何用 RxJS 实现轮询（每隔 N 秒请求一次接口）？
- 47. 如何用 RxJS 处理多个并发请求，并在全部完成后统一处理结果？
- 48. 内存泄漏在 RxJS 中是如何产生的？如何避免？
- 49. RxJS 中如何实现状态管理？和 Redux 相比有什么优劣？
- 50. RxJS Observable 的内部实现原理是什么？订阅时发生了什么？
