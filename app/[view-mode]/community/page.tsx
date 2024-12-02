"use client";

import clsx from "clsx";
import { Avatar, Badge } from "@material-tailwind/react";

import { AppLayout } from "~/components/AppLayout/AppLayout";
import { Button } from "~/components/Button/Button";

function PersonCard() {
  return (
    <div
      className={clsx(
        "flex flex-col items-center border border-gray-line-2 p-5 rounded-xl shadow hover:shadow-lg ta shadow-gray-line-2"
      )}
    >
      <Badge
        placement="top-start"
        overlap="circular"
        color="blue-gray"
        withBorder
        className="shrink-0"
      >
        <Avatar
          size="xl"
          className="object-center"
          src="/profile-2.jpg"
          alt="avatar"
        />
      </Badge>
      <h2 className="text-teal font-bold text-xl mt-3">Yiannis M.</h2>
      <h2 className="text-gray-500 font-medium text-center max-w-[80%] !leading-4 mt-1.5">
        Chef - Mediterranean Cuisine, Experience in Hotel and Restaurant
      </h2>
      <Button fullWidth variant="outlined" fullRounded className="!py-1 mt-3">
        Message
      </Button>
    </div>
  );
}

export default function Community({ params }: { params: any }) {
  return (
    <AppLayout params={params}>
      <div className="pb-8 pt-3">
        <div className="max-w-4xl mx-auto">
          <h3 className="mb-8 mt-5 text-2xl md:text-4xl font-semibold">
            Connect with new people
          </h3>

          <div className="grid grid-cols-3 gap-5">
            <PersonCard />
            <PersonCard />
            <PersonCard />
            <PersonCard />
            <PersonCard />
            <PersonCard />
            <PersonCard />
            <PersonCard />
            <PersonCard />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
