import { ChatMessageModel, ConversationModel } from 'db/models/chat';
import { Server, Socket } from 'socket.io';
import logger from 'utils/logger';

export function handleChatConnection(socket: Socket, io: Server) {
  socket.on('sendMessage', async ({ conversationId, senderId, content }) => {
    try {
      let conversation = await ConversationModel.findById(conversationId);

      content = String(content).trim();

      if (!content) {
        logger.warn(`Trying to send empty message`);
        return;
      }

      if (!conversation) {
        logger.error(`Conversation not found: ${conversationId}`);
        return;
      }

      // Save message
      const message = await ChatMessageModel.create({
        conversationId,
        senderId,
        content,
      });

      // Update conversation with the latest message
      conversation.lastMessage = content;
      conversation.lastUpdated = new Date();

      await conversation.save();

      const { participants } = conversation;

      // broadcast to all users other than the sender
      const broadcastTo = participants
        .filter((p) => p.id !== senderId)
        .map((id) => id.toString());

      io.to(broadcastTo).emit('receiveMessage', message);
    } catch (err) {
      console.error('Error sending message:', err);
    }
  });
}
