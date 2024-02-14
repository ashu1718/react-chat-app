const express = require('express');
const app = express();
const http = require('http');
const socketIo = require('socket.io');
 const cors = require('cors');
app.use(cors());
const server = http.createServer(app);
const io = socketIo(server,{
  cors:{
    origin:"http://localhost:3000",
    methods: ["GET","POST"],
  },
});


io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('message', (message) => {
    io.emit('message', message);
  });
});

server.listen(3001, () => {
  console.log('Server is running on port 3000');
});
