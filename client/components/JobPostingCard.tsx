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
      tag={isBestMatch && "Best Match"}
      withFavouriteToggle
      isFavourite={isFavourite}
      setIsFavourite={setIsFavourite}
      actions={
        <>
          <Button fullRounded>Apply</Button>
          <Button fullRounded variant="outlined">
            Message
          </Button>
        </>
      }
    />
  );
}
