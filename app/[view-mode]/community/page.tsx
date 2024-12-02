"use client";

import { Avatar, Badge, IconButton } from "@material-tailwind/react";
import { IconThumbUp, IconThumbUpFilled } from "@tabler/icons-react";
import { useState } from "react";
import { AppLayout } from "~/components/AppLayout/AppLayout";

function Post() {
  const [liked, setLiked] = useState(false);

  return (
    <div className="w-full px-4 py-4">
      <header className="flex items-start">
        <Badge
          placement="top-start"
          overlap="circular"
          color="blue-gray"
          withBorder
          className="shrink-0"
        >
          <Avatar
            size="md"
            className="object-center"
            src="/profile-2.jpg"
            alt="avatar"
          />
        </Badge>

        <div className="ml-2">
          <h2 className="text-teal font-bold">Yiannis M.</h2>
          <h2 className="text-gray-500 text-sm font-medium">
            Chef - Mediterranean Cuisine, Experience in Hotel and Restaurant
          </h2>
        </div>
      </header>

      <div className="mt-4 space-y-4 text-gray-800">
        <p>Hey there!.</p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid
          culpa explicabo eligendi nulla, voluptate amet deleniti et qui
          sapiente exercitationem adipisci cupiditate at ex commodi totam
          possimus. Quaerat, ipsam earum.
        </p>
      </div>

      <div className="border-b border-t-gray-300 py-1 text-sm text-gray-700 flex gap-x-6">
        <div className="flex items-center gap-x-1">
          <IconButton variant="text" onClick={() => setLiked((x) => !x)}>
            {liked ? (
              <IconThumbUpFilled className="text-teal" size={21} />
            ) : (
              <IconThumbUp className="text-gray-700" size={21} />
            )}
          </IconButton>
          <span>124</span>
        </div>
      </div>
    </div>
  );
}

export default function Community() {
  return (
    <AppLayout>
      <div className="pb-8 pt-3">
        <div className="max-w-4xl mx-auto">
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </div>
    </AppLayout>
  );
}
