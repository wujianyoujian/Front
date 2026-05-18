# 智语 ZhiTalk AI 面试官 —— 技术栈与实现方案

## 技术栈

| 层次 | 技术 |
|------|------|
| 服务端 | Node.js |
| AI 框架 | LangChain.js、LangGraph |
| 前端 | Next.js + React |
| 向量数据库 | Pinecone（或 Elasticsearch） |
| AI 监控 | LangSmith |
| AI 编程工具 | V0、Copilot、Cursor |
| 部署 | 服务器、Serverless、CDN、OSS |
| 其他服务 | 域名、HTTPS 证书、数据库、统计、监控、报警 |

---

## 核心技术模块

### 1. 大模型调用
- 直接调用大模型 API（如 OpenAI、Claude 等），实现 stream 流式输出，模拟打字效果
- 支持 Chatbot、Memory 记忆、Reasoning 深度思考、多模态

### 2. 提示词工程（Prompt Engineering）
- 使用 System / AI / User 三种 message 类型
- Prompt Template 规范化和复用提示词
- CoT（Chain of Thought）思维链，引导模型逐步推理

### 3. LangChain.js
- 封装大模型调用，统一接口
- 管理 Prompt Template
- 构建基础 Chatbot 聊天应用

### 4. RAG（检索增强生成）
```
用户输入
  → Retriever 搜索向量数据库
  → 召回相关文档片段
  → 拼入 Prompt 交给大模型
  → 生成自然语言回答
```
实现步骤：
1. 加载文档（PDF 简历等）
2. TextSplitter 分割文本为小块
3. Embedding 模型生成向量
4. 存入 Vector Store（Pinecone）
5. Retriever 根据用户输入检索相关内容

### 5. Tools 与 Function Call
- 定义外部工具（如获取天气、查询数据库）
- 大模型通过 Function Call 决定何时调用哪个工具
- 实现 AI 与外部服务的集成

### 6. MCP Server
- 自定义开发 MCP Server，供 Chatbot 调用
- 打通「划水AI」和「前端面试派」的网站内容
- 类似 Cursor 中集成 GitHub / Notion MCP 的方式

### 7. ReAct Agent（LangGraph）
- ReAct = Reasoning + Acting，自主思考 + 执行
- 使用 LangGraph 构建有状态的 Agent 工作流
- Agent 自主决策：分析简历 → 出题 → 评估答案 → 追问 → 评分

---

## 核心业务功能实现

### 简历分析
1. 用户上传 PDF 简历
2. 解析 PDF，提取文本
3. TextSplitter + Embedding 结构化简历数据
4. 通过 Prompt 让 AI 分析优缺点，给出修改建议

### 模拟面试
1. AI 根据简历内容和岗位方向出题（控制题目数量、类型、难度）
2. 用户作答，AI 判断答案完整性和正确性
3. AI 决策：继续追问 / 升级难度 / 进入下一题
4. 面试结束后 AI 综合评分并输出总结报告

---

## 架构概览

```
用户（浏览器）
    ↓ Next.js + React
API 层（Node.js / Serverless）
    ↓
LangChain.js / LangGraph（Agent 编排）
    ↓              ↓
大模型 API      Vector Store（Pinecone）
                   ↑
              RAG 文档检索
    ↓
MCP Server（外部内容集成）
    ↓
LangSmith（监控 & 调试）
```

---

## 学习路径（6 周）

| 周次 | 内容 |
|------|------|
| 第 1 周 | 大模型基础 + 提示词工程 + Node.js 调用 API + stream 输出 |
| 第 2 周 | LangChain.js + Prompt Template + 基础 Chatbot |
| 第 3 周 | RAG：文档加载、向量化、Pinecone、Retriever |
| 第 4 周 | Tools + Function Call + 自定义 MCP Server |
| 第 5 周 | LangGraph + ReAct Agent + 智语基础功能 |
| 第 6 周 | 智语完整功能开发 + 上线部署 |
