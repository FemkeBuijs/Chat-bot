var socket = io.connect('http://localhost:1000'); //tells the front end to listen to whatever comes out of the socket.io server

$('#send_message').on('click', function(){
    socket.emit('message-from-client', $('#chat_input').val());
    $('#chat_input').val('');
});

socket.on('message-from-server', function(message){
    if(message.substring(0, 3) === 'Ser'){
        setTimeout(function(){
            $('<p>' + message + '</p>').appendTo($('#list'));
        }, 1000);
    } else {
        $('<p>' + message + '</p>').appendTo($('#list'));
    }
});
