"use client";

import { AppLayout } from "~/components/AppLayout/AppLayout";

import { useState } from "react";

import { GeneralInfoStep } from "./steps/GeneralInfoStep";
import { SpecificInfoStep } from "./steps/SpecificInfoStep";
import { CompanyInfoStep } from "./steps/CompanyInfoStep";
import { QuestionsStep } from "./steps/QuestionsStep";
import { Step, Stepper } from "@material-tailwind/react";

export default function CreateJobPage({ params }: { params: any }) {
  let [pageIndex, setPageIndex] = useState(0);

  function onNext() {
    setPageIndex((x) => Math.min(steps.length - 1, x + 1));
  }

  function onCancel() {
    setPageIndex((x) => Math.max(0, x - 1));
  }

  let steps = [
    GeneralInfoStep,
    SpecificInfoStep,
    CompanyInfoStep,
    QuestionsStep,
  ];

  pageIndex = 2;

  let StepComponent = steps[pageIndex];

  let progressView = (
    <Stepper className="mt-4" activeStep={pageIndex}>
      {steps.map((_, index) => (
        // @ts-ignore
        <Step key={index}>{index + 1}</Step>
      ))}
    </Stepper>
  );

  return (
    <AppLayout pageTitle="Jobs" params={params}>
      <div className="flex-1 flex items-start">
        <div className="flex-1 px-7 py-8">
          <StepComponent onNext={onNext} onCancel={onCancel} progressView={progressView} />
        </div>
      </div>
    </AppLayout>
  );
}
