import {
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  type ListBoxProps as AriaListBoxProps,
  type ListBoxItemProps,
  composeRenderProps,
} from "react-aria-components"
import { tv } from "tailwind-variants"
import { composeTailwindRenderProps, focusRing } from "./utils"

interface ListBoxProps<T>
  extends Omit<AriaListBoxProps<T>, "layout" | "orientation"> {}

export function ListBox<T extends object>({
  children,
  ...props
}: ListBoxProps<T>) {
  return (
    <AriaListBox
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "max-h-80 w-80 overflow-y-auto rounded-lg py-2",
      )}
    >
      {children}
    </AriaListBox>
  )
}

export const itemStyles = tv({
  extend: focusRing,
  base: "h-8 cursor-pointer py-1.5 px-2.5 text-sm hover:bg-gray-200 -outline-offset-1",
})

export function ListBoxItem(props: ListBoxItemProps) {
  const textValue =
    props.textValue ||
    (typeof props.children === "string" ? props.children : undefined)
  return (
    <AriaListBoxItem {...props} textValue={textValue} className={itemStyles}>
      {composeRenderProps(props.children, children => (
        <>{children}</>
      ))}
    </AriaListBoxItem>
  )
}
