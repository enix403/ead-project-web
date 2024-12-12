"use client";

import clsx from "clsx";
import { AppLayout } from "~/components/AppLayout/AppLayout";

import ResumeIcon from "~/app/assets/icon-resumes.svg";

import React, { PropsWithChildren } from "react";
import { TitleMark } from "~/components/decorations";
import { FrequentlyAskedQuestions } from "~/components/FrequentlyAskedQuestions";
import { JobBanner } from "./JobBanner";
import { IconCoinFilled, IconCoins, IconUserSearch } from "@tabler/icons-react";
import { InfoStepper } from "./InfoStepper";
import { useViewMode } from "~/app/providers/auth-state";

function FeatureBlock({
  Icon,
  title,
  children,
}: { Icon: any; title: string } & PropsWithChildren) {
  return (
    <div className="flex flex-col items-center md:max-w-sm flex-1">
      <div
        className={clsx(
          "bg-black text-white w-16 h-16 flex items-center justify-center",
          "rounded-full"
        )}
      >
        {Icon && <Icon size={40} className="w-7 scale-110" />}
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
  const viewMode = useViewMode();

  return (
    <div className="pb-40 pt-8">
      <div className="app-container max-w-5xl w-full mb-12">
        {/* Title */}
        <h1 className="text-4xl text-center">
          <span className="font-bold text-teal mr-1 relative bg-bdlue-600">
            Information
            <TitleMark className="absolute w-32 top-full -left-5 dd -translate-y-2.5" />
          </span>
          {/* <span className="font-normal"> we are</span> */}
        </h1>

        {/* Subtitle */}
        <p className="text-center text-xl font-normal text-black/50 mt-6 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          tristique mauris rhoncus odio aliquet, vitae.
        </p>

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
            <FeatureBlock Icon={IconUserSearch} title="Find Employees">
              Service to help find the best employee for your company
            </FeatureBlock>
          ) : (
            <FeatureBlock Icon={ResumeIcon} title="Improve your CV">
              Service for improving and creating a proper CV.
            </FeatureBlock>
          )}
          <FeatureBlock Icon={IconCoins} title="Minimum wage" />
          <FeatureBlock Icon={IconCoinFilled} title="Net wage" />
        </div>
      </div>
      <JobBanner />
      <div className="app-container max-w-5xl w-full pt-8">
        <InfoStepper />
        <h1 className="text-4xl text-center mt-14 mb-8">
          <span className="font-bold text-teal mr-1 relative bg-bdlue-600">
            Frequently
            <TitleMark className="absolute w-32 top-full -left-5 dd -translate-y-2.5" />
          </span>
          <span className="font-normal"> Asked Questions</span>
        </h1>
        <FrequentlyAskedQuestions
          faqs={[
            {
              q: "What is the main purpose of this platform?",
              a: `Our platform is designed to connect job seekers with employers while providing tools and resources to help individuals excel in their careers. Whether you're looking for your next job, seeking career advice, or wanting to grow your professional network, our platform has you covered.`,
            },
            {
              q: "How does the platform help in career development?",
              a: `We offer a range of features to support your career growth, including personalized job recommendations, skill development resources, career coaching, and networking opportunities. Our platform is tailored to help you navigate the complexities of today's job market and achieve your career goals.`,
            },
            {
              q: "Who can use this platform?",
              a: `Our platform is designed for both job seekers and employers. Whether you're a recent graduate, a seasoned professional, or a company looking to hire top talent, our platform is built to cater to your needs.`,
            },
            {
              q: "How do I get started as a job seeker?",
              a: `Getting started is simple. Sign up for an account, create a detailed profile showcasing your skills and experience, and start exploring job opportunities that match your interests. You can also access our career development tools and connect with other professionals on the platform.`,
            },
            {
              q: "What benefits does this platform offer to employers?",
              a: `Employers can use our platform to post job openings and search for qualified candidates. Our advanced search and matching algorithms ensure that you connect with the right talent quickly and efficiently. Additionally, our platform provides insights into employee engagement and career development trends.`,
            },
            {
              q: "Is the platform free to use?",
              a: `We offer a range of plans to suit different needs. A basic account is free, giving you access to essential features. For enhanced features such as advanced job matching, premium learning resources, and more, you can upgrade to one of our premium plans.`,
            },
            {
              q: "How does the job matching process work?",
              a: `Our job matching process uses a combination of artificial intelligence and data-driven insights to recommend jobs that align with your skills, experience, and career goals. The more you engage with the platform, the more accurate and personalized your recommendations will become.`,
            },
            {
              q: "Can I use the platform to network with other professionals?",
              a: `Yes, networking is a key component of our platform. You can connect with other professionals, join industry-specific groups, and participate in discussions that will help you expand your network and gain valuable insights into your field.`,
            },
            {
              q: "How is my data protected on this platform?",
              a: `We take data security very seriously. Our platform uses industry-standard encryption and security measures to protect your personal and professional information. We are committed to maintaining your privacy and ensuring that your data is safe.`,
            },
          ]}
        />
      </div>
    </div>
  );
}

export default function InformationPage() {
  return (
    <AppLayout>
      <InformationPageContent />
    </AppLayout>
  );
}
