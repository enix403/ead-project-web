"use client";

import { AppLayout } from "~/components/AppLayout/AppLayout";

import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { TitleMark } from "~/components/decorations";

function AccordionCustomAnimation() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value: any) => setOpen(open === value ? 0 : value);

  return (
    <div className="[&_*]:!font-['urbanist']">
      <Accordion open={open === 1}>
        <AccordionHeader onClick={() => handleOpen(1)}>
          What is Seasonista ?
        </AccordionHeader>
        <AccordionBody>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
          distinctio natus suscipit voluptate alias aut, eaque dicta voluptatum
          ut quas delectus saepe quisquam, fugiat eveniet ipsa vel repellendus!
          Obcaecati, consequuntur.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2}>
        <AccordionHeader onClick={() => handleOpen(2)}>
          How to use Seasonista ?
        </AccordionHeader>
        <AccordionBody>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis odio,
          ab cupiditate quam distinctio minima debitis ad quos vero, ullam
          reiciendis nam, a accusamus dolorem atque dolor? Harum, repudiandae
          perferendis!
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3}>
        <AccordionHeader onClick={() => handleOpen(3)}>
          What are the main features ?
        </AccordionHeader>
        <AccordionBody>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum,
          blanditiis culpa libero, inventore dolore pariatur minima,
          necessitatibus nemo architecto odit iure animi impedit. Odio nobis,
          reprehenderit expedita enim eum perferendis?
        </AccordionBody>
      </Accordion>
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

          <h1 className="text-4xl text-center mt-6 mb-8">
            <span className="font-bold text-teal mr-1 relative bg-bdlue-600">
              Frequently
              <TitleMark className="absolute w-32 top-full -left-5 dd -translate-y-2.5" />
            </span>
            <span className="font-normal"> Asked Questions</span>
          </h1>
          <AccordionCustomAnimation />
        </div>

        {/* <div className="max-w-4xl mx-auto px-4 d"> */}
        {/* <h3 className="mb-8 text-2xl md:text-4xl font-semibold text-center"> */}
        {/* Frequently Asked Questions */}
        {/* <AccordionCustomAnimation /> */}
        {/* </h3> */}

        {/* </div> */}
      </div>
    </AppLayout>
  );
}
