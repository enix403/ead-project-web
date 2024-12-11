"use client";

import { useParams } from "next/navigation";
import { ActiveChatWindow } from "./ActiveChatWindow";

export default function ChatPage() {
  const { receiverId } = useParams<{ receiverId: string }>();
  return <ActiveChatWindow />;
}
