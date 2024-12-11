"use client";

import { Badge, Avatar } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { apiRoutes } from "~/app/api-routes";
import { repeatNode } from "~/app/utils/markup";

export function ContactsListWindow() {

  const { isLoading, data: users } = useQuery<any[]>({
    queryKey: ["getCommunity"],
    queryFn: () => apiRoutes.getCommunity(),
    initialData: [],
    placeholderData: [],
  });

  return (
    <div
      className={clsx(
        "overflow-y-auto max-h-[80vh] w-1/4 min-w-[16rem]",
        "bg-white border-r border-gray-300",
        "p-3 pb-20"
      )}
    >
      <h1 className="text-2xl font-bold ml-2 mt-2 mb-4">Chats</h1>
      {/* {repeatNode(6, (index) => ( */}
      {users.map((user) => (
        <Conversation key={user["_id"]} user={user} />
      ))}
    </div>
  );
}

function Conversation({ user }) {
  const router = useRouter();
  const userId = user["_id"];

  return (
    <button
      className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md text-left w-full"
      onClick={() => {
        router.push(`/chat/${userId}`);
      }}
    >
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
        <h2 className="text-lg font-semibold">{user.fullName}</h2>
        <p className="text-gray-600">
          Let's catch up soon. It's been too long!
        </p>
      </div>
    </button>
  );
}
