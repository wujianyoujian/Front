// 极简 WebSocket 服务端（Node.js）
// 运行: npm i ws && node server.js

const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', (ws, req) => {
  console.log('[connect]', req.socket.remoteAddress)

  // 标记存活，配合心跳检测
  ws.isAlive = true
  ws.on('pong', () => { ws.isAlive = true })

  ws.on('message', (data) => {
    const msg = data.toString()
    console.log('[recv]', msg)

    // 业务心跳：客户端发 ping，服务端回 pong
    if (msg === 'ping') {
      ws.send('pong')
      return
    }

    // 广播
    wss.clients.forEach((c) => {
      if (c.readyState === WebSocket.OPEN) c.send(msg)
    })
  })

  ws.on('close', () => console.log('[close]'))
  ws.on('error', (e) => console.error('[error]', e.message))

  ws.send(JSON.stringify({ type: 'welcome', time: Date.now() }))
})

// 协议层心跳：30s 内没收到 pong 就断开（清理僵尸连接）
const interval = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (!ws.isAlive) return ws.terminate()
    ws.isAlive = false
    ws.ping()
  })
}, 30000)

wss.on('close', () => clearInterval(interval))

console.log('WebSocket server on ws://localhost:8080')
