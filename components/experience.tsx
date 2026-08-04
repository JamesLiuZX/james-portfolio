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
  tags?: string[]
}

const experiences: Role[] = [
  {
    company: "Crypto.com",
    role: "Trading / AI Product Manager",
    period: "Sep 2025 — Present",
    current: true,
    metrics: [
      { value: "+90%", label: "New-user volume" },
      { value: "90%", label: "Workflow time saved" },
      { value: "+15%", label: "Welcome-bonus lift" },
    ],
    description: [
      "Own the main app's trading surface and the infrastructure beneath it, with a focus on derivatives — options, futures and prediction markets.",
      "Designed and automated the team's internal AI workflows — RAG retrieval, multi-agent orchestration, PRD drafting and working prototypes hosted on the company domain — cutting turnaround on that work by 90%. Built on Claude Code, MCP and the Google Workspace CLI.",
      "Spearheaded the main referral programme and the welcome bonus, lifting new-user trading volume by 90% and 15% respectively.",
      "Own compliance for trading onboarding — KYC, AML and anti-fraud — alongside the geographic expansion of trading products into the EEA and additional US states.",
    ],
    tags: ["Derivatives", "Applied AI", "Growth", "Compliance"],
  },
  {
    company: "ByteDance",
    role: "Product Manager",
    period: "Jul 2024 — Sep 2025",
    metrics: [
      { value: "+20%", label: "Monthly visitors" },
      { value: "$20M", label: "Partnership value" },
      { value: "+40%", label: "Avg. conversion" },
    ],
    description: [
      "Received full-time conversion in 2024 and a Spot Bonus award in Q2 2025, given to the top 10% of performers.",
      "Co-led development of a multi-modal AI content generation platform for SEO using LLMs and RAG — wrote the technical specs and worked with a team of 7, increasing unique monthly visitors by 20% over 3 months.",
      "Co-led Lark's partnership with Perplexity AI, bringing over $20 million USD in value.",
      "Initiated revamps of over 20 key pages, resulting in a 40%+ increase in conversion rate on average.",
    ],
    tags: ["LLMs & RAG", "SEO growth", "Partnerships"],
  },
  {
    company: "Trendsi",
    role: "Product Manager Intern",
    period: "Aug 2023 — Jul 2024",
    metrics: [
      { value: "+35%", label: "Cart conversion" },
      { value: "−90%", label: "Fraudulent txns" },
      { value: "$20K", label: "Saved monthly" },
    ],
    description: [
      "Owned onboarding flow optimisation, user acquisition and first-transaction incentives.",
      "Directed development of four frontend products, achieving a 35% increase in cart conversion and a 100% improvement in site retention length.",
      "Spearheaded Stripe 3D Secure and advanced Radar rules, cutting fraudulent transactions by 90% — roughly $20,000 USD saved each month.",
      "Boosted SEO rankings by 26% and accelerated page load speeds by 20%.",
    ],
    tags: ["Onboarding", "Payments", "Conversion"],
  },
  {
    company: "AskShop.ai",
    role: "CEO, Co-Founder",
    period: "Feb 2024 — Jul 2024",
    metrics: [
      { value: "100+", label: "Business users" },
      { value: "5.0", label: "Shopify rating" },
      { value: "5 wks", label: "Zero to launch" },
    ],
    description: [
      "Led development of a B2B e-commerce SaaS for product discovery and recommendation, distributable across every Shopify store — built in 5 weeks.",
      "Secured funding from Stanford Startup Society and placed 2nd in the Stanford internal hackathon.",
      "Grew to 100+ business users with a 5.0/5.0 rating on the Shopify app store.",
    ],
    tags: ["TypeScript", "AWS", "Shopify"],
  },
  {
    company: "Ernst & Young",
    role: "Software Engineer Intern",
    period: "May 2023 — Aug 2023",
    metrics: [{ value: "1M+", label: "Users impacted / yr" }],
    description: [
      "Spearheaded frontend development of an internal real-time dashboard for an international client, projected to impact over a million users per year, working directly with clients on evolving software needs.",
    ],
    tags: ["ReactJS", ".NET", "C#", "Azure"],
  },
  {
    company: "NUS TMSI",
    role: "Software Engineer Intern",
    period: "Feb 2023 — May 2023",
    description: [
      "Led front-end development for a real-time research data platform at the NUS Tropical Marine Science Institute.",
      "Contributed to an operational research data platform with multi-layered access and analytics, built for incorporation into national networks.",
    ],
    tags: ["TypeScript", "React", "Spring Boot"],
  },
  {
    company: "Pantas",
    role: "Software Engineer Intern",
    period: "May 2022 — Aug 2022",
    metrics: [{ value: "−90%", label: "Inbox spam" }],
    description: [
      "Improved application performance using AWS Lambda, S3 and API Gateway for serverless computing.",
      "Improved security and reduced inbox spam by over 90% by implementing 4 backend features including reCAPTCHA and stricter input validation.",
    ],
    tags: ["AWS", "Python", "SQL"],
  },
]

export default function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState<number | null>(0)

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
              <span className="serif-accent text-brand">growth</span>, AI and platform
              product.
            </>
          }
          lede="Six years of building — from serverless backends to multi-modal AI platforms, derivatives trading products and a company of my own. The through-line is shipping things that move a number."
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
