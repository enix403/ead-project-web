import { Button } from "~/components/Button/Button";
import { Input } from "~/components/Input/Input";
import { Select } from "~/components/Select/Select";
import { FormLabel } from "~/components/FormLabel/FormLabel";

export function ApplicationDetailsSecondary({ onNext, onCancel }: any) {
  return (
    <>
      <h1 className='font-semibold text-2xl text-center md:text-left'>Application Details</h1>

      <div className='bg-teal/5 p-7 mt-7 rounded-xl space-y-6'>
        <FormLabel label='Application Deadline Date'>
          <Input placeholder='06.04.2024' />
        </FormLabel>

        <div className='flex gap-4 flex-col md:flex-row'>
          <FormLabel label='Country' className='flex-1'>
            <Select variant='light'>
              <option>Country 1</option>
              <option>Country 2</option>
            </Select>
          </FormLabel>
          <FormLabel label='City' className='flex-1'>
            <Select variant='light'>
              <option>City 1</option>
              <option>City 2</option>
            </Select>
          </FormLabel>
        </div>

        <FormLabel label='Complete Address'>
          <Input placeholder='329 Queensberry Street, North Melbourne VIC 3051, Australia' />
        </FormLabel>

        <div className='flex gap-4 flex-col md:flex-row'>
          <FormLabel label='Find on Map' className='flex-[2]'>
            <Input placeholder='329 Queensberry Street, North Melbourne VIC 3051, Australia' />
          </FormLabel>
          <FormLabel label='Latitude' className='flex-1'>
            <Input />
          </FormLabel>
          <FormLabel label='Longitude' className='flex-1'>
            <Input />
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
