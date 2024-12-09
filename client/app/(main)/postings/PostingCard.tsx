import { Button } from "@material-tailwind/react";
import {
  IconLayoutDashboard,
  IconListDetails,
  IconScanPosition,
} from "@tabler/icons-react";
import { atom, useAtom } from "jotai";
import { useCallback } from "react";
import Link from "next/link";
import clsx from "clsx";

import { ApplicantsList } from "./ApplicantsList";
import { ApplicantsGrid } from "./ApplicantsGrid";

const displayAtom = atom<"list" | "grid">("list");

export function PostingCard({ posting }: { posting: any }) {
  const [display, setDisplay] = useAtom(displayAtom);

  const toggle = useCallback(
    () => setDisplay((x) => (x === "grid" ? "list" : "grid")),
    []
  );

  const DisplayIcon =
    display === "list" ? IconListDetails : IconLayoutDashboard;

  const active = posting.isActive || false;
  const applications = posting.applications || [];

  return (
    <div
      className={clsx(
        "rounded-xl px-5 py-5",
        active ? "border-x-purple border-2" : "border border-gray-line-2/80"
      )}
    >
      <div className="flex items-center justify-between gap-x-3">
        <span
          className={clsx(
            "bg-x-purple text-white font-bold px-2 py-1.5 text-fine rounded-md",
            !active && "invisible"
          )}
        >
          Active
        </span>
        <Link href="create-job">
          <Button
            size="lg"
            color="purple"
            variant="text"
            className="flex items-center gap-2 !px-4 !py-2"
          >
            Repost
            <IconScanPosition size={20} />
          </Button>
        </Link>
      </div>
      <h3 className="font-semibold text-lg mt-3">{posting.title}</h3>
      <p className="text-black/70 mt-1">{posting.description}</p>

      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold mt-4 mb-2">
          Applicants ({applications.length})
        </h2>
        <Button
          size="sm"
          color="blue"
          variant="text"
          className="flex items-center gap-2"
          onClick={toggle}
        >
          <DisplayIcon size={20} />
          Display: {display}
        </Button>
      </div>

      {display === "list" ? (
        <ApplicantsList applications={applications} />
      ) : (
        <ApplicantsGrid applications={applications} />
      )}

      <div className="flex items-center gap-x-4 pt-4 mt-2 border-t border-gray-line-2">
        <Button
          size="sm"
          color="red"
          variant="filled"
          className="text-[0.9375rem]"
        >
          <span className="!capitalize">Make Inactive</span>
        </Button>
      </div>
    </div>
  );
}
