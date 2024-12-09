import { Button } from "~/components/Button/Button";
import { Input, TextArea } from "~/components/Input/Input";
import { Select } from "~/components/Select/Select";
import { FormLabel } from "~/components/FormLabel/FormLabel";
import { JobPostingCard } from "~/components/JobPostingCard";
import { StepForm, StepProps } from "./common";

import allJobs from "../jobs.json";
import { ChangeEvent, useEffect, useState } from "react";

function ProposalTemplateCard() {
  return (
    <JobPostingCard
      posting={{}}
      showLikedButton={false}
      footer={
        <div className="mt-4 flex items-center gap-x-2 mb-4">
          <Button fullRounded>Use this template</Button>
        </div>
      }
    />
  );
}

export function bindIndexSelector(selectFn: any) {
  return (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.selectedOptions[0];
    const index = +selectedOption!.getAttribute("data-index")!;
    selectFn(index);
  };
}

export function GeneralInfoStep({
  onNext,
  onCancel,
  progressView,
  register,
}: StepProps) {
  const [selectedJobIndex, setSelectedJobIndex] = useState(0);
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);

  useEffect(() => {
    setSelectedRoleIndex(0);
  }, [selectedJobIndex]);

  let jobs = allJobs;
  let specialisms = allJobs[selectedJobIndex].specialisms;

  let selectedRole = specialisms[selectedRoleIndex];

  return (
    <>
      <h1 className="font-semibold text-2xl text-center md:text-left">
        Post a New Job !
      </h1>
      <h4 className="text-black/70 h-0 -translate-y-1 text-sm text-center md:text-left">
        Ready to jump back in?
      </h4>
      {progressView}

      <StepForm onNext={onNext}>
        <div className="bg-teal/5 p-7 mt-7 rounded-xl space-y-6">
          <FormLabel showAsterik label="Job Title">
            <Input {...register("title")} required placeholder="Title" />
          </FormLabel>
          <FormLabel showAsterik label="Job Description">
            <TextArea
              {...register("description")}
              required
              className="h-40"
              placeholder="Enter your job description"
            />
          </FormLabel>

          <FormLabel showAsterik label="Job Category">
            <Select
              selectProps={register("category")}
              variant="light"
              value={jobs[selectedJobIndex].category}
              onChange={bindIndexSelector(setSelectedJobIndex)}
            >
              {jobs.map((job, index) => (
                <option
                  data-index={index}
                  value={jobs[index].category}
                  key={index}
                >
                  {job.category}
                </option>
              ))}
            </Select>
          </FormLabel>
          <FormLabel showAsterik label="Specialisms">
            <Select
              selectProps={register("specialism")}
              variant="light"
              value={specialisms[selectedRoleIndex].title}
              onChange={bindIndexSelector(setSelectedRoleIndex)}
            >
              {specialisms.map((role, index) => (
                <option
                  data-index={index}
                  value={specialisms[index].title}
                  key={index}
                >
                  {role.title}
                </option>
              ))}
            </Select>
          </FormLabel>

          <p className="!mt-2 italic">{selectedRole.info}</p>

          <div className="pt-6">
            <div className="flex gap-x-3">
              <Button onClick={onCancel} variant="outlined" fullRounded>
                Cancel
              </Button>
              <Button type="submit" fullRounded>
                Next
              </Button>
            </div>
          </div>
        </div>
      </StepForm>

      <hr className="mt-10" />

      <h1 className="font-semibold text-2xl text-center md:text-left mt-6">
        Previous Jobs
      </h1>
      <h4 className="mt-1 text-black/70 text-center md:text-left">
        Reuse a past job as a template
      </h4>

      <div className="mt-4 grid wl:grid-cols-2 gap-6">
        <ProposalTemplateCard />
        <ProposalTemplateCard />
        <ProposalTemplateCard />
        <ProposalTemplateCard />
      </div>
    </>
  );
}
