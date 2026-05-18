# AI 前端面试题库

## 一、LLM 基础与概念

- 1. 什么是大语言模型（LLM）？它的核心工作原理是什么（Transformer、自回归生成）？
- 2. Token 是什么？Token 计算对前端开发有什么影响？
- 3. 什么是上下文窗口（Context Window）？超出限制时前端应如何处理？
- 4. System Prompt 和 User Prompt 有什么区别？各自的作用是什么？
- 5. 什么是 Temperature 和 Top-P 参数？它们如何影响模型输出？
- 6. 主流 LLM（GPT-4o、Claude 3.5/3.7、Gemini）从开发者角度有哪些差异（上下文窗口、定价、延迟、适用场景）？

## 二、Prompt Engineering

- 7. 什么是 Prompt Engineering？核心设计原则有哪些？
- 8. Zero-shot、Few-shot、Chain-of-Thought（CoT）提示有什么区别？各自适用什么场景？
- 9. 什么是 Prompt Injection 攻击？前端如何防护？
- 10. 如何设计结构化输出的 Prompt（让 LLM 返回 JSON）？流式场景下如何处理？
- 11. 如何优化 Token 使用效率，降低 API 调用成本？

## 三、流式输出与 SSE

- 12. 什么是 SSE（Server-Sent Events）？与 WebSocket、普通 HTTP 请求相比有什么优劣？
- 13. 为什么 AI 对话场景优先选择 SSE 而不是 WebSocket？
- 14. 用 fetch + ReadableStream 实现流式读取 LLM 响应，写出核心代码。
- 15. SSE 的数据格式是什么？如何解析 `data: [DONE]` 结束标志？
- 16. 如何实现 SSE 断线重连？`EventSource` 自动重连机制是什么？
- 17. 如何实现"停止生成"功能？AbortController 的使用方式？

## 四、AI 对话组件开发

- 18. 设计一个 AI 聊天对话框组件，需要支持哪些核心功能？如何拆分组件结构？
- 19. 如何实现"打字机"效果？直接追加 chunk 和队列+rAF 两种方案的区别？
- 20. 流式渲染时如何做 Markdown 实时渲染（含代码高亮）？有哪些性能注意点？
- 21. 多轮对话如何管理上下文？messages 数组结构是什么？超出 Token 限制时的策略？
- 22. 大量消息列表如何做虚拟滚动优化？

## 五、RAG（检索增强生成）

- 23. 什么是 RAG？它解决了 LLM 的哪些核心问题（幻觉、知识截止）？
- 24. 描述 RAG 的完整流程：从文档入库到生成答案。
- 25. 什么是 Embedding？常用的 Embedding 模型有哪些？
- 26. 向量数据库有哪些选型（Pinecone、Chroma、Qdrant、Milvus）？前端项目如何选择？
- 27. Chunking（文档分块）有哪些策略？各自的优缺点？
- 28. RAG 效果差时如何优化（Reranker、HyDE、混合检索 BM25+向量）？
- 29. 前端如何集成 RAG 系统（LangChain.js、LlamaIndex.TS、Vercel AI SDK）？

## 六、安全与架构

- 30. LLM API 调用应该放在前端还是后端？为什么？
- 31. 如何防止 API Key 泄露？前端调用 LLM 的安全最佳实践是什么？
- 32. 如何对 LLM 响应做缓存以降低成本（Redis、语义缓存）？
- 33. 如何测试依赖 LLM 输出的组件（Mock 策略、快照测试、确定性测试夹具）？
- 34. 如何处理 LLM API 调用失败？重试机制、降级策略、用户提示设计？

## 七、AI 工具链与框架

- 35. Vercel AI SDK 的核心 API 是什么（useChat、useCompletion）？适用什么场景？
- 36. LangChain.js 的核心概念是什么（Chain、Agent、Tool、Memory）？
- 37. 什么是 MCP（Model Context Protocol）？它解决了什么问题？
- 38. 什么是 AI Agent？前端如何构建 Agentic 工作流的交互界面？
- 39. Transformers.js 和 WebLLM 是什么？浏览器端推理的应用场景和限制？
- 40. 如何在日常开发中使用 GitHub Copilot、Cursor 等 AI 编码工具？如何评审 AI 生成的代码？
