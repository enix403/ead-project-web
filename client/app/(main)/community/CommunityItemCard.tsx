"use client";

import { apiRoutes } from "~/app/api-routes";
import { useResumableAction } from "~/app/hooks/useResumableAction";
import { delay, reportedCall, sleep } from "~/app/utils/promises";
import { Button } from "~/components/Button/Button";
import { UserOwnedCard } from "~/components/UserOwnedCard";

export function CommunityItemCard({ user }: { user: any }) {
  const userId = user["_id"];

  // Friendship
  const {
    isDone: isFriend,
    isExecuting: isAdding,
    isHydrating,
    execute: changeFriendship,
  } = useResumableAction({
    executeFn: async (isFriend) => {
      let apiCall: Promise<unknown>;
      let result: boolean;

      if (isFriend) {
        apiCall = apiRoutes.removeFriend({ userId });
        result = false;
      } else {
        apiCall = apiRoutes.addFriend({ userId });
        result = true;
      }

      await reportedCall(apiCall);
      return result;
    },
    hydrateFn: async () => {
      const { isFriend } = await apiRoutes.isFriend({ userId });
      return isFriend;
    },
    hydrateDeps: [userId],
  });

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
            onClick={changeFriendship}
            loading={isAdding}
            disabled={isHydrating}
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
