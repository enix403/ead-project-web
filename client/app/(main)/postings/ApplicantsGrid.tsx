import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { IconCheck, IconX } from "@tabler/icons-react";

export function ApplicantsGrid({ applications }: { applications: any[] }) {
  return (
    <div className="grid grid-cols-3 gap-6 mt-4">
      {applications.map((application) => (
        <ApplicantCell key={application._id} application={application} />
      ))}
    </div>
  );
}

function ApplicantCell({ application }: { application: any }) {
  return (
    <Card className="border-2 border-teal-dark">
      <CardHeader floated={false}>
        <img src="/profile-2.jpg" />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h6" color="blue-gray">
          Yiannis Andrew
        </Typography>
        <Typography variant="small" color="gray" className="font-normal">
          Senior Software Engineer at Apple | 2021 - 2024
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 flex items-center justify-center gap-x-2">
        <Tooltip content="Interested">
          <IconButton color="green" variant="text">
            <IconCheck />
          </IconButton>
        </Tooltip>
        <Tooltip content="Not Interested">
          <IconButton color="red" variant="text">
            <IconX />
          </IconButton>
        </Tooltip>
      </CardFooter>
    </Card>
  );
}
