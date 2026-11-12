"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === "dark"

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative grid h-9 w-9 place-items-center rounded-full border border-border/70 bg-surface/60 text-foreground/80",
        "transition-colors duration-300 hover:border-brand/40 hover:text-foreground",
        className,
      )}
    >
      {/*
        Render nothing until mounted so SSR and client markup agree. Keying
        the span on the theme restarts the swap animation on every toggle.
      */}
      {mounted && (
        <span
          key={isDark ? "moon" : "sun"}
          className="theme-swap absolute inset-0 grid place-items-center"
        >
          {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </span>
      )}
    </button>
  )
}
