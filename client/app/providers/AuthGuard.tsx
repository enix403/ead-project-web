'use client';

import { PropsWithChildren, useLayoutEffect, useRef } from "react";
import { getAuthState, useAuthState } from "./auth-state";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }: PropsWithChildren) {
  const router = useRouter();
  // const reactiveAuthState = useAuthState();

  useLayoutEffect(() => {
    const { isLoggedIn } = getAuthState();
    if (!isLoggedIn) {
      router.replace("/login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
}
