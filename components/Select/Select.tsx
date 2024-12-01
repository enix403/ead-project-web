import type {
  DivProps as HtmlDivProps,
  SelectProps as HtmlSelectProps
} from "react-html-props";
import { combineVisualProps } from "../VisualComponent";
import { IconBriefcase2, IconChevronDown } from "@tabler/icons-react";

export type SelectProps = HtmlDivProps &
  Pick<HtmlSelectProps, "value" | "onChange"> & {
    selectClassName?: string | undefined;
    selectProps?: Omit<HtmlSelectProps, "value" | "onChange"> | undefined;
    variant?: "light" | "outlined";
    icon?: any;
  };

export function Select({
  children,
  value,
  variant = "outlined",
  icon,
  onChange,
  selectClassName,
  selectProps,
  ...divProps
}: SelectProps) {
  return (
    <div
      {...combineVisualProps(divProps, {
        className: [
          "rounded-xl flex p-3 justify-between gap-x-1.5",
          "items-center",
          variant === "outlined" ? "border border-black/20" : "bg-white"
        ]
      })}
    >
      {icon}
      <select
        {...combineVisualProps(selectProps || {}, {
          className: [
            "appearance-none bg-transparent flex-1 self-stretch",
            selectClassName
          ]
        })}
        value={value}
        onChange={onChange}
      >
        {children}
      </select>
      <IconChevronDown size={17} className='self-center' />
    </div>
  );
}
