# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目用途

本地 MCP Server，通过 HTTP 传输暴露工具给 Claude Code，主要用于绕过 claude.ai 服务器的网络限制，代理本地发出的 HTTP 请求。

## 常用命令

```bash
pnpm dev        # 开发模式启动（tsx 热重载）
pnpm build      # 编译 TypeScript 到 dist/
pnpm start      # 运行编译产物
```

服务默认监听 `http://localhost:3100/mcp`，可通过 `PORT` 环境变量覆盖。

## 注册到 Claude Code

```bash
claude mcp add common-tool-server -s user --transport http http://localhost:3100/mcp
```

## 架构说明

`src/index.ts` 是唯一入口，结构分两层：

- **MCP 层**：`createServer()` 每次请求创建一个新的 `McpServer` 实例并注册工具，通过 `StreamableHTTPServerTransport` 处理单次请求后销毁（无状态设计，`sessionIdGenerator: undefined`）
- **HTTP 层**：Express 监听 `POST /mcp`，每个请求实例化一个独立的 transport + server，适合无会话场景

新增工具在 `createServer()` 内调用 `server.registerTool()`，schema 用 zod 4 定义（`z.record` 需传两个参数：`z.record(z.string(), z.string())`）。

## 依赖说明

- `@modelcontextprotocol/sdk` — MCP 协议实现，使用 `McpServer` + `StreamableHTTPServerTransport`
- `zod` 4.x — 工具入参 schema 定义，注意与 zod 3 的 API 差异
- `express` 5.x — HTTP 服务器
