import "./Filters.css";

import {
  IconBriefcase2,
  IconChevronDown,
  IconCirclePlusFilled,
  IconMapPin,
  IconMathEqualGreater,
  IconMathEqualLower,
} from "@tabler/icons-react";
import clsx from "clsx";
import {
  Fragment,
  isValidElement,
  PropsWithChildren,
  useState,
  Children,
  ReactNode,
} from "react";

import { RichInput } from "~/components/Input/Input";
import { Button } from "~/components/Button/Button";
import { Select } from "~/components/Select/Select";

import { SwitchOption } from "./SwitchOption";
import { RangeSlider } from "./RangeSlider";
import { useViewMode } from "~/app/providers/auth-state";

type FilterProps = PropsWithChildren & { label: string };

export function Filter(_props: FilterProps) {
  return null;
}

const collectFilterProps = (children: ReactNode): FilterProps[] => {
  const propsArray: FilterProps[] = [];

  Children.forEach(children, (child) => {
    if (isValidElement(child)) {
      if (child.type === Filter) {
        let props = child.props as FilterProps;
        propsArray.push(props);
      } else if (child.type === Fragment) {
        propsArray.push(...collectFilterProps(child.props.children));
      }
    }
  });

  return propsArray;
};

export function FilterList({
  children,
  className,
}: PropsWithChildren & {
  className?: string;
}) {
  let [openIndex, setOpenIndex] = useState(-1);

  let filterConfigs = collectFilterProps(children)?.filter(Boolean) || [];

  return (
    <div className={className}>
      <div className="flex flex-wrap overflow-auto gap-3 pb-2">
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
                  "flex justify-between w-full items-center gap-x-2 rounded-xl",
                  "bg-teal text-white hover:bg-teal-dark",
                  "px-4 py-2"
                )}
              >
                <p className="whitespace-nowrap">{filter.label}</p>
                <IconChevronDown
                  className={clsx("ta", open && "-rotate-180")}
                />
              </button>
              {/* {open && (
                <div className="px-2 pt-1 max-md:hidden">{filter.children}</div>
              )} */}
            </div>
          );
        })}
      </div>
      {openIndex > -1 && (
        <div className="mt-4">{filterConfigs[openIndex].children}</div>
      )}
    </div>
  );
}

export function Filters({ className }: { className?: string }) {
  const viewMode = useViewMode();

  return (
    <FilterList className={className}>
      {/* <Filter label="Search by Keywords">
        <RichInput
          icon={<IconSearch size={17} />}
          inputProps={{ placeholder: "UI/UX Designer" }}
        />
      </Filter> */}
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
      {viewMode === "employee" && (
        <>
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

            <Button
              variant="text"
              fullRounded
              className="mt-3 !gap-x-2 text-teal"
            >
              <IconCirclePlusFilled size={20} />
              View More
            </Button>
          </Filter>
          <Filter label="Salary">
            <div className="flex gap-x-4">
              <RichInput
                icon={<IconMathEqualGreater size={17} />}
                inputProps={{ placeholder: "Min salary" }}
              />
              <RichInput
                icon={<IconMathEqualLower size={17} />}
                inputProps={{ placeholder: "Max salary" }}
              />
            </div>
          </Filter>
        </>
      )}
    </FilterList>
  );
}
