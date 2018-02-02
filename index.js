console.log("Basic Chat App using WebSockets.");

var express = require('express');
var socket = require('socket.io');
var app = express();
var port = 3000;

var server = app.listen(port, function() {
  console.log('listening to requests on port ' + port);
});

// static files
app.use(express.static('public'));

// socket setup
// parameter for socket function is what server we want to work with
// this was created above as a variable
// socket.io sits around until client makes a connection with server
// to make a WebSocket connection
var io = socket(server);

// on a connection, it will pass through the socket and call
// the callback function
io.on('connection', function(socket) {

  socket.on('chat', function(data) {
    io.sockets.emit('chat', data);
  });

  socket.on('typing', function(data) {
    // BROADCAST sends it from server to every OTHER socket besides the one typing it
    socket.broadcast.emit('typing', data);
  });
});
