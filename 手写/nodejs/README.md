## Node.js 事件循环
第一层：一句话定义（必说）

▎ "Node.js 事件循环是 libuv 实现的任务调度机制，让单线程的 Node.js 能处理大量并发 I/O。"

---
第二层：6 个阶段（面试官点头继续追问时说）

▎ "事件循环分 6 个阶段，按顺序执行：timers 处理定时器、poll 是核心阶段负责接收 I/O 回调、check 执行 setImmediate。每个阶段切换前会先清空微任务队列，nextTick 优先级高于 Promise.then。"

---
第三层：结合代码说执行顺序（面试官出题时用）

setTimeout(() => console.log('setTimeout'), 0)
setImmediate(() => console.log('setImmediate'))
Promise.resolve().then(() => console.log('promise'))
process.nextTick(() => console.log('nextTick'))

▎ "输出顺序是：nextTick → promise → 然后 setTimeout 和 setImmediate 顺序不确定。因为微任务优先，nextTick 又高于 Promise。setTimeout(0) 和 setImmediate 谁先取决于事件循环启动耗时，存在不确定性。"

---
加分点（说了直接拉开差距）

▎ "Node.js 11 之后对齐了浏览器行为，每个宏任务执行完就清空微任务，而不是等整个阶段结束再清。"

## libuv 的完整角色
- 事件循环 — 六个阶段的调度就是 libuv 实现的
- 线程池 — 处理阻塞型 I/O（文件、DNS lookup、crypto）
- 网络 I/O — 封装各平台的异步网络接口（Linux epoll、macOS kqueue、Windows IOCP）
- 定时器 — setTimeout / setInterval 的底层实现
- 信号处理 — process.on('SIGTERM') 等
------
- UV_THREADPOOL_SIZE 环境变量控制大小
- 线程池只处理阻塞型任务：文件 I/O、dns.lookup、crypto、zlib
- 网络 I/O 不走线程池，走的是 OS 异步接口
- 线程池太小 → 高并发文件操作排队；太大 → 线程本身内存开销增加