const ws = require('nodejs-websocket')

// 如何获取浏览器发送的数据
// 如果给浏览器发送数据
var server = ws.createServer(function(conn) {
  console.log('接收到了新的连接')
  conn.on('text', data => {
    console.log(data)
    conn.send(data.toUpperCase())
  })
})

server.listen(3000, () => {
  console.log('服务器启动成功了')
})
