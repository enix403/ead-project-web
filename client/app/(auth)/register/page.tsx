"use client";

import HeroImg from "~/app/assets/auth-hero.jpg";
import GoogleIcon from "~/app/assets/google.svg";

import Image from "next/image";

import { useEffect, useState } from "react";
import { Button } from "~/components/Button/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { AuthInput, PasswordInput } from "../common";
import { useForm, UseFormRegister } from "react-hook-form";

function LoginNote() {
  return (
    <p className="mt-4 text-center text-black/60 font-medium">
      Already have an account?{" "}
      <Link href="#" className="text-teal underline hover:text-teal-dark tc">
        Sign in
      </Link>
    </p>
  );
}

function CandidateForm({ register }: { register: UseFormRegister<any> }) {
  return (
    <>
      {/* prettier-ignore */}
      <div className="space-y-4">
        <AuthInput {...register("fullName")} label="Your Name" />
        <AuthInput {...register("dateOfBirth")} label="Date Of Birth" type="date" />

        <AuthInput {...register("email")} label="Email" />
        <PasswordInput {...register("password")} label="Password" />
        <PasswordInput {...register("confirmPassword")} label="Confirm Password" />
      </div>

      <Button type="submit" fullWidth className="mt-6">
        Sign Up
      </Button>

      <div className="flex items-center gap-x-2 my-4">
        <div className="h-0.5 w-full bg-gray-line" />
        <p className="font-medium text-gray-prose">or</p>
        <div className="h-0.5 w-full bg-gray-line" />
      </div>

      <Button type="button" fullWidth variant="light" className="gap-x-2 mb-4">
        Continue with Google
        <GoogleIcon className="w-[18px]" />
      </Button>

      <LoginNote />
    </>
  );
}

function EmployerForm({ register }: { register: UseFormRegister<any> }) {
  return (
    <>
      {/* prettier-ignore */}
      <div className="space-y-4">
        <AuthInput {...register("fullName")} label="Company Name" />
        <AuthInput {...register("companyPhone")} label="Company Phone Number" />
        <AuthInput {...register("companyPersonName")} label="Company Person Name" />
        <AuthInput {...register("companyIndustry")} label="Company Industry" />
        <AuthInput {...register("companyArea")} label="Company Address" />

        <AuthInput {...register("email")} label="Email" />
        <PasswordInput {...register("password")} label="Password" />
        <PasswordInput {...register("confirmPassword")} label="Confirm Password" />
      </div>

      <Button fullWidth className="mt-6">
        Sign Up
      </Button>

      <LoginNote />
    </>
  );
}

function RegisterFormContent() {
  type FormMode = "candidate" | "employer";
  const [currentMode, setCurrentMode] = useState<FormMode>("candidate");
  const getButtonVariant = (mode: FormMode) =>
    mode === currentMode ? "filled" : "outlined";

  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<any>();

  function handleRegister(values: any) {
    console.log(values);
    // TODO: fill role
  }

  useEffect(() => {
    reset();
  }, [reset, currentMode]);

  return (
    <>
      <h1 className="text-4xl font-semibold text-center md:text-left">
        Sign up
      </h1>
      <p className="text-black/60 font-medium text-lg mt-3.5 text-center md:text-left">
        Sign up to enjoy the feature of Seasonistas
      </p>

      <form onSubmit={handleSubmit(handleRegister)}>
        <div className="flex max-md:mx-auto gap-x-4 max-w-[22rem] md:max-w-[30rem] mt-5 mb-8">
          <Button
            type="button"
            className="flex-1"
            variant={getButtonVariant("candidate")}
            onClick={() => setCurrentMode("candidate")}
          >
            Candidate
          </Button>
          <Button
            type="button"
            className="flex-1"
            variant={getButtonVariant("employer")}
            onClick={() => setCurrentMode("employer")}
          >
            Employer
          </Button>
        </div>

        {currentMode === "candidate" ? (
          <CandidateForm register={register} />
        ) : (
          <EmployerForm register={register} />
        )}
      </form>
    </>
  );
}

export default function Register() {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 md:min-w-[30rem]">
        <div className="px-8 md:px-12 lg:px-20 xl:px-28 pt-12 md:pt-28 pb-14">
          <RegisterFormContent />
        </div>
      </div>
      <div className="max-w-[60%] hidden md:block p-3">
        <Image
          alt=""
          src={HeroImg}
          className="h-full rounded-3xl object-cover object-[center_top]"
        />
      </div>
    </div>
  );
}
