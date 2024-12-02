"use client";

import { AppLayout } from "~/components/AppLayout/AppLayout";
import {
  Avatar,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";

function PostingCard() {
  return (
    <div className="border-gray-line-2/50 border rounded-xl px-5 py-5">
      <div>
        <span className="bg-green-500 text-white font-bold px-2 py-1.5 text-fine rounded-md">
          Active
        </span>
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

      <h2 className="text-lg font-semibold mt-4 mb-2">Applicants (4)</h2>

      <List>
        <ApplicantRow />
        <ApplicantRow />
        <ApplicantRow />
        <ApplicantRow />
      </List>
    </div>
  );
}

function ApplicantRow() {
  return (
    <ListItem>
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
    </ListItem>
  );
}

export default function Postings({ params }: { params: any }) {
  return (
    <AppLayout params={params}>
      <div className="pb-8 pt-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="mb-6 text-2xl font-semibold">Your Postings</h3>
          <div className="space-y-4">
            <PostingCard />
            <PostingCard />
            <PostingCard />
            <PostingCard />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
