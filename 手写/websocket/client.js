/**
 * 极简健壮的 WebSocket 客户端封装
 * 涵盖：心跳保活、断线重连（指数退避）、消息队列、状态管理、主动关闭
 */
class RobustWebSocket {
  constructor(url, options = {}) {
    this.url = url
    this.opts = {
      heartbeatInterval: 25000,  // 心跳间隔，比服务器 30s 稍短
      heartbeatTimeout: 5000,    // pong 超时
      maxReconnect: 10,          // 最大重连次数
      reconnectBaseDelay: 1000,  // 重连基础延迟
      reconnectMaxDelay: 30000,  // 重连最大延迟
      ...options,
    }
    this.ws = null
    this.reconnectCount = 0
    this.heartbeatTimer = null
    this.pongTimer = null
    this.queue = []              // 离线消息队列
    this.manualClose = false     // 区分主动关闭和异常断开
    this.listeners = { open: [], message: [], close: [], error: [] }
    this.connect()
  }

  connect() {
    this.manualClose = false
    try {
      this.ws = new WebSocket(this.url)
    } catch (e) {
      this.reconnect()
      return
    }

    this.ws.onopen = () => {
      console.log('[ws] open')
      this.reconnectCount = 0
      this.startHeartbeat()
      // 把队列里积压的消息发出去
      while (this.queue.length) this.ws.send(this.queue.shift())
      this.emit('open')
    }

    this.ws.onmessage = (e) => {
      // 收到任何消息（包括 pong）都视为连接正常，重置心跳
      this.resetHeartbeat()
      if (e.data === 'pong') return  // 心跳响应，业务无需感知
      this.emit('message', e.data)
    }

    this.ws.onclose = (e) => {
      console.log('[ws] close', e.code, e.reason)
      this.stopHeartbeat()
      this.emit('close', e)
      if (!this.manualClose) this.reconnect()
    }

    this.ws.onerror = (e) => {
      console.error('[ws] error', e)
      this.emit('error', e)
      // 不在 onerror 重连，让 onclose 统一处理（onerror 后必触发 onclose）
    }
  }

  // 指数退避重连：1s, 2s, 4s, 8s ... 最长 30s
  reconnect() {
    if (this.reconnectCount >= this.opts.maxReconnect) {
      console.error('[ws] max reconnect reached')
      return
    }
    const delay = Math.min(
      this.opts.reconnectBaseDelay * 2 ** this.reconnectCount,
      this.opts.reconnectMaxDelay
    )
    // 加随机抖动，避免雪崩
    const jitter = delay + Math.random() * 1000
    this.reconnectCount++
    console.log(`[ws] reconnect in ${Math.round(jitter)}ms (#${this.reconnectCount})`)
    setTimeout(() => this.connect(), jitter)
  }

  // 心跳：定时发 ping，超时未收到 pong 则主动断开触发重连
  startHeartbeat() {
    this.stopHeartbeat()
    this.heartbeatTimer = setInterval(() => {
      if (this.ws?.readyState !== WebSocket.OPEN) return
      this.ws.send('ping')
      this.pongTimer = setTimeout(() => {
        console.warn('[ws] heartbeat timeout, force close')
        this.ws.close()  // 触发 onclose -> reconnect
      }, this.opts.heartbeatTimeout)
    }, this.opts.heartbeatInterval)
  }

  resetHeartbeat() {
    clearTimeout(this.pongTimer)
    this.pongTimer = null
  }

  stopHeartbeat() {
    clearInterval(this.heartbeatTimer)
    clearTimeout(this.pongTimer)
    this.heartbeatTimer = this.pongTimer = null
  }

  send(data) {
    const payload = typeof data === 'string' ? data : JSON.stringify(data)
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(payload)
    } else {
      // 连接未就绪时入队，等 onopen 后批量发送
      this.queue.push(payload)
    }
  }

  // 主动关闭：不重连
  close() {
    this.manualClose = true
    this.stopHeartbeat()
    this.ws?.close()
  }

  on(event, fn) { this.listeners[event]?.push(fn) }
  emit(event, ...args) { this.listeners[event]?.forEach(fn => fn(...args)) }
}

// ============== 使用示例 ==============
const ws = new RobustWebSocket('ws://localhost:8080')

ws.on('open', () => {
  console.log('connected')
  ws.send({ type: 'hello', user: 'tom' })
})

ws.on('message', (data) => {
  console.log('recv:', data)
})

ws.on('close', (e) => {
  console.log('closed', e.code)
})

// 页面隐藏时不浪费资源，可见时立即重连（移动端切后台常见）
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && ws.ws?.readyState !== WebSocket.OPEN) {
    ws.reconnectCount = 0
    ws.connect()
  }
})

// 页面卸载主动关闭
window.addEventListener('beforeunload', () => ws.close())
