import type { CSSProperties, ReactNode } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Microtext, Rosette, WaveBand } from "@/components/kyc/guilloche"

/**
 * Masthead for every subpage: filed in the KYC record as a supporting
 * document. Back link, eyebrow, an expanded title and a lede, on the same
 * security print as the home page.
 */
export default function PageHeader({
  eyebrow,
  title,
  lede,
  backHref = "/",
  backLabel = "Back to the file",
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
    <header className="relative overflow-hidden pb-14 pt-[calc(var(--nav-h)+3.5rem)] md:pb-16 md:pt-[calc(var(--nav-h)+5rem)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <Rosette className="absolute -right-40 -top-32 w-[38rem] opacity-90 max-md:-right-56" strokeWidth={0.9} layers={[{ color: "#4434d9", opacity: 0.1, options: { curves: 12, base: 320, a: 70, n: 9, b: 24, m: 29 } }]} />
        <WaveBand className="absolute inset-x-0 bottom-6 h-10 text-violet" opacity={0.12} options={{ lines: 6, amplitude: 12, waves: 12 }} />
        <Microtext className="absolute inset-x-0 top-[calc(var(--nav-h)+0.75rem)] text-ink/25" />
      </div>

      <div className="shell">
        <div className="enter space-y-7" style={{ "--enter-duration": "0.6s" } as CSSProperties}>
          <Link href={backHref} className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft transition-colors hover:text-ink">
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
            {backLabel}
          </Link>
          <div className="space-y-5">
            <span className="eyebrow">
              <span className="text-violet">Supporting document</span>
              <span aria-hidden="true">·</span>
              {eyebrow}
            </span>
            <h1 className="stretch-semi max-w-4xl text-[clamp(2.4rem,5.2vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink">{title}</h1>
            {lede && <p className="max-w-2xl text-lg leading-relaxed text-ink-soft">{lede}</p>}
          </div>
          {children}
        </div>
      </div>
    </header>
  )
}
