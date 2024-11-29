'use client';

import HeroImg from "./auth-hero.jpg";
import GoogleIcon from "./google.svg";

import Image from 'next/image';

import { Input, IconButton } from "@material-tailwind/react";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import { ComponentProps, useState } from "react";
import { Button } from "~/components/Button/Button";

const AppInput = (props: ComponentProps<typeof Input>) => (
  <Input {...props} color='blue-gray' className='!text-black' />
);

const PasswordInput = (props: ComponentProps<typeof Input>) => {
  const [see, setSee] = useState(false);

  let Icon = see ? IconEyeClosed : IconEye;

  return (
    <AppInput
      {...props}
      tabIndex={-1}
      type={see ? "text" : "password"}
      icon={
        <IconButton
          onClick={() => setSee(prev => !prev)}
          variant='text'
          size='sm'
          className='relative -top-1.5 right-1.5 !text-black/60'
        >
          <Icon size={20} stroke={1} />
        </IconButton>
      }
    />
  );
};

function LoginNote() {
  return (
    <p className='mt-4 text-center text-black/60 font-medium'>
      Already have an account?{" "}
      <a className='text-teal underline hover:text-teal-dark tc' href='#'>
        Sign in
      </a>
    </p>
  );
}

function EmployerForm() {
  return (
    <>
      <div className='space-y-4'>
        <AppInput label='Company Name' />
        <AppInput label='Company Address' />
        <AppInput label='Contact Person Name' />
        <AppInput label='Contact Email' />
        <AppInput label='Contact Phone Number' />
        <AppInput label='Contact Phone Number' />
        <AppInput label='Industry' />
        <PasswordInput label='Password' />
        <PasswordInput label='Confirm Password' />
      </div>

      <Button fullWidth className='mt-6'>
        Sign Up
      </Button>
      <LoginNote />
    </>
  );
}

function CandidateForm() {
  return (
    <>
      <div className='space-y-4'>
        <AppInput label='Your Name' />
        <AppInput label='Date Of Birth' type='date' />
        <AppInput label='Email' />
        <PasswordInput label='Password' />
        <PasswordInput label='Confirm Password' />
      </div>

      <Button fullWidth className='mt-6'>
        Sign Up
      </Button>

      <div className='flex items-center gap-x-2 my-4'>
        <div className='h-0.5 w-full bg-gray-line' />
        <p className='font-medium text-gray-prose'>or</p>
        <div className='h-0.5 w-full bg-gray-line' />
      </div>

      <Button fullWidth variant='light' className='gap-x-2 mb-4'>
        Continue with Google
        <GoogleIcon className='w-[18px]' />
      </Button>

      <LoginNote />
    </>
  );
}

function SignUpFormContent() {
  type FormMode = "candidate" | "employer";
  const [currentMode, setCurrentMode] = useState<FormMode>("candidate");

  function getButtonVariant(mode: FormMode) {
    return mode === currentMode ? "filled" : "outlined";
  }

  return (
    <>
      <h1 className='text-4xl font-semibold'>Sign up</h1>
      <p className='text-black/60 font-medium text-lg mt-3.5'>
        Sign up to enjoy the feature of Seasonistas
      </p>

      <div className='flex gap-x-4 max-w-[30rem] mt-5 mb-8'>
        <Button
          className='flex-1'
          variant={getButtonVariant("candidate")}
          onClick={() => setCurrentMode("candidate")}
        >
          Candidate
        </Button>
        <Button
          className='flex-1'
          variant={getButtonVariant("employer")}
          onClick={() => setCurrentMode("employer")}
        >
          Employer
        </Button>
      </div>

      {currentMode === "candidate" ? <CandidateForm /> : <EmployerForm />}
    </>
  );
}

export default function SignUp() {
  return (
    <div className='flex min-h-screen'>
      <div className='flex-1 md:min-w-[30rem]'>
        <div className='px-6 md:px-12 lg:px-20 xl:px-28 pt-12 md:pt-28 pb-14'>
          <SignUpFormContent />
        </div>
      </div>
      <div className='max-w-[60%] hidden md:block p-3'>
        <Image
          alt=""
          src={HeroImg}
          className='h-full rounded-3xl object-cover object-[center_top]'
        />
      </div>
    </div>
  );
}
