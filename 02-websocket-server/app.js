/* 
  开发websocket服务端程序
*/
const ws = require('nodejs-websocket')
const PORT = 3000

// 创建了websocket服务
// 1. 能够给浏览器主动的发送数据
// 2. 能够接收到浏览器给我发送的数据
var server = ws.createServer(conn => {
  console.log('接收到了新的连接')

  // text事件当接收到了浏览器端的数据的时候，就会触发
  conn.on('text', data => {
    console.log(data)
    // 如何给浏览器发送数据
    conn.send(data.toUpperCase() + '!!!!')
  })

  conn.on('close', () => {
    console.log('关闭了连接')
  })

  conn.on('error', () => {
    console.log('连接异常')
  })
})

server.listen(PORT, () => {
  console.log('服务启动成功,监听的端口是' + PORT)
})
