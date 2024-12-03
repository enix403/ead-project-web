"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

import { AppLayout } from "~/components/AppLayout/AppLayout";

export default function UserProfile({ params }: { params: any }) {
  return (
    <AppLayout params={params}>
      <div className="max-w-7xl mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <Card className="border-2 shadow-md">
            <CardBody>
              <div className="flex flex-col items-center">
                <img
                  className="w-32 h-32 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                  alt="Profile Picture"
                />
                <h2 className="text-2xl font-bold mt-4 text-teal">Yiannis M.</h2>
                <p className="text-gray-500">Front-end Developer</p>
                <p className="text-gray-500">San Francisco, USA</p>
              </div>
              <div className="mt-6">
                <p className="text-gray-700 mb-2">
                  <strong>Email address:</strong> yourname@flowbite.com
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Home address:</strong> 92 Miles Drive, Newark, NJ
                  07103, California, United States of America
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Phone number:</strong> +00 123 456 789 / +12 345 678
                </p>
              </div>
            </CardBody>
          </Card>
          {/* Right Column */}
          <Card className="lg:col-span-2 border-2 shadow-md">
            <CardBody>
              <h3 className="text-xl font-bold mb-4">General information</h3>
              <div>
                <h4 className="text-lg font-semibold">About me</h4>
                <p className="text-gray-700 mb-4">
                  Tincidunt quam neque in cursus viverra orci, dapibus nec
                  tristique. Nullam ut sit dolor consectetur urna, dui cras nec
                  sed. Cursus risus congue arcu aenean posuere aliquam.
                </p>
                <p className="text-gray-700 mb-4">
                  Et vivamus lorem pulvinar nascetur non. Pulvinar a sed platea
                  rhoncus ac mauris amet. Urna, sem pretium sit pretium urna,
                  senectus vitae. Scelerisque fermentum, cursus felis dui
                  suspendisse velit pharetra.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <p>
                    <strong>Education:</strong> Thomas Jeff High School,
                    Stanford University
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Work History:</strong> Twitch, Google, Apple
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Join Date:</strong> 12-09-2021
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Languages:</strong> English, German, Italian,
                    Spanish
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Organization:</strong> Themesberg LLC
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Role:</strong> Graphic Designer
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Department:</strong> Marketing
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Birthday:</strong> 15-08-1990
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
