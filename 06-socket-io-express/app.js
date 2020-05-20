var app = require('express')()
var server = require('http').Server(app)
var io = require('socket.io')(server)

// 启动了服务器
server.listen(3000, () => {
  console.log('服务器启动成功了')
})

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', function(socket) {
  socket.on('hehe', data => {
    console.log(data)
  })
})
