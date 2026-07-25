"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Linkedin } from "lucide-react"

interface Experience {
  company: string
  role: string
  period: string
  description: string[]
  current?: boolean
}

export default function Experience() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const experiences: Experience[] = [
    {
      company: "Crypto.com",
      role: "Product Manager",
      period: "SEP '25 – PRESENT",
      current: true,
      description: [
        "Sole product owner of Prediction Markets inside a 10M+ MAU app — trading mechanics, growth, rewards, and market ops.",
        "Grew MAU 60% QoQ and doubled quarterly revenue via market launches, rewards, and lifecycle campaigns.",
        "Own Options & Strike Options roadmap; previously owned onboarding/activation for 200K+ monthly funnel users.",
        "Grew referred users 120% and referral trading volume 200%+ in 3 months; +8% first-trade conversion via guided KYC flow.",
      ],
    },
    {
      company: "ByteDance",
      role: "Growth Product Manager",
      period: "JUL '24 – SEP '25",
      description: [
        "Owned Perplexity AI partnership end-to-end — secured a $24M enterprise deal covering 200K+ user licenses.",
        "Co-led a 16-person team on a multi-modal AI SEO content platform; +20% unique monthly visitors in 3 months.",
        "Grew ARR 7% through modular initiatives for the global B2B SaaS referral program; Q2 2025 spot bonus.",
      ],
    },
    {
      company: "Trendsi",
      role: "Product Manager Intern",
      period: "AUG '23 – JUL '24",
      description: [
        "+35% shopping cart conversion by leading a product similarity recommendation engine (Series A Shopify/TikTok app).",
        "Cut fraudulent transactions 90% (~$20K/mo saved) via Stripe 3D Secure and Radar fraud rules.",
      ],
    },
    {
      company: "AskShop.ai",
      role: "Founder",
      period: "FEB '24 – JUL '24",
      description: [
        "Led a team of 5 to ship AI e-commerce product discovery SaaS — 100+ merchants, 5.0 Shopify rating, Stanford grant + 2nd place hackathon.",
      ],
    },
    {
      company: "Ernst & Young",
      role: "Software Engineer Intern",
      period: "MAY '23 – AUG '23",
      description: [
        "Led frontend for a real-time analytics dashboard for an international enterprise client (1M+ users/year).",
      ],
    },
  ]

  return (
    <section id="experience" className="relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 relative z-10">
        <div ref={ref} className="space-y-10 sm:space-y-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end">
            <div className="lg:col-span-8 space-y-4 sm:space-y-5">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.5 }}
                className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground"
              >
                Professional journey
              </motion.p>

              <motion.h2
                className="font-display text-[clamp(2rem,4.5vw,3.75rem)] font-bold tracking-tight"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.55, delay: 0.05 }}
              >
                Experience
              </motion.h2>

              <motion.p
                className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.55, delay: 0.1 }}
              >
                What I own and what moved — prediction markets, AI growth, and 0-to-1 products.
              </motion.p>
            </div>

            <motion.div
              className="lg:col-span-4 lg:flex lg:justify-end"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.55, delay: 0.15 }}
            >
              <Button
                className="group border border-border bg-transparent hover:bg-secondary transition-all"
                variant="outline"
                asChild
              >
                <a
                  href="https://www.linkedin.com/in/james-liu-zx/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View LinkedIn
                  <Linkedin className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
                </a>
              </Button>
            </motion.div>
          </div>

          <div className="relative max-w-5xl xl:max-w-6xl">
            <div className="absolute left-3 md:left-5 top-4 bottom-0 w-px bg-border" />

            <div className="space-y-8 sm:space-y-10">
              {experiences.map((exp, index) => (
                <motion.div
                  key={`${exp.company}-${exp.period}`}
                  className="relative"
                  initial={{ opacity: 0, x: -24 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
                  transition={{ duration: 0.45, delay: 0.05 * index }}
                >
                  <div className="flex gap-4 sm:gap-6 md:gap-8">
                    <div className="relative flex-shrink-0">
                      <div
                        className={`w-6 h-6 md:w-10 md:h-10 rounded-full flex items-center justify-center border-[3px] border-background z-20 relative ${
                          exp.current ? "bg-teal" : "bg-foreground"
                        }`}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-background" />
                      </div>
                    </div>

                    <div className="flex-1 pb-1 min-w-0">
                      <div className="relative border border-border/80 hover:border-foreground/20 rounded-2xl p-4 sm:p-6 md:p-7 transition-colors bg-card/40">
                        <div className="space-y-4 sm:space-y-5">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3">
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <h3 className="font-display text-lg sm:text-xl md:text-2xl font-semibold tracking-tight">
                                  {exp.company}
                                </h3>
                                {exp.current && (
                                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal/15 text-teal font-semibold">
                                    Current
                                  </span>
                                )}
                              </div>
                              <p className="text-sm sm:text-base text-muted-foreground font-medium">{exp.role}</p>
                            </div>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary text-muted-foreground whitespace-nowrap w-fit">
                              {exp.period}
                            </span>
                          </div>

                          <ul className="space-y-2.5">
                            {exp.description.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-3 text-muted-foreground text-sm leading-relaxed"
                              >
                                <div className="w-1 h-1 rounded-full bg-foreground mt-2 flex-shrink-0" />
                                <span className="flex-1">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
