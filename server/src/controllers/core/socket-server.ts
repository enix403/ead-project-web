import http from 'http';

import { Server, type Socket } from 'socket.io';
import logger from 'utils/logger';

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
    logger.info(`SOCKET OPEN: ${socket.id}`);

    socket.on('join', (userId) => {
      socket.join(userId);
      logger.info(`${userId} joined.`);
    });

    socket.on('leave', (userId) => {
      socket.leave(userId);
      logger.info(`${userId} left.`);
    });

    onNewConnection(socket, io);

    socket.on('disconnect', () => {
      logger.info(`SOCKET CLOSED: ${socket.id}`);
    });
  });

  return {
    server,
    io,
  };
}
