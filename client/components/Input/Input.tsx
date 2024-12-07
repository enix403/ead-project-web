import type {
  DivProps as HtmlDivProps,
  InputProps as HtmlInputProps,
  TextAreaProps as HtmlTextAreaProps
} from "react-html-props";
import { combineVisualProps } from "../VisualComponent";
import { ReactNode } from "react";

export type InputProps = HtmlInputProps;

export function Input({ ...rest }: InputProps) {
  return (
    <input
      size={1}
      {...combineVisualProps(rest, {
        className: [
          "outline-none p-2.5 rounded-lg",
          "required:invalid:[[data-submitted=true]_&]:outline-red-600"
        ]
      })}
    />
  );
}

export type TextAreaProps = HtmlTextAreaProps;

export function TextArea({ ...rest }: TextAreaProps) {
  return (
    <textarea
      {...combineVisualProps(rest, {
        className: [
          "outline-none p-2.5 rounded-lg",
          "required:invalid:[[data-submitted=true]_&]:outline-red-600"
        ]
      })}
    />
  );
}

export function RichInput({
  icon,
  inputProps = {},
  ...divProps
}: { icon?: ReactNode; inputProps?: HtmlInputProps } & Omit<
  HtmlDivProps,
  "children"
>) {
  return (
    <div
      {...combineVisualProps(divProps, {
        className:
          "border border-black/20 rounded-xl flex-1 flex overflow-hidden px-2.5 py-2 gap-x-1.5 items-center",
          // "outline-none p-2.5 rounded-lg",
          // "required:invalid:[[data-submitted=true]_&]:outline-red-600",
      })}
    >
      {icon}
      <input
        size={1}
        {...combineVisualProps(inputProps, {
          className: "flex-1 outline-none self-stretch"
        })}
      />
    </div>
  );
}
