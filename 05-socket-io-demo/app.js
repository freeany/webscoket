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
io.on('connection', socket => {
  console.log('新用户连接了')
  socket.on('hehe', data => {
    console.log(data)
    socket.emit('send', data)
  })

  socket.on('login', data => {
    console.log(data)
  })
})
