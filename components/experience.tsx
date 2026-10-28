"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"
import { ArrowUpRight, Linkedin } from "lucide-react"
import { Reveal, SectionHeading } from "@/components/ui/section"
import { cn } from "@/lib/utils"

interface Role {
  company: string
  role: string
  period: string
  /** Marks an ongoing role — renders a live dot and a "Current" pill. */
  current?: boolean
  /** Headline numbers pulled out of the bullets so they read at a glance. */
  metrics?: { value: string; label: string }[]
  description: string[]
  /** Launch visuals for work shipped in the role, the same set as the role's LinkedIn media. */
  media?: { src: string; title: string; alt: string }[]
  tags?: string[]
}

// Every number here is from James's resumes or his LinkedIn experience section.
// Revolut has no metrics yet, by design.
const experiences: Role[] = [
  {
    company: "Revolut",
    role: "Product Owner, Wealth & Trading",
    period: "Nov 2026 — Present",
    current: true,
    description: ["Product owner for wealth and trading inside the main Revolut app."],
    tags: ["Wealth & trading", "Technical product"],
  },
  {
    company: "Crypto.com",
    role: "Product Manager, Trading & Derivative Products",
    period: "Sep 2025 — Nov 2026",
    metrics: [
      { value: "+60%", label: "Prediction Markets MAU, QoQ" },
      { value: "+90%", label: "New-user trading volume, referrals" },
      { value: "−90%", label: "AI workflow turnaround" },
    ],
    description: [
      "AI and trading for 140 million users worldwide. PM for the main app's trading surface and the infrastructure beneath it, focused on derivatives: options, futures and prediction markets.",
      "Prediction Markets: owned market mechanics, pricing and quotation logic, market operations and rewards. Grew monthly active users 60% quarter on quarter with market launches and lifecycle campaigns tied to the FIFA World Cup and NBA Finals.",
      "Worked with engineering on an AI trading agent that lets users place and manage trades in natural language through OpenClaw and third-party bot integrations: the tool-calling surface, the context passed to the model and the safety constraints. Contributed code via PRs.",
      "Designed and automated the team's internal AI workflows (RAG retrieval, multi-agent orchestration, PRD drafting and working prototypes hosted on the company domain), cutting turnaround on that work by 90%. Built on Claude Code, MCP and the Google Workspace CLI.",
      "Spearheaded the main referral programme and the welcome bonus, lifting new-user trading volume 90% and 15% respectively.",
      "Compliance for app onboarding, KYC, AML and anti-fraud, alongside the geographic expansion of trading products into the EEA and additional US states.",
    ],
    media: [
      {
        src: "/media/crypto-com/prediction-trading.webp",
        title: "Prediction trading",
        alt: "Crypto.com prediction trading: make predictions with greater confidence",
      },
      {
        src: "/media/crypto-com/ai-search.webp",
        title: "AI search",
        alt: "Crypto.com: AI-powered search for all things crypto",
      },
      {
        src: "/media/crypto-com/ai-agent-trading.webp",
        title: "AI agent trading",
        alt: "Crypto.com: stay in control while your AI agent does the trading",
      },
      {
        src: "/media/crypto-com/welcome-bonus.webp",
        title: "Welcome bonuses",
        alt: "Crypto.com: play, trade and win welcome bonuses",
      },
    ],
    tags: ["Derivatives", "Prediction markets", "AI agents", "Growth"],
  },
  {
    company: "ByteDance",
    role: "Product Manager, Lark",
    period: "Jul 2024 — Sep 2025",
    metrics: [
      { value: "$24M", label: "Enterprise AI deal" },
      { value: "200K+", label: "User licences" },
      { value: ">20%", label: "Lead conversion, per page" },
    ],
    description: [
      "Converted to full time in 2024 and received a spot bonus in Q2 2025.",
      "Ran the Perplexity AI partnership end to end, from model evaluation and commercial negotiation to technical integration, closing a $24M enterprise deal covering 200,000+ user licences.",
      "Co-led a 16-person team building a multi-modal AI content generation platform for SEO: the vector embedding pipeline over the Lark knowledge base, the semantic retrieval layer and the generation workflow. It drove 20% of organic SEO traffic and lifted unique monthly visitors 20% in 3 months.",
      "Redesigned 20+ core high-traffic web pages, lifting lead conversion by more than 20% per page on average, and grew ARR 7% through modular B2B SaaS referral initiatives.",
    ],
    tags: ["Multimodal AI", "RAG", "AI partnerships", "B2B SaaS"],
  },
  {
    company: "Trendsi",
    role: "Product Manager Intern, San Francisco",
    period: "Aug 2023 — Jul 2024",
    metrics: [
      { value: "+35%", label: "Cart conversion" },
      { value: "−90%", label: "Fraudulent txns" },
      { value: "$20K", label: "Saved monthly" },
    ],
    description: [
      "Raised cart conversion 35% by leading development of a product similarity recommendation engine at the #1-ranked Shopify and TikTok App Store startup (Series A).",
      "Cut fraudulent transactions 90%, saving about US$20,000 a month, with Stripe 3D Secure and Radar risk rules.",
    ],
    tags: ["Recommendations", "Payments", "Fraud"],
  },
  {
    company: "Ernst & Young",
    role: "Software Engineer Intern",
    period: "May 2023 — Aug 2023",
    metrics: [{ value: "1M+", label: "Users served / yr" }],
    description: [
      "Led frontend development of a real-time analytics dashboard for an international enterprise client serving 1M+ users a year.",
    ],
    tags: ["ReactJS", ".NET", "C#", "Azure"],
  },
  {
    company: "HerbalBath",
    role: "Co-founder",
    period: "Apr 2021 — Present",
    metrics: [
      { value: "S$200K+", label: "Annual revenue" },
      { value: "30,000+", label: "Customers" },
    ],
    description: [
      "Grew a DTC wellness brand to S$200K+ annual revenue and 30,000+ customers, running acquisition on AI-generated video ads and UGC alongside lifecycle and referral campaigns.",
      "Built its growth stack: PayNow checkout, a WhatsApp reorder engine, a referral captain kit and an SEO content engine.",
    ],
    tags: ["DTC", "AI video ads", "Lifecycle"],
  },
]

