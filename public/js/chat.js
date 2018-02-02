// make the connection for client-side, dont require, because that would
// make it the same as the server-side
var socket = io.connect('http://localhost:3000');

var message = document.getElementById('message');
var handle = document.getElementById('handle');
var button = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

//------------- emitting events --------------
// socket.emit('theNameOfData', an object of data or a single piece of data)
button.addEventListener('click', function() {
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  });

  // resets the input field for the message
  message.value = "";
});

message.addEventListener('keypress', function() {
    socket.emit('typing', {
      handle: handle.value,
      message: message.value
    });
});

//------------- listen for events -------------
socket.on('chat', function(data) {
  feedback.innerHTML = "";
  output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});


socket.on('typing', function(data) {
  feedback.innerHTML = '<p><em>' + data.handle + ' is typing a message... </em></p>';

  clearTimeout(timer);
  var timer = setTimeout(makeNoTypingState, 3000);

  function makeNoTypingState() {
      feedback.innerHTML = "";
  }﻿
});
