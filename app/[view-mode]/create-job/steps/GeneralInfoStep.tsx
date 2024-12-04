import { Button } from "~/components/Button/Button";
import { Input, TextArea } from "~/components/Input/Input";
import { Select } from "~/components/Select/Select";
import { FormLabel } from "~/components/FormLabel/FormLabel";
import { ProposalCard } from "~/components/ProposalCard";
import { StepCallbacks } from "./common";

function ProposalTemplateCard() {
  return (
    <ProposalCard
      showLikedButton={false}
      footer={
        <div className="mt-4 flex items-center gap-x-2 mb-4">
          <Button fullRounded>Use this template</Button>
        </div>
      }
    />
  );
}

export function GeneralInfoStep({ onNext, onCancel }: StepCallbacks) {
  return (
    <>
      <h1 className="font-semibold text-2xl text-center md:text-left">
        Post a New Job !
      </h1>
      <h4 className="mt-1 text-black/70 text-center md:text-left">
        Ready to jump back in?
      </h4>

      <div className="bg-teal/5 p-7 mt-7 rounded-xl space-y-6">
        <FormLabel label="Job Title">
          <Input placeholder="Title" />
        </FormLabel>
        <FormLabel label="Job Description">
          <TextArea
            className="h-40"
            defaultValue="Spent several years working on sheep on wall street. Had moderate success investing in Yugo`s on wall street. Managed a small team buying and selling sticks for farmers. Spent several years licensing licorice in west palm beach, FL. Developed several new methods for working banjos in the aftermarket. Spent a weekend importing banjos in west palm beach, Yugo`s on wall street. Managed a small team buying and selling sticks for farmers. Spent several years licensing licorice in west palm beach, FL. Developed several new methods for working banjos in the aftermarket. Spent a weekend importing banjos at west palm beach."
          />
        </FormLabel>

        <div className="flex gap-4 flex-col md:flex-row">
          <FormLabel label="Specialisms" className="flex-1">
            <Select variant="light">
              <option>Specialisms 1</option>
              <option>Specialisms 2</option>
            </Select>
          </FormLabel>
          <FormLabel label="Specialisms" className="flex-1">
            <Select variant="light">
              <option>Specialisms 1</option>
              <option>Specialisms 2</option>
            </Select>
          </FormLabel>
        </div>

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
