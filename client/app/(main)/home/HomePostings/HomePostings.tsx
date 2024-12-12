"use client";

import { produce } from "immer";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@material-tailwind/react";

import { apiRoutes } from "~/app/api-routes";
import { PostingCard } from "./PostingCard";
import { toParams } from "~/app/utils/collections";

export function HomePostings({ filters }: { filters: any }) {
  const favsQuery = useQuery<any[] | null>({
    queryKey: ["getPostingFavourites"],
    queryFn: () => apiRoutes.getPostingFavourites(),
    initialData: null,
    placeholderData: null,
  });

  // useEffect(() => {
  //   console.log(toParams(filters));
  // }, [filters]);

  const filterQueryString = useMemo(() => toParams(filters).toString(), [filters]);

  const postingsQuery = useQuery<any[]>({
    queryKey: ["searchJobs", filterQueryString],
    queryFn: () => apiRoutes.searchJobs(filterQueryString),
    initialData: [],
    placeholderData: [],
  });

  const isLoading = favsQuery.isLoading || postingsQuery.isLoading;
  const postings = postingsQuery.data;
  const serverPostingFavouriteMarks = favsQuery.data;

  const [favouriteIds, setFavouriteIds] = useState<any[]>([]);

  useEffect(() => {
    if (serverPostingFavouriteMarks == null) return;
    const ids = serverPostingFavouriteMarks.map((mark) => mark["postingId"]);
    setFavouriteIds(ids);
  }, [serverPostingFavouriteMarks]);

  async function markFavourite(posting: string, isFavourite: boolean) {
    const postingId = posting["_id"];

    setFavouriteIds((currentFavouriteIds) =>
      produce(currentFavouriteIds, (draft) => {
        if (isFavourite) {
          // Add the postingId if not already present
          if (!draft.includes(postingId)) {
            draft.push(postingId);
          }
        } else {
          // Remove the postingId if already present
          const index = draft.indexOf(postingId);
          if (index !== -1) {
            draft.splice(index, 1);
          }
        }
      })
    );

    let result = await apiRoutes.markPostingFavourite({
      postingId,
      isFavourite,
    });
    console.log(result);
  }

  return (
    <>
      {isLoading ? (
        <div className="flex items-center gap-x-2 py-3">
          <Spinner color="green" />
          <span>Loading...</span>
        </div>
      ) : (
        postings.map(
          (posting) =>
            posting["isActive"] && (
              <PostingCard
                key={posting._id}
                posting={posting}
                isFavourite={favouriteIds.includes(posting["_id"])}
                setIsFavourite={(isFavourite) =>
                  markFavourite(posting, isFavourite)
                }
              />
            )
        )
      )}
    </>
  );
}
