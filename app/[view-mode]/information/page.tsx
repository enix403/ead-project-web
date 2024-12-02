"use client";

import { AppLayout } from "~/components/AppLayout/AppLayout";

import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { TitleMark } from "~/components/decorations";

const faqs = [
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
];

function FrequentlyAskedQuestions() {
  const [open, setOpen] = React.useState(-1);

  const handleOpen = (value: any) => setOpen(open === value ? -1 : value);

  return (
    <div className="[&_*]:!font-['urbanist']">
      {faqs.map(({ q, a }, index) => (
        <Accordion key={index} open={open === index}>
          <AccordionHeader
            onClick={() => handleOpen(index)}
            className="!text-teal-dark"
          >
            {q}
          </AccordionHeader>
          <AccordionBody>{a}</AccordionBody>
        </Accordion>
      ))}
    </div>
  );
}

export default function InformationPage({ params }: { params: any }) {
  return (
    <AppLayout params={params}>
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

          <section className="mt-8 space-y-6">
            <p>
              Starting in 2019 in a small workshop in Toronto, a group of eight
              passionate individuals came together with a shared vision—to build
              a product that would transform how people connect with their
              careers. We were not just colleagues but a team driven by a common
              goal: to bridge the gap between employees and employers, and
              empower individuals to excel in their professional journeys.
            </p>

            <p>
              Our journey began with countless brainstorming sessions, fueled by
              coffee and the desire to make a difference. Each of us brought
              something unique to the table—ranging from expertise in software
              development, user experience design, and data analytics to deep
              insights into human resources and career development. This diverse
              blend of skills and perspectives was our greatest strength,
              allowing us to tackle the complexities of the modern workplace
              from multiple angles.
            </p>

            <p>
              We recognized early on that the traditional job market was
              evolving. The days of static resumes and long-term employment with
              a single company were fading. In their place, a more dynamic and
              fluid job market was emerging—one where networking, continuous
              learning, and adaptability were key to career success. Our mission
              became clear: to create a platform that would not only connect
              people with job opportunities but also provide them with the tools
              and resources to thrive in an ever-changing work environment.
            </p>

            <p>
              The product we envisioned was more than just a job board. We
              wanted to build a comprehensive career development platform that
              would serve as a hub for both job seekers and employers. For job
              seekers, it would be a place to showcase their skills, discover
              opportunities, and engage in meaningful professional development.
              For employers, it would be a powerful tool to identify top talent,
              understand their employees' needs, and foster a culture of growth
              and success.
            </p>

            <p>
              Our first challenge was to understand the needs of our users. We
              conducted extensive research, talking to hundreds of professionals
              across various industries. We listened to their stories, learned
              about their struggles, and identified the gaps in the existing job
              market solutions. This user-centered approach became the
              cornerstone of our product development process, ensuring that
              every feature we built was aligned with the real-world needs of
              our users.
            </p>

            <p>
              With a clear understanding of our users' needs, we set to work on
              designing and developing our platform. We leveraged the latest
              technologies, from artificial intelligence to data-driven
              insights, to create a product that was not only innovative but
              also intuitive and easy to use. Our platform features personalized
              job recommendations, career growth tools, and a robust network of
              professionals and employers, all designed to help users navigate
              their career paths with confidence.
            </p>

            <p>
              As we grew, so did our community. What started as a small team in
              Toronto quickly expanded, attracting talent from around the world
              who shared our passion for career development. Our team now spans
              multiple continents, working together to continuously improve and
              evolve our product. We are proud of the diverse and inclusive
              culture we've built, where everyone has a voice and every idea is
              valued.
            </p>

            <p>
              Today, our platform is used by thousands of professionals and
              employers worldwide. We've helped people land their dream jobs,
              discover new career paths, and build meaningful connections that
              have propelled their careers to new heights. But our journey is
              far from over. We are committed to constantly innovating and
              enhancing our platform to meet the ever-changing needs of the
              modern workforce.
            </p>

            <p>
              As we look to the future, our goal remains the same: to empower
              individuals to take control of their careers and achieve their
              full potential. We believe that by connecting people with the
              right opportunities and providing them with the right tools, we
              can create a world where everyone has the chance to excel. Thank
              you for being a part of our journey, and we look forward to
              helping you achieve your career goals.
            </p>
          </section>

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
    </AppLayout>
  );
}
