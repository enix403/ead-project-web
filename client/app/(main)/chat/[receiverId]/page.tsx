"use client";

import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { io, type Socket } from "socket.io-client";

import { ActiveChatWindow } from "./ActiveChatWindow";
// import { SocketProvider, useSocket } from "./SocketContext";
import { useAuthState } from "~/app/providers/auth-state";
import { API_BASE_URL, apiRoutes } from "~/app/api-routes";

function useSocket() {
  const { userId } = useAuthState();

  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = io(API_BASE_URL);
    socket.emit("join", userId);
    setSocket(socket);

    return () => {
      socket.emit("leave", userId);
      socket.disconnect();
    };
  }, [userId]);

  return socket;
}

function ChatWindow() {
  const { userId } = useAuthState();
  const { receiverId } = useParams<{ receiverId: string }>();

  const [conversation, setConversation] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);

  const socket = useSocket();

  useEffect(() => {
    if (!receiverId) return;

    async function loadConv() {
      try {
        const { fresh, conversation, messages } =
          await apiRoutes.resumeConversationSingle({ receiverId });

        setConversation(conversation);
        setMessages(messages);
        // TODO: update/show conversation in list
      } catch {
        // Handle not found (never for now)
      }
    }

    loadConv();
  }, [receiverId]);

  useEffect(() => {
    if (!socket || !conversation) return;

    socket.on("receiveMessage", ({ conversationId, message }) => {
      if (conversationId === conversation["_id"] && message["senderId"] !== userId) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [socket, conversation, userId]);

  const sendMessage = useCallback(
    (content: string) => {
      if (!socket || !content) return;

      const message = {
        conversationId: conversation["_id"],
        senderId: userId,
        content,
      };

      socket.emit("sendMessage", message);
      // Optimistic update
      setMessages((prev) => [...prev, message]);
    },
    [conversation, socket, userId]
  );

  return (
    <>
      {conversation ? (
        <ActiveChatWindow
          conversation={conversation}
          messages={messages}
          sendMessage={sendMessage}
        />
      ) : (
        null
      )}
    </>
  );
}

/*
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
 */

export default function ChatPage() {
  return <ChatWindow />;
  /* return (
    <SocketProvider>
      {null}
    </SocketProvider>
  ); */
}
