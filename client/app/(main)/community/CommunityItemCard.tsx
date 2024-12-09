"use client";

import { motion } from "framer-motion";
import { Button } from "~/components/Button/Button";
import { UserOwnedCard } from "~/components/UserOwnedCard";

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

export function CommunityItemCard({
  user,
  index,
  isFriend = false,
}: {
  user: any;
  index: number;
  isFriend?: boolean;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      custom={index}
      variants={variants}
    >
      <UserOwnedCard
        layout="centered"
        user={user}
        subtitle={
          "Chef - Mediterranean Cuisine, Experience in Hotel and Restaurant"
        }
        tag={isFriend && "Friend"}
        actions={
          <>
            <Button variant="filled" fullRounded className="!py-1 flex-1">
              {isFriend ? "Remove" : "Add"}
            </Button>
            <Button variant="outlined" fullRounded className="!py-1 flex-1">
              Message
            </Button>
          </>
        }
      />
    </motion.div>
  );
}
