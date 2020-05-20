const ws = require('nodejs-websocket')
const TYPE_ENTER = 0
const TYPE_LEAVE = 1
const TYPE_MSG = 2
/* 
  分析：
    消息不应该是简单的字符串
    这个消息应该是一个对象
    type: 消息的类型， 0：表示进入聊天室的消息  1：用户离开聊天室的消息 2：正常的聊天消息
    msg: 消息的内容
    time: 聊天的具体时间
*/
let count = 0
const server = ws.createServer(conn => {
  console.log('新的连接')
  count++
  conn.userName = `用户${count}`
  broadcast({
    type: TYPE_ENTER,
    msg: `${conn.userName}进入了聊天室`,
    time: new Date().toLocaleTimeString()
  })

  conn.on('text', data => {
    // 聊天的消息
    broadcast({
      type: TYPE_MSG,
      msg: data,
      time: new Date().toLocaleTimeString()
    })
  })
  conn.on('close', data => {
    console.log('关闭连接')
    count--
    broadcast({
      type: TYPE_LEAVE,
      msg: `${conn.userName}离开了聊天室`,
      time: new Date().toLocaleTimeString()
    })
  })
  conn.on('error', data => {
    console.log('发生异常')
  })
})

// 广播， 给所有的用户发送消息
function broadcast(msg) {
  // server.connections:表示所有的用户
  server.connections.forEach(item => {
    item.send(JSON.stringify(msg))
  })
}

server.listen(3000, () => {
  console.log('监听端口3000')
})
