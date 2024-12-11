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

  const [sender, setSender] = useState<any>(null);
  const [receiver, setReceiver] = useState<any>(null);

  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const socket = useSocket();
  const { userId: currentUserId } = useAuthState();

  useEffect(() => {
    if (!receiverId || !currentUserId || !socket) return;

    console.log("Joining");
    socket.emit("join", currentUserId);

    try {
      apiRoutes
        .startConversation({
          receiverId,
        })
        .then((conversation) => {
          const participants: any[] = conversation["participants"];
          const sender = participants.find(
            (user) => user["_id"] === currentUserId
          );
          const receiver = participants.find(
            (user) => user["_id"] === receiverId
          );
          console.log("receiver => ", receiver);
          setSender(sender);
          setReceiver(receiver);
        });
    } catch (error) {
      // Handle not found
    }

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
      socket.emit("leave", currentUserId);
    };
  }, [receiverId, socket, currentUserId]);

  const sendMessage = () => {
    if (!socket || !newMessage) return;

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
    <>
      {sender && receiver ? (
        <ActiveChatWindow
          messages={messages}
          sender={sender}
          receiver={receiver}
          sendMessage={sendMessage}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
        />
      ) : (
        null
      )}
    </>
  );
}
