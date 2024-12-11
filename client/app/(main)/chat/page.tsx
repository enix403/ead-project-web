"use client";

import clsx from "clsx";

import { AppLayout } from "~/components/AppLayout/AppLayout";

import { ContactsListWindow } from "./ContactsListWindow";
import { ChatWindow } from "./ChatWindow";

export default function ChatPage() {
  return (
    <AppLayout>
      <div className="flex-1 overflow-hidden flex">
        <ContactsListWindow />
        <ChatWindow />
      </div>
    </AppLayout>
  );
}
