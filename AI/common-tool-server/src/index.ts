import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";
import express from "express";
import { appendFileSync, mkdirSync } from "fs";
import { join } from "path";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3100;
const LOG_DIR = join(process.cwd(), "logs");
mkdirSync(LOG_DIR, { recursive: true });

function writeLog(entry: object) {
  const date = new Date().toISOString().slice(0, 10);
  const line = JSON.stringify({ ts: new Date().toISOString(), ...entry }) + "\n";
  appendFileSync(join(LOG_DIR, `${date}.log`), line);
}

function createServer() {
  const server = new McpServer({
    name: "common-tool-server",
    version: "1.0.0",
  });

  server.registerTool(
    "fetch_url",
    {
      description:
        "通过本地网络请求指定 URL，返回响应内容。用于绕过 claude.ai 服务器的网络限制。",
      inputSchema: {
        url: z.string().url().describe("要请求的目标 URL"),
        method: z
          .enum(["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"])
          .optional()
          .default("GET")
          .describe("HTTP 方法"),
        headers: z
          .record(z.string(), z.string())
          .optional()
          .describe("请求头，键值对格式"),
        body: z.string().optional().describe("请求体，POST/PUT 时使用"),
        timeout_ms: z
          .number()
          .int()
          .positive()
          .optional()
          .default(30000)
          .describe("超时时间（毫秒），默认 30000"),
      },
    },
    async ({ url, method, headers, body, timeout_ms }) => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeout_ms);

      try {
        const response = await fetch(url, {
          method,
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            ...headers,
          },
          body: body ?? undefined,
          signal: controller.signal,
        });

        const contentType = response.headers.get("content-type") ?? "";
        const text = await response.text();

        writeLog({ tool: "fetch_url", method, url, status: response.status, contentType });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                status: response.status,
                statusText: response.statusText,
                contentType,
                body: text,
              }),
            },
          ],
        };
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        writeLog({ tool: "fetch_url", method, url, error: message });
        return {
          content: [{ type: "text", text: `Error: ${message}` }],
          isError: true,
        };
      } finally {
        clearTimeout(timer);
      }
    }
  );

  return server;
}

const app = express();
app.use(express.json());

app.post("/mcp", async (req, res) => {
  const server = createServer();
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });
  await server.connect(transport);
  await transport.handleRequest(req, res, req.body);
});

app.listen(PORT, () => {
  console.log(`MCP server running at http://localhost:${PORT}/mcp`);
});
