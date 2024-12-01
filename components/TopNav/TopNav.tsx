import "react-modern-drawer/dist/index.css";

import Logo from "./assets/logo-big.png";
import MessageIcon from "./assets/message.svg";
import BellIcon from "./assets/notification.svg";
import ProfileImage from "~/app/assets/profile-1.webp";

import Drawer from "react-modern-drawer";
import Image from "next/image";

import clsx from "clsx";
import { IconButton } from "@material-tailwind/react";
import Link from "next/link";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { Button } from "../Button/Button";
import { useState } from "react";

export interface TopNavProps {
  pageTitle?: string;
  showSearchButton?: boolean;
}

function DesktopLinks() {
  return (
    <>
      <Link href="/">Home</Link>
      <Link href="/proposal">Proposals</Link>
      <Link href="/job-user">Jobs</Link>
      <Link href="/job-employee">Find Emloyers</Link>
      <Link href="#">Messages</Link>
      <Link href="/about">About us</Link>
      <Link href="/contact">Contact us</Link>
    </>
  );
}

function Contents({ pageTitle }: TopNavProps) {
  let loggedIn = false;

  return (
    <>
      <div className="flex justify-between items-center">
        <Image alt="" src={Logo} className="h-7 w-auto lg:h-10" />
        <div className="flex gap-x-3.5 items-center">
          {loggedIn ? (
            <>
              <IconButton variant="text" className={"wl:block"}>
                <MessageIcon className="w-5" />
              </IconButton>
              <IconButton variant="text" className={"wl:block"}>
                <div className="relative">
                  <BellIcon className="w-5" />
                  <div className="w-2.5 h-2.5 bg-teal absolute rounded-full top-0 right-0 -translate-y-1/3" />
                </div>
              </IconButton>

              <button className={clsx("wl:block hidden")}>
                <Image
                  src={ProfileImage}
                  alt=""
                  className="w-11 h-11 rounded-full"
                />
              </button>
            </>
          ) : (
            <Link href="/auth">
              <Button className="!px-4 !py-1.5 text-sm">
                Register / Login
              </Button>
            </Link>
          )}

          {/* ============ */}
          <MobileDrawer loggedIn={loggedIn} />
        </div>
      </div>
      <div className="absolute left-1/2 h-full -translate-x-1/2 top-0 flex items-center">
        <div
          className={clsx(
            "font-medium gap-x-4 wl:gap-x-7 xl:gap-x-9 whitespace-nowrap",
            "hover:[&>a]:underline",
            "wl:flex hidden"
          )}
        >
          <DesktopLinks />
        </div>
        <h1 className="text-2xl font-semibold wl:hidden block">{pageTitle}</h1>
      </div>
    </>
  );
}

export function MobileDrawer({ loggedIn }: { loggedIn: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton
        onClick={() => setIsOpen(true)}
        className="wl:hidden block"
        variant="text"
      >
        <IconMenu2 className="w-20" />
      </IconButton>

      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        direction="right"
        overlayOpacity={0.6}
        duration={200}
        lockBackgroundScroll
        className="!w-[85vw] ph:!w-[300px] p-4"
      >
        <div className="flex justify-between items-center">
          <Image alt="" src={Logo} className="h-7 w-auto lg:h-10" />
          <IconButton
            onClick={() => setIsOpen(false)}
            variant="text"
            className={"wl:block"}
          >
            <IconX className="w-6" />
          </IconButton>
        </div>

        <div className="flex flex-col gap-y-3 mt-8 hover:[&>a]:underline">
          <Link href="/">Home</Link>
          <Link href="/proposal">Proposals</Link>
          <Link href="/job-user">Jobs</Link>
          <Link href="/job-employee">Find Emloyers</Link>
          <Link href="#">Messages</Link>
          <Link href="/about">About us</Link>
          <Link href="/contact">Contact us</Link>
        </div>

        {/* {!loggedIn && (
          <Link href="/auth" className="block mt-8">
            <Button className="!px-4d !py-2d">Register / Login</Button>
          </Link>
        )} */}
      </Drawer>
    </>
  );
}

export function TopNav(props: TopNavProps) {
  return (
    <nav className="bg-teal/5 border-b border-b-gray-line-2/30">
      <div className="app-container py-4 relative">
        <Contents {...props} />
      </div>
    </nav>
  );
}
