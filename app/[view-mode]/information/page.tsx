"use client";

import { AppLayout, ViewModeContext } from "~/components/AppLayout/AppLayout";

import ResumeIcon from "~/app/assets/icon-resumes.svg";
import JobIcon from "~/app/assets/icon-job.svg";
import HelpIcon from "~/app/assets/icon-help.svg";

import React, { PropsWithChildren, useContext } from "react";
import { TitleMark } from "~/components/decorations";
import clsx from "clsx";
import { FrequentlyAskedQuestions } from "../about/FrequentlyAskedQuestions";
import { PriceListCells } from "./PriceListCells";

function FeatureBlock({
  Icon,
  title,
  children,
}: { Icon: any; title: string } & PropsWithChildren) {
  return (
    <div className="flex flex-col items-center md:max-w-sm flex-1">
      <div
        className={clsx(
          "bg-black w-16 h-16 flex items-center justify-center",
          "rounded-full"
        )}
      >
        {Icon && <Icon className="w-7" />}
      </div>

      <div
        style={{
          boxShadow: "0px 12px 15px 0px #09291E1A",
        }}
        className={clsx(
          "self-stretch text-center space-y-2 py-8 px-7 mt-5 flex-1",
          "border-[#E6E9F0] border rounded-lg"
        )}
      >
        {/* <h2 className='text-xl font-semibold'>Free Resume Assessments</h2> */}
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="font-normal text-black/50">
          {children ??
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tristique mauris rhoncus odio aliquet, vitae."}
        </p>
      </div>
    </div>
  );
}

function InformationPageContent() {
  const viewMode = useContext(ViewModeContext);

  return (
    <div className="pb-40 pt-8">
      <div className="app-container max-w-5xl w-full">
        {/* Title */}
        <h1 className="text-4xl text-center">
          <span className="font-bold text-teal mr-1 relative bg-bdlue-600">
            Who
            <TitleMark className="absolute w-32 top-full -left-5 dd -translate-y-2.5" />
          </span>
          <span className="font-normal"> we are</span>
        </h1>

        {/* Subtitle */}
        <p className="text-center text-xl font-normal text-black/50 mt-6 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          tristique mauris rhoncus odio aliquet, vitae.
        </p>

        <PriceListCells />

        <section className="mt-8 space-y-6">
          <h1 className="text-2xl font-bold pt-4">
            Information around seasonal work.
          </h1>
          <p>
            Starting in 2019 in a small workshop in Toronto, a group of eight
            passionate individuals came together with a shared vision—to build a
            product that would transform how people connect with their careers.
            We were not just colleagues but a team driven by a common goal: to
            bridge the gap between employees and employers, and empower
            individuals to excel in their professional journeys.
          </p>
          <p>
            Our journey began with countless brainstorming sessions, fueled by
            coffee and the desire to make a difference. Each of us brought
            something unique to the table—ranging from expertise in software
            development, user experience design, and data analytics to deep
            insights into human resources and career development. This diverse
            blend of skills and perspectives was our greatest strength, allowing
            us to tackle the complexities of the modern workplace from multiple
            angles.
          </p>
          <p>
            We recognized early on that the traditional job market was evolving.
            The days of static resumes and long-term employment with a single
            company were fading. In their place, a more dynamic and fluid job
            market was emerging—one where networking, continuous learning, and
            adaptability were key to career success. Our mission became clear:
            to create a platform that would not only connect people with job
            opportunities but also provide them with the tools and resources to
            thrive in an ever-changing work environment.
          </p>
        </section>

        <div className="flex max-md:flex-col justify-center gap-x-3 gap-y-8 mt-8">
          {viewMode === "employer" ? (
            <FeatureBlock Icon={ResumeIcon} title="Find Employees">
              Service to help find the best employee for your company
            </FeatureBlock>
          ) : (
            <FeatureBlock Icon={ResumeIcon} title="Improve your CV">
              Service for improving and creating a proper CV.
            </FeatureBlock>
          )}
          <FeatureBlock Icon={JobIcon} title="Minimum wage" />
          <FeatureBlock Icon={JobIcon} title="Net wage" />
        </div>


        <h1 className="text-4xl text-center mt-12 mb-8">
            <span className="font-bold text-teal mr-1 relative bg-bdlue-600">
              Frequently
              <TitleMark className="absolute w-32 top-full -left-5 dd -translate-y-2.5" />
            </span>
            <span className="font-normal"> Asked Questions</span>
          </h1>
          <FrequentlyAskedQuestions />
      </div>
    </div>
  );
}

export default function InformationPage({ params }: { params: any }) {
  return (
    <AppLayout params={params}>
      <InformationPageContent />
    </AppLayout>
  );
}
