"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUpRight, Check, Download, Menu, X } from "lucide-react"
import { RESUME_PATH } from "@/lib/site"
import { steps } from "@/lib/kyc"
import { cn } from "@/lib/utils"

const links = [
  { name: "Work", href: "/#funds" },
  { name: "Projects", href: "/projects" },
  { name: "Writing", href: "/blog" },
  { name: "Academic", href: "/academic" },
]

/** His mark: initials in a guilloche ring. */
function Roundel() {
  const rings = [0, 1, 2].map((k) => {
    let d = ""
    for (let i = 0; i <= 120; i++) {
      const t = (i / 120) * Math.PI * 2
      const r = 15.5 + 1.6 * Math.sin(9 * t + k * 0.7)
      d += `${i ? " " : "M"}${(18 + r * Math.cos(t)).toFixed(2)} ${(18 + r * Math.sin(t)).toFixed(2)}`
    }
    return d + "Z"
  })
  return (
    <span className="relative grid h-9 w-9 shrink-0 place-items-center">
      <svg viewBox="0 0 36 36" aria-hidden="true" className="absolute inset-0 text-violet transition-transform duration-700 group-hover:rotate-45">
        {rings.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="currentColor" strokeOpacity={0.55} strokeWidth={0.6} />
        ))}
      </svg>
      <span className="serif-accent relative text-[15px] leading-none text-ink">JL</span>
    </span>
  )
}

/**
 * The top bar. On the home page it is also the KYC progress: five segments
 * that fill as each check is read, with the current step named.
 */
export default function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState(0)
  const fills = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!isHome) return
    const sections = steps
      .map((step) => document.getElementById(step.id))
      .filter((el): el is HTMLElement => el !== null)
    let frame = 0
    let last = -1
    const paint = () => {
      frame = 0
      const line = window.innerHeight * 0.4
      let current = 0
      sections.forEach((el, i) => {
        if (el.getBoundingClientRect().top <= line) current = i
      })
      const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (atEnd) current = sections.length - 1
      sections.forEach((el, i) => {
        const rect = el.getBoundingClientRect()
        const progress = i < current ? 1 : i > current ? 0 : atEnd ? 1 : Math.min(1, Math.max(0, (line - rect.top) / rect.height))
        const fill = fills.current[i]
        if (fill) fill.style.transform = `scaleX(${progress})`
      })
      if (current !== last) {
        last = current
        setActive(current)
      }
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint)
    }
    paint()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule, { passive: true })
    return () => {
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [isHome])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const step = steps[active]

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-[var(--nav-h)] border-b transition-[background-color,border-color] duration-500",
          scrolled ? "nav-scrolled border-ink/10" : "border-transparent",
        )}
      >
        <nav aria-label="Main" className="shell flex h-full items-center gap-6">
          <Link href="/" className="group flex shrink-0 items-center gap-2.5" aria-label="James Liu, home">
            <Roundel />
            <span className="hidden text-sm font-semibold tracking-tight text-ink sm:block">James Liu</span>
          </Link>

          {isHome ? (
            <div className="flex min-w-0 flex-1 items-center justify-center gap-4">
              <ol className="hidden items-center gap-1.5 md:flex" aria-label="KYC steps">
                {steps.map((item, index) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} aria-label={`Step ${index + 1}: ${item.name}`} aria-current={index === active ? "step" : undefined} className="group/seg block py-3">
                      <span className="relative block h-[3px] w-7 overflow-hidden rounded-full bg-ink/10 transition-colors group-hover/seg:bg-ink/25 lg:w-9">
                        <span
                          ref={(el) => {
                            fills.current[index] = el
                          }}
                          className="absolute inset-0 origin-left scale-x-0 rounded-full bg-violet"
                        />
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
              <p className="field min-w-0 truncate text-ink-soft" aria-live="polite">
                <span className="text-violet">Step {String(active + 1).padStart(2, "0")}</span>
                <span className="mx-1.5 opacity-40">/05</span>
                <span className="text-ink">{step.name}</span>
              </p>
            </div>
          ) : (
            <div className="hidden flex-1 items-center justify-center gap-1 md:flex">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-sm transition-colors duration-300",
                    pathname.startsWith(link.href) && link.href !== "/#funds" ? "text-ink" : "text-ink-soft hover:text-ink",
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}

          <div className="ml-auto flex shrink-0 items-center gap-1 md:ml-0">
            {isHome && (
              <div className="hidden items-center gap-1 lg:flex">
                <Link href="/projects" className="rounded-full px-3 py-1.5 text-sm text-ink-soft transition-colors hover:text-ink">
                  Projects
                </Link>
                <Link href="/blog" className="rounded-full px-3 py-1.5 text-sm text-ink-soft transition-colors hover:text-ink">
                  Writing
                </Link>
              </div>
            )}
            <a href={RESUME_PATH} download className="hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-ink-soft transition-colors hover:text-ink sm:inline-flex">
              <Download className="h-3.5 w-3.5" />
              Résumé
            </a>
            <Link
              href="/#approval"
              className="group ml-1 hidden items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-deep sm:inline-flex"
            >
              Contact
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="ml-1 grid h-9 w-9 place-items-center rounded-full border border-ink/15 md:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <div className="enter-fade fixed inset-0 z-40 overflow-y-auto bg-paper/95 backdrop-blur-xl md:hidden" style={{ "--enter-duration": "0.25s" } as CSSProperties}>
          <div className="flex min-h-full flex-col px-7 pb-10 pt-[calc(var(--nav-h)+2rem)]">
            <p className="field text-ink-faint">The file</p>
            <ol className="mt-3">
              {steps.map((item, index) => {
                const done = isHome && index < active
                return (
                  <li key={item.id}>
                    <a href={`/#${item.id}`} onClick={() => setOpen(false)} className="flex items-center gap-4 border-b border-ink/10 py-3.5">
                      <span className={cn("grid h-6 w-6 place-items-center rounded-full border font-mono text-[10px]", done ? "border-signal bg-signal text-white" : "border-ink/25 text-ink-soft")}>
                        {done ? <Check className="h-3 w-3" strokeWidth={3} /> : index + 1}
                      </span>
                      <span className="stretch-semi text-xl font-medium text-ink">{item.name}</span>
                    </a>
                  </li>
                )
              })}
            </ol>
            <p className="field mt-10 text-ink-faint">Documents</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {links.slice(1).map((link) => (
                <Link key={link.name} href={link.href} onClick={() => setOpen(false)} className="rounded-full border border-ink/15 px-4 py-2 text-sm text-ink">
                  {link.name}
                </Link>
              ))}
              <a href={RESUME_PATH} download className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-4 py-2 text-sm text-ink">
                <Download className="h-3.5 w-3.5" />
                Résumé
              </a>
            </div>
            <Link href="/#approval" onClick={() => setOpen(false)} className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-white">
              Contact James
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
