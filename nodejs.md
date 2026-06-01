# Node.js 前端面试题库

> 题库覆盖：核心机制、事件循环、模块系统、异步、流、进程/线程、网络、性能优化、安全、工程化等高频考点。

## 一、核心机制与运行时

- 1. 简述 Node.js 的运行时架构（V8、libuv、Node Bindings、内置模块之间的关系）。✅ 2026-05-28 00:00 59分

  **答：** 未作答 **完整答案：** Node.js 运行时分四层：用户代码/内置JS模块（顶层）→ Node Bindings（C++桥接层，连接JS与底层库）→ V8（执行JS、GC）+ libuv（事件循环、线程池、异步I/O）→ 操作系统。一次fs.readFile调用链：JS → Bindings → libuv线程池 → 完成后回调推入事件循环 → V8执行回调。

- 2. Node.js 为什么是单线程？单线程指的是什么？哪些部分其实是多线程的？✅ 2026-05-28 00:00 30分

  **答：** 写的代码只在一个线程上运行 **完整答案：** 单线程指V8执行JS的主线程，同一时刻只有一段JS运行。设计原因：避免多线程锁/竞态复杂度，I/O密集场景单线程+事件循环足够。多线程部分：libuv线程池（默认4个，处理文件I/O、DNS lookup、crypto、zlib）、OS内核线程（网络I/O）、worker_threads（手动创建JS线程）。

  **延伸 A：** libuv线程池大小对并发文件I/O的影响 → 未作答 线程池=并行I/O任务数，设为1则串行排队，设为128则高并发但线程开销增加，建议CPU核心数2~4倍。

  **延伸 B：** dns.resolve和dns.lookup的区别 → 未作答 lookup调用系统getaddrinfo（阻塞，占线程池），resolve直接走DNS协议（异步，不占线程池）。高并发下大量lookup会塞满线程池，http.request默认用lookup是常见性能陷阱。
- 3. Node.js 和浏览器的 JavaScript 运行环境有哪些核心差异？✅ 2026-05-28 00:00 59分

  **答：** 未作答 **完整答案：** 核心差异：全局对象（window vs global）、无DOM/BOM、模块系统（CJS vs ESM）、有fs/process/cluster、无同源限制、事件循环无渲染阶段、setTimeout返回对象而非数字。

  **延伸 A：** Node.js 18+ fetch和浏览器fetch的区别 → 未作答 底层用undici实现，无自动Cookie、无CORS限制、无浏览器证书管理，性能比http.request更好。

  **延伸 B：** 同构代码注意事项 → 未作答 不能假设运行环境，用平台专属API前先判断（typeof window !== 'undefined'），浏览器专属API（document/navigator）和Node专属模块（fs/path）不能直接用，选库时确认是否支持同构。
- 4. libuv 在 Node.js 中扮演什么角色？它的线程池默认大小是多少，受什么影响？✅ 2026-05-28 00:00 40分

  **答：** C语言实现的I/O处理，128 **完整答案：** libuv负责：事件循环（六阶段调度）、线程池（阻塞I/O）、网络I/O（封装epoll/kqueue/IOCP）、定时器、信号处理。线程池默认4个（不是128），最大1024，通过UV_THREADPOOL_SIZE环境变量控制。只处理阻塞型任务（文件I/O、dns.lookup、crypto、zlib），网络I/O走OS异步接口不占线程池。

  **延伸 A：** 线程池满了会怎样 → 未作答 不会丢失，排队等待。libuv内部维护任务队列，线程空闲后取下一个，响应时间变长但任务不丢。

  **延伸 B：** 文件I/O为何需要线程池而网络I/O不需要 → 未作答 OS原生支持网络异步（epoll/kqueue/IOCP），文件系统接口大多是同步阻塞的，libuv用线程池线程去阻塞等待文件操作，主线程不受影响。
- 5. `process.nextTick` 和 `queueMicrotask`、`Promise.then` 有什么区别？谁先执行？

## 二、事件循环（Event Loop）

- 6. 详细描述 Node.js 事件循环的 6 个阶段及每个阶段的职责。
- 7. `setTimeout(fn, 0)` 和 `setImmediate(fn)` 的执行顺序如何？为什么有时不确定？
- 8. Node.js 11 前后事件循环行为有什么变化？为什么要对齐浏览器？
- 9. 微任务（microtask）和宏任务（macrotask）在 Node.js 里如何调度？给出一段代码分析执行顺序。
- 10. `process.nextTick` 滥用会导致什么问题？如何避免 I/O 饥饿？

