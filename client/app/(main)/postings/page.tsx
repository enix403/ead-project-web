"use client";

import { AppLayout } from "~/components/AppLayout/AppLayout";
import { Tab, Tabs, TabsHeader } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@material-tailwind/react";

import { apiRoutes } from "~/app/api-routes";

import { PostingCard } from './PostingCard';

export default function Postings() {
  const { isLoading, data: postings } = useQuery<any[]>({
    queryKey: ["getMyPostings"],
    queryFn: () => apiRoutes.getMyPostings(),
    initialData: [],
    placeholderData: [],
  });

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
            {isLoading ? (
              <div className="flex items-center gap-x-2 py-3">
                <Spinner color="green" />
                <span>Loading...</span>
              </div>
            ) : (
              postings.map((posting) => (
                <PostingCard key={posting._id} posting={posting} />
              ))
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
