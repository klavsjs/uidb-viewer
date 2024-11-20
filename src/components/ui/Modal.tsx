import {
  ModalOverlay,
  type ModalOverlayProps,
  Modal as RACModal,
} from "react-aria-components"
import { tv } from "tailwind-variants"

const overlayStyles = tv({
  base: "fixed top-0 left-0 w-full h-[--visual-viewport-height] isolate z-20 bg-black/50 flex items-center justify-center p-4 text-center backdrop-blur-sm",
  variants: {
    isEntering: {
      true: "animate-in fade-in duration-200 ease-out",
    },
    isExiting: {
      true: "animate-out fade-out duration-200 ease-in",
    },
  },
})

const modalStyles = tv({
  base: "w-full max-w-xl max-h-full overflow-hidden rounded-2xl bg-white text-left align-middle text-slate-700 shadow-2xl bg-clip-padding border border-black/10",
  variants: {
    isEntering: {
      true: "animate-in zoom-in-105 ease-out duration-200",
    },
    isExiting: {
      true: "animate-out zoom-out-95 ease-in duration-200",
    },
  },
})

export function Modal(props: ModalOverlayProps) {
  return (
    <ModalOverlay {...props} className={overlayStyles}>
      <RACModal {...props} className={modalStyles} />
    </ModalOverlay>
  )
}
