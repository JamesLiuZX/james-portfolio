"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from "framer-motion"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import { EASE } from "@/components/ui/section"

const companies = ["Crypto.com", "ByteDance", "Lark", "Trendsi", "Ernst & Young"]

const facts = [
  { label: "Based in", value: "Singapore" },
  { label: "Focus", value: "Trading & applied AI" },
  { label: "Now", value: "PM, Crypto.com" },
  { label: "Studied", value: "Computer Science, NUS" },
]

const headline = ["Product", "manager", "shipping", "AI", "products", "that", "compound."]

export default function HeroAbout() {
  const heroRef = useRef<HTMLElement>(null)
  const [clock, setClock] = useState<string | null>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])

  // Pointer-tracked spotlight over the grid backdrop.
  const pointerX = useMotionValue(50)
  const pointerY = useMotionValue(35)
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${pointerX}% ${pointerY}%, hsl(var(--brand) / 0.10), transparent 65%)`

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

  useEffect(() => {
    const node = heroRef.current
    if (!node) return

    const onMove = (event: MouseEvent) => {
      const rect = node.getBoundingClientRect()
      pointerX.set(((event.clientX - rect.left) / rect.width) * 100)
      pointerY.set(((event.clientY - rect.top) / rect.height) * 100)
    }

    node.addEventListener("mousemove", onMove, { passive: true })
    return () => node.removeEventListener("mousemove", onMove)
  }, [pointerX, pointerY])

  return (
    <section
      id="home"
      ref={heroRef}
      className="grain relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Backdrop: grid, drifting brand glows, pointer spotlight, bottom fade */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-sm mask-fade-b" />
        <div className="absolute -left-32 top-1/4 h-[38rem] w-[38rem] rounded-full bg-brand/20 blur-[120px] animate-drift-slow dark:bg-brand/15" />
        <div className="absolute -right-24 bottom-0 h-[32rem] w-[32rem] rounded-full bg-brand-alt/15 blur-[120px] animate-drift dark:bg-brand-alt/10" />
        <motion.div className="absolute inset-0" style={{ background: spotlight }} />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      <motion.div style={{ opacity, y }} className="shell relative z-10 pb-24 pt-32 md:pb-32 md:pt-36">
        {/* Status line */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
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
        </motion.div>

        {/* Headline */}
        <h1 className="mt-8 max-w-4xl text-[2.15rem] font-semibold leading-[1.04] tracking-[-0.035em] sm:text-display-sm md:mt-10 md:text-display-lg lg:text-display-xl">
          <span className="sr-only">
            James Liu — product manager shipping AI products that compound.
          </span>
          <span aria-hidden="true" className="flex flex-wrap gap-x-[0.28em] gap-y-1">
            {headline.map((word, index) => (
              <span key={word + index} className="overflow-hidden py-[0.06em]">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.12 + index * 0.06, ease: EASE }}
                >
                  {word === "AI" ? (
                    <em className="font-display not-italic text-brand">AI</em>
                  ) : (
                    word
                  )}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>

        {/* Lede */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl"
        >
          I&apos;m <span className="font-medium text-foreground">James</span> — a product manager at
          Crypto.com, building derivatives and trading products. I work where{" "}
          <span className="serif-accent text-[1.15em] text-foreground">markets</span>, growth and
          applied AI overlap, turning research-grade models into things people actually keep using.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-3"
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
        </motion.div>

        {/* Companies */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-16 space-y-4"
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
        </motion.div>

        {/* Facts strip */}
        <motion.dl
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
          className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/70 md:grid-cols-4"
        >
          {facts.map((fact) => (
            <div key={fact.label} className="bg-background/70 p-5 backdrop-blur-sm">
              <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-subtle">
                {fact.label}
              </dt>
              <dd className="mt-2 text-sm font-medium leading-snug">{fact.value}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">Scroll</span>
        <div className="h-10 w-px overflow-hidden bg-border">
          <motion.div
            className="h-4 w-px bg-foreground/60"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  )
}