## 三、模块系统

- 11. CommonJS 和 ES Module 在 Node.js 中的区别？分别如何处理循环依赖？
- 12. `require` 的加载流程是什么？模块缓存机制是怎样的？
- 13. Node.js 中如何在 CJS 和 ESM 之间互操作？`require(ESM)` 和 `import(CJS)` 各有什么限制？
- 14. `package.json` 的 `exports`、`main`、`module`、`type` 字段分别是什么作用？
- 15. Node.js 模块查找算法（resolve algorithm）是怎样的？monorepo 中常见的坑有哪些？

## 四、异步与错误处理

- 16. Node.js 中处理异步的几种方式（callback、Promise、async/await、EventEmitter、Stream）各自适用场景？
- 17. async/await 在底层是如何工作的？它和 Promise 的关系？
- 18. 未捕获的 Promise rejection 在 Node.js 中如何处理？`unhandledRejection` 事件有什么用？
- 19. 如何优雅地处理 EventEmitter 抛出的错误？为什么 `error` 事件没有监听会导致进程崩溃？
- 20. 如何实现一个支持并发上限的 Promise 任务队列？

## 五、Buffer / Stream / 文件 I/O

- 21. Buffer 是什么？为什么需要它？它和 ArrayBuffer 有什么关系？
- 22. Node.js 的四种 Stream 类型分别是什么？各自的用途？
- 23. `pipe` 和 `pipeline` 的区别？为什么推荐用 `pipeline`？
- 24. 背压（backpressure）是什么？Stream 如何处理背压？
- 25. 如何用 Stream 实现一个大文件的复制 / 哈希计算？

## 六、进程与多线程

- 26. `child_process` 的 `spawn`、`exec`、`execFile`、`fork` 有什么区别？
- 27. 什么是 `cluster` 模块？它是如何实现多进程负载均衡的？
- 28. `worker_threads` 和 `cluster` 的区别？分别适合什么场景？
- 29. 进程间通信（IPC）有哪些方式？Node.js 中如何实现？
- 30. 如何检测和处理 Node.js 进程的内存泄漏？

## 七、网络与协议

- 31. 用 Node.js 实现一个最简单的 HTTP 服务器，并解释请求/响应的生命周期。
- 32. Node.js 中如何实现 WebSocket？`ws` 库的核心原理是什么？
- 33. HTTP keep-alive 在 Node.js 中如何配置？Agent 的作用是什么？
- 34. 如何在 Node.js 中实现一个反向代理 / 网关？
- 35. Node.js 中实现 HTTPS 服务器需要哪些配置？证书加载、SNI 是什么？

## 八、性能与调优

- 36. 如何分析 Node.js 应用的性能瓶颈？常用工具有哪些（clinic、0x、--inspect 等）？
- 37. V8 的垃圾回收机制是怎样的？新生代和老生代有什么区别？
- 38. Node.js 的内存限制是多少？如何调整？如何排查内存泄漏？
- 39. CPU 密集型任务在 Node.js 中如何处理？worker_threads 的使用场景和注意事项？
- 40. 如何对 Node.js 应用进行压测？如何解读 QPS、延迟、CPU/内存指标？

## 九、安全与稳定性

- 41. Node.js 应用常见的安全漏洞有哪些？如何防范（原型链污染、命令注入、SSRF 等）？
- 42. 如何实现优雅停机（graceful shutdown）？信号处理、连接 drain 怎么做？
- 43. `uncaughtException` 应该如何处理？为什么不能简单地忽略？
- 44. Node.js 中如何防止 ReDoS（正则表达式拒绝服务）攻击？
- 45. 如何安全地处理用户上传的文件？流式处理 + 限流 + 校验。

## 十、工程化与生态

- 46. npm、yarn、pnpm 的区别？pnpm 的硬链接 + symlink 机制为什么省磁盘？
- 47. `package-lock.json` / `pnpm-lock.yaml` 的作用？为什么要提交到仓库？
- 48. 什么是幽灵依赖（phantom dependency）？pnpm 如何解决？
- 49. 如何设计一个 Node.js CLI 工具？发布到 npm 的注意事项？
- 50. SSR 框架（Next.js / Nuxt）中 Node.js 的角色是什么？同构代码有什么注意点？
