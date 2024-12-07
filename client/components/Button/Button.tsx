import classes from "./Button.module.css";

import type { ButtonProps as HtmlButtonProps } from "react-html-props";
import { combineVisualProps } from "../VisualComponent";

export interface ButtonProps extends HtmlButtonProps {
  fullWidth?: boolean;
  fullRounded?: boolean;
  variant?: "outlined" | "filled" | "light" | "text";
  theme?: "teal" | "white"
}

export function Button({
  fullWidth,
  fullRounded,
  variant = "filled",
  theme = 'teal',
  ...rest
}: ButtonProps) {
  let variantClass: string;

  if (variant === "outlined") {
    variantClass = classes.btn_outline;
  } else if (variant === "filled") {
    variantClass = classes.btn_filled;
  } else if (variant === "light") {
    variantClass = classes.btn_light;
  } else if (variant === "text") {
    variantClass = classes.btn_text;
  } else {
    variantClass = ""
  }

  return (
    <button
      {...combineVisualProps(rest, {
        className: [
          classes.btn,
          theme === 'white' && classes.btn_theme_white,
          fullWidth && "w-full",
          fullRounded && "!rounded-full",
          variantClass
        ]
      })}
    />
  );
}
