import "./Filters.css";

import {
  IconBriefcase2,
  IconChevronDown,
  IconCirclePlusFilled,
  IconMapPin,
  IconSearch,
} from "@tabler/icons-react";
import clsx from "clsx";
import { isValidElement, PropsWithChildren, useState, Children } from "react";

import { RichInput } from "~/components/Input/Input";
import { Button } from "~/components/Button/Button";
import { Select } from "~/components/Select/Select";

import { SwitchOption } from "./SwitchOption";
import { RangeSlider } from "./RangeSlider";

type FilterProps = PropsWithChildren & { label: string };

export function Filter(_props: FilterProps) {
  return null;
}

export function FilterList({ children }: PropsWithChildren) {
  let filterConfigs =
    Children.map(children, (child) => {
      if (isValidElement(child) && child.type === Filter) {
        let props = child.props as FilterProps;
        return props;
      }
    })?.filter(Boolean) || [];

  let [openIndex, setOpenIndex] = useState(-1);

  return (
    <div>
      <div className="md:bg-teal/5 flex md:flex-col overflow-auto gap-3 md:px-2 md:py-4 pb-2 rounded-xl">
        {filterConfigs.map((filter, index) => {
          let open = openIndex === index;
          return (
            <div key={index}>
              <button
                onClick={() => {
                  if (openIndex === index) {
                    setOpenIndex(-1);
                  } else {
                    setOpenIndex(index);
                  }
                }}
                className={clsx(
                  "flex justify-between w-full items-center gap-x-2 md:gap-x-32 rounded-xl",
                  "bg-teal text-white hover:bg-teal-dark hover:md:bg-teal/5 md:text-black md:bg-transparent",
                  "px-2 py-2"
                )}
              >
                <p className="whitespace-nowrap">{filter.label}</p>
                <IconChevronDown
                  className={clsx("ta", open && "-rotate-180")}
                />
              </button>
              {open && (
                <div className="px-2 pt-1 max-md:hidden">{filter.children}</div>
              )}
            </div>
          );
        })}
      </div>
      {openIndex > -1 && (
        <div className="mt-4 md:hidden">
          {filterConfigs[openIndex].children}
        </div>
      )}
    </div>
  );
}

export function Filters() {
  return (
    <FilterList>
      <Filter label="Search by Keywords">
        <RichInput
          icon={<IconSearch size={17} />}
          inputProps={{ placeholder: "UI/UX Designer" }}
        />
      </Filter>
      <Filter label="Location">
        <RichInput
          icon={<IconMapPin size={17} />}
          inputProps={{ placeholder: "London" }}
        />
        <p className="text-black/80 text-sm mt-3 mb-3">
          Radius around selected destination
        </p>
        <RangeSlider />

        <Button fullRounded className="mx-auto">
          100 km
        </Button>
      </Filter>
      <Filter label="Category">
        <Select icon={<IconBriefcase2 size={17} />}>
          <option>Choose a category</option>
        </Select>
      </Filter>
      <Filter label="Job Type">
        <div className="space-y-2.5">
          <SwitchOption label="Freelancer" />
          <SwitchOption label="Full Time" />
          <SwitchOption label="Part Time" />
          <SwitchOption label="Temporary" />
        </div>
      </Filter>
      <Filter label="Date Posted">
        <div className="space-y-2.5">
          <SwitchOption label="All" />
          <SwitchOption label="Last Hour" />
          <SwitchOption label="Last 24 Hour" />
          <SwitchOption label="Last 7 Days" />
        </div>
      </Filter>
      <Filter label="Experience Level">
        <div className="space-y-2.5">
          <SwitchOption label="Fresh" />
          <SwitchOption label="1 Year" />
          <SwitchOption label="2 Year" />
          <SwitchOption label="3 Year" />
        </div>

        <Button variant="text" fullRounded className="mt-3 !gap-x-2 text-teal">
          <IconCirclePlusFilled size={20} />
          View More
        </Button>
      </Filter>
      <Filter label="Salary">
        <RangeSlider />

        <Button fullRounded className="mx-auto">
          $0 - $2000
        </Button>
      </Filter>
    </FilterList>
  );
}
