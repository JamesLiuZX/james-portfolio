import type { CSSProperties } from "react"
import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

/**
 * Shared masthead for every subpage: back link, mono eyebrow, display title
 * and lede, sitting on the same grid backdrop as the home hero.
 */
export default function PageHeader({
  eyebrow,
  title,
  lede,
  backHref = "/",
  backLabel = "Back to home",
  children,
}: {
  eyebrow: string
  title: ReactNode
  lede?: ReactNode
  backHref?: string
  backLabel?: string
  children?: ReactNode
}) {
  return (
    <header className="relative overflow-hidden pb-14 pt-32 md:pb-16 md:pt-40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-sm mask-fade-b" />
        <div className="absolute -left-24 top-0 h-[26rem] w-[26rem] rounded-full bg-brand/[0.12] blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="shell">
        <div className="reveal space-y-7" style={{ "--reveal-duration": "0.6s" } as CSSProperties}>
          <Link
            href={backHref}
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
            {backLabel}
          </Link>

          <div className="space-y-5">
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              {eyebrow}
            </span>
            <h1 className="max-w-3xl text-display-sm font-semibold md:text-display-md">{title}</h1>
            {lede && (
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">{lede}</p>
            )}
          </div>

          {children}
        </div>
      </div>
    </header>
  )
}
