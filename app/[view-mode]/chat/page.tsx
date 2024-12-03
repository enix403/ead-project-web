"use client";

import {
  Badge,
  Avatar,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import clsx from "clsx";
import { Input } from "~/components/Input/Input";
import { repeatNode } from "~/app/utils/markup";
import { AppLayout } from "~/components/AppLayout/AppLayout";
import { ChatWindow } from "./ChatWindow";
import { IconMessage, IconSearch, IconSend2 } from "@tabler/icons-react";
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
    <div className={clsx("flex-1", "max-h-[80vh]", "relative")}>
      <div
        className={clsx(
          // " bg-yellow-500/70",
          "bg-teal-dark",
          "absolute top-0 w-full",
          "z-[60]",
          "flex"
        )}
      >
        {/* <ListItem ripple={false}>
          <ListItemPrefix>
            <Avatar variant="circular" alt="User" src="/profile-2.jpg" />
          </ListItemPrefix>
          <div>
            <Typography variant="h6" color="blue-gray">
              Yiannis Andrew
            </Typography>
            <Typography variant="small" color="gray" className="font-normal">
              Senior Software Engineer at Apple | 2021 - 2024
            </Typography>
          </div>
        </ListItem> */}
      </div>
      <div className="h-full max-h-full overflow-y-auto pt-20 pb-24 px-8">
        <ChatWindow />
      </div>
      <div
        className={clsx(
          // " bg-yellow-500/70",
          "bg-white",
          "absolute bottom-0 w-full h-20 flex items-center gap-x-4",
          "px-8"
        )}
      >
        <div className="border border-black/20 rounded-xl flex-1 flex overflow-hidden px-2.5 py-2.5 gap-x-1.5">
          <IconMessage size={17} className="self-center" />
          <input
            size={1}
            className="flex-1 outline-none"
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

export function ChatContent() {
  return (
    <div className="flex-1 overflow-hidden flex">
      <ContactsList />
      <ActiveChat />
    </div>
  );
}

export default function ChatPage({ params }: { params: any }) {
  return (
    <AppLayout params={params}>
      <ChatContent />
    </AppLayout>
  );
}
