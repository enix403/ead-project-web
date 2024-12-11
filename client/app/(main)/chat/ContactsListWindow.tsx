"use client";

import { Badge, Avatar } from "@material-tailwind/react";
import clsx from "clsx";
import { repeatNode } from "~/app/utils/markup";

export function ContactsListWindow() {
  return (
    <div
      className={clsx(
        "overflow-y-auto max-h-[80vh] w-1/4 min-w-[16rem]",
        "bg-white border-r border-gray-300",
        "p-3 pb-20"
      )}
    >
      <h1 className="text-2xl font-bold ml-2 mt-2 mb-4">Chats</h1>
      {repeatNode(6, () => (
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
              src="/profile_empty_gradient.png"
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
