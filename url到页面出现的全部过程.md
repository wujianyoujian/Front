# 从输入 URL 到页面渲染完成

## 一、URL 处理

浏览器判断输入内容：
- 不符合 URL 规则 → 拼接默认搜索引擎发起搜索
- 符合 URL 规则 → 补全协议（如 `http://`）合成合法 URL
- 检查 **HSTS 列表** → 域名在列表中则强制升级为 HTTPS

---

## 二、检查缓存

按优先级依次查找：

```
内存缓存（Memory Cache）
  ↓ 未命中
Service Worker 缓存
  ↓ 未命中
磁盘缓存（Disk Cache）← HTTP 强缓存存储位置
  ↓ 未命中
Push Cache（HTTP/2，极短暂）
  ↓ 未命中
发起网络请求
```

**强缓存**（不发请求，返回 `200 from cache`）：

```
Cache-Control: max-age=3600   ← 优先级高
Expires: Wed, 21 Oct 2025...  ← 旧方案，依赖服务器时间
```

---

## 三、DNS 解析

```
浏览器 DNS 缓存
  ↓
操作系统缓存
  ↓
hosts 文件
  ↓
本地 DNS 服务器（ISP，递归查询）
  ↓
根域名服务器 → 顶级域名服务器 → 权威 DNS 服务器
  ↓
返回目标 IP（+ 端口，http 默认 80，https 默认 443）
```

DNS 查询走 **UDP 53 端口**，包小延迟低；响应超 512 字节时切换 TCP（如 DNSSEC）。

---

## 四、建立连接

**HTTP/1.1：同一域名最多 6 个 TCP 连接，超出排队等待。**

**TCP 三次握手：**

```
客户端 → SYN(seq=x)               # 我想连接
客户端 ← SYN-ACK(seq=y, ack=x+1)  # 我准备好了
客户端 → ACK(ack=y+1)             # 确认，开始通信
```

握手阶段不传输 HTTP 数据，纯粹是建立连接的控制报文，目的是协商初始序列号（ISN）和确认双方收发能力。

**HTTPS 额外进行 TLS 握手**（协商加密算法、验证证书、生成会话密钥），增加 1~2 个 RTT。

```
TCP 三次握手（1.5 RTT）
  ↓
TLS 握手（1~2 RTT）
  ↓
HTTP 请求/响应（1 RTT）
```

**HTTP/2** 用多路复用解决了连接数限制，一个连接并发所有请求，无队头阻塞。

---

## 五、发送 HTTP 请求

浏览器进程通过 **IPC** 将请求交给网络进程，构建请求报文：

```http
GET /index.html HTTP/1.1
Host: example.com
Connection: keep-alive
If-None-Match: "abc123"
If-Modified-Since: Mon, 01 Jan 2025 00:00:00 GMT
```

---

## 六、协议栈封装（数据下行）

```
应用层     HTTP 报文
  ↓
传输层     加 TCP 头（源端口、目标端口、序号）→ Segment
  ↓
网络层     加 IP 头（源 IP、目标 IP、TTL=64）→ Packet
  ↓
数据链路层  加以太网帧头（源 MAC、目标 MAC）→ Frame
  ↓
物理层     转为电信号/光信号发出
```

**MAC 地址如何获取（ARP）：**
- 同子网 → ARP 广播获取目标 MAC
- 跨子网 → ARP 获取网关（路由器）MAC，交由路由器转发
- 路由器每跳修改 MAC 头，IP 头不变，TTL 每跳 -1，归零则丢弃

---

## 七、服务器处理与响应

服务器逐层解封装，HTTP 层处理请求：

**协商缓存判断（有优先级）：**

```
① ETag / If-None-Match            ← 优先，资源指纹精确匹配
② Last-Modified / If-Modified-Since ← 其次，时间戳比较

命中  → 返回 304 Not Modified，浏览器使用本地缓存
未命中 → 返回 200 + 新数据 + Cache-Control 头
```

**常见状态码：**

| 状态码 | 含义 |
|--|--|
| 200 | 成功 |
| 301 | 永久重定向，浏览器缓存，下次直接跳 |
| 302 | 临时重定向，每次都问服务器 |
| 307 | 临时重定向，保证请求方法不变（POST 不变成 GET） |
| 304 | 协商缓存命中，使用本地缓存 |
| 400 | 请求错误 |
| 401 | 未认证 |
| 403 | 无权限 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |
| 502 | 网关错误 |

响应数据沿协议栈逐层解封装，返回给网络进程。

---

## 八、断开连接

**TCP 四次挥手：**

```
客户端 → FIN   # 我发完了（FIN_WAIT_1）
服务端 ← ACK   # 收到，但我还有数据（CLOSE_WAIT）
服务端 ← FIN   # 我也发完了
客户端 → ACK   # 确认，等待 2MSL 后关闭（防止最后 ACK 丢失）
```

为什么四次？TCP 全双工，两个方向独立关闭，服务端 ACK 和 FIN 不能合并。

`Connection: Keep-Alive` → 复用连接，省去下次握手开销。

---

## 九、浏览器进程处理响应

网络进程根据响应头 `Content-Type` 判断：
- `application/octet-stream` → 交给下载管理器，导航结束
- `text/html` → 通知浏览器进程准备渲染

