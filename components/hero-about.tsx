"use client"

import { useEffect, useRef, type CSSProperties } from "react"

import { ArrowDown, ArrowUpRight, Download } from "lucide-react"
import { RESUME_PATH } from "@/lib/site"

const companies = ["Revolut", "Crypto.com", "ByteDance", "Trendsi", "Ernst & Young"]

// James's own figures. The ARR is across the companies he founded, not his employers'.
const stats = [
  { value: "4 yrs", label: "Product manager" },
  { value: "6 yrs", label: "Founder" },
  { value: "$800K", label: "Cumulative ARR as a founder" },
]

const headline = ["Trading", "products,", "with", "AI."]

/** Shorthand for the `--enter-delay` custom property the CSS entrances read. */
const delay = (seconds: number) => ({ "--enter-delay": `${seconds}s` }) as CSSProperties

export default function HeroAbout() {
  const heroRef = useRef<HTMLElement>(null)

  /*
   * The hero body fades and drifts as it scrolls away. One passive listener
   * coalesced into a single rAF write, on every device — the cost that used
   * to make this worth skipping was the animation runtime behind it, not the
   * arithmetic.
   */
  useEffect(() => {
    const node = heroRef.current
    if (!node) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const body = node.querySelector<HTMLElement>("[data-hero-body]")
    if (!body) return

    let frame = 0

    const paint = () => {
      frame = 0
      const height = node.offsetHeight || 1
      const progress = Math.min(1, Math.max(0, window.scrollY / height))
      body.style.opacity = String(1 - Math.min(1, progress / 0.75))
      body.style.transform = `translate3d(0, ${progress * 120}px, 0)`
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint)
    }

    paint()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  /*
   * The spotlight tracks a real pointer, so it stays desktop-only — a touch
   * device would download and run a mousemove handler that never fires.
   */
  useEffect(() => {
    const node = heroRef.current
    if (!node) return
    if (!window.matchMedia("(pointer: fine)").matches) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let frame = 0
    let pointer: { x: number; y: number } | null = null

    const paint = () => {
      frame = 0
      if (!pointer) return
      node.style.setProperty("--spot-x", `${pointer.x}%`)
      node.style.setProperty("--spot-y", `${pointer.y}%`)
      pointer = null
    }

    const onMove = (event: MouseEvent) => {
      const rect = node.getBoundingClientRect()
      pointer = {
        x: ((event.clientX - rect.left) / rect.width) * 100,
        y: ((event.clientY - rect.top) / rect.height) * 100,
      }
      if (!frame) frame = requestAnimationFrame(paint)
    }

    node.addEventListener("mousemove", onMove, { passive: true })

    return () => {
      node.removeEventListener("mousemove", onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section
      id="home"
      ref={heroRef}
      className="grain relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Backdrop: a wide grid fading out from the headline, two brand glows, pointer spotlight */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid mask-fade-radial" />
        <div className="orb -left-32 top-1/4 h-[38rem] w-[38rem] bg-brand/25 animate-drift-slow dark:bg-brand/20" />
        <div className="orb -right-24 -top-24 h-[30rem] w-[30rem] bg-brand-alt/15 animate-drift dark:bg-brand-alt/[0.12]" />
        <div className="hero-spotlight absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div data-hero-body className="shell relative z-10 pb-20 pt-32 md:pb-24 md:pt-36">
        {/* Headline */}
        <h1 className="max-w-4xl text-[2.15rem] font-semibold leading-[1.04] tracking-[-0.035em] sm:text-display-sm md:text-display-lg lg:text-display-xl">
          <span className="sr-only">
            James Liu, product manager for wealth and trading at Revolut: trading products, with AI.
          </span>
          <span aria-hidden="true" className="flex flex-wrap gap-x-[0.28em] gap-y-1">
            {headline.map((word, index) => (
              <span key={word + index} className="overflow-hidden py-[0.06em]">
                <span className="enter-mask inline-block" style={delay(0.06 + index * 0.05)}>
                  {word.startsWith("AI") ? (
                    <>
                      <em className="text-gradient-brand font-display not-italic">AI</em>
                      {word.slice(2)}
                    </>
                  ) : (
                    word
                  )}
                </span>
              </span>
            ))}
          </span>
        </h1>

        {/* Lede */}
        <p
          className="enter mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:mt-10 md:text-xl"
          style={{ ...delay(0.3), "--enter-y": "16px" } as CSSProperties}
        >
          I&apos;m <span className="font-medium text-foreground">James</span>, a product manager
          who started out as an engineer. I work on wealth and trading at Revolut, after leading{" "}
          <span className="serif-accent text-[1.15em] text-foreground">derivative products</span>{" "}
          at Crypto.com and building AI products at ByteDance. On the side I build AI agents and
          video tools.
        </p>

        {/* Actions */}
        <div
          className="enter mt-10 flex flex-wrap items-center gap-3"
          style={{ ...delay(0.38), "--enter-y": "16px" } as CSSProperties}
        >
          <a
            href="#experience"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-all duration-300 hover:shadow-glow"
          >
            Explore my work
            <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
          <a
            href="https://www.linkedin.com/in/james-liu-zx/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3.5 text-sm font-medium backdrop-blur-md transition-all duration-300 hover:border-brand/40 hover:bg-surface"
          >
            Let&apos;s connect
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href={RESUME_PATH}
            download
            className="group inline-flex items-center gap-2 rounded-full px-4 py-3.5 text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground"
          >
            <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            Resume
          </a>
        </div>

        {/* Proof: the headline numbers, then where they were earned */}
        <div
          className="enter mt-16 grid gap-10 border-t border-border/70 pt-8 md:mt-20 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-end lg:gap-16"
          style={{ ...delay(0.46), "--enter-y": "16px", "--enter-duration": "0.8s" } as CSSProperties}
        >
          <dl className="grid grid-cols-3 gap-6 sm:grid-cols-[repeat(3,auto)] sm:justify-start sm:gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse justify-end gap-1.5">
                <dt className="font-mono text-[10px] uppercase leading-snug tracking-[0.14em] text-subtle">
                  {stat.label}
                </dt>
                <dd className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="space-y-3 lg:text-right">
            <p className="eyebrow">Experience with</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 lg:justify-end">
              {companies.map((company) => (
                <li
                  key={company}
                  className="text-base font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground"
                >
                  {company}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
