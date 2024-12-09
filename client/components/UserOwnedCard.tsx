import clsx from "clsx";
import Link from "next/link";
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
}: any) {
  return (
    <div className="border-gray-line-2/50 border rounded-xl px-5 py-5">
      <header className="flex items-start">
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
          <div className="bg-x-ctrl-purple text-white font-bold px-2 py-1.5 text-fine ml-3 rounded-md">
            {tag}
          </div>
        )}

        {withFavouriteToggle && (
          <IconButton
            className="ml-auto"
            variant="text"
            onClick={() => setIsFavourite?.(!isFavourite)}
          >
            <IconHeartFilled
              className={clsx(
                isFavourite ? "text-x-ctrl-purple" : "text-gray-600/30"
              )}
            />
          </IconButton>
        )}
      </header>

      <Link
        href="user"
        className="text-teal hover:underline font-semibold mt-1"
      >
        {user?.fullName ?? "[n/a]"}
      </Link>

      {title && <h3 className="font-semibold text-lg mt-3">{title}</h3>}
      {subtitle && <p className="text-black/70 mt-1">{subtitle}</p>}

      {actions && (
        <div className="mt-4 flex items-center gap-x-2 mb-4">{actions}</div>
      )}
    </div>
  );
}