浏览器进程判断是否复用渲染进程：
- 新页面与当前页面**同一站点**（相同根域名 + 协议）→ 复用渲染进程
- 否则 → 新建独立渲染进程

浏览器进程发送"提交文档"消息给渲染进程，渲染进程与网络进程建立数据管道，传输完成后返回"确认提交"，浏览器更新地址栏、安全状态、前进后退历史，页面变为空白。

---

## 十、渲染流程

### 1. HTML 解析 → DOM Tree

浏览器主线程解析 HTML，遇到不同资源处理方式不同：

```
遇到 CSS <link>   → 预扫描线程提前下载，不阻塞 HTML 解析
遇到 <script>     → 停止解析，下载并执行完才继续（阻塞）
遇到 defer script → 继续解析，HTML 解析完后按顺序执行
遇到 async script → 继续解析，下载完立即执行（可能打断解析）
遇到 <img>        → 预扫描线程提前下载，不阻塞解析
```

HTML 解析器将标签转成 Token，再由 Token 构建 DOM 节点，最终形成 DOM Tree。

### 2. CSS 解析 → CSSOM Tree

CSS 解析发生在独立线程，但有关键阻塞点：

```
CSSOM 未构建完成
  ↓
阻塞 Render Tree 构建（阻塞渲染）
阻塞 JS 执行（JS 可能读取样式，要等 CSSOM 就绪）
不阻塞 HTML 解析
```

CSS 规则从右到左匹配，`.a .b .c` 先找所有 `.c` 再向上验证，选择器层级越深性能越差。

### 3. JS 执行

```
<script> 无属性        → 下载 + 执行，完全阻塞解析
<script defer>         → 并行下载，HTML 解析完后按顺序执行，DOMContentLoaded 前
<script async>         → 并行下载，下载完立即执行，不保证顺序
<script type="module"> → 默认 defer 行为
```

### 4. Render Tree 构建

DOM Tree + CSSOM Tree 合并，规则：
- `display: none` 的节点**不在** Render Tree 中
- `visibility: hidden` 的节点**在** Render Tree 中（占位但不可见）
- 伪元素（`::before`、`::after`）**在** Render Tree 中，不在 DOM Tree 中

### 5. Layout（回流）

计算每个节点的精确位置和尺寸，输出盒模型信息。

触发回流的操作（代价高）：
```
读取几何属性：offsetWidth / offsetHeight / getBoundingClientRect()
修改几何属性：width / height / margin / padding / top / left
DOM 结构变化：增删节点、移动节点
字体大小变化、窗口 resize
```

**强制同步布局（性能陷阱）：**

```js
// 错误：读写交替，每次读都强制触发回流
for (let i = 0; i < 100; i++) {
  el.style.width = el.offsetWidth + 1 + 'px'
}

// 正确：批量读，批量写
const width = el.offsetWidth
for (let i = 0; i < 100; i++) {
  el.style.width = width + 1 + 'px'
}
```

### 6. Paint（绘制）

将节点转成像素，生成图层列表（Layer List）。

绘制顺序：`背景色 → 背景图 → border → 子元素 → outline`

触发重绘但不触发回流（代价中等）：
```
color / background-color / visibility / box-shadow
```

### 7. 图层提升（Compositing Layers）

某些元素会被提升为独立合成层，由 GPU 单独处理：

```
触发独立图层的条件：
- transform: translateZ(0) 或 translate3d
- opacity（配合 transition/animation）
- will-change: transform / opacity
- <video> <canvas> <iframe>
- position: fixed
```

独立图层的变化跳过 Layout 和 Paint，直接进入 Composite，性能最好。

### 8. Composite（合成）

合成线程（独立于主线程）将所有图层按正确顺序合并，交给 GPU 输出到屏幕。

```
主线程                         合成线程（独立）
  ↓                                ↓
Layout → Paint → 提交图层列表 → 栅格化（Raster）→ GPU 合成 → 屏幕
```

合成线程不占用主线程，所以 `transform/opacity` 动画即使主线程卡顿也能流畅运行。

### 完整渲染流程

```
HTML 解析 ──→ DOM Tree ──┐
                          ├──→ Render Tree ──→ Layout ──→ Paint ──→ Composite ──→ 屏幕
CSS 解析  ──→ CSSOM Tree ─┘
```

| 操作 | 触发阶段 | 性能代价 |
|--|--|--|
| 改 width/height | Layout + Paint + Composite | 最高 |
| 改 color/background | Paint + Composite | 中 |
| 改 transform/opacity | Composite only | 最低 |

---

## 面试加分点

| 点 | 说明 |
|--|--|
| HTTP/2 多路复用 | 解决 HTTP/1.1 应用层队头阻塞 |
| HTTP/3 / QUIC | 基于 UDP，解决 TCP 层队头阻塞 |
| Service Worker | 可拦截请求，实现离线缓存 |
| `<link rel="preconnect">` | 提前完成 DNS+TCP+TLS，减少首屏延迟 |
| Core Web Vitals | CRP 优化直接影响 FCP、LCP 指标 |
| TCP Fast Open | SYN 包携带数据，减少一个 RTT |
