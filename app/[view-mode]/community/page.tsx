"use client";

import clsx from "clsx";
import { Avatar, Badge } from "@material-tailwind/react";
import { motion } from "framer-motion";

import { AppLayout, ViewModeContext } from "~/components/AppLayout/AppLayout";
import { Button } from "~/components/Button/Button";
import { useContext } from "react";
import { IconSearch } from "@tabler/icons-react";

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

function PersonCard({
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
      <h2 className="text-teal font-bold text-xl mt-3">Yiannis M.</h2>
      <h2 className="text-gray-500 font-medium text-center max-w-[80%] !leading-4 mt-1.5">
        Chef - Mediterranean Cuisine, Experience in Hotel and Restaurant
      </h2>
      <Button fullWidth variant="outlined" fullRounded className="!py-1 mt-3">
        Message
      </Button>
    </motion.div>
  );
}

function Content() {
  const viewMode = useContext(ViewModeContext);
  return (
    <div className="pb-8 pt-3">
      <div className="max-w-4xl mx-auto">
        <h3 className="mb-4 mt-5 text-2xl md:text-4xl font-semibold">
          Connect with{" "}
          {viewMode === "employee" ? "new people" : "other businesses"}
        </h3>
        <div className="mb-4 border border-black/20 rounded-xl flex-1 flex overflow-hidden px-2.5 py-2.5 gap-x-1.5">
          <IconSearch size={17} className="self-center" />
          <input
            size={1}
            className="flex-1 outline-none"
            placeholder="Search for people"
          />
        </div>

        <motion.div className="grid grid-cols-3 gap-5">
          {repeatNode(9, (index) => (
            <PersonCard index={index} isFriend={[1, 2, 4].includes(index)} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default function Community({ params }: { params: any }) {
  return (
    <AppLayout params={params}>
      <Content />
    </AppLayout>
  );
}

function repeatNode<T>(len: number, callback: (index: number) => T): T[] {
  return [...Array(len)].map((_, index) => callback(index));
}
