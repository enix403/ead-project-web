"use client";

import { Button } from "~/components/Button/Button";
import { UserOwnedCard } from "~/components/UserOwnedCard";

export function CommunityItemCard({ user }: { user: any }) {
  const isFriend = false;
  return (
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
  );
}
