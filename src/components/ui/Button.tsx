import { composeRenderProps, Button as RACButton } from "react-aria-components"
import type { ButtonProps as RACButtonProps } from "react-aria-components"
import { tv } from "tailwind-variants"
import { focusRing } from "./utils"

export interface ButtonProps extends RACButtonProps {
  variant?: "destructive" | "primary" | "link"
}

let button = tv({
  extend: focusRing,
  base: "p-1 flex text-sm text-center transition rounded-lg cursor-pointer",
  variants: {
    variant: {
      primary:
        "bg-white text-black/45 hover:bg-gray-100 pressed:bg-gray-200 shadow-[0_0_1px_0_rgba(0,0,0,0.06)] shadow-[0_8px_24px_0_rgba(0,0,0,0.08)]",
      destructive:
        "bg-none border-none px-0 text-red-500 hover:underline pressed:text-red-600 rounded",
      link: "bg-none border-none px-0 text-blue-500 hover:underline pressed:text-blue-600 rounded",
    },
    isDisabled: {
      true: "opacity-50 hover:underline-none cursor-default",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
})

export function Button(props: ButtonProps) {
  return (
    <RACButton
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        button({ ...renderProps, variant: props.variant, className }),
      )}
    />
  )
}
