import { Server } from 'socket.io';
import http from 'http';
import app from '../app.js';

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('Client connected');

  // Manejar eventos de WebSocket aquí

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(8080, () => {
  console.log('WebSocket server listening on port 8080');
});
