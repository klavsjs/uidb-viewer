import {
  Group,
  type GroupProps,
  type InputProps,
  Input as RACInput,
  composeRenderProps,
} from "react-aria-components"
import { tv } from "tailwind-variants"
import { composeTailwindRenderProps } from "./utils"

export const fieldBorderStyles = tv({
  variants: {
    isFocusWithin: {
      false: "border-gray-100 hover:border-gray-200",
      true: "border-blue-500",
    },
  },
})

export const fieldGroupStyles = tv({
  base: "group flex items-center h-9 bg-white border rounded overflow-hidden bg-gray-100 hover:bg-gray-200",
  variants: fieldBorderStyles.variants,
})

export function FieldGroup(props: GroupProps) {
  return (
    <Group
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        fieldGroupStyles({ ...renderProps, className }),
      )}
    />
  )
}

export function Input(props: InputProps) {
  return (
    <RACInput
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "min-w-0 flex-1 bg-inherit px-2 py-1.5 text-sm text-gray-800 outline outline-0 disabled:text-gray-200",
      )}
    />
  )
}
