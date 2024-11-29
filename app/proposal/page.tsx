'use client';

import PIconBriefcase from "~/app/assets/p-briefcase.svg";
import PIconPlus from "~/app/assets/p-plus.svg";
import PIconEye from "~/app/assets/p-eye.svg";
import PIconPerson from "~/app/assets/p-person.svg";

import { ReactNode, useState } from "react";
import clsx from "clsx";
import { ButtonProps } from "react-html-props";
import { AppLayout } from "~/components/AppLayout/AppLayout";
import { combineVisualProps } from "~/components/VisualComponent";
import { Avatar, Badge, IconButton } from "@material-tailwind/react";
import { Button } from "~/components/Button/Button";
import {
  IconAdjustmentsHorizontal,
  IconHeartFilled,
  IconSearch
} from "@tabler/icons-react";
import { Tab, TabGroup, TabList } from "@headlessui/react";
import { Select } from "~/components/Select/Select";

function TabControlButton({
  active,
  label,
  icon,
  ...buttonProps
}: {
  active?: boolean;
  label: string;
  icon?: ReactNode;
} & Omit<ButtonProps, "children">) {
  return (
    <button
      {...combineVisualProps(buttonProps, {
        className: [
          "w-full h-full flex flex-1 items-center justify-center gap-x-2 tc",
          active ? "bg-teal text-white" : "text-black/30"
        ]
      })}
    >
      {icon}
      <p>{label}</p>
    </button>
  );
}

function TabControl() {
  const tabs = [
    { id: "job", label: "View Job Post", Icon: PIconBriefcase },
    { id: "invite", label: "Invite Employers", Icon: PIconPlus },
    { id: "review", label: "Review Proposals", Icon: PIconEye },
    { id: "hire", label: "Hire (0)", Icon: PIconPerson }
  ] as const;

  type TypeId = (typeof tabs)[number]["id"];

  const [activeTab, setActiveTab] = useState<TypeId>("job");

  return (
    <div
      className={clsx(
        "h-20 w-full rounded-xl overflow-hidden border border-black/20 mt-7 flex",
        "divide-x divide-black/20"
      )}
    >
      {tabs.map(({ id, label, Icon }) => (
        <TabControlButton
          key={id}
          icon={<Icon />}
          label={label}
          active={activeTab === id}
          onClick={() => setActiveTab(id)}
        />
      ))}
    </div>
  );
}

function ProposalCard({ isBestMatch }: { isBestMatch?: boolean }) {
  const [fav, setFav] = useState(false);

  return (
    <div className='border-gray-line-2/50 border rounded-xl px-5 py-5'>
      <header className='flex items-start'>
        <Badge
          placement='top-start'
          overlap='circular'
          color='blue-gray'
          withBorder
          className='shrink-0'
        >
          <Avatar
            size='lg'
            className='object-center'
            src='/profile-2.jpg'
            alt='avatar'
          />
        </Badge>

        {isBestMatch && (
          <div className='bg-black text-white font-bold px-2 py-1.5 text-fine ml-3 rounded-md'>
            Best Match
          </div>
        )}

        <IconButton
          className='ml-auto'
          variant='text'
          onClick={() => setFav(prev => !prev)}
        >
          <IconHeartFilled
            className={clsx(fav ? "text-teal" : "text-black/30")}
          />
        </IconButton>
      </header>

      <h2 className='text-teal font-semibold mt-1'>Yiannis M.</h2>

      <h3 className='font-semibold text-lg mt-3'>
        Chef - Mediterranean Cuisine, Experience in Hotel and Restaurant
        Environments (5 Years)
      </h3>
      <p className='text-black/70 mt-1'>
        Hello ! I have worked in similar positions and know the challenges of
        the job very well. Please take a look at my resume and I`m at your
        disposal.
      </p>

      <div className='mt-4 flex items-center gap-x-2 mb-4'>
        <Button fullRounded>Hire</Button>
        <Button fullRounded variant='outlined'>
          Message
        </Button>
      </div>
    </div>
  );
}

function SecondaryTabs() {
  return (
    <TabGroup className='mt-6 border-b border-gray-line-2/50 pb-1.5'>
      <TabList className='flex gap-10 font-semibold text-black/50 '>
        <Tab className='data-[selected]:text-teal'>All Proposals (5)</Tab>
        <Tab className='data-[selected]:text-teal'>Shortlisted</Tab>
        <Tab className='data-[selected]:text-teal'>Messaged</Tab>
        <Tab className='data-[selected]:text-teal'>Archived</Tab>
      </TabList>
    </TabGroup>
  );
}

function SearchControls() {
  return (
    <div className='mt-5 flex max-md:flex-col max-md:items-stretch items-center gap-2'>
      <div className='border border-black/20 rounded-xl flex-1 flex overflow-hidden px-2.5 py-2.5 gap-x-1.5'>
        <IconSearch size={17} className='self-center' />
        <input size={1} className='flex-1 outline-none' placeholder='Search' />
      </div>
      <Button variant='outlined' fullRounded className='!px-10 !gap-x-2'>
        <IconAdjustmentsHorizontal />
        Filters
      </Button>
      <div className='flex items-center gap-x-2.5'>
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
    <AppLayout>
      <div className='app-container py-8'>
        <h1 className='font-semibold text-3xl'>
          Marketing Landing Page Initiative
        </h1>
        <p className='mt-1.5'>
          <span className='text-teal'>28 invites</span> Left
        </p>
        <TabControl />
        <SecondaryTabs />
        <SearchControls />

        <h2 className='text-teal font-bold mt-1.5'>Advanced Search</h2>

        <div className='mt-4 grid wl:grid-cols-2 gap-6'>
          <ProposalCard isBestMatch />
          <ProposalCard />
          <ProposalCard />
          <ProposalCard />
        </div>
        <Button variant='outlined' className='mx-auto mt-8 mb-4' fullRounded>
          Load More
        </Button>
      </div>
    </AppLayout>
  );
}
