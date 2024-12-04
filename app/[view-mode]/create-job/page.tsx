"use client";

import { AppLayout } from "~/components/AppLayout/AppLayout";

import { ReactNode, useState } from "react";

import { GeneralInfoStep } from "./steps/GeneralInfoStep";
import { SpecificInfoStep } from "./steps/SpecificInfoStep";
import { CompanyInfoStep } from "./steps/CompanyInfoStep";
import { QuestionsStep } from "./steps/QuestionsStep";

export default function CreateJobPage({ params }: { params: any }) {
  const [activePage, setActivePage] = useState(0);

  function onNext() {
    setActivePage((x) => Math.min(2, x + 1));
  }

  function onCancel() {
    setActivePage((x) => Math.max(0, x - 1));
  }

  let steps = [
    GeneralInfoStep,
    SpecificInfoStep,
    CompanyInfoStep,
    QuestionsStep,
  ];

  // let index = activePage;
  let index = 0;
  let StepComponent = steps[index];

  return (
    <AppLayout pageTitle="Jobs" params={params}>
      <div className="flex-1 flex items-start">
        <div className="flex-1 px-7 py-8">
          <StepComponent onNext={onNext} onCancel={onCancel} />
        </div>
      </div>
    </AppLayout>
  );
}
