"use client";

import { Spinner } from "@material-tailwind/react";

export default function ClientRoot() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <Spinner color="blue-gray" width={80} height={80} />
      <p className="mt-4">Loading Seasonistas...</p>
    </div>
  );
}
