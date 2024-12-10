import { Button } from "~/components/Button/Button";
import { UserOwnedCard } from "~/components/UserOwnedCard";
import { apiRoutes } from "~/app/api-routes";
import { useResumableAction } from "~/app/hooks/useResumableAction";
import { reportedCall } from "~/app/utils/promises";

export function PostingCard({
  posting,
  isBestMatch,
  isFavourite = false,
  setIsFavourite,
}: {
  posting: any;
  isBestMatch?: boolean;
  isFavourite?: boolean;
  setIsFavourite?: (fav: boolean) => void;
}) {
  const postingId = posting["_id"];

  const {
    isDone: isApplied,
    isExecuting: isApplying,
    isLoading,
    execute: apply,
  } = useResumableAction({
    executeFn: async (isApplied) => {
      if (!isApplied) {
        await reportedCall(
          apiRoutes.applyToJob({
            postingId: postingId,
            answers: [],
          })
        );
      }

      return true;
    },
    hydrateFn: async () => {
      const { applied } = await apiRoutes.isPostingApplied(postingId);
      return applied;
    },
    hydrateDeps: [postingId],
  });

  return (
    <UserOwnedCard
      user={posting?.poster}
      title={posting?.title}
      subtitle={posting?.description}
      tag={isBestMatch && "Best Match"}
      withFavouriteToggle
      isFavourite={isFavourite}
      setIsFavourite={setIsFavourite}
      actions={
        <>
          <Button
            fullRounded
            onClick={apply}
            loading={isApplying}
            disabled={isLoading || isApplied}
          >
            {isApplied === true ? "Already Applied" : "Apply"}
          </Button>
          <Button fullRounded variant="outlined">
            Message
          </Button>
        </>
      }
    />
  );
}
