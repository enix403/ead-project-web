"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import { io, type Socket } from "socket.io-client";
import { API_BASE_URL } from "~/app/api-routes";

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }) => {
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    socket.current = io(API_BASE_URL);
    return () => {
      socket.current?.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
