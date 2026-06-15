# Webpack 和 Vite 面试题库

- 1. Webpack 的构建流程是什么？请详细描述从启动到输出的完整过程。✅ 2026-06-11 59分

  **答：** 不知道。
  **完整答案：** Webpack 构建流程分七步：① 初始化参数（合并配置文件和命令行参数）→ ② 创建 Compiler 实例，加载 Plugin → ③ 确定入口，每个入口对应一个 Chunk → ④ 编译模块（递归：解析路径 → Loader 转换 → acorn 解析 AST 找依赖 → 递归处理依赖）→ ⑤ 完成模块编译，得到整个依赖图 → ⑥ Seal 阶段：组装 Chunk，做 Tree Shaking/压缩/作用域提升等优化 → ⑦ 写入文件系统。整个流程基于 Tapable 事件流，Compiler 和 Compilation 都继承自 Tapable，Plugin 通过 hook 介入各个阶段。

- 2. Loader 和 Plugin 的区别是什么？各自的工作原理是什么？✅ 2026-06-11 59分

  **答：** Loader 是资源转换器，将内容转化为 JS 模块；Plugin 是可以干预 Webpack 全部编译打包流程的插件。
  **完整答案：** Loader 本质是一个函数，接收源文件字符串，返回转换后的字符串，只在模块加载阶段工作，执行顺序是从右到左/从下到上；Plugin 本质是具有 apply 方法的对象，基于 Tapable 事件流，通过 compiler.hooks.xxx.tap() 注册钩子，可以介入整个构建生命周期。Compiler 是整个构建过程唯一的实例，代表"一次构建任务"的全局上下文；Compilation 在每次模块编译时新建，代表单次编译的动态数据（modules/chunks/assets）。Compiler 是工厂，Compilation 是生产批次。

- 3. Tree Shaking 的原理是什么？为什么必须依赖 ES Module？✅ 2026-06-11 59分

  **答：** 不知道。
  **完整答案：** Tree Shaking 分两步：Mark（从入口出发标记所有被引用的导出，未标记为 dead code）+ Sweep（压缩工具删除 dead code）。必须依赖 ES Module 是因为 ESM 的 import/export 是静态的（只能在顶层声明），编译期就能构建精确依赖图；CommonJS 的 require 是运行时调用，可以放在任何条件/循环/函数里，静态分析无法覆盖所有路径。注意 sideEffects 配置和 Class 无法部分摇掉的边界情况。

- 4. Webpack 中 Code Splitting 有哪些方式？splitChunks 如何配置？✅ 2026-06-11 59分

  **答：** 不知道。
  **完整答案：** 三种方式：① 多入口（entry 配置多个入口，适合 MPA）→ ② 动态 import（import() 自动拆分，适合路由懒加载）→ ③ splitChunks 配置抽离公共模块。splitChunks 核心参数：chunks: 'all' 处理同步和异步 chunk，minSize 设最小拆分体积，minChunks 设最少引用次数，cacheGroups 分组规则（vendor 第三方库 / common 公共业务代码），priority 控制匹配优先级。

- 5. Webpack HMR（热模块替换）的原理是什么？✅ 2026-06-11 30分

  **答：** WebSocket。
  **完整答案：** HMR 四步流程：① 服务端监听文件变更，增量编译，结果放内存 → ② 通过 WebSocket 向浏览器推送编译 hash 和更新文件列表 → ③ 客户端 HMR Runtime 通过 JSONP 请求拉取 hot-update.json 和 hot-update.js → ④ 客户端模块替换：旧模块 dispose → 新模块 apply → 从叶子节点往上冒泡找 module.hot.accept() → 执行 accept 回调更新引用。如果冒泡到根节点都没有 accept，则触发全量刷新。

- 6. Webpack 5 有哪些重要新特性？模块联邦（Module Federation）解决了什么问题？
- 7. 如何优化 Webpack 的构建速度？列举尽可能多的方案。
- 8. Vite 为什么比 Webpack 开发启动快？核心原理是什么？
- 9. Vite 的依赖预构建是什么？为什么需要？用的什么工具？
- 10. Vite 生产环境为什么用 Rollup 而不是 esbuild 打包？
- 11. Vite 的 HMR 为什么比 Webpack 快？
- 12. Vite 插件机制是怎样的？与 Rollup 插件有什么关系？
- 13. Webpack 的 contenthash、chunkhash、hash 有什么区别？
- 14. 如何手写一个简单的 Webpack Loader？
- 15. 如何手写一个简单的 Webpack Plugin？
- 16. Webpack 中 Compiler 和 Compilation 的区别是什么？
- 17. Vite 开发环境和生产环境的构建差异可能带来什么问题？如何规避？
- 18. 在大型项目中，你会选择 Webpack 还是 Vite？理由是什么？
