import { Spinner } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";

import { apiRoutes } from "~/app/api-routes";

import { CandidateCard } from "./CandidateCard";

const communityApiFilters = {
  userType: "employee",
};

export function HomeProfiles() {
  const communityQuery = useQuery<any[]>({
    queryKey: ["getCommunity", communityApiFilters],
    queryFn: () => apiRoutes.getCommunity(communityApiFilters),
    initialData: [],
    placeholderData: [],
  });

  const isLoading = communityQuery.isLoading;
  const users = communityQuery.data;

  return (
    <>
      {isLoading ? (
        <div className="flex items-center gap-x-2 py-3">
          <Spinner color="green" />
          <span>Loading...</span>
        </div>
      ) : (
        users.map((employee) => <CandidateCard key={employee["_id"]} employee={employee} />)
      )}
    </>
  );
}
