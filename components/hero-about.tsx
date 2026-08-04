"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"

import { ArrowDown, ArrowUpRight } from "lucide-react"

const companies = ["Crypto.com", "ByteDance", "Lark", "Trendsi", "Ernst & Young"]

const facts = [
  { label: "Based in", value: "Singapore" },
  { label: "Focus", value: "Trading & applied AI" },
  { label: "Now", value: "PM, Crypto.com" },
  { label: "Studied", value: "Computer Science, NUS" },
]

const headline = ["Product", "manager", "shipping", "AI", "products", "that", "compound."]

/** Shorthand for the `--enter-delay` custom property the CSS entrances read. */
const delay = (seconds: number) => ({ "--enter-delay": `${seconds}s` }) as CSSProperties

export default function HeroAbout() {
  const heroRef = useRef<HTMLElement>(null)
  const [clock, setClock] = useState<string | null>(null)

  useEffect(() => {
    const tick = () => {
      setClock(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Singapore",
        }).format(new Date()),
      )
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  /*
   * Parallax on the hero body and the pointer-tracked spotlight are both
   * decorative and both cost a listener on a hot path, so they are wired up
   * only for a mouse — a touch device has no pointer to track, and gets a
   * static hero instead of paying for scroll maths it will never show.
   */
  useEffect(() => {
    const node = heroRef.current
    if (!node) return
    if (!window.matchMedia("(pointer: fine)").matches) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const body = node.querySelector<HTMLElement>("[data-hero-body]")
    let frame = 0
    let pointer: { x: number; y: number } | null = null
    let scrolled = false

    const paint = () => {
      frame = 0
      if (pointer) {
        node.style.setProperty("--spot-x", `${pointer.x}%`)
        node.style.setProperty("--spot-y", `${pointer.y}%`)
        pointer = null
      }
      if (scrolled && body) {
        scrolled = false
        const progress = Math.min(1, Math.max(0, window.scrollY / node.offsetHeight))
        body.style.opacity = String(1 - Math.min(1, progress / 0.75))
        body.style.transform = `translate3d(0, ${progress * 120}px, 0)`
      }
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint)
    }

    const onMove = (event: MouseEvent) => {
      const rect = node.getBoundingClientRect()
      pointer = {
        x: ((event.clientX - rect.left) / rect.width) * 100,
        y: ((event.clientY - rect.top) / rect.height) * 100,
      }
      schedule()
    }

    const onScroll = () => {
      scrolled = true
      schedule()
    }

    node.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      node.removeEventListener("mousemove", onMove)
      window.removeEventListener("scroll", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section
      id="home"
      ref={heroRef}
      className="grain relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Backdrop: grid, drifting brand glows, pointer spotlight, bottom fade */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-sm mask-fade-b" />
        <div className="orb -left-32 top-1/4 h-[38rem] w-[38rem] bg-brand/20 animate-drift-slow dark:bg-brand/15" />
        <div className="orb -right-24 bottom-0 h-[32rem] w-[32rem] bg-brand-alt/15 animate-drift dark:bg-brand-alt/10" />
        <div className="hero-spotlight absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div data-hero-body className="shell relative z-10 pb-24 pt-32 md:pb-32 md:pt-36">
        {/* Status line */}
        <div
          className="enter flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
          style={{ ...delay(0), "--enter-y": "12px", "--enter-duration": "0.6s" } as CSSProperties}
        >
          <span className="inline-flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500/70 [animation:pulse-ring_2.4s_ease-out_infinite]" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            Open to product roles
          </span>
          <span className="hidden text-border sm:inline">/</span>
          <span>Singapore</span>
          <span className="hidden text-border sm:inline">/</span>
          {/* Rendered client-side only, so SSR and hydration stay in sync. */}
          <span className="tabular-nums">{clock ?? "--:--:--"} SGT</span>
        </div>

        {/* Headline */}
        <h1 className="mt-8 max-w-4xl text-[2.15rem] font-semibold leading-[1.04] tracking-[-0.035em] sm:text-display-sm md:mt-10 md:text-display-lg lg:text-display-xl">
          <span className="sr-only">
            James Liu — product manager shipping AI products that compound.
          </span>
          <span aria-hidden="true" className="flex flex-wrap gap-x-[0.28em] gap-y-1">
            {headline.map((word, index) => (
              <span key={word + index} className="overflow-hidden py-[0.06em]">
                <span className="enter-mask inline-block" style={delay(0.06 + index * 0.05)}>
                  {word === "AI" ? (
                    <em className="font-display not-italic text-brand">AI</em>
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
          className="enter mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl"
          style={{ ...delay(0.34), "--enter-y": "16px" } as CSSProperties}
        >
          I&apos;m <span className="font-medium text-foreground">James</span> — a product manager at
          Crypto.com, building derivatives and trading products. I work where{" "}
          <span className="serif-accent text-[1.15em] text-foreground">markets</span>, growth and
          applied AI overlap, turning research-grade models into things people actually keep using.
        </p>

        {/* Actions */}
        <div
          className="enter mt-10 flex flex-wrap items-center gap-3"
          style={{ ...delay(0.42), "--enter-y": "16px" } as CSSProperties}
        >
          <a
            href="#experience"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-all duration-300 hover:shadow-lifted"
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
        </div>

        {/* Companies */}
        <div
          className="enter-fade mt-16 space-y-4"
          style={{ ...delay(0.5), "--enter-duration": "0.8s" } as CSSProperties}
        >
          <p className="eyebrow">Experience with</p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {companies.map((company) => (
              <span
                key={company}
                className="text-base font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground md:text-lg"
              >
                {company}
              </span>
            ))}
          </div>
        </div>

        {/* Facts strip */}
        <dl
          className="enter mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/70 md:grid-cols-4"
          style={{ ...delay(0.58), "--enter-y": "16px", "--enter-duration": "0.8s" } as CSSProperties}
        >
          {facts.map((fact) => (
            <div key={fact.label} className="bg-background/70 p-5 backdrop-blur-sm">
              <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-subtle">
                {fact.label}
              </dt>
              <dd className="mt-2 text-sm font-medium leading-snug">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Scroll cue */}
      <div
        className="enter-fade pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        style={{ ...delay(0.9), "--enter-duration": "0.8s" } as CSSProperties}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">Scroll</span>
        <div className="h-10 w-px overflow-hidden bg-border">
          <div className="scroll-cue h-4 w-px bg-foreground/60" />
        </div>
      </div>
    </section>
  )
}
