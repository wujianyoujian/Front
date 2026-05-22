# WebSocket 极简健壮案例

## 文件结构
```
websocket/
├── server.js     # Node.js 服务端（基于 ws 库）
├── client.js     # 健壮客户端封装（心跳+重连+消息队列）
├── index.html    # 浏览器演示页面
└── README.md
```

## 运行

```bash
# 1. 启动服务端
npm i ws
node server.js

# 2. 打开浏览器
# 直接双击 index.html 或起个静态服务
npx serve .
```

## 涵盖的坑点

### 1. 心跳保活（Keep-Alive）
**问题**：长时间无数据，NAT/负载均衡/防火墙会悄悄断开 TCP，但双方都不知道（"假死"）。

**双层心跳**：
- **协议层心跳**（服务端发起）：`ws.ping()` + `ws.pong`，监听底层帧。`server.js` 中 30s 周期清理僵尸连接。
- **业务层心跳**（客户端发起）：发字符串 `ping`/`pong`。理由是浏览器 API 不能发协议层 ping 帧，只能业务层模拟。

### 2. 断线重连（指数退避 + 抖动）
**问题**：服务端重启时所有客户端同时重连 → **重连风暴**击垮服务器。

**方案**：
- 指数退避：1s → 2s → 4s → 8s ... 最长 30s
- 加随机抖动：`delay + Math.random() * 1000`，避免同步雪崩
- 最大重连次数：避免服务器永久挂掉时无限重试

### 3. 区分主动关闭 vs 异常断开
**问题**：用户主动 `close()` 后不应该重连。

**方案**：`manualClose` 标志位，主动关闭时置 true，`onclose` 中判断是否重连。

### 4. onerror 不触发重连
**问题**：`onerror` 后 **必定** 触发 `onclose`，两边都重连会重复。

**方案**：只在 `onclose` 中重连，`onerror` 仅记录日志。

### 5. 离线消息队列
**问题**：连接未建立时调 `send()` 会直接报错 `InvalidStateError`。

**方案**：判断 `readyState !== OPEN` 时入队，`onopen` 后批量发送。

### 6. 收到任何消息都重置心跳
**问题**：心跳只是为了探测连接活性，正常业务消息也能证明连接可用，没必要再 ping。

**方案**：`onmessage` 中清除 pong 超时定时器，节省心跳次数。

### 7. 页面切到后台
**问题**：移动端 H5 切后台后 JS 被冻结，定时器停止 → 心跳停 → 服务端判定离线 → 切回前台连接已死。

**方案**：监听 `visibilitychange`，可见时检查连接状态，断开则立即重连。

### 8. 页面卸载
**问题**：刷新/关闭页面如果不主动断开，服务端要等心跳超时才知道。

**方案**：`beforeunload` 中 `ws.close()`，发 close 帧让服务端立即清理。

### 9. 鉴权
浏览器 WebSocket API **不支持自定义 Header**（这是个坑），常用方案：
- URL query：`new WebSocket('wss://x.com?token=xxx')` 简单但 token 会写日志
- Cookie：自动携带，需服务端在握手时校验
- 子协议：`new WebSocket(url, [token])` 借用 `Sec-WebSocket-Protocol`

### 10. wss vs ws
生产环境必须用 `wss://`（TLS 加密），否则在公共 WiFi 下消息全裸奔。混合内容策略也要求 https 页面只能连 wss。

### 11. 二进制传输
传文件/Protobuf 用 `ws.binaryType = 'arraybuffer'`，性能远好于 base64 + JSON。

### 12. 消息大小
单帧默认上限 ~16MB（服务端可配），大文件应分片或走 HTTP。

### 13. 跨域
WebSocket **没有同源策略**，但服务端必须校验握手时的 `Origin` 头，防止恶意网站连接。

## 状态码常见值

| code | 含义 |
|------|------|
| 1000 | 正常关闭 |
| 1001 | 端点离开（页面跳转） |
| 1006 | 异常断开（最常见，没收到 close 帧） |
| 1011 | 服务器内部错误 |
| 4000+ | 应用自定义 |

## 调试技巧

Chrome DevTools → Network → WS → 选连接 → Messages 面板，可看到所有收发帧（包括 ping/pong）。
