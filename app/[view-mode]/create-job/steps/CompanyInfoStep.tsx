import { Button } from "~/components/Button/Button";
import { Input, TextArea } from "~/components/Input/Input";
import { FormLabel } from "~/components/FormLabel/FormLabel";
import { StepCallbacks } from "./common";

export function CompanyInfoStep({ onNext, onCancel }: StepCallbacks) {
  return (
    <>
      <h1 className="font-semibold text-2xl text-center md:text-left">
        Company Information
      </h1>

      <div className="bg-teal/5 p-7 mt-7 rounded-xl space-y-6">
        <FormLabel label="Company Name">
          <Input placeholder="Enter company name" />
        </FormLabel>

        <FormLabel label="Username">
          <Input placeholder="Enter username" />
        </FormLabel>

        <FormLabel label="Company Description">
          <TextArea placeholder="Describe your company" className="h-20" />
        </FormLabel>

        <FormLabel label="Website">
          <Input placeholder="Enter company website URL" />
        </FormLabel>

        <div className="flex gap-4 flex-col md:flex-row">
          <div className="flex-1">
            <FormLabel label="Country">
              <Input placeholder="Enter country" />
            </FormLabel>
          </div>
          <div className="flex-1">
            <FormLabel label="City">
              <Input placeholder="Enter city" />
            </FormLabel>
          </div>
        </div>

        <FormLabel label="Complete Address">
          <TextArea placeholder="Enter complete address" className="h-20" />
        </FormLabel>

        <FormLabel label="Date Posted">
          <Input type="date" placeholder="Select the date posted" />
        </FormLabel>

        <div className="pt-6">
          <div className="flex gap-x-3">
            <Button onClick={onNext} fullRounded>
              Next
            </Button>
            <Button onClick={onCancel} variant="outlined" fullRounded>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
