// 创建了http服务器
const http = require('http')
var fs = require('fs')
const app = http.createServer()

app.on('request', (req, res) => {
  fs.readFile(__dirname + '/index.html', function(err, data) {
    if (err) {
      res.writeHead(500)
      return res.end('Error loading index.html')
    }
    res.writeHead(200)
    res.end(data)
  })
})

app.listen(3000, () => {
  console.log('服务器启动成功')
})
const io = require('socket.io')(app)

// 监听了用户连接的事件
// socket表示用户的连接
// socket.emit 表示触发某个事件，  如果需要给浏览器发数据，需要触发浏览器注册的某个事件
// socket.on  表示的注册某个事件 ， 如果我需要获取浏览器的数据，需要注册一个事件，等待浏览器触发
io.on('connection', socket => {
  console.log('新用户连接了')
  // socket.emit方法表示给浏览器发送数据
  // 参数1： 事件的名字
  // socket.emit('send', { name: 'zs' })

  //  参数1：事件名：任意
  //  参数2： 获取到的数据
  socket.on('hehe', data => {
    console.log(data)

    socket.emit('send', data)
  })
})
