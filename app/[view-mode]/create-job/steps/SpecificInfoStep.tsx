import { Button } from "~/components/Button/Button";
import { Input, TextArea } from "~/components/Input/Input";
import { Select } from "~/components/Select/Select";
import { FormLabel } from "~/components/FormLabel/FormLabel";
import { StepForm, StepProps } from "./common";
import { Checkbox, Menu, MenuItem, MenuList } from "@material-tailwind/react";
import { repeatNode } from "~/app/utils/markup";

export function SpecificInfoStep({
  onNext,
  onCancel,
  progressView,
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
            <Select variant="light">
              <option>Full-Time</option>
              <option>Part-Time</option>
              <option>Internship</option>
              <option>Specific dates</option>
            </Select>
          </FormLabel>

          <FormLabel showAsterik label="Experience Level">
            <Select variant="light">
              <option>Entry Level</option>
              <option>Mid Level</option>
              <option>Senior Level</option>
            </Select>
          </FormLabel>

          <div>
            Required Qualifications
            <div className="p-0 grid grid-cols-2 xl:grid-cols-5">
              {repeatNode(10, (index) => (
                <label className="flex cursor-pointer items-center gap-2 p-2">
                  <Checkbox
                    ripple={false}
                    containerProps={{ className: "p-0" }}
                    className="hover:before:content-none"
                  />
                  Qualification {index + 1}
                </label>
              ))}
            </div>
          </div>

          <div>
            Desirable Qualifications
            <div className="p-0 grid grid-cols-2 xl:grid-cols-5">
              {repeatNode(10, (index) => (
                <label className="flex cursor-pointer items-center gap-2 p-2">
                  <Checkbox
                    ripple={false}
                    containerProps={{ className: "p-0" }}
                    className="hover:before:content-none"
                  />
                  Qualification {index + 1}
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-4 flex-col md:flex-row">
            <div className="flex-1">
              <FormLabel showAsterik label="Salary">
                <div className="flex flex-1 w-full gap-x-1">
                  <Select variant="light">
                    <option>Monthly</option>
                    <option>Hourly</option>
                  </Select>
                  <Input
                    className="flex-1"
                    required
                    placeholder="Enter salary range"
                  />
                </div>
                <p className="italic">Suggested = $16100</p>
              </FormLabel>
            </div>
            <div className="flex-1">
              <FormLabel showAsterik label="Periods of Work">
                <Input required placeholder="e.g., 9 AM - 5 PM" />
              </FormLabel>
            </div>
          </div>

          <FormLabel label="Additional Benefits">
            <TextArea
              placeholder="List additional benefits (e.g., health insurance)"
              className="h-20"
            />
          </FormLabel>

          <div className="flex gap-4 flex-col md:flex-row">
            <div className="flex-1">
              <FormLabel showAsterik label="Working Language">
                <Select variant="light">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </Select>
              </FormLabel>
            </div>
            <div className="flex-1">
              <FormLabel showAsterik label="Residence">
                <Select variant="light">
                  <option>Yes</option>
                  <option>No</option>
                </Select>
              </FormLabel>
            </div>
          </div>

          <div className="flex gap-4 flex-col md:flex-row">
            <div className="flex-1">
              <FormLabel showAsterik label="Food">
                <Select variant="light">
                  <option>Provided</option>
                  <option>Not Provided</option>
                </Select>
              </FormLabel>
            </div>
            <div className="flex-1">
              <FormLabel label="Means of Transport">
                <TextArea placeholder="Describe transport" className="h-20" />
              </FormLabel>
            </div>
          </div>

          <FormLabel label="Transfer">
            <Select variant="light">
              <option>Required</option>
              <option>Not Required</option>
            </Select>
          </FormLabel>

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
    </>
  );
}
