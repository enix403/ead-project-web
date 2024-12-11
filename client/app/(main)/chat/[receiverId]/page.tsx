"use client";

import { useParams } from "next/navigation";
import { ActiveChatWindow } from "./ActiveChatWindow";
import { useEffect, useState } from "react";
import { SocketProvider, useSocket } from "./SocketContext";
import { useAuthState } from "~/app/providers/auth-state";
import { apiRoutes } from "~/app/api-routes";

export default function ChatPage() {
  return (
    <SocketProvider>
      <ChatWindow />
    </SocketProvider>
  );
}

function ChatWindow() {
  const { receiverId } = useParams<{ receiverId: string }>();

  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const socket = useSocket();
  const { userId: currentUserId } = useAuthState();

  useEffect(() => {
    console.log("Joining");
    socket.emit("join", currentUserId);

    try {
      // TODO: get conversation instead of messages
      apiRoutes.getChatMessages(receiverId).then((messages) => {
        console.log("H:messages", messages);
        setMessages(messages);
      });
    } catch (error) {
      // Handle not found
    }

    // Listen for new messages
    socket.on("receiveMessage", (message) => {
      if (
        message.senderId === receiverId ||
        message.receiverId === receiverId
      ) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [receiverId, socket, currentUserId]);

  const sendMessage = () => {
    const message = {
      senderId: currentUserId,
      receiverId: receiverId,
      content: newMessage,
    };

    socket.emit("sendMessage", message);

    setNewMessage("");
    // Optimistic update
    setMessages((prev) => [...prev, message]);
  };

  return (
    <ActiveChatWindow
      messages={messages}
      sendMessage={sendMessage}
      newMessage={newMessage}
      setNewMessage={setNewMessage}
    />
  );
}
