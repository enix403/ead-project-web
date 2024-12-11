/*

import React, { useEffect, useState } from 'react';
import { useSocket } from './SocketContext';

const ChatScreen = () => {
  const { receiverId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socket = useSocket();
  const currentUserId = useCurrentUserId();

  useEffect(() => {
    // Join current user's room
    socket.emit('join', currentUserId);

    // Fetch chat history
    axios.get(`/api/messages/${receiverId}`).then((response) => setMessages(response.data));

    // Listen for new messages
    socket.on('receiveMessage', (message) => {
      if (message.sender === receiverId || message.receiver === receiverId) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => socket.off('receiveMessage');
  }, [receiverId, socket, currentUserId]);

  const sendMessage = () => {
    const message = {
      senderId: currentUserId,
      receiverId: receiverId,
      content: newMessage
    };
    socket.emit('sendMessage', message);
    setMessages((prev) => [...prev, message]); // Optimistic update
    setNewMessage('');
  };

  return (
    <div>
      <h1>Chat</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender === currentUserId ? 'You' : 'Them'}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatScreen;
*/