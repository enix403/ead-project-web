"use client";

import {
  Card,
  CardBody,
  Avatar,
  Tabs,
  TabsHeader,
  Tab,
  Chip,
  Spinner,
} from "@material-tailwind/react";

import { IconMail, IconMap2, IconPhoneCall } from "@tabler/icons-react";

import { Button } from "~/components/Button/Button";
import { repeatNode } from "~/app/utils/markup";
import { AppLayout } from "~/components/AppLayout/AppLayout";
import { useParams } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { apiRoutes } from "~/app/api-routes";
import { useQuery } from "@tanstack/react-query";

export default function UserProfile() {
  const { userId } = useParams<{ userId: string }>();

  const [status, setStatus] = useState<"ok" | "loading" | "error">("loading");
  const [user, setUser] = useState<any>(null);

  useLayoutEffect(() => {
    async function loadUser() {
      try {
        const user = await apiRoutes.getUser(userId);
        console.log(user);
        setUser(user);
        setStatus("ok");
      } catch {
        setStatus("error");
      }
    }

    setStatus("loading");
    setUser(null);
    loadUser();
  }, [userId]);

  return (
    <>
      <>{status === "ok" && user && <Contents user={user} />}</>
    </>
  );
}

function Contents({ user }: any) {
  const connectionCount = user["friendsWith"].length + user["friendsOf"].length;
  return (
    <AppLayout>
      <div className="app-container max-w-6xl w-full mt-8 grid grid-cols-3 gap-6">
        {/* Left Sidebar (Main Profile Section) */}
        <div className="col-span-2">
          {/* Profile Header */}
          <Card className="shadow-md rounded-lg mb-8">
            <div className="relative">
              {/* Cover Image */}
              {/* <div className="h-40 bg-gray-300"></div> */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/cover-1.jpg"
                alt="Cover Image"
                className="h-44 w-full object-cover"
              />

              {/* Profile Picture */}
              <div className="absolute -bottom-16 left-6">
                <Avatar
                  src="/profile_empty_gradient.png"
                  alt="Profile Picture"
                  className="w-32 h-32 border-4 border-white"
                />
              </div>
            </div>

            {/* User Info */}
            <CardBody className="pt-16">
              <h1 className="text-2xl font-semibold">{user.fullName}</h1>
              <p className="text-gray-600">Software Developer at XYZ Corp</p>
              <p className="text-gray-600">
                San Francisco, California, United States
              </p>
              <p className="mt-2 text-sm text-gray-500">
                {connectionCount} connection(s)
              </p>

              {/* Buttons */}
              <div className="mt-4 flex space-x-4">
                <Button fullRounded>Connect</Button>
                <Button fullRounded variant="outlined">
                  Message
                </Button>
              </div>
            </CardBody>
          </Card>

          {/* Tabs Section */}
          <Card className="shadow-md rounded-lg mb-8">
            <Tabs value="profile">
              <TabsHeader className="border-b border-gray-200">
                <Tab value="profile">Profile</Tab>
                <Tab value="about">About</Tab>
                <Tab value="experience">Experience</Tab>
                <Tab value="education">Education</Tab>
                <Tab value="skills">Skills</Tab>
              </TabsHeader>

              {/* Profile Details */}
              <CardBody>
                <h2 className="text-xl font-semibold mb-4">About</h2>
                <p className="text-gray-700">
                  Experienced software developer with a passion for building
                  scalable web applications and working with modern JavaScript
                  frameworks. Proficient in full-stack development.
                </p>

                <div className="mt-6 divide-y-2">
                  <p className="text-gray-700 py-4">
                    <p className="font-bold text-xl text-purple-400 flex gap-x-2 items-center mb-3">
                      <IconMail size={28} />
                      <span>Email address:</span>
                    </p>
                    <p>{user.email}</p>
                  </p>
                  <p className="text-gray-700 py-4">
                    <p className="font-bold text-xl text-blue-400 flex gap-x-2 items-center mb-3">
                      <IconMap2 size={28} />
                      <span>Home address:</span>
                    </p>
                    <p>
                      92 Miles Drive, Newark, NJ 07103, California, United
                      States of America
                    </p>
                  </p>
                  <p className="text-gray-700 py-4">
                    <p className="font-bold text-xl text-pink-400 flex gap-x-2 items-center mb-3">
                      <IconPhoneCall size={28} />
                      <span>Phone number:</span>
                    </p>
                    <p>+00 123 456 789 / +12 345 678</p>
                  </p>
                </div>
              </CardBody>
            </Tabs>
          </Card>

          {/* Experience Section */}
          <Card className="shadow-md rounded-lg mb-8">
            <CardBody>
              <h2 className="text-xl font-semibold mb-4">Experience</h2>
              <div className="mb-4">
                <h3 className="font-semibold">Software Developer</h3>
                <p className="text-gray-600">XYZ Corp</p>
                <p className="text-gray-500 text-sm">
                  Jan 2020 - Present · 3 yrs
                </p>
                <p className="text-gray-700">
                  Working on building web applications using React, Node.js, and
                  GraphQL.
                </p>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold">Junior Developer</h3>
                <p className="text-gray-600">ABC Inc.</p>
                <p className="text-gray-500 text-sm">
                  Jun 2018 - Dec 2019 · 1 yr 6 mos
                </p>
                <p className="text-gray-700">
                  Assisted in developing internal tools and dashboards for
                  monitoring company-wide metrics.
                </p>
              </div>
            </CardBody>
          </Card>

          {/* Skills Section */}
          <Card className="shadow-md rounded-lg mb-8">
            <CardBody>
              <h2 className="text-xl font-semibold mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                <Chip value="JavaScript" color="green" />
                <Chip value="React" color="green" />
                <Chip value="Node.js" color="green" />
                <Chip value="GraphQL" color="green" />
                <Chip value="Tailwind CSS" color="green" />
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-1 space-y-8">
          {/* People You May Know Section */}
          <Card className="shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">People you may know</h2>
            <div className="divide-y-2">
              <PeopleYouMayKnowList currentUser={user} />
            </div>
          </Card>

          {/* Advertisement Section */}
          <Card className="shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Advertisement</h2>
            <div className="bg-gray-300 h-40 mb-4"></div>
            <p className="text-gray-600 text-sm">
              Ad content here. Promote your business or get more visibility
              through LinkedIn ads.
            </p>
          </Card>

          <div className="h-24" />
        </div>
      </div>
    </AppLayout>
  );
}

function PeopleYouMayKnowList({ currentUser }) {
  const { isLoading, data: users } = useQuery<any[]>({
    queryKey: ["getCommunityPYMK"],
    queryFn: () => apiRoutes.getCommunity(),
    initialData: [],
    placeholderData: [],
  });

  if (isLoading) {
    return <Spinner color="blue-gray" width={32} height={32} />;
  }

  return (
    <>
      {users
        .filter((user) => user["_id"] !== currentUser["_id"])
        .map((user) => (
          <UserYouMayKnow key={user["_id"]} user={user} />
        ))}
    </>
  );
}

function UserYouMayKnow({ user }: any) {
  return (
    <div className="flex items-center space-x-4 py-3">
      <Avatar
        src="/profile_empty_gradient.png"
        alt={user.fullName}
        className="w-12 h-12 rounded-full"
      />
      <div>
        <p className="font-semibold">{user.fullName}</p>
        <p className="text-gray-600 text-sm">UI/UX Designer</p>
        <Button color="blue" className="mt-2 !py-1 !px-1">
          Connect
        </Button>
      </div>
    </div>
  );
}
