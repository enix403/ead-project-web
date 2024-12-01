import IconFacebook from "./assets/facebook.svg";
import IconTwitter from "./assets/twitter.svg";
import IconInstagram from "./assets/instagram.svg";

import Link from "next/link";

import clsx from "clsx";
import { FooterProps } from "react-html-props";
import { combineVisualProps } from "../VisualComponent";

function SocialIcon({
  imageSrc: Icon,
  href,
}: {
  imageSrc: any;
  href?: string;
}) {
  return (
    <a
      href={href ?? "#"}
      className="p-1.5 tc rounded-lg hover:bg-black/20 active:bg-black/40"
    >
      <Icon className="w-6" />
    </a>
  );
}

export function Footer(props: FooterProps) {
  return (
    <footer
      {...combineVisualProps(props, {
        className: [
          "bg-x-purple py-10 flex flex-col justify-center px-4 ph:items-center text-white",
          "max-w-screen overflow-x-auto"
        ],
      })}
    >
      <div
        className={clsx(
          "hover:[&>a]:underline",
          "text-lg font-medium whitespace-nowrap",
          "grid",
          "grid-cols-1 ph:grid-cols-2 gap-x-6 gap-y-6",
          "justify-items-center sm:grid-cols-[repeat(6,auto)] sm:justify-items-center sm:gap-x-10"
        )}
      >
        <Link href="/">Jobs</Link>
        <Link href="/proposal">Proposals</Link>
        <Link href="/job-employee">Find Employers</Link>
        <Link href="#">Messages</Link>
        <Link href="/about">About us</Link>
        <Link href="/contact">Contact us</Link>
      </div>
      <div className="grid grid-cols-3 mt-8 justify-items-center">
        <SocialIcon imageSrc={IconFacebook} />
        <SocialIcon imageSrc={IconTwitter} />
        <SocialIcon imageSrc={IconInstagram} />
      </div>

      <h3 className="mt-7 font-medium text-white opacity-75 text-center">Seasonistas</h3>
    </footer>
  );
}
