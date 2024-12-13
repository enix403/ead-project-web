import { Button } from "~/components/Button/Button";
import { Input, TextArea } from "~/components/Input/Input";
import { Select } from "~/components/Select/Select";
import { FormLabel } from "~/components/FormLabel/FormLabel";
import { StepForm, StepProps } from "./common";
import { Checkbox } from "@material-tailwind/react";
import { repeatNode } from "~/app/utils/markup";

import "rsuite/DateRangePicker/styles/index.css";
import DateRangePicker from "rsuite/DateRangePicker";

import "rsuite/TimeRangePicker/styles/index.css";
import TimeRangePicker from "rsuite/TimeRangePicker";
import type { InputProps } from "react-html-props";

function FormCheckbox({
  label,
  ...rest
}: { label: string } & Omit<InputProps, "color">) {
  return (
    <label className="flex cursor-pointer items-center gap-2 p-2 select-none">
      <Checkbox
        {...rest}
        ripple={false}
        containerProps={{ className: "p-0" }}
        className="hover:before:content-none"
      />
      {label}
    </label>
  );
}

export function SpecificInfoStep({
  onNext,
  onCancel,
  progressView,
  register,
  selCtrl,
}: StepProps) {
  return (
    <>
      <h1 className="font-semibold text-2xl text-center md:text-left">
        Additional Information
      </h1>

      {progressView}

      <StepForm onNext={onNext}>
        <div className="bg-teal/5 p-7 mt-7 rounded-xl space-y-6">
          <FormLabel showAsterik label="Job Type">
            <Select selectProps={register("jobType")} variant="light">
              <option value="fullTime">Full-Time</option>
              <option value="partTime">Part-Time</option>
              <option value="internship">Internship</option>
              <option value="specificDates">Specific dates</option>
            </Select>
          </FormLabel>

          <FormLabel showAsterik label="Experience Level">
            <Select selectProps={register("expLevelRequired")} variant="light">
              <option value="entry">Entry Level</option>
              <option value="mid">Mid Level</option>
              <option value="senior">Senior Level</option>
            </Select>
          </FormLabel>

          <div>
            Required Qualifications
            <div className="p-0 grid grid-cols-2 xl:grid-cols-5">
              {repeatNode(10, (index) => {
                const qualName = `Qualification ${index + 1}`;
                return (
                  <FormCheckbox
                    {...selCtrl.register("qualificationsRequired", qualName)}
                    key={index}
                    label={qualName}
                  />
                );
              })}
            </div>
          </div>

          <div>
            Desirable Qualifications
            <div className="p-0 grid grid-cols-2 xl:grid-cols-5">
              {repeatNode(10, (index) => {
                const qualName = `Qualification ${index + 1}`;
                return (
                  <FormCheckbox
                    {...selCtrl.register("qualificationsDesired", qualName)}
                    key={index}
                    label={qualName}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex gap-4 flex-col md:flex-row">
            <div className="flex-[1]">
              <FormLabel showAsterik label="Salary">
                <div className="flex flex-1 w-full gap-x-1">
                  <Select selectProps={register("salaryMode")} variant="light">
                    <option value="monthly">Monthly</option>
                    <option value="hourly">Hourly</option>
                  </Select>
                  <Input
                    {...register("salary")}
                    className="flex-1"
                    required
                    placeholder="Enter salary range"
                  />
                </div>
                {/* <p className="italic">Suggested = $16100</p> */}
              </FormLabel>
            </div>
            <div className="flex-[1]">
              <FormLabel showAsterik label="Periods of Work" className="h-full">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  {/* TODO: Date picker */}
                  <DateRangePicker
                    className="flex-1 [&>*]:!h-full"
                    appearance="subtle"
                    placeholder="Select dates"
                  />
                  {/* TODO: Date picker */}
                  <TimeRangePicker
                    className="flex-1 [&>*]:!h-full"
                    appearance="subtle"
                    placeholder="Select times"
                  />
                </div>
              </FormLabel>
            </div>
          </div>

          <div>
            Additional Benefits
            <div className="p-0 grid grid-cols-2 xl:grid-cols-5">
              {[
                "Performance bonuses",
                "Gifts and allowances",
                "Overtime",
                "Commissions",
                "Mobile phone",
                "Company laptop",
                "Extra vacation days",
                "Parental leave",
                "Training and seminars",
                "Discounts on products or services",
              ].map((benefitName) => (
                <FormCheckbox
                  key={benefitName}
                  {...selCtrl.register("benefits", benefitName)}
                  label={benefitName}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-4 flex-col md:flex-row">
            <div className="flex-1">
              <FormLabel showAsterik label="Working Language">
                <Select selectProps={register("workingLanguage")} variant="light">
                  <option>English</option>
                  <option>Italian</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>Greek</option>
                </Select>
              </FormLabel>
            </div>
            <div className="flex-1">
              <FormLabel showAsterik label="Residence">
                <Select selectProps={register("residence")} variant="light">
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="allowance">Housing allowance</option>
                </Select>
              </FormLabel>
            </div>
          </div>

          <div className="flex gap-4 flex-col md:flex-row">
            <div className="flex-1">
              <FormLabel showAsterik label="Food">
                <Select selectProps={register("food")} variant="light">
                  <option value="yes">Provided</option>
                  <option value="no">Not Provided</option>
                  <option value="oneMeal">One meal</option>
                  <option value="twoMeal">Two meal</option>
                  <option value="allowance">Monetary meal allowance per day</option>
                </Select>
              </FormLabel>
            </div>
            <div className="flex-1">
              <FormLabel label="Means of Transport">
                <Select selectProps={register("transport")} variant="light">
                  <option value="required">Required</option>
                  <option value="notRequired">Not required</option>
                  <option value="mopedProvided">Moped provided</option>
                  <option value="carProvided">Car provided</option>
                </Select>
              </FormLabel>
            </div>
          </div>

          <div className="pt-6">
            <div className="flex gap-x-3">
              <Button onClick={onCancel} variant="outlined" fullRounded>
                Back
              </Button>
              <Button type="submit" fullRounded>
                Next
              </Button>
            </div>
          </div>
        </div>
      </StepForm>
    </>
  );
}
