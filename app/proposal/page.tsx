"use client";

import PIconBriefcase from "~/app/assets/p-briefcase.svg";
import PIconPlus from "~/app/assets/p-plus.svg";
import PIconEye from "~/app/assets/p-eye.svg";
import PIconPerson from "~/app/assets/p-person.svg";

import { Fragment, ReactNode } from "react";
import clsx from "clsx";
import { AppLayout } from "~/components/AppLayout/AppLayout";
import { Button } from "~/components/Button/Button";
import { IconAdjustmentsHorizontal, IconSearch } from "@tabler/icons-react";
import { Tab, TabGroup, TabList } from "@headlessui/react";
import { Select } from "~/components/Select/Select";
import { ProposalCard } from "./ProposalCard";

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

function PrimaryTabs() {
  return (
    <TabGroup
      as="div"
      className="app-container md:mt-7 flex-1 -mx-7 max-md:pb-3 max-md:border-b max-md:border-black/10 overflow-auto"
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
          shortLabel="View Job Post"
          label="View Job Post"
          icon={<PIconBriefcase />}
        />
        <PrimaryTabButton
          shortLabel="Invite"
          label="Invite Employers"
          icon={<PIconPlus />}
        />
        <PrimaryTabButton
          shortLabel="Review"
          label="Review Proposals"
          icon={<PIconEye />}
        />
        <PrimaryTabButton
          shortLabel="Hire"
          label="Hire (0)"
          icon={<PIconPerson />}
        />
      </TabList>
    </TabGroup>
  );
}

function SecondaryTabs() {
  return (
    <TabGroup className="mt-6 border-b border-gray-line-2/50 pb-1.5">
      <TabList className="flex gap-10 font-semibold text-black/50 ">
        <Tab className="data-[selected]:text-teal">All Proposals (5)</Tab>
        <Tab className="data-[selected]:text-teal">Shortlisted</Tab>
        <Tab className="data-[selected]:text-teal">Messaged</Tab>
        <Tab className="data-[selected]:text-teal">Archived</Tab>
      </TabList>
    </TabGroup>
  );
}

function SearchControls() {
  return (
    <div className="mt-5 flex max-md:flex-col max-md:items-stretch items-center gap-2">
      <div className="border border-black/20 rounded-xl flex-1 flex overflow-hidden px-2.5 py-2.5 gap-x-1.5">
        <IconSearch size={17} className="self-center" />
        <input size={1} className="flex-1 outline-none" placeholder="Search" />
      </div>
      <Button variant="outlined" fullRounded className="!px-10 !gap-x-2">
        <IconAdjustmentsHorizontal />
        Filters
      </Button>
      <div className="flex items-center gap-x-2.5">
        Sort:
        <Select>
          <option>Best Match</option>
          <option>Another Match</option>
        </Select>
      </div>
    </div>
  );
}

export default function ProposalPage() {
  return (
    <AppLayout pageTitle="Proposals" showSearchButton>
      <div className="app-container py-8 w-full">
        <h1 className="font-semibold text-3xl">
          Marketing Landing Page Initiative
        </h1>
        <p className="mt-1.5">
          <span className="text-teal">28 invites</span> Left
        </p>
        {/* <SecondaryTabs /> */}
        {/* <SearchControls /> */}
        {/* </div> */}
        <PrimaryTabs />
        {/* <div className="app-container pb-8"> */}
        <h2 className="text-teal font-bold mt-1.5">Advanced Search</h2>

        <div className="mt-4 grid wl:grid-cols-2 gap-6">
          <ProposalCard isBestMatch />
          <ProposalCard />
          <ProposalCard />
          <ProposalCard />
        </div>
        <Button variant="outlined" className="mx-auto mt-8 mb-4" fullRounded>
          Load More
        </Button>
      </div>
    </AppLayout>
  );
}
