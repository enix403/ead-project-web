import type { SVGProps } from "react";

export const TitleMark = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={142}
    height={12}
    fill='none'
    viewBox="0 0 142 12"
    {...props}
  >
    <path
      fill='#000'
      d='M139.029 11.143a1.5 1.5 0 1 0 1.942-2.286l-1.942 2.286Zm-137.8.34C20.804 8.47 51.233 4.854 78.875 3.801c13.825-.527 26.908-.412 37.571.728 5.331.57 10.022 1.392 13.88 2.504 3.879 1.117 6.803 2.496 8.702 4.109l1.942-2.286c-2.363-2.009-5.752-3.536-9.814-4.706-4.082-1.176-8.957-2.023-14.391-2.604C105.898.385 92.652.274 78.762.804c-27.79 1.06-58.337 4.69-77.99 7.713l.456 2.966Z'
    />
  </svg>
);