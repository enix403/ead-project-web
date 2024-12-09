"use client";

import { Fragment, ReactNode, useCallback, useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { IconAdjustmentsHorizontal, IconSearch } from "@tabler/icons-react";
import { Tab, TabGroup, TabList } from "@headlessui/react";
import clsx from "clsx";
import { produce } from "immer";

import PIconBriefcase from "~/app/assets/p-briefcase.svg";
import PIconPlus from "~/app/assets/p-plus.svg";
import PIconEye from "~/app/assets/p-eye.svg";

import { AppLayout } from "~/components/AppLayout/AppLayout";
import { Button } from "~/components/Button/Button";
import { Select } from "~/components/Select/Select";
import { ProposalCard } from "~/components/ProposalCard";
import { DivProps } from "react-html-props";
import { Filters } from "./filters/Filters";
import { apiRoutes } from "~/app/api-routes";
import { useViewMode } from "~/app/providers/auth-state";

function PageTitle(props: DivProps) {
  return (
    <div {...props}>
      <h1 className="font-semibold text-3xl">
        Marketing Landing Page Initiative
      </h1>
      <p className="text-2xl mt-1.5">
        <span className="text-teal">28 invites</span> left
      </p>
    </div>
  );
}

function PrimaryTabButton({
  shortLabel,
  label,
  icon,
}: {
  shortLabel: string;
  label: string;
  icon?: ReactNode;
}) {
  return (
    <Tab as={Fragment}>
      {({ selected }) => (
        <button
          className={clsx(
            "outline-none",
            "md:h-full flex md:flex-1 items-center md:justify-center max-sm:text-sm gap-x-2 tc",
            "whitespace-nowrap",
            selected ? "md:bg-teal md:text-white text-teal" : "text-black/30"
          )}
        >
          {icon}
          <p className="sm:block hidden">{label}</p>
          <p className="sm:hidden block">{shortLabel}</p>
        </button>
      )}
    </Tab>
  );
}

function PrimaryTabs({ className }: DivProps) {
  let viewMode = useViewMode();

  return (
    <TabGroup
      as="div"
      className={clsx(
        "app-container flex-1 -mx-7 max-md:pb-3 max-md:border-b max-md:border-black/10 overflow-auto",
        className
      )}
    >
      <TabList
        as="div"
        className={clsx(
          "md:border md:border-black/20",
          "md:h-20 w-full md:rounded-xl md:overflow-hidden flex",
          "md:divide-x divide-black/20",
          "gap-x-6 md:gap-x-0"
        )}
      >
        <PrimaryTabButton
          shortLabel={"All"}
          label={viewMode === "employer" ? "All Profiles" : "All Jobs"}
          icon={<PIconBriefcase />}
        />
        <PrimaryTabButton
          shortLabel="Proposals"
          label="Proposals"
          icon={<PIconPlus />}
        />
        <PrimaryTabButton
          shortLabel="Saved"
          label="Saved"
          icon={<PIconEye />}
        />
      </TabList>
    </TabGroup>
  );
}

function SearchControls(props: DivProps) {
  let [showFilters, setShowFilters] = useState(false);
  return (
    <div {...props}>
      <div className="flex max-md:flex-col max-md:items-stretch items-center gap-2">
        <div className="border border-black/20 rounded-xl flex-1 flex overflow-hidden px-2.5 py-2.5 gap-x-1.5">
          <IconSearch size={17} className="self-center" />
          <input
            size={1}
            className="flex-1 outline-none"
            placeholder="Job title, keywords or company"
          />
        </div>
        <Button
          variant="outlined"
          fullRounded
          className="!px-10 !gap-x-2"
          onClick={() => setShowFilters((x) => !x)}
        >
          <IconAdjustmentsHorizontal />
          Filters
        </Button>
        <div className="flex items-center gap-x-2.5">
          Sort:
          <Select>
            <option>Best Match</option>
            <option>Popularity</option>
            <option>Date</option>
            <option>Price</option>
          </Select>
        </div>
      </div>
      {showFilters && <Filters className="mt-4" />}
    </div>
  );
}

export default function HomeProposalsPage() {
  const favsQuery = useQuery<any[] | null>({
    queryKey: ["getPostingFavourites"],
    queryFn: () => apiRoutes.getPostingFavourites(),
    initialData: null,
    placeholderData: null,
  });

  const postingsQuery = useQuery<any[]>({
    queryKey: ["searchJobs"],
    queryFn: () => apiRoutes.searchJobs(),
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
    <AppLayout pageTitle="Proposals">
      <div className="app-container py-8 w-full">
        <div className="hidden md:block flex-1">
          <PageTitle />
          <PrimaryTabs className="mt-5" />
          {/* <ProposalsFilter className="mt-7" /> */}
          <SearchControls className="mt-4" />
        </div>
        <div className="md:hidden block flex-1">
          <PrimaryTabs />
          {/* <ProposalsFilter className="mt-5" /> */}
          <PageTitle className="mt-4" />
          <SearchControls className="mt-4" />
        </div>

        <div className="mt-4 grid wl:grid-cols-2 gap-6">
          {isLoading ? (
            <div className="flex items-center gap-x-2 py-3">
              <Spinner color="green" />
              <span>Loading...</span>
            </div>
          ) : (
            postings.map((posting, index) => (
              <ProposalCard
                key={posting._id}
                posting={posting}
                // isBestMatch={index == 0}
                isFavourite={favouriteIds.includes(posting["_id"])}
                setIsFavourite={(isFavourite) =>
                  markFavourite(posting, isFavourite)
                }
              />
            ))
          )}
        </div>
        <Button variant="outlined" className="mx-auto mt-8 mb-4" fullRounded>
          Load More
        </Button>
      </div>
    </AppLayout>
  );
}
