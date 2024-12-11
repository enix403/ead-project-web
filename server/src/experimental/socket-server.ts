import http from 'http';

import { Server, type Socket } from 'socket.io';

export function createSocketServer(
  parent: any,
  onNewConnection: (socket: Socket, io: Server) => void,
) {
  const server = http.createServer(parent);

  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  // Socket.io implementation
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('join', (userId) => {
      socket.join(userId);
      console.log(`${userId} joined.`);
    });

    onNewConnection(socket, io);

    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
    });
  });

  return {
    server,
    io
  };
}
