"use client";

import clsx from "clsx";
import { motion } from "framer-motion";

import { AppLayout } from "~/components/AppLayout/AppLayout";
import { IconSearch } from "@tabler/icons-react";
import { FormLabel } from "~/components/FormLabel/FormLabel";
import { Select } from "~/components/Select/Select";

import { PersonCard } from "./PersonCard";
import { useQuery } from "@tanstack/react-query";
import { apiRoutes } from "~/app/api-routes";
import { Spinner } from "@material-tailwind/react";

export default function Community() {
  const { isLoading, data: community } = useQuery<any[]>({
    queryKey: ["getCommunity"],
    queryFn: () => apiRoutes.getCommunity(),
    initialData: [],
    placeholderData: [],
  });

  return (
    <AppLayout>
      <div className="pb-8 pt-3 px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="mb-4 mt-5 text-2xl md:text-4xl font-semibold">
            Connect with new people and businesses
          </h3>
          <div className="mb-4 border border-black/20 rounded-xl flex-1 flex overflow-hidden px-2.5 py-2.5 gap-x-1.5">
            <IconSearch size={17} className="self-center" />
            <input
              size={1}
              className="flex-1 outline-none"
              placeholder="Search for people"
            />
          </div>

          <div
            className={clsx(
              "flex flex-col md:flex-row gap-x-4 xl:gap-x-12 gap-y-4 mb-8"
            )}
          >
            <FormLabel inline label="Location" className="flex-1">
              <Select className="flex-1">
                <option>USA</option>
                <option>Arizona</option>
                <option>Canada</option>
              </Select>
            </FormLabel>
            <FormLabel inline label="Job Type" className="flex-1">
              <Select className="flex-1">
                <option>Full-Time</option>
                <option>Part-Time</option>
                <option>Contract</option>
                <option>Internship</option>
              </Select>
            </FormLabel>
            <FormLabel inline label="Search For" className="flex-1">
              <Select className="flex-1">
                <option>All</option>
                <option>Individuals</option>
                <option>Businesses</option>
              </Select>
            </FormLabel>
          </div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {isLoading ? (
              <div className="flex items-center gap-x-2 py-3">
                <Spinner color="green" />
                <span>Loading...</span>
              </div>
            ) : (
              community.map((user, index) => (
                <PersonCard
                  key={user["_id"]}
                  index={index}
                  isFriend={[1, 2, 4].includes(index)}
                />
              ))
            )}
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
}
