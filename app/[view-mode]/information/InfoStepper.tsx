"use client";

import { ViewModeContext } from "~/components/AppLayout/AppLayout";

import { useState, useContext } from "react";
import { Button } from "~/components/Button/Button";
import { Step, Stepper } from "@material-tailwind/react";

function InfoStep1() {
  return (
    <section className="mt-8 space-y-6">
      <h1 className="text-4xl font-bold py-4 max-w-3xl">
        Rights and Responsibilities of Employees and Employers
      </h1>

      <h1 className="text-2xl font-bold pt-4">
        Guide to Rights and Responsibilities
      </h1>
      <p>
        A description of the rights that employees in the tourism sector are
        entitled to (working hours, wages, leave, insurance rights) and their
        obligations towards their employers.
      </p>
      <h1 className="text-2xl font-bold pt-4">
        Work Regulations and Contracts
      </h1>
      <p>
        A guide to the work regulations related to the tourism industry, what
        employees and employers need to know to stay compliant with the law and
        maintain a safe business environment
      </p>
      <h1 className="text-2xl font-bold pt-4">
        Legislation and Regulations for Seasonal Workers
      </h1>
      <p>
        Comprehensive information on the legislation related to seasonal work,
        including minimum wages, overtime, etc.
      </p>
      <h1 className="text-2xl font-bold pt-4">Guide for Foreign Workers</h1>
      <p>
        Information for foreign workers looking to work in tourist areas,
        covering visas, work permits, and rights
      </p>
      <h1 className="text-2xl font-bold pt-4">Insurance Policies</h1>
      <p>
        Insurance policies for employees and employers to cover them in case of
        an accident or damage.
      </p>
    </section>
  );
}

function InfoStep2() {
  return (
    <section className="mt-8 space-y-6">
      <h1 className="text-4xl font-bold py-4 max-w-3xl">
        Personnel Management and Recruitment
      </h1>

      <h1 className="text-2xl font-bold pt-4">Hiring Processes</h1>
      <p>
        Steps and procedures to better prepare for the hiring process, what to
        expect, and how to prepare their CV.
      </p>
      <h1 className="text-2xl font-bold pt-4">
        Creating the Right Profile for Employees
      </h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore
        error nam illum magni animi minima a pariatur est dolorum, quis fugiat
        labore ipsum eligendi excepturi, magnam beatae. Aspernatur, harum rem?
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident,
        fuga natus! Modi libero, commodi cupiditate nesciunt, quaerat debitis
        fugit eos provident numquam fugiat possimus? Minima fugiat illo sunt
        corrupti et?
      </p>
      <h1 className="text-2xl font-bold pt-4">Staff Recruitment Guide</h1>
      <p>
        Guidelines on how to select the right staff, how to evaluate potential
        employees, and what to include in job advertisements
      </p>
      <h1 className="text-2xl font-bold pt-4">Hiring Foreign Workers</h1>
      <p>
        A guide for employers on the procedures for hiring foreign workers and
        how to comply with the law
      </p>
      <h1 className="text-2xl font-bold pt-4">Managing Seasonal Staff</h1>
      <p>
        Tips on how to better manage seasonal employees, maintain high
        productivity, and keep morale up during peak tourist periods
      </p>
      <h1 className="text-2xl font-bold pt-4">
        Personnel Management and Organization Tools
      </h1>
      <p>
        Software or online tools for better shift organization, payroll
        management, and monitoring staff performance.
      </p>
      <h1 className="text-2xl font-bold pt-4">Payroll Calculation</h1>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio facilis
        repellendus error libero sunt quidem laboriosam consequuntur. Numquam
        laboriosam minima ullam, et at, dicta totam molestiae eius odit sunt
        eum. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum
        veritatis exercitationem labore aliquam aliquid repudiandae aspernatur
        delectus ea magni illum distinctio assumenda omnis maiores doloribus
        dicta, neque rem quod iure!
      </p>
    </section>
  );
}

