"use client";

import clsx from "clsx";
import { Fragment, ReactNode, useEffect, useState } from "react";
import { DivProps } from "react-html-props";
import { Tab, TabGroup, TabList } from "@headlessui/react";
import { IconAdjustmentsHorizontal, IconSearch } from "@tabler/icons-react";

import PIconBriefcase from "~/app/assets/p-briefcase.svg";
import PIconPlus from "~/app/assets/p-plus.svg";
import PIconEye from "~/app/assets/p-eye.svg";

import { AppLayout } from "~/components/AppLayout/AppLayout";
import { Button } from "~/components/Button/Button";
import { Select } from "~/components/Select/Select";
import { useViewMode } from "~/app/providers/auth-state";

import { Filters } from "./filters/Filters";
import { HomePostings } from "./HomePostings/HomePostings";
import { HomeProfiles } from "./HomeProfiles/HomeProfiles";

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

function SearchControls({
  onFilter,
  ...props
}: { onFilter: (filters: any) => void } & DivProps) {
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
      {showFilters && <Filters onFilter={onFilter} className="mt-4" />}
    </div>
  );
}

export default function HomeProposalsPage() {
  const viewMode = useViewMode();
  const [filters, setFilters] = useState<any>({});

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  return (
    <AppLayout pageTitle="Proposals">
      <div className="app-container py-8 w-full">
        <div className="hidden md:block flex-1">
          <PageTitle />
          <PrimaryTabs className="mt-5" />
          <SearchControls onFilter={setFilters} className="mt-4" />
        </div>
        <div className="md:hidden block flex-1">
          <PrimaryTabs />
          <PageTitle className="mt-4" />
          <SearchControls onFilter={setFilters} className="mt-4" />
        </div>

        <div className="mt-4 grid wl:grid-cols-2 gap-6">
          {viewMode === "employer" ? <HomeProfiles /> : <HomePostings filters={filters} />}
        </div>
        <Button variant="outlined" className="mx-auto mt-8 mb-4" fullRounded>
          Load More
        </Button>
      </div>
    </AppLayout>
  );
}
