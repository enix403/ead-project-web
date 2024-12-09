"use client";

import clsx from "clsx";
import { Avatar, Badge } from "@material-tailwind/react";
import { motion } from "framer-motion";

import { Button } from "~/components/Button/Button";
import Link from "next/link";

const variants = {
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      ease: "easeInOut",
      duration: 0.5,
    },
  }),
  hidden: { opacity: 0, y: 80 },
};

export function PersonCard({
  index,
  isFriend = false,
}: {
  index: number;
  isFriend?: boolean;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      custom={index}
      variants={variants}
      className={clsx(
        "flex flex-col items-center border border-gray-line-2 p-5 rounded-xl shadow hover:shadow-lg shadow-gray-line-2 relative"
      )}
    >
      {isFriend && (
        <div className="absolute p-2 left-0 right-0 top-0">
          <span className="bg-x-ctrl-purple text-white font-bold px-1.5 py-1 text-sm rounded-md">
            Friend
          </span>
        </div>
      )}
      <Badge
        placement="top-start"
        overlap="circular"
        color="blue-gray"
        withBorder
        className="shrink-0"
      >
        <Avatar
          size="xl"
          className="object-center"
          src="/profile-2.jpg"
          alt="avatar"
        />
      </Badge>
      <Link
        href="user"
        className="text-teal hover:underline font-bold text-xl mt-3"
      >
        Yiannis M.
      </Link>
      <h2 className="text-gray-500 font-medium text-center max-w-[80%] !leading-4 mt-1.5">
        Chef - Mediterranean Cuisine, Experience in Hotel and Restaurant
      </h2>
      <div className="flex gap-2">
        <Button variant="filled" fullRounded className="!py-1 mt-3 flex-1">
          {isFriend ? "Remove" : "Add"}
        </Button>
        <Button variant="outlined" fullRounded className="!py-1 mt-3 flex-1">
          Message
        </Button>
      </div>
    </motion.div>
  );
}