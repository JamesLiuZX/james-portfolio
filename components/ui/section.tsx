import type { CSSProperties, ReactNode } from "react"
import { cn } from "@/lib/utils"

/** Shared easing so every entrance across the site decelerates identically. */
export const EASE = [0.16, 1, 0.3, 1] as const

/**
 * Fade-and-rise wrapper.
 *
 * Purely declarative: the element carries `.reveal`, and the inline bootstrap
 * in the root layout adds `.is-in` once it scrolls into view. No client
 * component, no hydration, and the reveal fires before React has booted.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  style,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  style?: CSSProperties
}) {
  return (
    <div
      className={cn("reveal", className)}
      style={
        {
          "--reveal-delay": `${delay}s`,
          "--reveal-y": `${y}px`,
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </div>
  )
}

/**
 * The single heading treatment used by every section: mono eyebrow, tight
 * display title, optional lede and trailing action.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  action,
  align = "left",
  className,
}: {
  eyebrow: string
  title: ReactNode
  lede?: ReactNode
  action?: ReactNode
  align?: "left" | "center"
  className?: string
}) {
  const centered = align === "center"

  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        centered && "items-center text-center",
        className,
      )}
    >
      <Reveal>
        <span className="eyebrow">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-brand/60 [animation:pulse-ring_2.4s_ease-out_infinite]" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
          </span>
          {eyebrow}
        </span>
      </Reveal>

      <Reveal delay={0.06}>
        <h2
          className={cn(
            "text-display-sm font-semibold md:text-display-md",
            centered ? "max-w-3xl" : "max-w-4xl",
          )}
        >
          {title}
        </h2>
      </Reveal>

      {lede && (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "text-lg leading-relaxed text-muted-foreground",
              centered ? "mx-auto max-w-2xl" : "max-w-2xl",
            )}
          >
            {lede}
          </p>
        </Reveal>
      )}

      {action && <Reveal delay={0.18}>{action}</Reveal>}
    </div>
  )
}

/** Thin gradient rule used to separate stacked sections. */
export function Hairline({ className }: { className?: string }) {
  return <div className={cn("hairline h-px w-full", className)} aria-hidden="true" />
}
