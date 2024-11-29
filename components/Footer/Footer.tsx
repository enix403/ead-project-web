import IconFacebook from './assets/facebook.svg';
import IconTwitter from './assets/twitter.svg';
import IconInstagram from './assets/instagram.svg';

import clsx from "clsx";
import { FooterProps } from "react-html-props";
import { combineVisualProps } from "../VisualComponent";

function SocialIcon({ imageSrc, href }: { imageSrc: string; href?: string }) {
  return (
    <a
      href={href ?? "#"}
      className='p-1.5 tc rounded-lg hover:bg-black/20 active:bg-black/40'
    >
      <img src={imageSrc} className='w-6' />
    </a>
  );
}

export function Footer(props: FooterProps) {
  return (
    <footer
      {...combineVisualProps(props, {
        className:
          "bg-x-purple py-10 flex flex-col justify-center items-center text-white"
      })}
    >
      <div
        className={clsx(
          "flex font-medium text-lg gap-x-8 md:gap-x-16 whitespace-nowrap",
          "hover:[&>a]:underline"
        )}
      >
        <a href='#'>Home</a>
        <a href='#'>Experience</a>
        <a href='#'>News</a>
        <a href='#'>About us</a>
        <a href='#'>Jobs</a>
        <a href='#'>Contact</a>
      </div>
      <div className='flex gap-x-3 mt-8'>
        <SocialIcon imageSrc={IconFacebook} />
        <SocialIcon imageSrc={IconTwitter} />
        <SocialIcon imageSrc={IconInstagram} />
      </div>

      <h3 className='mt-7 font-medium text-white opacity-75'>Seasonistas</h3>
    </footer>
  );
}
