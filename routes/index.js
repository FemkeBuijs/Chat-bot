var express = require('express');
var router = express.Router();
var path = require('path');

/*Socket.io*/
var app = express();
var server = require('http').Server(app).listen(1000);
var io = require('socket.io')(server);

app.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

io.on('connection', function(socket){
    var stage = 0;
    var name = '';
    var service = '';
    socket.emit('message-from-server', 'Server: Hello, thank you for reaching out to the Emergency Services. Could you please specify which service you require; Police, Ambulance or Fire?');
    stage = 1;
    socket.on('message-from-client', function(data){
        socket.emit('message-from-server', 'Me: ' + data);
        switch(stage) {
            case 1:
                service = data;
                socket.emit('message-from-server', 'Server: Thank you, could you please tell me your name?');
                stage = 2;
            break;
            case 2:
                name = data;
                socket.emit('message-from-server', 'Server: Nice to meet you, '+ name + '. You will be transfered to the ' + service + ' department now.');
                stage = 3;
            break;
        }
    });
});

module.exports = router;
