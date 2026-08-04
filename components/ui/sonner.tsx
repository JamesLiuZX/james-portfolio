"use client"

import dynamic from "next/dynamic"
import { useTheme } from "next-themes"
import type { ToasterProps as SonnerProps } from "sonner"

/*
 * Toasts only ever fire from the contact form, but the Toaster sits in the
 * root layout, so every page was paying to download and hydrate the toast
 * library up front. Loading it lazily and client-side keeps it out of the
 * critical path — `sonner.toast()` queues anything raised before it arrives.
 */
const Sonner = dynamic(() => import("sonner").then((mod) => mod.Toaster), {
  ssr: false,
})

type ToasterProps = SonnerProps

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
