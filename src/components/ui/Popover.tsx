import {
  Popover as AriaPopover,
  type PopoverProps as AriaPopoverProps,
  composeRenderProps,
} from "react-aria-components"
import type React from "react"
import { tv } from "tailwind-variants"

export interface PopoverProps extends Omit<AriaPopoverProps, "children"> {
  children: React.ReactNode
}

const styles = tv({
  base: "bg-white forced-colors:bg-[Canvas] shadow-2xl rounded-xl bg-clip-padding",
  variants: {
    isEntering: {
      true: "animate-in fade-in placement-bottom:slide-in-from-top-1 placement-top:slide-in-from-bottom-1 placement-left:slide-in-from-right-1 placement-right:slide-in-from-left-1 ease-out duration-200",
    },
    isExiting: {
      true: "animate-out fade-out placement-bottom:slide-out-to-top-1 placement-top:slide-out-to-bottom-1 placement-left:slide-out-to-right-1 placement-right:slide-out-to-left-1 ease-in duration-150",
    },
  },
})

export function Popover({ children, className, ...props }: PopoverProps) {
  return (
    <AriaPopover
      offset={0}
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        styles({ ...renderProps, className }),
      )}
    >
      {children}
    </AriaPopover>
  )
}
