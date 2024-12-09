import { ReactNode, useState } from "react";
import clsx from "clsx";
import { Avatar, Badge, IconButton } from "@material-tailwind/react";
import { Button } from "~/components/Button/Button";
import { IconHeartFilled } from "@tabler/icons-react";
import Link from "next/link";

export function ProposalCard({
  job,
  isBestMatch,
  footer,
  isFavourite,
  setIsFavourite,
  showLikedButton = true,
}: {
  job?: any,
  isBestMatch?: boolean;
  footer?: ReactNode;
  isFavourite: boolean;
  setIsFavourite: (fav: boolean) => void;
  showLikedButton?: boolean;
}) {
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

        {isBestMatch && (
          <div className="bg-x-ctrl-purple text-white font-bold px-2 py-1.5 text-fine ml-3 rounded-md">
            Best Match
          </div>
        )}

        {showLikedButton && (
          <IconButton
            className="ml-auto"
            variant="text"
            onClick={() => setIsFavourite(!isFavourite)}
          >
            <IconHeartFilled
              className={clsx(isFavourite ? "text-x-ctrl-purple" : "text-gray-600/30")}
            />
          </IconButton>
        )}
      </header>

      <Link
        href="user"
        className="text-teal hover:underline font-semibold mt-1"
      >
        Yiannis M.
      </Link>

      <h3 className="font-semibold text-lg mt-3">
        {/* Chef - Mediterranean Cuisine, Experience in Hotel and Restaurant */}
        {/* Environments (5 Years) */}
        {job?.title}
      </h3>
      <p className="text-black/70 mt-1">
        {/* Hello ! I have worked in similar positions and know the challenges of
        the job very well. Please take a look at my resume and I`m at your
        disposal. */}
        {job?.description}
      </p>

      {footer ?? (
        <div className="mt-4 flex items-center gap-x-2 mb-4">
          <Button fullRounded>Hire</Button>
          <Button fullRounded variant="outlined">
            Message
          </Button>
        </div>
      )}
    </div>
  );
}
