var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile( __dirname + '/index.html');
});

//所有注册用户的socket集合（socketMap）
var sm = {};
io.on('connection', function(socket){
	var username;
    socket.on('chat-reg',function(data){
        console.log("chat-reg:" + JSON.stringify(data));
        username = data.user;
        io.sockets.emit('chat-reg',{code:200,msg:"reg success", user: username});
    });
    socket.on('chat-data',function(data){
        console.log("chat-data:" + JSON.stringify(data));
        io.sockets.emit('chat-data',data);
    });
     socket.on('disconnect', function() {
        console.log('用户'+username+'退出了');
        io.sockets.emit('out',username);
    })
});

http.listen(8080, function() {
	console.log('listening on *:3000');
});