function InfoStep3() {
  return (
    <section className="mt-8 space-y-6">
      <h1 className="text-4xl font-bold py-4 max-w-3xl">
        Education and Career
      </h1>

      <h1 className="text-2xl font-bold pt-4">
        Training Seminars and Certifications
      </h1>
      <p>
        A list of recommended seminars and certifications important in the
        tourism sector, such as health and safety certifications, serving,
        languages, and specialized skills
      </p>
      <h1 className="text-2xl font-bold pt-4">Staff Training Programs</h1>
      <p>Suggestions for training programs to help improve employee skills.</p>
      <h1 className="text-2xl font-bold pt-4">Career Advice in Tourism</h1>
      <p>
        Tips on how to advance their career in the tourism industry (e.g., from
        seasonal staff to permanent roles, from general staff to management
        positions)
      </p>
      <h1 className="text-2xl font-bold pt-4">
        Health and Safety Guide at the Workplace
      </h1>
      <p>
        Basic rules for safety and health in tourist establishments (e.g.,
        hotels, restaurants) that are essential for employers and employees.
      </p>
    </section>
  );
}

function InfoStep4() {
  return (
    <section className="mt-8 space-y-6">
      <h1 className="text-4xl font-bold py-4 max-w-3xl">
        Information and Networking
      </h1>

      <h1 className="text-2xl font-bold pt-4">News and Trends in Tourism</h1>
      <p>
        Informative articles about the latest developments and trends in the
        tourism sector.
      </p>
      <h1 className="text-2xl font-bold pt-4">
        Professional Networks and Conferences
      </h1>
      <p>
        A list of important conferences, professional associations, and networks
        in the tourism sector, where they can connect with other professionals.
      </p>
      <h1 className="text-2xl font-bold pt-4">Interviews with Professionals</h1>
      <p>
        Interviews with successful employees and employers in tourism, sharing
        their experiences.
      </p>
    </section>
  );
}

export function InfoStepper() {
  const [stepIndex, setStepIndex] = useState(0);

  function onNext() {
    setStepIndex((x) => Math.min(steps.length - 1, x + 1));
  }

  function onPrevious() {
    setStepIndex((x) => Math.max(0, x - 1));
  }

  let steps = [InfoStep1, InfoStep2, InfoStep3, InfoStep4];

  let StepComponent = steps[stepIndex];

  return (
    <>
      <Stepper className="mt-4" activeStep={stepIndex}>
        {steps.map((_, index) => (
          // @ts-ignore
          <Step
            className="cursor-pointer"
            onClick={() => setStepIndex(index)}
            key={index}
          >
            {index + 1}
          </Step>
        ))}
      </Stepper>
      <StepComponent />
      <div className="flex gap-x-3 mt-8">
        <Button
          onClick={onPrevious}
          disabled={stepIndex === 0}
          variant="outlined"
          fullRounded
        >
          Previous
        </Button>
        <Button
          onClick={onNext}
          disabled={stepIndex === steps.length - 1}
          type="submit"
          fullRounded
        >
          Next
        </Button>
      </div>
    </>
  );
}

// function InformationPageContent() {
//   return (
//     <div className="pb-40 pt-8">
//       <div className="app-container max-w-5xl w-full mb-12">
//         {/* Title */}
//         <h1 className="text-4xl text-center">
//           <span className="font-bold text-teal mr-1 relative bg-bdlue-600">
//             Information
//             <TitleMark className="absolute w-32 top-full -left-5 dd -translate-y-2.5" />
//           </span>
//           {/* <span className="font-normal"> we are</span> */}
//         </h1>

//         {/* Subtitle */}
//         <p className="text-center text-xl font-normal text-black/50 mt-6 max-w-2xl mx-auto">
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
//           tristique mauris rhoncus odio aliquet, vitae.
//         </p>

//         <InfoStepper />
//       </div>
//     </div>
//   );
// }

// export default function Information({ params }: { params: any }) {
//   return (
//     <AppLayout params={params}>
//       <InformationPageContent />
//     </AppLayout>
//   );
// }
