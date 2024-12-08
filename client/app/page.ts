"use client";

import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

export default function ClientRoot() {
  const router = useRouter();

  useLayoutEffect(() => {
    router.replace("/home");
  }, []);

  return null;
}
