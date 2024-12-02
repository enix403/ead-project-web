"use client";

import { AppLayout } from "~/components/AppLayout/AppLayout";

import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

export function AccordionCustomAnimation() {
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
      <div className="pb-8 pt-6">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="mb-8 text-2xl md:text-4xl font-semibold text-center">
            Frequently Asked Questions
          </h3>
          <AccordionCustomAnimation />
        </div>
      </div>
    </AppLayout>
  );
}
