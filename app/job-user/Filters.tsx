import {
  IconBriefcase2,
  IconChevronDown,
  IconCirclePlusFilled,
  IconMapPin,
  IconSearch
} from "@tabler/icons-react";
import clsx from "clsx";
import { PropsWithChildren, useState } from "react";

import "./Filters.css";
import * as Slider from "@radix-ui/react-slider";

import { Switch } from "@material-tailwind/react";
import { RichInput } from "~/components/Input/Input";
import { Button } from "~/components/Button/Button";
import { Select } from "~/components/Select/Select";

function FilterButton({
  label,
  children
}: { label: string } & PropsWithChildren) {
  const [open, setOpen] = useState(false);

  return (
    <div className=''>
      <button
        onClick={() => setOpen(x => !x)}
        className={clsx(
          "flex justify-between w-full items-center gap-x-32",
          "rounded-xl",
          "hover:bg-teal/5",
          "px-2 py-2"
        )}
      >
        <p>{label}</p>
        <IconChevronDown className={clsx("ta", open && "-rotate-180")} />
      </button>
      {open && (
        <div className='px-2 pt-1'>
          {children}
          {/*  */}
        </div>
      )}
    </div>
  );
}

function RangeSlider() {
  return (
    <Slider.Root
      className='SliderRoot'
      defaultValue={[0, 100]}
      max={100}
      step={1}
    >
      <Slider.Track className='SliderTrack'>
        <Slider.Range className='SliderRange' />
      </Slider.Track>
      <Slider.Thumb className='SliderThumb' />
      <Slider.Thumb className='SliderThumb' />
    </Slider.Root>
  );
}

function SwitchOption({ label }: { label: string }) {
  return (
    <label className='flex items-center gap-x-4'>
      <Switch
        ripple
        className='h-full w-full checked:bg-teal shrink-0'
        containerProps={{
          className: "w-11 h-6"
        }}
        circleProps={{
          className: "before:hidden left-0.5 border-none"
        }}
      />
      <span className=''>{label}</span>
    </label>
  );
}

export function Filters() {
  return (
    <div className='bg-teal/5 flex flex-col gap-y-3 px-2 py-4 rounded-xl'>
      <FilterButton label='Search by Keywords'>
        <RichInput
          icon={<IconSearch size={17} />}
          inputProps={{ placeholder: "UI/UX Designer" }}
        />
      </FilterButton>
      <FilterButton label='Location'>
        <RichInput
          icon={<IconMapPin size={17} />}
          inputProps={{ placeholder: "London" }}
        />
        <p className='text-black/80 text-sm mt-3 mb-3'>
          Radius around selected destination
        </p>
        <RangeSlider />

        <Button fullRounded className='mx-auto'>
          100 km
        </Button>
      </FilterButton>
      <FilterButton label='Category'>
        <Select icon={<IconBriefcase2 size={17} />}>
          <option>Choose a category</option>
        </Select>
      </FilterButton>
      <FilterButton label='Job Type'>
        <div className='space-y-2.5'>
          <SwitchOption label='Freelancer' />
          <SwitchOption label='Full Time' />
          <SwitchOption label='Part Time' />
          <SwitchOption label='Temporary' />
        </div>
      </FilterButton>
      <FilterButton label='Date Posted'>
        <div className='space-y-2.5'>
          <SwitchOption label='All' />
          <SwitchOption label='Last Hour' />
          <SwitchOption label='Last 24 Hour' />
          <SwitchOption label='Last 7 Days' />
        </div>
      </FilterButton>
      <FilterButton label='Experience Level'>
        <div className='space-y-2.5'>
          <SwitchOption label='Fresh' />
          <SwitchOption label='1 Year' />
          <SwitchOption label='2 Year' />
          <SwitchOption label='3 Year' />
        </div>

        <Button variant='text' fullRounded className='mt-3 !gap-x-2 text-teal'>
          <IconCirclePlusFilled size={20} />
          View More
        </Button>
      </FilterButton>
      <FilterButton label='Salary'>
        <RangeSlider />

        <Button fullRounded className='mx-auto'>
          $0 - $2000
        </Button>
      </FilterButton>
    </div>
  );
}
