'use client';

import { AppLayout } from "~/components/AppLayout/AppLayout";
import { TitleMark } from "~/components/decorations";
import { Button } from "~/components/Button/Button";
import clsx from "clsx";
import {
  IconBrandInstagram,
  IconMailFilled,
  IconPhoneFilled
} from "@tabler/icons-react";
import { FormLabel } from "~/components/FormLabel/FormLabel";
import { InputProps } from "react-html-props";
import { combineVisualProps } from "~/components/VisualComponent";

function ContactInfoBlock({ Icon, title }: { Icon: any; title: string }) {
  return (
    <div className='flex flex-col items-center max-w-sm'>
      <div
        className={clsx(
          "border-black/20 border w-14 h-14 flex items-center justify-center",
          "rounded-full"
        )}
      >
        <Icon size={27} className='text-teal' />
      </div>
      {/* <h2 className='text-xl font-semibold'>{title}</h2> */}
      <h2 className='text-md text-black/50 mt-4 font-semibold'>{title}</h2>
    </div>
  );
}

function TopSection() {
  return (
    <>
      {/* Title */}
      <h1 className='text-4xl text-center'>
        <span className='font-bold text-teal mr-1 relative bg-bdlue-600'>
          Send
          <TitleMark className='absolute w-28 top-full -left-4 -translate-y-2.5' />
        </span>
        <span className='font-normal'>Us a Message!</span>
      </h1>

      {/* Subtitle */}
      <p className='text-center text-xl font-normal text-black/50 mt-6 max-w-xl mx-auto'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        tristique mauris rhoncus odio aliquet, vitae.
      </p>

      <div className='flex justify-center  gap-x-10 sm:gap-x-20 gap-y-12 mt-12'>
        <ContactInfoBlock Icon={IconBrandInstagram} title='@Seasonistas' />
        <ContactInfoBlock Icon={IconMailFilled} title='Seasonistas' />
        <ContactInfoBlock Icon={IconPhoneFilled} title='+92 311 9293 45' />
      </div>
    </>
  );
}

const ContactInput = (props: InputProps) => (
  <input
    size={1}
    {...combineVisualProps(props, {
      className: "pt-1 pb-3 outline-none border-b border-gray-line-3"
    })}
  />
);

function FormSection() {
  return (
    <section className='mt-16'>
      <div className='flex max-md:flex-col gap-y-12 gap-x-12'>
        <FormLabel className='flex-1' label='Your Name'>
          <ContactInput placeholder='Enter your name' />
        </FormLabel>
        <FormLabel className='flex-1' label='Email Address'>
          <ContactInput placeholder='Enter your email address' />
        </FormLabel>
      </div>
      <FormLabel label='Your Message' className='mt-24'>
        <ContactInput placeholder='Hi, I think we need a website for our products at Company X. How soon can you hop on to discuss this?' />
      </FormLabel>

      <Button className='mx-auto mt-16' fullRounded>
        Submit
      </Button>
    </section>
  );
}

export default function ContactUs() {
  return (
    <AppLayout>
      <div className='app-container w-full pt-14 pb-20'>
        <TopSection />
        <FormSection />
      </div>
    </AppLayout>
  );
}
