// See https://github.com/creativetimofficial/material-tailwind/issues/651#issuecomment-1999724366 for more information

import {} from "@material-tailwind/react";

type EventCapture = {
  onPointerEnterCapture?: unknown;
  onPointerLeaveCapture?: unknown;
};

declare module "@material-tailwind/react" {
  export interface ButtonProps extends EventCapture {
    placeholder?: unknown;
  }
  export interface InputProps extends EventCapture {
    crossOrigin?: unknown;
  }
  export interface SwitchProps extends EventCapture {
    crossOrigin?: unknown;
  }
  export interface SelectProps extends EventCapture {
    placeholder?: unknown;
  }
  export interface IconButtonProps extends EventCapture {
    placeholder?: unknown;
  }
  export interface AvatarProps extends EventCapture {
    placeholder?: unknown;
  }
}