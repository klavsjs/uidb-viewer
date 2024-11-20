import { Check } from "lucide-react"
import {
  Checkbox as AriaCheckbox,
  type CheckboxProps,
  composeRenderProps,
} from "react-aria-components"
import { tv } from "tailwind-variants"
import { focusRing } from "./utils"

const checkboxStyles = tv({
  extend: focusRing,
  base: "flex gap-2 text-black/65 rounded items-center group text-sm transition",
})

const boxStyles = tv({
  base: "w-5 h-5 flex-shrink-0 rounded flex items-center justify-center border transition hover:border-blue-500",
  variants: {
    isSelected: {
      false: "bg-white border-gray-400 group-pressed:border-gray-500",
      true: "bg-blue-500 border-blue-500",
    },
  },
})

const iconStyles = "w-4 h-4 text-white group-disabled:text-gray-400"

export function Checkbox(props: CheckboxProps) {
  return (
    <AriaCheckbox
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        checkboxStyles({ ...renderProps, className }),
      )}
    >
      {({ isSelected, isIndeterminate, ...renderProps }) => (
        <>
          <div
            className={boxStyles({
              isSelected: isSelected,
              ...renderProps,
            })}
          >
            {isSelected ? <Check aria-hidden className={iconStyles} /> : null}
          </div>
          {props.children}
        </>
      )}
    </AriaCheckbox>
  )
}