/** Roles open on first load, so the timeline leads with proof. */
const DEFAULT_OPEN = ["Crypto.com", "ByteDance"]

export default function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  // Several roles can be open at once; each card toggles on its own.
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(DEFAULT_OPEN))
  const toggle = (company: string) =>
    setExpanded((open) => {
      const next = new Set(open)
      if (next.has(company)) next.delete(company)
      else next.add(company)
      return next
    })

  /*
   * Fills the timeline rail as the section passes through the viewport, on a
   * single coalesced passive listener rather than a scroll-linked spring.
   */
  useEffect(() => {
    const timeline = timelineRef.current
    const rail = railRef.current
    if (!timeline || !rail) return

    let frame = 0

    const paint = () => {
      frame = 0
      const rect = timeline.getBoundingClientRect()
      const start = window.innerHeight * 0.7
      const end = window.innerHeight * 0.6
      const span = rect.height + start - end
      const progress = span > 0 ? (start - rect.top) / span : 0
      rail.style.transform = `scaleY(${Math.min(1, Math.max(0, progress))})`
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

  return (
    <section id="experience" className="section-y relative">
      <div className="shell">
        <SectionHeading
          eyebrow="Professional journey"
          title={
            <>
              Experience across{" "}
              <span className="serif-accent text-brand">trading</span>, derivatives and
              applied AI.
            </>
          }
          lede="Four years in product and engineering, from an engineering internship to trading products for 140 million users. Six years as a founder, with a DTC brand of my own running the whole time. The through-line is shipping things that move a number."
          action={
            <a
              href="https://www.linkedin.com/in/james-liu-zx/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:border-brand/40"
            >
              <Linkedin className="h-4 w-4" />
              View LinkedIn
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          }
        />

        <div ref={timelineRef} className="relative mt-20">
          {/* Rail: static track with a scroll-linked fill. */}
          <div className="absolute left-[7px] top-2 h-full w-px bg-border md:left-[calc(13rem+7px)]">
            <div
              ref={railRef}
              className="h-full w-px origin-top scale-y-0 bg-gradient-to-b from-brand to-brand-alt"
            />
          </div>

          <div className="space-y-4">
            {experiences.map((exp, index) => {
              const isOpen = expanded.has(exp.company)

              return (
                <article
                  key={exp.company}
                  className="reveal relative pl-8 md:grid md:grid-cols-[13rem_1fr] md:gap-0 md:pl-0"
                  style={
                    {
                      "--reveal-delay": `${Math.min(index, 3) * 0.06}s`,
                      "--reveal-duration": "0.6s",
                    } as CSSProperties
                  }
                >
                  {/* Period column doubles as the rail label on desktop. */}
                  <div className="mb-2 md:mb-0 md:pr-8 md:pt-[26px] md:text-right">
                    <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.12em] text-subtle">
                      {exp.period}
                    </span>
                  </div>

                  {/* Node */}
                  <span
                    className={cn(
                      "absolute left-0 top-[7px] z-10 grid h-[15px] w-[15px] place-items-center rounded-full border-2 bg-background transition-colors duration-300 md:left-[13rem] md:top-[27px]",
                      isOpen ? "border-brand" : "border-border",
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full transition-colors duration-300",
                        isOpen ? "bg-brand" : "bg-border",
                      )}
                    />
                  </span>

                  <div className="md:pl-8">
                    <div
                      className={cn(
                        "card-surface overflow-hidden",
                        isOpen ? "border-brand/25 shadow-soft" : "hover:border-border",
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => toggle(exp.company)}
                        aria-expanded={isOpen}
                        className="flex w-full items-start justify-between gap-4 p-6 text-left md:p-7"
                      >
                        <div className="space-y-1">
                          <h3 className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xl font-semibold tracking-tight md:text-2xl">
                            {exp.company}
                            {exp.current && (
                              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-400">
                                <span className="relative flex h-1 w-1">
                                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500/70 [animation:pulse-ring_2.4s_ease-out_infinite]" />
                                  <span className="relative inline-flex h-1 w-1 rounded-full bg-emerald-500" />
                                </span>
                                Current
                              </span>
                            )}
                          </h3>
                          <p className="text-sm text-muted-foreground">{exp.role}</p>
                        </div>
                        <span
                          className={cn(
                            "mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-transform duration-300",
                            isOpen && "rotate-45 border-brand/40 text-brand",
                          )}
                          aria-hidden="true"
                        >
                          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                            <path
                              d="M6 1v10M1 6h10"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                      </button>

                      {exp.metrics && (
                        <div
                          className={cn(
                            "grid gap-px border-y border-border/70 bg-border/60",
                            exp.metrics.length === 1 && "grid-cols-1",
                            exp.metrics.length === 2 && "grid-cols-2",
                            exp.metrics.length >= 3 && "grid-cols-3",
                          )}
                        >
                          {exp.metrics.map((metric) => (
                            <div key={metric.label} className="bg-surface px-5 py-4">
                              <div className="text-xl font-semibold tracking-tight md:text-2xl">
                                {metric.value}
                              </div>
                              <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-subtle">
                                {metric.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/*
                        0fr→1fr on a grid row is the CSS equivalent of
                        animating height to `auto`, without a JS animation
                        loop. The clipping child has to be bare: padding on it
                        would survive the collapse and leave the closed card
                        taller than it was.
                      */}
                      <div
                        className={cn(
                          "grid transition-[grid-template-rows,opacity] [transition-duration:450ms] ease-out-expo",
                          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                        )}
                      >
                        <div className="overflow-hidden">
                          <div className="space-y-5 p-6 pt-5 md:p-7 md:pt-6">
                            <ul className="space-y-3">
                              {exp.description.map((item) => (
                                <li
                                  key={item}
                                  className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                                >
                                  <span
                                    aria-hidden="true"
                                    className="mt-[9px] h-px w-3 shrink-0 bg-brand/50"
                                  />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>

                            {exp.media && (
                              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                {exp.media.map((item) => (
                                  <li key={item.src}>
                                    <figure className="space-y-2">
                                      <img
                                        src={item.src}
                                        alt={item.alt}
                                        width={169}
                                        height={85}
                                        loading="lazy"
                                        className="aspect-[2/1] w-full rounded-lg border border-border/70 object-cover"
                                      />
                                      <figcaption className="font-mono text-[10px] uppercase tracking-[0.1em] text-subtle">
                                        {item.title}
                                      </figcaption>
                                    </figure>
                                  </li>
                                ))}
                              </ul>
                            )}

                            {exp.tags && (
                              <div className="flex flex-wrap gap-2">
                                {exp.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="rounded-full border border-border/70 bg-surface-muted px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        <Reveal delay={0.1} className="mt-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">
            Select a role to read the detail
          </p>
        </Reveal>
      </div>
    </section>
  )
}
