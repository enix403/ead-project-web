import clsx from "clsx";
import { Button } from "~/components/Button/Button";
import { Input, TextArea } from "~/components/Input/Input";
import { Select } from "~/components/Select/Select";
import { FormLabel } from "~/components/FormLabel/FormLabel";

export function PostJob({ onNext, onCancel }: any) {
  return (
    <>
      <h1 className='font-semibold text-2xl'>Post a New Job !</h1>
      <h4 className='mt-1 text-black/70'>Ready to jump back in?</h4>

      <div className='bg-teal/5 p-7 mt-7 rounded-xl space-y-6'>
        <FormLabel label='Job Title'>
          <Input placeholder='Title' />
        </FormLabel>
        <FormLabel label='Job Description'>
          <TextArea
            className='h-40'
            defaultValue='Spent severl years working on sheep on wall street. Had moderate success investing in Yugo`s on wall street. Managed a small team buying and selling stics for farmers. Spent several years licensing licorice in west palm beach, FL. Developed several new methods for working it banjos in the aftermarekt. Spent a weekend iporting banjos n west palm beach,  Yugo`s on wall street. Managed a small team buying and selling stics for farmers. Spent several years licensing licorice in west palm beach, FL. Developed several new methods for working it banjos in the aftermarekt. Spent a weekend iporting banjos n west palm beach.'
          />
        </FormLabel>

        <div className='flex gap-x-4'>
          <FormLabel label='Specialisms' className='flex-1'>
            <Select variant='light'>
              <option>Specialisms 1</option>
              <option>Specialisms 2</option>
            </Select>
          </FormLabel>
          <FormLabel label='Job Type' className='flex-1'>
            <Select variant='light'>
              <option>Job Type 1</option>
              <option>Job Type 2</option>
            </Select>
          </FormLabel>
        </div>

        <div className='pt-6'>
          <div className='flex gap-x-3'>
            <Button onClick={onNext} fullRounded>
              Next
            </Button>
            <Button onClick={onCancel} variant='outlined' fullRounded>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
