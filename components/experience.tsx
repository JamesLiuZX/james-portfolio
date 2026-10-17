"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"
import { ArrowUpRight, Linkedin } from "lucide-react"
import { Reveal, SectionHeading } from "@/components/ui/section"
import { cn } from "@/lib/utils"
interface Role {
  company: string
  role: string
  period: string
  /** Marks an ongoing role with a "Current" pill. */
  current?: boolean
  description: string[]
  tags?: string[]
}

// Scope and craft rather than employers' internal numbers, which aren't public.
const experiences: Role[] = [
  {
    company: "Revolut",
    role: "Product Owner (Technical), Crypto Trading",
    period: "2026 — Present",
    current: true,
    description: [
      "Technical product owner for crypto trading in the Revolut app, working closely with engineering on the trading experience.",
    ],
    tags: ["Crypto trading", "Technical product"],
  },
  {
    company: "Crypto.com",
    role: "Product Manager, Trading & Derivative Products",
    period: "Sep 2025 — 2026",
    description: [
      "Joined the trading team on Growth & Onboarding, then became product owner for Prediction Markets in 2026, with the Options roadmap alongside.",
      "Prediction Markets: market mechanics, pricing and quotation logic, market operations and rewards. Grew the product with market launches and campaigns around the FIFA World Cup and NBA Finals, and A/B-tested work on app load speed.",
      "Worked on the roadmap for Options and Strike Options, and on derivatives strategy across perpetual futures, tokenized stocks and futures.",
      "Helped ship an AI trading agent, now in production, that lets users place and manage trades in natural language through OpenClaw and third-party bots. Defined the tool-calling surface, the context passed to the model and the safety constraints with engineering, and contributed code.",
      "Growth & Onboarding: onboarding and activation across two engineering teams, including a redesigned welcome bonus, a tiered referral programme and a guided KYC-to-first-trade flow.",
      "Worked with legal and compliance on global KYC and AML workstreams, and brought AI into the team's own workflow: Cursor skills for PRDs, clickable prototypes and weekly reporting automated through MCP.",
    ],
    tags: ["Derivatives", "Prediction markets", "AI agents", "Growth"],
  },
  {
    company: "ByteDance",
    role: "Product Manager, Lark",
    period: "Jul 2024 — Sep 2025",
    description: [
      "Ran Lark's partnership with Perplexity AI end to end, from model evaluation and commercial terms to the technical integration.",
      "Co-led the team building a multimodal AI content platform for SEO: the embedding pipeline over the Lark knowledge base, the semantic retrieval layer and the generation workflow.",
      "Led the revamp of 20 core web pages, and B2B SaaS referral initiatives.",
    ],
    tags: ["Multimodal AI", "RAG", "AI partnerships", "B2B SaaS"],
  },
  {
    company: "Trendsi",
    role: "Product Manager Intern, San Francisco",
    period: "Aug 2023 — Jul 2024",
    description: [
      "Led development of a product-similarity recommendation engine that lifted cart conversion, at a Series A startup serving Shopify and TikTok sellers.",
      "Cut fraudulent transactions with Stripe 3D Secure and Radar risk rules.",
    ],
    tags: ["Recommendations", "Payments", "Fraud"],
  },
  {
    company: "Ernst & Young",
    role: "Software Engineer Intern",
    period: "May 2023 — Aug 2023",
    description: [
      "Led frontend development of a real-time analytics dashboard for an international enterprise client.",
    ],
    tags: ["ReactJS", ".NET", "C#", "Azure"],
  },
  {
    company: "HerbalBath",
    role: "Co-founder",
    period: "Apr 2021 — Present",
    description: [
      "Co-founded and help run a direct-to-consumer wellness brand in Singapore, marketed mostly with AI-generated video ads and UGC.",
      "Built its growth stack: PayNow checkout, a WhatsApp reorder engine, a referral kit and an SEO content engine.",
    ],
    tags: ["DTC", "AI video ads", "Lifecycle"],
  },
]

/** Open the most recent role with real detail behind it. */
const DEFAULT_OPEN = Math.max(
  0,
  experiences.findIndex((role) => role.description.length > 1),
)

export default function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState<number | null>(DEFAULT_OPEN)

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
          lede="From an engineering internship to trading and derivatives at Crypto.com, and now crypto trading at Revolut, with a small brand of my own running the whole time."
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
              const isOpen = expanded === index

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
                        onClick={() => setExpanded(isOpen ? null : index)}
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
