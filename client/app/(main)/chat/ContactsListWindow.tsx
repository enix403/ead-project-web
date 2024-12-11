"use client";

import clsx from "clsx";
import { Badge, Avatar } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

import { apiRoutes } from "~/app/api-routes";
import { useAuthState } from "~/app/providers/auth-state";

import { singleConvParticipants } from "./utils";

export function ContactsListWindow() {
  const { isLoading, data: conversations } = useQuery<any[]>({
    queryKey: ["getConversations"],
    queryFn: () => apiRoutes.getConversations(),
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
      {conversations.map((conv) => (
        <Conversation key={conv["_id"]} conversation={conv} />
      ))}
    </div>
  );
}

function Conversation({ conversation }: { conversation: any[] }) {
  const router = useRouter();

  // assume conversations["kind"] === "single"

  const { userId } = useAuthState();
  const { receiver } = singleConvParticipants(conversation, userId);

  const receiverId = receiver["_id"];

  return (
    <button
      className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md text-left w-full"
      onClick={() => {
        router.push(`/chat/${receiverId}`);
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
        <h2 className="text-lg font-semibold">{receiver.fullName}</h2>
        <p className="text-gray-600">
          Let's catch up soon. It's been too long!
        </p>
      </div>
    </button>
  );
}
