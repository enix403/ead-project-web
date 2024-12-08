"use client";

import { AppLayout } from "~/components/AppLayout/AppLayout";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Tab,
  Tabs,
  TabsHeader,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import {
  IconCheck,
  IconLayoutDashboard,
  IconListDetails,
  IconScanPosition,
  IconX,
} from "@tabler/icons-react";
import { atom, useAtom } from "jotai";
import { useCallback } from "react";
import Link from "next/link";
import clsx from "clsx";

const displayAtom = atom<"list" | "grid">("list");

function PostingCard({ active }: { active?: boolean }) {
  const [display, setDisplay] = useAtom(displayAtom);

  const toggle = useCallback(
    () => setDisplay((x) => (x === "grid" ? "list" : "grid")),
    []
  );

  const DisplayIcon =
    display === "list" ? IconListDetails : IconLayoutDashboard;

  return (
    <div
      className={clsx(
        "rounded-xl px-5 py-5",
        active
          ? "border-x-purple border-2"
          : "border border-gray-line-2/80"
      )}
    >
      <div className="flex items-center justify-between gap-x-3">
        <span
          className={clsx(
            "bg-x-purple text-white font-bold px-2 py-1.5 text-fine rounded-md",
            !active && "invisible"
          )}
        >
          Active
        </span>
        {/* ... Repost button ... */}
        <Link href="create-job">
          <Button
            size="lg"
            color="purple"
            variant="text"
            className="flex items-center gap-2 !px-4 !py-2"
          >
            Repost
            <IconScanPosition size={20} />
          </Button>
        </Link>
      </div>
      <h3 className="font-semibold text-lg mt-3">
        Chef - Mediterranean Cuisine, Experience in Hotel and Restaurant
        Environments (5 Years)
      </h3>
      <p className="text-black/70 mt-1">
        Hello ! I have worked in similar positions and know the challenges of
        the job very well. Please take a look at my resume and I`m at your
        disposal.
      </p>

      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold mt-4 mb-2">Applicants (4)</h2>
        <Button
          size="sm"
          color="blue"
          variant="text"
          className="flex items-center gap-2"
          onClick={toggle}
        >
          <DisplayIcon size={20} />
          Display: {display}
        </Button>
      </div>

      {display === "list" ? <ApplicantsList /> : <ApplicantsGrid />}

      <div className="flex items-center gap-x-4 pt-4 mt-2 border-t border-gray-line-2">
        <Button size="sm" color="red" variant="filled" className="text-[0.9375rem]">
          <span className="!capitalize">
          Make Inactive
          </span>
        </Button>
      </div>
    </div>
  );
}

/* ======================= */

function ApplicantsGrid() {
  return (
    <div className="grid grid-cols-3 gap-6 mt-4">
      <ApplicantCell />
      <ApplicantCell />
      <ApplicantCell />
      <ApplicantCell />
    </div>
  );
}

function ApplicantCell() {
  return (
    <Card className="border-2 border-teal-dark">
      <CardHeader floated={false}>
        <img src="/profile-2.jpg" />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h6" color="blue-gray">
          Yiannis Andrew
        </Typography>
        <Typography variant="small" color="gray" className="font-normal">
          Senior Software Engineer at Apple | 2021 - 2024
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 flex items-center justify-center gap-x-2">
        <Tooltip content="Interested">
          <IconButton color="green" variant="text">
            <IconCheck />
          </IconButton>
        </Tooltip>
        <Tooltip content="Not Interested">
          <IconButton color="red" variant="text">
            <IconX />
          </IconButton>
        </Tooltip>
      </CardFooter>
    </Card>
  );
}

/* ============================= */

function ApplicantsList() {
  return (
    <List>
      <ApplicantRow />
      <ApplicantRow />
      <ApplicantRow />
      <ApplicantRow />
    </List>
  );
}

function ApplicantRow() {
  return (
    <ListItem ripple={false}>
      <ListItemPrefix>
        <Avatar variant="circular" alt="User" src="/profile-2.jpg" />
      </ListItemPrefix>
      <div>
        <Typography variant="h6" color="blue-gray">
          Yiannis Andrew
        </Typography>
        <Typography variant="small" color="gray" className="font-normal">
          Senior Software Engineer at Apple | 2021 - 2024
        </Typography>
      </div>
      <ListItemSuffix className="flex items-center gap-x-4">
        {/* Yes / No */}
        <Tooltip content="Interested">
          <IconButton color="green" variant="text">
            <IconCheck />
          </IconButton>
        </Tooltip>
        <Tooltip content="Not Interested">
          <IconButton color="red" variant="text">
            <IconX />
          </IconButton>
        </Tooltip>
        {/* Yes / No */}
      </ListItemSuffix>
    </ListItem>
  );
}

/* ============================= */

export default function Postings() {
  return (
    <AppLayout>
      <div className="pb-8 pt-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="mb-6 text-2xl font-semibold">Your Postings</h3>
          <Tabs value="A" className="mb-6">
            <TabsHeader>
              <Tab value="A">All</Tab>
              <Tab value="B">Active</Tab>
              <Tab value="C">Expired</Tab>
            </TabsHeader>
          </Tabs>
          <div className="space-y-4">
            <PostingCard active />
            <PostingCard />
            <PostingCard active />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
