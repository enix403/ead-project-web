import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { apiRoutes } from "~/app/api-routes";
import { useInterestMarker } from "./common";

export function ApplicantsList({ applications }: { applications: any[] }) {
  return (
    <List>
      {applications.map((application) => (
        <ApplicantRow key={application._id} application={application} />
      ))}
    </List>
  );
}

function ApplicantRow({ application }: { application: any }) {
  const applicant = application["applicant"];
  const interestMarker = useInterestMarker(application);

  return (
    <ListItem ripple={false}>
      <ListItemPrefix>
        <Avatar variant="circular" alt="User" src="/profile_empty_gradient.png" />
      </ListItemPrefix>
      <div>
        <Typography variant="h6" color="blue-gray">
          {applicant.fullName}
        </Typography>
        <Typography variant="small" color="gray" className="font-normal">
          Senior Software Engineer at Apple | 2021 - 2024
        </Typography>
      </div>
      <ListItemSuffix className="flex items-center gap-x-4">
        {/* Yes / No */}
        <Tooltip content="Interested">
          <IconButton
            color="green"
            variant="text"
            disabled={interestMarker.marking}
            onClick={() => {
              interestMarker.mark(true);
            }}
          >
            <IconCheck />
          </IconButton>
        </Tooltip>
        <Tooltip content="Not Interested">
          <IconButton
            color="red"
            variant="text"
            disabled={interestMarker.marking}
            onClick={() => {
              interestMarker.mark(false);
            }}
          >
            <IconX />
          </IconButton>
        </Tooltip>
        {/* Yes / No */}
      </ListItemSuffix>
    </ListItem>
  );
}
