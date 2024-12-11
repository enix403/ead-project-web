/*

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const YourChats = () => {
  const [conversations, setConversations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/conversations').then((response) => setConversations(response.data));
  }, []);

  return (
    <div>
      <h2>Your Chats</h2>
      <ul>
        {conversations.map((conversation) => {
          const otherParticipant = conversation.participants.find(
            (participant) => participant._id !== useCurrentUserId()
          );
          return (
            <li key={conversation._id} onClick={() => navigate(`/chat/${otherParticipant._id}`)}>
              {otherParticipant?.fullName}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default YourChats;

*/