import Logo from "./assets/logo-big.png";
import MessageIcon from "./assets/message.svg";
import BellIcon from "./assets/notification.svg";

import Image from "next/image";

import clsx from "clsx";
import { IconButton } from "@material-tailwind/react";

function Contents() {
  return (
    <>
      <div className="flex justify-between items-center">
        <Image alt="" src={Logo} className="h-7 w-auto lg:h-10" />
        <div className="flex gap-x-3.5 items-center">
          <IconButton variant="text">
            <MessageIcon className="w-5" />
          </IconButton>
          <IconButton variant="text">
            <div className="relative">
              <BellIcon className="w-5" />
              <div className="w-2.5 h-2.5 bg-teal absolute rounded-full top-0 right-0 -translate-y-1/3" />
            </div>
          </IconButton>
          <button>
            <img
              src="/profile-1.webp"
              className="w-11 h-11 rounded-full"
            />
          </button>
        </div>
      </div>
      <div className="absolute left-1/2 h-full -translate-x-1/2 top-0">
        <div
          className={clsx(
            "flex-1 flex font-medium items-center h-full gap-x-4 wl:gap-x-7 xl:gap-x-9 whitespace-nowrap",
            "hover:[&>a]:underline"
          )}
        >
          <a href="#">Home</a>
          <a href="#">Proposals</a>
          <a href="#">Jobs</a>
          <a href="#">Find Emloyers</a>
          <a href="#">Messages</a>
          <a href="#">About us</a>
          <a href="#">Contact us</a>
        </div>
      </div>
    </>
  );
}

export function TopNav() {
  return (
    <nav className="bg-teal/5 border-b border-b-gray-line-2/30">
      <div className="app-container py-4 relative">
        <Contents />
      </div>
    </nav>
  );
}
