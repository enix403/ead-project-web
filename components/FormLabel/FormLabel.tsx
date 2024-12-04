import { IconAsterisk, IconAsteriskSimple } from "@tabler/icons-react";
import { LabelProps as HtmlLabelProps } from "react-html-props";
import { combineVisualProps } from "~/components/VisualComponent";

export function FormLabel({
  label,
  children,
  showAsterik,
  ...rest
}: { label: string; showAsterik?: boolean } & HtmlLabelProps) {
  return (
    <label
      {...combineVisualProps(rest, {
        className: "flex flex-col gap-y-1.5",
      })}
    >
      {label && (
        <span className="flex items-center gap-x-1">
          {label}
          {showAsterik && <IconAsterisk stroke={3} color="red" size={13} />}
        </span>
      )}
      {children}
    </label>
  );
}
