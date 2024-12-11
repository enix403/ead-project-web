import { ChatMessageModel, ConversationModel } from 'db/models/chat';
import { Server, Socket } from 'socket.io';

export function handleChatConnection(socket: Socket, io: Server) {
  socket.on('sendMessage', async ({ senderId, receiverId, content }) => {
    try {
      let conversation = await ConversationModel.findOne({
        participants: { $all: [senderId, receiverId] },
      });

      if (!conversation) {
        conversation = await ConversationModel.create({
          participants: [senderId, receiverId],
        });
      }

      // Save message
      const message = await ChatMessageModel.create({
        conversation: conversation._id,
        senderId,
        receiverId,
        content
      });

      // Update conversation with the latest message
      conversation.lastMessage = content;
      conversation.lastUpdated = new Date();
      await conversation.save();

      io.to(receiverId).emit('receiveMessage', message);
    } catch (err) {
      console.error('Error sending message:', err);
    }
  });
}
