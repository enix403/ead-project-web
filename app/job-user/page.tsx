'use client';

import HiringIcon from "~/app/assets/icon-hiring.svg";
import JobImage from '~/app/assets/job-1.jpg';

import Image from 'next/image';

import { AppLayout } from "~/components/AppLayout/AppLayout";
import { IconButton } from "@material-tailwind/react";
import {
  IconChevronDown,
  IconHeartFilled,
  IconSearch
} from "@tabler/icons-react";
import clsx from "clsx";
import { useState } from "react";
import { Button } from "~/components/Button/Button";
import { Filters } from "./Filters";

function JobListing() {
  const [fav, setFav] = useState(false);

  return (
    <div className='flex gap-x-4 items-start first:border-t-0 border-t border-gray-line-2 py-6'>
      <Image src={JobImage} alt="" className='w-16 rounded shrink-0' />
      <div className='flex-1'>
        <h2 className='font-semibold text-xl'>UX Designer</h2>
        <h3 className='font-semibold text-lg mt-2'>Bionic</h3>
        <h4 className='text-black/50 mt-2'>London, England, United Kindgom</h4>
        <p className='flex items-center gap-x-1 mt-2 text-black/50'>
          <HiringIcon />
          Actively Hiring
        </p>
        <p className='text-teal font-bold mt-2'>8 hours ago</p>
      </div>
      <IconButton
        className='shrink-0'
        variant='text'
        onClick={() => setFav(prev => !prev)}
      >
        <IconHeartFilled
          className={clsx(fav ? "text-teal" : "text-black/30")}
        />
      </IconButton>
    </div>
  );
}

function TopFilterBar() {
  return (
    <div className='flex border flex-1 border-black/20 rounded-xl overflow-hidden items-stretch divide-x divide-black/20'>
      <div className='flex p-2.5 gap-x-1.5'>
        <select className='appearance-none bg-transparent'>
          <option>Job Type</option>
          <option>Role Type</option>
        </select>
        <IconChevronDown
          size={17}
          className='self-center pointer-events-none'
        />
      </div>
      <input
        size={1}
        className='outline-none flex-1 p-2.5'
        placeholder='Enter'
        defaultValue='Ui Designer'
      />
      <input
        size={1}
        className='outline-none flex-1 p-2.5'
        placeholder='Enter'
        defaultValue='United Kingdom'
      />
      <button className='px-3 hover:bg-teal/5 tc active:bg-teal/10'>
        <IconSearch size={18} />
      </button>
    </div>
  );
}

export default function UserJobPanel() {
  return (
    <AppLayout>
      <div>
        <div className='app-container py-8'>
          <div className='flex max-md:flex-col gap-4'>
            <TopFilterBar />
            <Button variant='outlined'>Employers / Post Job</Button>
          </div>
          <h2 className='text-black/50 mt-6'>
            Show <span className='font-extrabold'>10</span> Jobs
          </h2>

          <div className='flex max-md:flex-col-reverse pt-4 max-md:items-stretch gap-6 items-start'>
            <div className='flex-1'>
              <div>
                <JobListing />
                <JobListing />
                <JobListing />
                <JobListing />
              </div>

              <Button variant='text' className='mx-auto'>
                Show More
              </Button>
            </div>
            <Filters />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
