import "react-modern-drawer/dist/index.css";

import Logo from "./assets/logo-big.png";
import MessageIcon from "./assets/message.svg";
// import ProfileImage from "~/app/assets/profile-1.webp";

import { US } from "country-flag-icons/react/3x2";

import Drawer from "react-modern-drawer";
import Image from "next/image";

import { IconButton } from "@material-tailwind/react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";

import clsx from "clsx";
import Link from "next/link";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { Button } from "../Button/Button";

import { atom, useAtom, useSetAtom } from "jotai";
import { AllLinks } from "../AllLinks";

import { languageDrawerAtom } from "../AppLayout/LanguageDrawer";
import { currencyDrawerAtom } from "../AppLayout/CurrencyDrawer";
import { useAuthState } from "~/app/providers/auth-state";
import { usePathname, useRouter } from "next/navigation";
import { useCurrentUser } from "~/app/hooks/useCurrentUser";
import { useEffect } from "react";

export interface TopNavProps {
  pageTitle?: string;
}

function capitalize(str: string | undefined) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : str;
}

const drawerAtom = atom(false);

function Contents({ pageTitle }: TopNavProps) {
  const router = useRouter();
  const setDrawerOpen = useSetAtom(drawerAtom);
  const setLanguageDrawerOpen = useSetAtom(languageDrawerAtom);
  const setCurrencyDrawerOpen = useSetAtom(currencyDrawerAtom);

  const { userId, userRole, logout } = useAuthState();
  // TODO: store user name in store
  const { user } = useCurrentUser(userId);

  let loggedIn = true;

  return (
    <>
      <div className="flex justify-between items-center">
        <Link href={`/home`}>
          <Image alt="" src={Logo} className="h-7 w-auto lg:h-10" />
        </Link>
        <div className="flex gap-x-1 items-center">
          {loggedIn ? (
            <>
              <Link href={`/chat`}>
                <IconButton variant="text">
                  <MessageIcon className="w-5" />
                </IconButton>
              </Link>

              <Menu>
                <MenuHandler>
                  <button>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/profile_empty_gradient.png"
                      alt=""
                      className="w-8 h-8 rounded-full ml-2.5"
                    />
                  </button>
                </MenuHandler>
                <MenuList>
                  <div className="px-4 pt-2 pb-4 text-center space-y-2">
                    <h1 className="text-lg text-black">{user?.fullName}</h1>
                    <h2 className="text-sm text-gray-line-3/80 font-bold">
                      {capitalize(user?.role)}
                    </h2>
                  </div>
                  {/* ======= */}
                  <MenuItem
                    onClick={() => setLanguageDrawerOpen(true)}
                    className="flex justify-between items-center"
                  >
                    Change language
                    <US title="United States" className="w-5" />
                  </MenuItem>
                  <MenuItem
                    onClick={() => setCurrencyDrawerOpen(true)}
                    className="flex justify-between items-center"
                  >
                    Change currency
                    <span className="text-xs font-bold">EUR</span>
                  </MenuItem>
                  <MenuItem>Add card</MenuItem>
                  <MenuItem
                    onClick={() => {
                      logout();
                      router.push("/login");
                    }}
                  >
                    Logout
                  </MenuItem>
                  {/* ======= */}
                </MenuList>
              </Menu>
            </>
          ) : (
            <Link href="/login" className="hidden ph:block">
              <Button className="!px-4 !py-1.5 text-sm">
                Register / Login
              </Button>
            </Link>
          )}

          {/* ============ */}
          <IconButton
            onClick={() => setDrawerOpen(true)}
            className="wl:hidden block"
            variant="text"
          >
            <IconMenu2 className="w-20" />
          </IconButton>
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
          <AllLinks />
        </div>
        <h1 className="text-2xl font-semibold wl:hidden max-ph:hidden block">
          {pageTitle}
        </h1>
      </div>

      <div className="absolute top-0 left-0">
        <MobileDrawer loggedIn={loggedIn} />
      </div>
    </>
  );
}

export function MobileDrawer({ loggedIn }: { loggedIn: boolean }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useAtom(drawerAtom);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, setIsOpen]);

  return (
    <>
      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        direction="right"
        overlayOpacity={0.6}
        duration={200}
        lockBackgroundScroll
        className="!w-[65vw] ph:!w-[300px] p-4"
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

        <div className="flex flex-col gap-y-3 mt-8 hover:[&>a]:underline text-xl">
          <AllLinks />
        </div>

        {!loggedIn && (
          <Link href="/auth" className="block mt-8">
            <Button className="!px-4d !py-2d">Register / Login</Button>
          </Link>
        )}
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
