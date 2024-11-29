import { LabelProps as HtmlLabelProps } from "react-html-props";
import { combineVisualProps } from "~/components/VisualComponent";

export function FormLabel({
  label,
  children,
  ...rest
}: { label: string } & HtmlLabelProps) {
  return (
    <label
      {...combineVisualProps(rest, {
        className: "flex flex-col gap-y-1.5"
      })}
    >
      {label && <span>{label}</span>}
      {children}
    </label>
  );
}