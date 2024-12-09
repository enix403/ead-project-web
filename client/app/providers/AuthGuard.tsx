"use client";

import { PropsWithChildren, useLayoutEffect, useRef } from "react";
import { getAuthState, useAuthState } from "./auth-state";
import { usePathname, useRouter } from "next/navigation";

export default function AuthGuard({ children }: PropsWithChildren) {
  const router = useRouter();
  const pathname = usePathname();
  const reactiveAuthState = useAuthState();

  useLayoutEffect(() => {
    const { isLoggedIn } = getAuthState();
    if (!isLoggedIn) {
      router.replace("/login");
    } else if ((isLoggedIn && pathname === "/login") || pathname === "/") {
      router.replace("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reactiveAuthState.isLoggedIn]);

  return children;
}
