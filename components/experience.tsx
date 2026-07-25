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
        "Building AI-powered, product-led experiences that drive measurable growth across the Crypto.com product surface.",
        "Partnering with design, engineering, and growth to ship high-impact features with clear outcome ownership.",
      ],
    },
    {
      company: "ByteDance",
      role: "Growth Product Manager",
      period: "JUL '24 – SEP '25",
      description: [
        "Received full-time conversion in 2024 and Spot Bonus award for full-time employees in Q2 2025, given to top 10% performers.",
        "Co-led the development of a multi-modal AI content generation platform for SEO, utilizing LLMs and RAG, writing technical specs and working with a team of 7, which increased unique monthly visitors by 20% over 3 months.",
        "Co-led Lark's partnership with Perplexity AI, bringing over $20 million USD in value.",
        "Initiated revamps of over 20 key pages, resulting in over 40% increased conversion rate on average.",
      ],
    },
    {
      company: "Trendsi",
      role: "Product Manager Intern",
      period: "AUG '23 – JUL '24",
      description: [
        "Worked on optimizing onboarding flow, user acquisition, and incentivizing first transactions.",
        "Directed the development of four frontend products, achieving a 35% increase in conversion rates in shopping carts and a 100% improvement in user site retention length.",
        "Spearheaded the implementation of Stripe's 3D Secure and advanced Radar rules, leading to a 90% reduction in fraudulent transactions, translating to monthly savings of $20,000 USD.",
        "Enhanced website visibility and user experience by boosting SEO rankings by 26% and accelerating page load speeds by 20%.",
      ],
    },
    {
      company: "AskShop.ai",
      role: "CEO, Co-Founder",
      period: "FEB '24 – JUL '24",
      description: [
        "Led the development of a B2B e-commerce SaaS focused on product discovery and recommendation, that can be distributed across every Shopify store, in just 5 weeks. (TypeScript, AWS, Liquid, Gadget, JavaScript)",
        "Achieved funding from Stanford Startup Society and 2nd place in Stanford internal hackathon.",
        "Achieved >100 business users and 5 reviews on the Shopify app store. (5.0/5.0 app rating)",
      ],
    },
    {
      company: "Ernst & Young",
      role: "Software Engineer Intern",
      period: "MAY '23 – AUG '23",
      description: [
        "Spearheaded frontend development of an internal real-time dashboard for an international client, which will impact over a million users per year, while communicating with clients to solve evolving software needs. (ReactJS, .NET Framework, jQuery, C#, SQL, Microsoft Azure)",
      ],
    },
    {
      company: "NUS TSMI",
      role: "Software Engineer Intern",
      period: "FEB '23 – MAY '23",
      description: [
        "In charge of front-end development for a real-time research data platform under the National University of Singapore Tropical Marine Science Institute (NUS-TMSI) using TypeScript, React and Tailwind CSS.",
        "Contributed to the establishment of an operational research data platform with multi-layered access and analytics that allows for incorporation to national networks. (Java, Java EE, Spring Boot, SQL)",
      ],
    },
    {
      company: "Pantas",
      role: "Software Engineer Intern",
      period: "MAY '22 – AUG '22",
      description: [
        "Improved application performance using AWS Lambda, S3 and AWS API Gateways for serverless computing.",
        "Improved security and reduced inbox spam by over 90% by implementing 4 backend features including reCAPTCHA and stricter input validations. (SQL, Python)",
      ],
    },
  ]

  return (
    <section id="experience" className="relative py-24 md:py-32 overflow-hidden bg-background">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div ref={ref} className="space-y-14">
          <div className="space-y-5 max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground"
            >
              Professional journey
            </motion.p>

            <motion.h2
              className="font-display text-4xl md:text-6xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.55, delay: 0.05 }}
            >
              Experience
            </motion.h2>

            <motion.p
              className="text-lg text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              Growth products, AI platforms, and measurable outcomes — from founding to enterprise scale.
            </motion.p>

            <motion.div
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

          <div className="relative">
            <div className="absolute left-3 md:left-5 top-4 bottom-0 w-px bg-border" />

            <div className="space-y-10">
              {experiences.map((exp, index) => (
                <motion.div
                  key={`${exp.company}-${exp.period}`}
                  className="relative"
                  initial={{ opacity: 0, x: -24 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
                  transition={{ duration: 0.45, delay: 0.06 * index }}
                >
                  <div className="flex gap-5 md:gap-8">
                    <div className="relative flex-shrink-0">
                      <div
                        className={`w-6 h-6 md:w-10 md:h-10 rounded-full flex items-center justify-center border-[3px] border-background z-20 relative ${
                          exp.current ? "bg-teal" : "bg-foreground"
                        }`}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-background" />
                      </div>
                    </div>

                    <div className="flex-1 pb-2">
                      <div className="relative border border-border/80 hover:border-foreground/20 rounded-2xl p-5 md:p-7 transition-colors bg-card/40">
                        <div className="space-y-5">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-display text-xl md:text-2xl font-semibold tracking-tight">
                                  {exp.company}
                                </h3>
                                {exp.current && (
                                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal/15 text-teal font-semibold">
                                    Current
                                  </span>
                                )}
                              </div>
                              <p className="text-base text-muted-foreground font-medium">{exp.role}</p>
                            </div>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary text-muted-foreground whitespace-nowrap">
                              {exp.period}
                            </span>
                          </div>

                          <ul className="space-y-3">
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
