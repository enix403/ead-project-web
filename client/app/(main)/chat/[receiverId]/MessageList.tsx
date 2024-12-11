import { Avatar } from "@material-tailwind/react";
import clsx from "clsx";
import { PropsWithChildren, useEffect, useRef } from "react";
import { useAuthState } from "~/app/providers/auth-state";
import { repeatNode } from "~/app/utils/markup";

function Message({
  side,
  children,
  user,
}: {
  side: "left" | "right";
  user: any;
} & PropsWithChildren) {
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
      <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold text-gray-900">
            {user?.fullName}
          </span>
          <span className="text-sm font-normal text-gray-500">01:16</span>
        </div>
        <p className="text-sm font-normal py-2.5 text-gray-900">{children}</p>
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
          const messageSender = participants.find(p => p["_id"] === messageSenderId);

          const isCurrentUser = messageSenderId === currentUserId;

          return (
            <Message
              key={message["_id"]}
              side={isCurrentUser ? "right" : "left"}
              user={messageSender}
            >
              {message.content}
            </Message>
          );
        })}
      </div>
    </div>
  );
}
