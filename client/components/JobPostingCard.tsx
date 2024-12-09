import { ReactNode } from "react";
import { Button } from "~/components/Button/Button";
import { UserOwnedCard } from "./UserOwnedCard";

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
  return (
    <UserOwnedCard
      user={posting?.poster}
      title={posting?.title}
      subtitle={posting?.description}
      tag={isBestMatch ? "Best Match" : null}
      withFavouriteToggle
      isFavourite={isFavourite}
      setIsFavourite={setIsFavourite}
      actions={
        <>
          <Button fullRounded>Hire</Button>
          <Button fullRounded variant="outlined">
            Message
          </Button>
        </>
      }
    />
  );
}
