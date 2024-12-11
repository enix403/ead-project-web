"use client";

import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { io, type Socket } from "socket.io-client";

import { ActiveChatWindow } from "./ActiveChatWindow";
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

function useConversation(
  receiverId: any,
  setMessages: React.Dispatch<React.SetStateAction<any[]>>
) {
  const [conversation, setConversation] = useState<any>(null);

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
  }, [receiverId, setMessages]);

  return { conversation };
}

function useListenMessages(
  socket: Socket | null,
  userId: any,
  conversation: any,
  setMessages: React.Dispatch<React.SetStateAction<any[]>>
) {
  useEffect(() => {
    if (!socket || !conversation) return;

    socket.on("receiveMessage", ({ conversationId, message }) => {
      if (
        conversationId === conversation["_id"] &&
        message["senderId"] !== userId
      ) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [socket, conversation, userId, setMessages]);
}

function ChatWindow() {
  const { userId } = useAuthState();
  const { receiverId } = useParams<{ receiverId: string }>();

  const [messages, setMessages] = useState<any[]>([]);
  const { conversation } = useConversation(receiverId, setMessages);

  const socket = useSocket();
  useListenMessages(socket, userId, conversation, setMessages);

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
      ) : null}
    </>
  );
}

export default function ChatPage() {
  return <ChatWindow />;
}
