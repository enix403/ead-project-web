'use client';

import { AppLayout } from "~/components/AppLayout/AppLayout";
import { Sidebar } from "./Sidebar";

import { PostJob } from "./PostJob";
import { ApplicationDetailsPrimary } from "./ApplicationDetailsPrimary";
import { ApplicationDetailsSecondary } from "./ApplicationDetailsSecondary";

export default function EmployeeJobPanel() {
  return (
    <AppLayout>
      <div className='flex-1 flex items-start'>
        <Sidebar />
        <div className='flex-1 px-7 py-8'>
          {/* <PostJob /> */}
          {/* <ApplicationDetailsPrimary /> */}
          <ApplicationDetailsSecondary />
        </div>
      </div>
    </AppLayout>
  );
}
