import clsx from "clsx";
import { useEffect, useRef } from "react";
import { format } from "date-fns";

import { Avatar } from "@material-tailwind/react";

import { useAuthState } from "~/app/providers/auth-state";

function Message({
  side,
  user,
  message,
}: {
  side: "left" | "right";
  user: any;
  message: any;
}) {
  const date = new Date(message["sentAt"]);

  return (
    <div
      className={clsx(
        "flex items-start gap-2.5",
        "max-w-sm",
        side === "right" && "self-end flex-row-reverse"
      )}
    >
      <Avatar
        size="xs"
        className="object-center"
        src="/profile_empty_gradient.png"
        alt="avatar"
      />
      <div className="flex flex-col w-full max-w-[320px] break-words leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold text-gray-900">
            {user?.fullName}
          </span>
          <span className="text-sm font-normal text-gray-500">
            {format(date, "h:mm a")}
          </span>
        </div>
        <p className="text-sm font-normal py-2.5 text-gray-900">
          {message.content}
        </p>
        <span className="text-sm font-normal text-gray-500">Delivered</span>
      </div>
    </div>
  );
}

function useChatScroll<T>(dep: T) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dep]);

  return ref;
}

export function MessageList({
  messages,
  conversation,
}: {
  messages: any[];
  conversation: any;
}) {
  const ref = useChatScroll(messages);
  const { userId: currentUserId } = useAuthState();
  const participants = conversation["participants"];

  return (
    <div
      ref={ref}
      className="h-full max-h-full overflow-y-auto pt-20 pb-24 px-8"
    >
      <div
        className={clsx(
          "w-full min-h-full flex flex-col gap-y-4",
          "justify-end items-start"
        )}
      >
        {messages.map((message) => {
          const messageSenderId = message["senderId"];
          const messageSender = participants.find(
            (p) => p["_id"] === messageSenderId
          );

          const isCurrentUser = messageSenderId === currentUserId;

          return (
            <Message
              key={message["_id"]}
              side={isCurrentUser ? "right" : "left"}
              user={messageSender}
              message={message}
            />
          );
        })}
      </div>
    </div>
  );
}
