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
          "bg-x-purple py-10 flex flex-col justify-center items-center text-white",
          "max-w-screen overflow-x-auto"
        ],
      })}
    >
      <div
        className={clsx(
          "flex font-medium text-lg gap-x-8 md:gap-x-16 whitespace-nowrap",
          "hover:[&>a]:underline"
        )}
      >
        <Link href="/">Home</Link>
        <Link href="/proposal">Proposals</Link>
        <Link href="/job-user">Jobs</Link>
        <Link href="/job-employee">Find Employers</Link>
        <Link href="#">Messages</Link>
        <Link href="/about">About us</Link>
        <Link href="/contact">Contact us</Link>
      </div>
      <div className="flex gap-x-3 mt-8">
        <SocialIcon imageSrc={IconFacebook} />
        <SocialIcon imageSrc={IconTwitter} />
        <SocialIcon imageSrc={IconInstagram} />
      </div>

      <h3 className="mt-7 font-medium text-white opacity-75">Seasonistas</h3>
    </footer>
  );
}
