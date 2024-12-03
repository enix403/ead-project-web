"use client";

import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

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

export function FrequentlyAskedQuestions() {
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
