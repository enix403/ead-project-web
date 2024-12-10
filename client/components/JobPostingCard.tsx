import { Button } from "~/components/Button/Button";
import { UserOwnedCard } from "./UserOwnedCard";
import { useEffect, useState } from "react";
import { ApiReplyError, apiRoutes } from "~/app/api-routes";
import toast from "react-hot-toast";

export function JobPostingCard({
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
  const [isApplying, setIsApplying] = useState(false);
  const [isApplied, setIsApplied] = useState<boolean | "waiting">("waiting");

  useEffect(() => {
    async function checkPosting() {
      setIsApplied("waiting");
      try {
        // ...
        const { applied } = await apiRoutes.isPostingApplied(posting["_id"]);
        setIsApplied(applied);
      } catch {}
    }
    checkPosting();
  }, [posting]);

  async function apply() {
    setIsApplying(true);
    try {
      const responsePromise = apiRoutes.applyToJob({
        postingId: posting["_id"],
        answers: [],
      });
      await toast.promise(responsePromise, {
        loading: "Applying...",
        success: (reply) => reply["message"],
        error: (error) => ApiReplyError.userMessage(error),
      });
      setIsApplied(true);
    } catch (err) {
      if (ApiReplyError.check(err)) {
        if (err.errorCode == "already_applied") {
          setIsApplied(true);
        }
      }
    } finally {
      setIsApplying(false);
    }
  }

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
            disabled={isApplied === true || isApplied === "waiting"}
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
