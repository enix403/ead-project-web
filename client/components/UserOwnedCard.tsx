import clsx from "clsx";
import Link from "next/link";
import { ReactNode } from "react";
import { Avatar, Badge, IconButton } from "@material-tailwind/react";
import { IconHeartFilled } from "@tabler/icons-react";

export function UserOwnedCard({
  user,
  title,
  subtitle,
  tag,
  withFavouriteToggle = false,
  isFavourite = false,
  setIsFavourite = () => {},
  actions,
  layout = "default",
}: {
  user?: any;
  title?: ReactNode;
  subtitle?: ReactNode;
  tag?: ReactNode;
  withFavouriteToggle?: boolean;
  isFavourite?: boolean;
  setIsFavourite?: (fav: boolean) => void;
  actions?: ReactNode;
  layout?: "default" | "centered";
}) {
  let isCentered = layout === "centered";

  return (
    <div
      className={clsx(
        "border-gray-line-2/50 border rounded-xl px-5 py-5",
        "flex flex-col",
        isCentered && "items-center"
      )}
    >
      <header
        className={clsx(
          "flex items-start self-stretch relative",
          isCentered && "justify-center"
        )}
      >
        <Badge
          placement="top-start"
          overlap="circular"
          color="blue-gray"
          withBorder
          className="shrink-0"
        >
          <Avatar
            size="lg"
            className="object-center"
            src="/profile-2.jpg"
            alt="avatar"
          />
        </Badge>

        {tag && (
          <div
            className={clsx(
              "bg-x-ctrl-purple text-white font-bold px-2 py-1.5 text-fine ml-3 rounded-md",
              isCentered && "absolute left-0 top-0"
            )}
          >
            {tag}
          </div>
        )}

        {withFavouriteToggle && (
          <div className="absolute right-0 top-0">
            <IconButton
              variant="text"
              onClick={() => setIsFavourite?.(!isFavourite)}
            >
              <IconHeartFilled
                className={clsx(
                  isFavourite ? "text-x-ctrl-purple" : "text-gray-600/30"
                )}
              />
            </IconButton>
          </div>
        )}
      </header>

      <Link
        href="user"
        className="text-teal hover:underline font-semibold mt-1"
      >
        {user?.fullName ?? "[n/a]"}
      </Link>

      {title && (
        <h3
          className={clsx(
            "font-semibold text-lg mt-3",
            isCentered && "text-center"
          )}
        >
          {title}
        </h3>
      )}


      {subtitle && (
        <p className={clsx("text-black/70 mt-1", isCentered && "text-center")}>
          {subtitle}
        </p>
      )}

      {actions && (
        <div className="mt-4 flex items-center gap-x-2 mb-4">{actions}</div>
      )}
    </div>
  );
}
