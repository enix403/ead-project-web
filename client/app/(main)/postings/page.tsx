"use client";

import { AppLayout } from "~/components/AppLayout/AppLayout";
import {
  Tab,
  Tabs,
  TabsHeader,
  TabPanel,
  TabsBody,
} from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@material-tailwind/react";

import { apiRoutes } from "~/app/api-routes";

import { PostingCard } from "./PostingCard";

function PostingsListTab({
  postings,
  value,
}: {
  postings: any[];
  value: string;
}) {
  return (
    <TabPanel value={value}>
      <div className="space-y-4">
        {postings.map((posting) => (
          <PostingCard key={posting._id} posting={posting} />
        ))}
        {postings.length == 0 && "No Postings yet"}
      </div>
    </TabPanel>
  );
}

export default function Postings() {
  const { isLoading, data: postings } = useQuery<any[]>({
    queryKey: ["getMyPostings"],
    queryFn: () => apiRoutes.getMyPostings(),
    initialData: [],
    placeholderData: [],
  });

  const all = [...postings];
  const active = postings.filter((posting) => Boolean(posting["isActive"]));
  // TODO: Fix this
  const expired = postings.filter((posting) => !Boolean(posting["isActive"]));

  return (
    <AppLayout>
      <div className="pb-8 pt-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="mb-6 text-2xl font-semibold">Your Postings</h3>
          <Tabs className="mb-6">
            <TabsHeader>
              <Tab value="A">All</Tab>
              <Tab value="B">Active</Tab>
              <Tab value="C">Expired</Tab>
            </TabsHeader>
            <TabsBody
              animate={{
                initial: {},
                mount: {},
                unmount: {},
              }}
            >
              {isLoading ? (
                <div className="flex items-center gap-x-2 py-3">
                  <Spinner color="green" />
                  <span>Loading...</span>
                </div>
              ) : (
                <>
                  {/* <TabPanel value="A">Hello 1</TabPanel> */}
                  {/* <TabPanel value="B">Hello 2</TabPanel> */}
                  {/* <TabPanel value="C">Hello 3</TabPanel> */}
                  <PostingsListTab value="A" postings={all} />
                  <PostingsListTab value="B" postings={active} />
                  <PostingsListTab value="C" postings={expired} />
                </>
              )}
            </TabsBody>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
}
