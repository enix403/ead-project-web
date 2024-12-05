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
import clsx from "clsx";

import { FrequentlyAskedQuestions } from "~/components/FrequentlyAskedQuestions";
import { OurTeam } from "./OurTeam";
import { IconBrandInstagram, IconMailFilled } from "@tabler/icons-react";

function ContactInfoBlock({ Icon, title }: { Icon: any; title: string }) {
  return (
    <div className='flex flex-col items-center max-w-sm'>
      <div
        className={clsx(
          "border-black/20 border w-14 h-14 flex items-center justify-center",
          "rounded-full"
        )}
      >
        <Icon size={27} className='text-teal' />
      </div>
      {/* <h2 className='text-xl font-semibold'>{title}</h2> */}
      <h2 className='text-md text-black/50 mt-4 font-semibold'>{title}</h2>
    </div>
  );
}

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
          "[&_img]:rounded-xl [&_img]:object-cover"
        )}
      >
        <Image
          alt=""
          src={Hero1}
          className="w-[46%] shrink-0 aspect-[1.7] -ml-10"
        />
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
            Who
            <TitleMark className="absolute w-32 top-full -left-5 dd -translate-y-2.5" />
          </span>
          <span className="font-normal"> we are</span>
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
        <h1 className="text-3xl font-semibold mt-12 text-center md:text-left">
          Our Mission
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

        <h1 className="text-3xl font-semibold mt-12 text-center md:text-left">
          Our Values
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
    <div className="app-container w-full">
      {/* Title */}
      <h1 className="text-4xl text-center">
        <span className="font-bold text-teal mr-1 relative bg-bdlue-600">
          What we
          <TitleMark className="absolute w-48 top-full -left-8 dd -translate-y-1.5" />
        </span>
        <span className="font-normal"> do</span>
      </h1>

      {/* Subtitle */}
      <p className="text-center text-xl font-normal text-black/50 mt-6 max-w-lg mx-auto">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        tristique mauris rhoncus odio aliquet, vitae.
      </p>

      {/* Features */}
      <div className="flex max-md:flex-col justify-center gap-x-3 gap-y-8 mt-16">
        <FeatureBlock Icon={ResumeIcon} title="Free Resume Assessments" />
        <FeatureBlock Icon={JobIcon} title="Job Fit Scoring" />
        <FeatureBlock Icon={HelpIcon} title="Help Every Step of the Way" />
      </div>

      <h1 className="text-3xl font-semibold mt-12 text-center md:text-left">
        Social responsibility
      </h1>

      <section className="space-y-8 mt-4 text-black/50 text-md text-center md:text-left">
        <p>
          Far much that one rank beheld bluebird after outside ignobly allegedly
          more when oh arrogantly vehement irresistibly fussy penguin insect
          additionally wow absolutely crud meretriciously hastily dalmatian a
          glowered inset one echidna cassowary some parrot and much as goodness
          some froze the sullen much connected bat wonderfully on
          instantaneously eel valiantly petted this along across highhandedly
          much.
        </p>
        <p>
          Repeatedly dreamed alas opossum but dramatically despite expeditiously
          that jeepers loosely yikes that as or eel underneath kept and slept
          compactly far purred sure abidingly up above fitting to strident wiped
          set waywardly far the and pangolin horse approving paid chuckled
          cassowary oh above a much opposite far much hypnotically more
          therefore wasp less that hey apart well like while superbly orca and
          far hence one.Far much that one rank beheld bluebird after outside
          ignobly allegedly more when oh arrogantly vehement irresistibly fussy.
        </p>
      </section>

      {/* Follow */}
      <h1 className="text-xl font-semibold mt-12 text-center">Follow us At</h1>
      <div className="flex justify-center  gap-x-10 sm:gap-x-20 gap-y-12 mt-4">
        <ContactInfoBlock Icon={IconBrandInstagram} title="@seasonistas" />
        <ContactInfoBlock Icon={IconMailFilled} title="info@seasonistas.com" />
      </div>
    </div>
  );
}

/* ============================================== */

export default function AboutUs({ params }: { params: any }) {
  return (
    <AppLayout params={params}>
      <TopSection />
      <OurTeam />
      <BottomSection />

      <div className="app-container w-full pb-20">
        <h1 className="text-4xl text-center mt-12 mb-8">
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
    </AppLayout>
  );
}
