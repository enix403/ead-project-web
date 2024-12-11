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
    logger.info('A user connected:', socket.id);

    socket.on('join', (userId) => {
      socket.join(userId);
      logger.info(`${userId} joined.`);
    });

    onNewConnection(socket, io);

    socket.on('disconnect', () => {
      logger.info('A user disconnected:', socket.id);
    });
  });

  return {
    server,
    io
  };
}
