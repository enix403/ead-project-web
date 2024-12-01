"use client";

import ResumeIcon from "~/app/assets/icon-resumes.svg";
import JobIcon from "~/app/assets/icon-job.svg";
import HelpIcon from "~/app/assets/icon-help.svg";

import Hero1 from "~/app/assets/about-p1.jpg";
import Hero2 from "~/app/assets/about-p2.jpg";
import Hero3 from "~/app/assets/about-p3.jpg";
import Hero4 from "~/app/assets/about-p4.jpg";
import Hero5 from "~/app/assets/about-p5.jpg";
import Hero6 from "~/app/assets/about-p6.jpg";
import Hero7 from "~/app/assets/about-p7.jpg";

import Image from "next/image";

import { AppLayout } from "~/components/AppLayout/AppLayout";
import { TitleMark } from "~/components/decorations";
import { Button } from "~/components/Button/Button";
import clsx from "clsx";
import Link from "next/link";

function StatBlock({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="space-y-2 w-56">
      <h3 className="font-semibold text-2xl md:text-4xl text-center">
        {title}
      </h3>
      <p className="text-black/50 font-normal text-esm md:text-base text-center">
        {desc}
      </p>
    </div>
  );
}

function HeroImageSet() {
  return (
    <>
      {/* Desktop */}
      <div
        className={clsx(
          "hidden sm:grid",
          "[&_img]:rounded-xl [&_img]:object-cover mt-10 app-container",
          "grid-rows-[auto,45px,auto] grid-cols-[repeat(4,1fr)] gap-1 md:gap-4"
        )}
      >
        <div className="row-[1/-1] col-[1]">
          <Image alt="" src={Hero1} className="h-full" />
        </div>

        <div className="row-[1/2] col-[2]">
          <Image alt="" src={Hero2} className="w-full" />
        </div>
        <div className="row-[2/4] col-[2]">
          <Image alt="" src={Hero3} className="h-full" />
        </div>
        <div className="row-[1/3] col-[3]">
          <Image alt="" src={Hero4} className="h-full" />
        </div>
        <div className="row-[3/4] col-[3]">
          <Image alt="" src={Hero5} className="w-full" />
        </div>

        <div className="row-[1/-1] col-[4]">
          <Image alt="" src={Hero6} className="h-full" />
        </div>
      </div>
      {/* Mobile */}
      <div
        className={clsx(
          "flex sm:hidden",
          "mt-8 gap-x-3",
          "items-start overflow-hidden",
          "[&_img]:rounded-xl [&_img]:object-cover",
        )}
      >
        <Image alt="" src={Hero1} className="w-[46%] shrink-0 aspect-[1.7] -ml-10" />
        <Image alt="" src={Hero7} className="w-[46%] shrink-0 aspect-[1.7]" />
        <Image alt="" src={Hero4} className="w-[46%] shrink-0 aspect-[1.7]" />
      </div>
    </>
  );
}

function TopSection() {
  return (
    <>
      <div className="app-container w-full pt-10">
        {/* Title */}
        <h1 className="text-4xl text-center">
          <span className="font-bold text-teal mr-1 relative bg-bdlue-600">
            About
            <TitleMark className="absolute w-32 top-full -left-5 dd -translate-y-2.5" />
          </span>
          <span className="font-normal">Us</span>
        </h1>

        {/* Subtitle */}
        <p className="text-center text-xl font-normal text-black/50 mt-6 max-w-lg mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          tristique mauris rhoncus odio aliquet, vitae.
        </p>
      </div>

      <HeroImageSet />

      <div className="app-container w-full pb-10">
        {/* Stats */}
        <div className="flex justify-center mt-6 md:mt-16 gap-x-6 md:gap-x-24">
          <StatBlock title="4M" desc="4 million daily active users" />
          <StatBlock title="12k" desc="Over 12k open job positions" />
          <StatBlock title="20M" desc="Over 20 million stories shared" />
        </div>

        {/* About text */}
        <h1 className="text-3xl font-semibold mt-12 text-center md:text-left">
          About Seasonistas
        </h1>

        <section className="space-y-8 mt-4 text-black/50 text-md text-center md:text-left">
          <p>
            Far much that one rank beheld bluebird after outside ignobly
            allegedly more when oh arrogantly vehement irresistibly fussy
            penguin insect additionally wow absolutely crud meretriciously
            hastily dalmatian a glowered inset one echidna cassowary some parrot
            and much as goodness some froze the sullen much connected bat
            wonderfully on instantaneously eel valiantly petted this along
            across highhandedly much.
          </p>
          <p>
            Repeatedly dreamed alas opossum but dramatically despite
            expeditiously that jeepers loosely yikes that as or eel underneath
            kept and slept compactly far purred sure abidingly up above fitting
            to strident wiped set waywardly far the and pangolin horse approving
            paid chuckled cassowary oh above a much opposite far much
            hypnotically more therefore wasp less that hey apart well like while
            superbly orca and far hence one.Far much that one rank beheld
            bluebird after outside ignobly allegedly more when oh arrogantly
            vehement irresistibly fussy.
          </p>
        </section>
      </div>
    </>
  );
}

/* ============================================== */

function JobBanner() {
  return (
    <section className="bg-teal/80 py-20 text-center text-white">
      <div className="app-container">
        <h1 className="text-3xl font-extrabold">Your Dream Jobs Are Waiting</h1>
        <p className="font-semibold mt-2">
          Over 1 million interactions, 50,000 success stories Make yours now.
        </p>

        <div className="flex max-ph:flex-cold justify-center mt-5 gap-2">
          <Link href="/job-user">
            <Button fullRounded theme="white">
              Search Job
            </Button>
          </Link>
          <Button fullRounded theme="white" variant="outlined">
            Apply Job Now
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ============================================== */

function FeatureBlock({ Icon, title }: { Icon: any; title: string }) {
  return (
    <div className="flex flex-col items-center md:max-w-sm">
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          tristique mauris rhoncus odio aliquet, vitae.
        </p>
      </div>
    </div>
  );
}

function BottomSection() {
  return (
    <div className="app-container w-full pt-14 pb-20">
      {/* Title */}
      <h1 className="text-4xl text-center">
        <span className="font-normal">Our</span>
        <span className="font-bold text-teal mr-1 relative bg-bdlue-600">
          Working
          <TitleMark className="absolute w-48 top-full -left-8 dd -translate-y-1.5" />
        </span>
        <span className="font-normal">Process</span>
      </h1>

      {/* Subtitle */}
      <p className="text-center text-xl font-normal text-black/50 mt-6 max-w-lg mx-auto">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        tristique mauris rhoncus odio aliquet, vitae.
      </p>

      {/* Features */}
      <div className="flex max-md:flex-col justify-center gap-x-3 gap-y-8 mt-8">
        <FeatureBlock Icon={ResumeIcon} title="Free Resume Assessments" />
        <FeatureBlock Icon={JobIcon} title="Job Fit Scoring" />
        <FeatureBlock Icon={HelpIcon} title="Help Every Step of the Way" />
      </div>
    </div>
  );
}

/* ============================================== */

export default function AboutUs() {
  return (
    <AppLayout>
      <TopSection />
      <JobBanner />
      <BottomSection />
    </AppLayout>
  );
}
