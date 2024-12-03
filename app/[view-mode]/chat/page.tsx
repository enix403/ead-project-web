"use client";

import { Badge, Avatar } from "@material-tailwind/react";
import clsx from "clsx";
import { repeatNode } from "~/app/utils/markup";
import { AppLayout } from "~/components/AppLayout/AppLayout";

export function ChatContent() {
  return (
    <div className="flex-1 overflow-hidden flex">
      <div
        className={clsx(
          "overflow-y-auto max-h-[80vh] d w-1/4 min-w-[16rem]",
          "bg-white border-r border-gray-300",
          "p-3 pb-20"
        )}
      >
        <h1 className="text-2xl font-bold ml-2 mt-2 mb-4">Chats</h1>
        {repeatNode(100, () => (
          <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
            {/* <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
              <img
                src="/profile-2.jpg"
                alt="User Avatar"
                className="w-12 h-12 rounded-full"
              />
            </div> */}
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
