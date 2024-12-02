"use client";

import { AppLayout } from "~/components/AppLayout/AppLayout";
import { Sidebar } from "./Sidebar";

import { PostJob } from "./PostJob";
import { ApplicationDetailsPrimary } from "./ApplicationDetailsPrimary";
import { ApplicationDetailsSecondary } from "./ApplicationDetailsSecondary";
import { ReactNode, useState } from "react";

export default function CreateJobPage({ params }: { params: any }) {
  const [activePage, setActivePage] = useState(0);

  function onNext() {
    setActivePage((x) => Math.min(2, x + 1));
  }

  function onCancel() {
    setActivePage((x) => Math.max(0, x - 1));
  }

  let rendered: ReactNode;

  if (activePage === 0) {
    rendered = <PostJob onNext={onNext} onCancel={onCancel} />;
  } else if (activePage === 1) {
    rendered = (
      <ApplicationDetailsPrimary onNext={onNext} onCancel={onCancel} />
    );
  } else {
    rendered = (
      <ApplicationDetailsSecondary onNext={onNext} onCancel={onCancel} />
    );
  }

  return (
    <AppLayout pageTitle="Jobs" params={params}>
      <div className="flex-1 flex items-start">
        {/* <Sidebar /> */}
        <div className="flex-1 px-7 py-8">{rendered}</div>
      </div>
    </AppLayout>
  );
}
