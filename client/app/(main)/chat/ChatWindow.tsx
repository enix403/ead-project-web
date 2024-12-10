import { Avatar } from "@material-tailwind/react";
import clsx from "clsx";
import { PropsWithChildren } from "react";
import { repeatNode } from "~/app/utils/markup";

function ChatMessage({
  side,
  children,
}: { side: "left" | "right" } & PropsWithChildren) {
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
            Yiassin M.
          </span>
          <span className="text-sm font-normal text-gray-500">01:16</span>
        </div>
        <p className="text-sm font-normal py-2.5 text-gray-900">
          {children}
        </p>
        <span className="text-sm font-normal text-gray-500">Delivered</span>
      </div>
    </div>
  );
}

export function ChatWindow() {
  return (
    <div
      className={clsx(
        "w-full min-h-full flex flex-col gap-y-4",
        "justify-end items-start"
      )}
    >
      {repeatNode(16, (index) => (
        <ChatMessage key={index} side={index % 3 ? "left" : "right"}>
          Lorem ipsum {index} dolor sit amet consectetur adipisicing elit. Rem
          nam hic dolor
        </ChatMessage>
      ))}
    </div>
  );
}
