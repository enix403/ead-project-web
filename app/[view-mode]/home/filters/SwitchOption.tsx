import { Switch } from "@material-tailwind/react";

export function SwitchOption({ label }: { label: string }) {
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