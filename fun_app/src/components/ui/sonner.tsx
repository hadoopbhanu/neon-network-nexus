
"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = { theme: "dark" }

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-neutral-900 group-[.toaster]:text-neural-green group-[.toaster]:border-neural-green/30 group-[.toaster]:shadow-neural",
          description: "group-[.toast]:text-neutral-400",
          actionButton:
            "group-[.toast]:bg-neutral-800 group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-neutral-800 group-[.toast]:text-white",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
