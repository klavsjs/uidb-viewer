import {
  ToggleButton as RACToggleButton,
  composeRenderProps,
} from "react-aria-components"
import type { ToggleButtonProps } from "react-aria-components"
import { tv } from "tailwind-variants"
import { focusRing } from "./utils"

let styles = tv({
  extend: focusRing,
  base: "px-2 text-sm h-full text-center hover:bg-gray-200 pressed:bg-gray-300 transition rounded-lg shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] cursor-pointer",
  variants: {
    isSelected: {
      false: "text-gray-500 ",
      true: "bg-gray-100 text-blue-600",
    },
    icon: "p-2",
  },
})

export function ToggleButton(props: ToggleButtonProps) {
  return (
    <RACToggleButton
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        styles({ ...renderProps, className }),
      )}
    />
  )
}
