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
  media?: { src: string; title: string; alt: string; href: string }[]
  tags?: string[]
}

// Every number here is from James's resumes or his LinkedIn experience section.
// Revolut has no metrics yet, by design.
const experiences: Role[] = [
  {
    company: "Revolut",
    role: "Product Owner (Technical)",
    period: "Nov 2026 - Present",
    current: true,
    description: ["Technical product owner for wealth and trading inside the main Revolut app."],
    tags: ["Wealth & trading", "Technical product"],
  },
  {
    company: "Crypto.com",
    role: "Product Manager, Trading & Derivative Products",
    period: "Sep 2025 - Nov 2026",
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
        title: "Product owner of derivatives and prediction markets",
        alt: "Crypto.com prediction trading: make predictions with greater confidence",
        href: "https://crypto.com/us/product-news/prediction-upgrade-2026",
      },
      {
        src: "/media/crypto-com/ai-search.webp",
        title: "Expanded in-app AI search to multi-asset products",
        alt: "Crypto.com: AI-powered search for all things crypto",
        href: "https://crypto.com/en/product-news/delphi-ai-search",
      },
      {
        src: "/media/crypto-com/ai-agent-trading.webp",
        title: "AI trading agent",
        alt: "Crypto.com: stay in control while your AI agent does the trading",
        href: "https://crypto.com/sg/product-news/openclaw-integration",
      },
      {
        src: "/media/crypto-com/welcome-bonus.webp",
        title: "Owned incentives and rewards for all global new users",
        alt: "Crypto.com: play, trade and win welcome bonuses",
        // No launch post for the welcome bonus, so this goes to its help-centre FAQ.
        href: "https://help.crypto.com/en/articles/9575514-welcome-bonus",
      },
    ],
    tags: ["Derivatives", "Prediction markets", "AI agents", "Growth"],
  },
  {
    company: "ByteDance",
    role: "AI Product Manager",
    period: "Jul 2024 - Sep 2025",
    // Follows the LinkedIn copy for this role.
    metrics: [
      { value: "+30%", label: "SEO and leads" },
      { value: "$20M+", label: "Perplexity AI collaboration" },
      { value: ">20%", label: "Lead conversion, per page" },
    ],
    description: [
      "Developed an AI generative content pipeline and fine-tuned frontier models for multimodal generation quality, increasing SEO and leads by 30%.",
      "Growth product: ran a B2B referral campaign.",
      "Led partnerships, including the Perplexity AI collaboration, worth over US$20 million.",
      "Redesigned 20+ core high-traffic website pages, lifting lead conversion by more than 20% per page on average.",
      "Received a full-time conversion in 2024 and a Spot Bonus award in Q2 2025.",
    ],
    tags: ["Generative AI", "AI partnerships", "Growth", "B2B SaaS"],
  },
  {
    company: "Trendsi",
    role: "Product Manager, San Francisco",
    period: "Aug 2023 - Jul 2024",
    metrics: [
      { value: "+25%", label: "Checkout conversion" },
      { value: "+300%", label: "Weekly app reviews" },
      { value: "−90%", label: "Fraudulent txns" },
    ],
    description: [
      "Trendsi is a Series A Silicon Valley e-commerce tech startup with $25M in funding.",
      "Lead PM for 9 projects, with teams of 10 to 15, across payments, frontend conversion and SEO.",
      "Lifted funnel checkout conversion 25%, SEO 30% and weekly app reviews 300%, and grew monthly GMV by $2,000+, helping generate over $15K in GMV.",
      "Reduced fraudulent transactions 90% through data analysis and Stripe 3D Secure and Radar risk rules, saving about US$20,000 a month.",
    ],
    tags: ["Payments", "Conversion", "SEO", "Fraud"],
  },
  {
    company: "HerbalBath",
    role: "Co-founder",
    period: "Apr 2021 - Present",
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
          lede="Three years as a product manager, from AI at ByteDance to trading products for 140 million users, after starting out as an engineer. Alongside it, six years as a founder: $800K in cumulative ARR before I handed the business over. The through-line is shipping things that move a number."
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
                                    <a
                                      href={item.href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="group block space-y-2"
                                    >
                                      <img
                                        src={item.src}
                                        alt={item.alt}
                                        width={800}
                                        height={450}
                                        loading="lazy"
                                        className="aspect-video w-full rounded-lg border border-border/70 object-cover transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-brand/40 group-hover:shadow-soft"
                                      />
                                      <span className="flex items-start gap-1 text-xs leading-snug text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                                        {item.title}
                                        <ArrowUpRight className="mt-px h-3 w-3 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                      </span>
                                    </a>
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
