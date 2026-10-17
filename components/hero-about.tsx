import type { CSSProperties } from "react"
import Link from "next/link"
import { ArrowDown, ArrowUpRight, Download } from "lucide-react"
import { RESUME_PATH, LINKEDIN_URL } from "@/lib/site"

type Entry = { name: string; href?: string }

/** The ledger under the headline: where James is, where he was, what he builds. */
const ledger: { label: string; entries: Entry[]; note: string }[] = [
  {
    label: "Now",
    entries: [{ name: "Revolut" }],
    note: "Product Owner, Crypto Trading",
  },
  {
    label: "Before",
    entries: [{ name: "Crypto.com" }, { name: "ByteDance" }],
    note: "Trading & derivative products; Lark",
  },
  {
    label: "On the side",
    entries: [
      { name: "Quorum", href: "/projects/quorum" },
      { name: "Kino", href: "/projects/kino" },
      { name: "HerbalBath", href: "/projects/herbalbath-singapore" },
    ],
    note: "An AI trading desk, an AI video studio, my own brand",
  },
]

/** Shorthand for the `--enter-delay` custom property the CSS entrances read. */
const delay = (seconds: number) => ({ "--enter-delay": `${seconds}s` }) as CSSProperties

export default function HeroAbout() {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* One soft wash at the top. Nothing moves or tracks the pointer. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem] bg-gradient-to-b from-surface-muted to-transparent"
      />

      <div className="shell pb-20 pt-36 md:pb-28 md:pt-48">
        <p
          className="enter font-mono text-[11px] uppercase tracking-[0.18em] text-subtle"
          style={delay(0)}
        >
          James Liu · Singapore
        </p>

        <h1
          className="enter mt-7 max-w-5xl font-display text-[2.4rem] font-normal leading-[1.08] tracking-[-0.015em] text-foreground/90 sm:text-[3rem] md:text-[3.5rem] lg:text-[3.75rem]"
          style={delay(0.08)}
        >
          <span className="block">Building crypto trading at Revolut,</span>
          <em className="block text-muted-foreground">and AI tools that earn their place.</em>
        </h1>

        <p
          className="enter mt-8 max-w-[36rem] text-[1.0625rem] leading-relaxed text-muted-foreground md:text-lg"
          style={delay(0.16)}
        >
          I&apos;m James, a product owner who started out as an engineer. Before Revolut I worked on
          prediction markets, options and an AI trading agent at Crypto.com, and on Lark&apos;s AI
          partnerships at ByteDance.
        </p>

        <div className="enter mt-10 flex flex-wrap items-center gap-3" style={delay(0.24)}>
          <a
            href="#experience"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity duration-300 hover:opacity-90"
          >
            See my work
            <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
          <a
            href={RESUME_PATH}
            download
            className="group inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium transition-colors duration-300 hover:border-foreground/30"
          >
            <Download className="h-4 w-4" />
            Résumé (PDF)
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 px-3 py-3 text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground"
          >
            LinkedIn
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <dl
          className="enter-fade mt-16 grid gap-8 border-t border-border/70 pt-8 sm:grid-cols-3 md:mt-24"
          style={{ ...delay(0.34), "--enter-duration": "0.8s" } as CSSProperties}
        >
          {ledger.map((row) => (
            <div key={row.label}>
              <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-subtle">
                {row.label}
              </dt>
              <dd className="mt-3 text-sm font-medium text-foreground">
                {row.entries.map((entry, index) => (
                  <span key={entry.name}>
                    {index > 0 && <span className="text-subtle">, </span>}
                    {entry.href ? (
                      <Link href={entry.href} className="link-underline">
                        {entry.name}
                      </Link>
                    ) : (
                      entry.name
                    )}
                  </span>
                ))}
              </dd>
              <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{row.note}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
