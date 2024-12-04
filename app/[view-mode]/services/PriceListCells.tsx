import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import clsx from "clsx";
import { useContext } from "react";
import { ViewModeContext } from "~/components/AppLayout/AppLayout";
import { Button } from "~/components/Button/Button";

export function Cell({ title }: { title: string }) {
  return (
    <Card
      shadow={false}
      className="relative grid h-[34rem] w-full items-center justify-center overflow-hidden text-center"
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className={clsx(
          "absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center"
        )}
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1725308468426-9b5e227dc15c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1OHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      >
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
      </CardHeader>
      <CardBody className="relative py-14 px-6 md:px-12">
        <Typography
          variant="h2"
          color="white"
          className="mb-6 font-medium leading-[1.5]"
        >
          {title}
        </Typography>
        <Button className="mx-auto text-xl" fullRounded>
          View Price List
        </Button>
      </CardBody>
    </Card>
  );
}

export function PriceListCells() {
  const viewMode = useContext(ViewModeContext);
  return (
    <section className="flex mt-8 gap-4">
      {viewMode === "employer" ? (
        <>
          <Cell title="CV Management" />
          <Cell title="Job Postings Management" />
        </>
      ) : (
        <>
          <Cell title="CV Improvement" />
          <Cell title="CV Creation" />
        </>
      )}
    </section>
  );
}
