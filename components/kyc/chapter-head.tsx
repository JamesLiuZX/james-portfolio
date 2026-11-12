import type { ReactNode } from "react"
import { Check } from "lucide-react"
import Rise from "@/components/kyc/rise"
import { steps } from "@/lib/kyc"
import { cn } from "@/lib/utils"

/**
 * Opens every check: the step, its question, and a status chip that turns
 * from "Reviewing" to its verdict a beat after the chapter arrives.
 */
export default function ChapterHead({
  index,
  title,
  verdict = "Verified",
  tone = "light",
  children,
  className,
  titleClassName,
}: {
  index: number
  title: (string | { text: string; className?: string })[]
  verdict?: string
  tone?: "light" | "dark"
  children?: ReactNode
  className?: string
  /** Overrides the title size, for long words on small screens. */
  titleClassName?: string
}) {
  const step = steps[index]
  const dark = tone === "dark"
  return (
    <header className={cn("observe", className)}>
      <div className={cn("flex flex-wrap items-center justify-between gap-4 border-t pt-4", dark ? "border-white/10" : "border-ink/15")}>
        <p className={cn("field", dark ? "text-white/55" : "text-ink-faint")}>
          <span className={dark ? "text-violet-bright" : "text-violet"}>Step {String(index + 1).padStart(2, "0")}</span>
          <span className="mx-2 opacity-40">of 05</span>· {step.name}
        </p>
        <span
          className={cn(
            "status-chip relative inline-flex h-7 items-center overflow-hidden rounded-full border px-3 font-mono text-[10.5px] uppercase tracking-[0.16em]",
            dark ? "border-white/15 text-white/70" : "border-ink/15 text-ink-soft",
          )}
        >
          <span className="chip-pending inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
            Reviewing
          </span>
          <span className={cn("chip-done absolute inset-0 inline-flex items-center justify-center gap-1.5", dark ? "text-signal-bright" : "text-signal")}>
            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
            {verdict}
          </span>
        </span>
      </div>
      <Rise
        pieces={title}
        className={cn(
          "stretch-wide mt-12 text-[clamp(2.6rem,6.6vw,5.4rem)] font-semibold leading-[0.95] tracking-[-0.035em] md:mt-16",
          dark ? "text-white" : "text-ink",
          titleClassName,
        )}
      />
      <p className={cn("serif-accent mt-5 text-[1.45rem] md:text-[1.7rem]", dark ? "text-white/60" : "text-ink-soft")}>{step.question}</p>
      {children}
    </header>
  )
}
