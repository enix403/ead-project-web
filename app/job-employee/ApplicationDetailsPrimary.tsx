import { Button } from "~/components/Button/Button";
import { Input } from "~/components/Input/Input";
import { Select } from "~/components/Select/Select";
import { FormLabel } from "~/components/FormLabel/FormLabel";

export function ApplicationDetailsPrimary() {
  return (
    <>
      <h1 className='font-semibold text-2xl'>Application Details</h1>

      <div className='bg-teal/5 p-7 mt-7 rounded-xl'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-8'>
          <FormLabel label='Email Address'>
            <Input placeholder='Email Address' />
          </FormLabel>
          <FormLabel label='Username'>
            <Input placeholder='Username' />
          </FormLabel>

          <FormLabel label='Offered Salary' className='flex-1'>
            <Select variant='light'>
              <option>Offered Salary 1</option>
              <option>Offered Salary 2</option>
            </Select>
          </FormLabel>
          <FormLabel label='Career Level' className='flex-1'>
            <Select variant='light'>
              <option>Career Level 1</option>
              <option>Career Level 2</option>
            </Select>
          </FormLabel>
          <FormLabel label='Experience' className='flex-1'>
            <Select variant='light'>
              <option>Experience 1</option>
              <option>Experience 2</option>
            </Select>
          </FormLabel>
          <FormLabel label='Gender' className='flex-1'>
            <Select variant='light'>
              <option>Gender 1</option>
              <option>Gender 2</option>
            </Select>
          </FormLabel>
          <FormLabel label='Industry' className='flex-1'>
            <Select variant='light'>
              <option>Industry 1</option>
              <option>Industry 2</option>
            </Select>
          </FormLabel>
          <FormLabel label='Qualification' className='flex-1'>
            <Select variant='light'>
              <option>Qualification 1</option>
              <option>Qualification 2</option>
            </Select>
          </FormLabel>
        </div>

        <div className='pt-8'>
          <div className='flex gap-x-3'>
            <Button fullRounded>Next</Button>
            <Button variant='outlined' fullRounded>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
