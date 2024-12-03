import clsx from "clsx";
import { PropsWithChildren } from "react";
import { repeatNode } from "~/app/utils/markup";

function ChatMessage({
  side,
  children,
}: { side: "left" | "right" } & PropsWithChildren) {
  return (
    <div
      className={clsx("bg-blue-800 max-w-sm", side === "right" && "self-end")}
    >
      {children}
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
