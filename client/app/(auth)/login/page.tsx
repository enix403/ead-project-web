"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

import HeroImg from "~/app/assets/auth-hero.jpg";

import { apiRoutes } from "~/app/api-routes";
import { useAuthState } from "~/app/providers/auth-state";
import { Button } from "~/components/Button/Button";

import { AuthInput, PasswordInput } from "../common";

function LoginFormContent() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<any>();

  const authState = useAuthState();

  async function handleLogin(payload: any) {
    setLoading(true);
    apiRoutes
      .login(payload)
      .then(({ token, user }) => {
        console.log("Logged in");
        authState.login(token, user);
      })
      .catch(() => {
        toast.error("Failed to login");
        setLoading(false);
      });
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <h1 className="text-4xl font-semibold text-center md:text-left">Login</h1>
      <p className="text-black/60 font-medium text-lg mt-3.5 text-center md:text-left">
        Login to enjoy the feature of Seasonistas
      </p>

      <div className="space-y-4 mt-5">
        <AuthInput {...register("email")} label="Email" required />
        <PasswordInput {...register("password")} label="Password" required />
      </div>

      <Button type="submit" fullWidth className="mt-6" loading={loading}>
        Login
      </Button>
    </form>
  );
}

export default function Login() {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 md:min-w-[30rem]">
        <div className="px-8 md:px-12 lg:px-20 xl:px-28 pt-12 md:pt-28 pb-14">
          <LoginFormContent />
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
