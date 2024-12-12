import "./Filters.css";

import clsx from "clsx";
import {
  IconBriefcase2,
  IconChevronDown,
  IconCirclePlusFilled,
  IconMapPin,
  IconMathEqualGreater,
  IconMathEqualLower,
} from "@tabler/icons-react";
import {
  Fragment,
  isValidElement,
  PropsWithChildren,
  useState,
  Children,
  ReactNode,
  useEffect,
  useCallback,
} from "react";

import { RichInput } from "~/components/Input/Input";
import { Button } from "~/components/Button/Button";
import { Select } from "~/components/Select/Select";

import { SwitchOption } from "./SwitchOption";
import { RangeSlider } from "./RangeSlider";
import { useViewMode } from "~/app/providers/auth-state";
import { useForm } from "react-hook-form";
import { useDebounceCallback } from "usehooks-ts";
import { FilterController, useFilterController } from "./ctrl";

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

function FilterList({
  children,
  className,
}: {
  className?: string;
  children: ReactNode;
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
            </div>
          );
        })}
      </div>
      {openIndex > -1 && (
        <div key={openIndex} className="mt-4">
          {filterConfigs[openIndex].children}
        </div>
      )}
    </div>
  );
}

export function Filters({
  className,
  filterCtrl
}: {
  className?: string;
  filterCtrl: FilterController;
}) {
  const viewMode = useViewMode();

  let { register } = filterCtrl;

  return (
    <FilterList className={className}>
      <Filter label="Location">
        <RichInput
          icon={<IconMapPin size={17} />}
          inputProps={{
            ...register("location"),
            placeholder: "London",
          }}
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
            <Select
              selectProps={register("category")}
              icon={<IconBriefcase2 size={17} />}
            >
              <option value="">Choose a category</option>
              <option>one</option>
              <option>two</option>
              <option>three</option>
            </Select>
          </Filter>
          <Filter label="Job Type">
            <div className="space-y-2.5">
              <SwitchOption
                {...register("jobType.fullTime")}
                label="Full Time"
              />
              <SwitchOption
                {...register("jobType.partTime")}
                label="Part Time"
              />
              <SwitchOption
                {...register("jobType.internship")}
                label="internship"
              />
              <SwitchOption
                {...register("jobType.specificDates")}
                label="Temporary"
              />
            </div>
          </Filter>
          <Filter label="Date Posted">
            <div className="space-y-2.5">
              <SwitchOption {...register("datePosted.all")} label="All" />
              <SwitchOption
                {...register("datePosted.lastHour")}
                label="Last Hour"
              />
              <SwitchOption
                {...register("datePosted.last24Hours")}
                label="Last 24 Hour"
              />
              <SwitchOption
                {...register("datePosted.last7Days")}
                label="Last 7 Days"
              />
            </div>
          </Filter>
          <Filter label="Experience Level">
            <div className="space-y-2.5">
              <SwitchOption
                {...register("expLevelRequired.entry")}
                label="Entry Level"
              />
              <SwitchOption
                {...register("expLevelRequired.mid")}
                label="Mid Level"
              />
              <SwitchOption
                {...register("expLevelRequired.senior")}
                label="Senior Level"
              />
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
