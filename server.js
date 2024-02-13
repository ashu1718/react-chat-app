const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
 const cors = require('cors')

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIo(server);


io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('message', (message) => {
    io.emit('message', message);
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 8000');
});
