"use client";

import clsx from "clsx";
import { Avatar, Typography } from "@material-tailwind/react";
import { IconMessage, IconSend2 } from "@tabler/icons-react";

import { Button } from "~/components/Button/Button";

import { MessageList } from "./MessageList";

export function ActiveChatWindow({
  messages,
  sendMessage,
  newMessage,
  setNewMessage,
}: {
  messages: any[];
  sendMessage: () => void;
  newMessage: string;
  setNewMessage: (val: string) => void;
}) {
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
        <Avatar
          variant="circular"
          alt="User"
          src="/profile_empty_gradient.png"
        />
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
        <MessageList messages={messages} />
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
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
        </div>
        <Button onClick={sendMessage}>
          Send
          <IconSend2 />
        </Button>
      </div>
    </div>
  );
}
