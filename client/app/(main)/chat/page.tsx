"use client";

import {
  Badge,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import clsx from "clsx";
import { repeatNode } from "~/app/utils/markup";
import { AppLayout } from "~/components/AppLayout/AppLayout";
import { ChatWindow } from "./ChatWindow";
import { IconMessage, IconSend2 } from "@tabler/icons-react";
import { Button } from "~/components/Button/Button";

function ContactsList() {
  return (
    <div
      className={clsx(
        "overflow-y-auto max-h-[80vh] w-1/4 min-w-[16rem]",
        "bg-white border-r border-gray-300",
        "p-3 pb-20"
      )}
    >
      <h1 className="text-2xl font-bold ml-2 mt-2 mb-4">Chats</h1>
      {repeatNode(100, () => (
        <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
          <Badge
            placement="top-start"
            overlap="circular"
            color="blue-gray"
            withBorder
            className="shrink-0"
          >
            <Avatar
              // size="lg"
              className="object-center"
              src="/profile-2.jpg"
              alt="avatar"
            />
          </Badge>
          <div className="flex-1 ml-3">
            <h2 className="text-lg font-semibold">Yiassin M.</h2>
            <p className="text-gray-600">
              Let's catch up soon. It's been too long!
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ActiveChat() {
  return (
    <div className={clsx("flex-1", "max-h-[80vh]", "relative bg-[#e0dcdc]")}>
      <div
        className={clsx(
          "bg-teal",
          "absolute top-0 w-full",
          "z-[60]",
          "flex gap-x-4",
          "py-2 px-4"
        )}
      >
        <Avatar variant="circular" alt="User" src="/profile-2.jpg" />
        <div className="flex-1">
          <Typography variant="h6" color="white">
            Yiannis Andrew
          </Typography>
          <Typography variant="small" color="white" className="font-normal">
            Senior Software Engineer
          </Typography>
        </div>
      </div>
      <div className="h-full max-h-full overflow-y-auto pt-20 pb-24 px-8">
        <ChatWindow />
      </div>
      <div
        className={clsx(
          "bg-white",
          "absolute bottom-0 w-full h-20 flex items-center gap-x-4",
          "px-8"
        )}
      >
        <div className="border border-black/20 rounded-xl flex-1 flex overflow-hidden px-2.5 py-2.5 gap-x-1.5">
          <IconMessage size={17} className="self-center" />
          <input
            size={1}
            className="flex-1 outline-none bg-transparent"
            placeholder="Enter message"
          />
        </div>
        <Button>
          Send
          <IconSend2 />
        </Button>
      </div>
    </div>
  );
}

function ChatContent() {
  return (
    <div className="flex-1 overflow-hidden flex">
      <ContactsList />
      <ActiveChat />
    </div>
  );
}

export default function ChatPage() {
  return (
    <AppLayout>
      <ChatContent />
    </AppLayout>
  );
}
