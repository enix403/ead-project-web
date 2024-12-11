"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import { io, type Socket } from "socket.io-client";
import { API_BASE_URL } from "~/app/api-routes";

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }) => {
  const socketRef = useRef<Socket | null>(null);

  if (!socketRef.current) {
    socketRef.current = io(API_BASE_URL);
  }

  useEffect(() => {
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket!;
};
