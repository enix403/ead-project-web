"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ApiReplyError, apiRoutes } from "~/app/api-routes";
import { Button } from "~/components/Button/Button";
import { UserOwnedCard } from "~/components/UserOwnedCard";

export function CommunityItemCard({ user }: { user: any }) {
  const userId = user["_id"];
  const [isAdding, setIsAdding] = useState(false);
  const [isFriend, setIsFriend] = useState<boolean | "waiting">("waiting");

  useEffect(() => {
    async function checkFriendship() {
      setIsFriend("waiting");
      try {
        const { isFriend } = await apiRoutes.isFriend({
          userId,
        });
        setIsFriend(isFriend);
      } catch {}
    }
    checkFriendship();
  }, [userId]);

  async function addFriend() {
    setIsAdding(true);
    try {
      const responsePromise = apiRoutes.addFriend({
        userId,
      });
      await toast.promise(responsePromise, {
        loading: "Adding...",
        success: (reply) => reply["message"],
        error: (error) => ApiReplyError.userMessage(error),
      });
      setIsFriend(true);
    } catch (err) {
      if (ApiReplyError.check(err)) {
        if (err.errorCode == "already_added") {
          setIsFriend(true);
        }
      }
    } finally {
      setIsAdding(false);
    }
  }

  async function removeFriend() {
    setIsAdding(true);
    try {
      const responsePromise = apiRoutes.removeFriend({
        userId: userId,
      });
      await toast.promise(responsePromise, {
        loading: "Removing...",
        success: (reply) => reply["message"],
        error: (error) => ApiReplyError.userMessage(error),
      });
      setIsFriend(false);
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <UserOwnedCard
      layout="centered"
      user={user}
      subtitle={
        "Chef - Mediterranean Cuisine, Experience in Hotel and Restaurant"
      }
      tag={isFriend === true && "Friend"}
      actions={
        <>
          <Button
            className="!py-1 flex-1"
            fullRounded
            onClick={isFriend === false ? addFriend : removeFriend}
            loading={isAdding}
            disabled={isFriend === "waiting"}
          >
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
