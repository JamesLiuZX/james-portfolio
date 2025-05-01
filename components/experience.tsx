"use client"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import ParallaxSection from "./parallax-section"

interface Experience {
  company: string
  role: string
  period: string
  description: string[]
  expanded?: boolean
  logo?: string
  color?: string
}

export default function Experience() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const experiences: Experience[] = [
    {
      company: "ByteDance",
      role: "Global Growth Product Manager (Full Time)",
      period: "MAY  '25 - PRESENT",
      description: [
      ],
      expanded: false,
      color: "#24C5FF",
    },
    {
      company: "ByteDance",
      role: "Global Growth Product Manager Intern",
      period: "JUL '24 - APR '24",
      description: [
        "Co-led the development of a multi-modal AI content generation platform for SEO, utilizing LLMs and RAG, writing technical specs and working with a team of 7, which increased unique monthly visitors by 20% over 3 months.",
        "Co-led Lark's partnership with Perplexity AI, leading to increased revenue and licenses for over 100k users.",
        "Spearheaded modular initiatives for the global referral programme expansion for Bytedance B2B Enterprise SaaS, expected to increase ARR by 15%.",
        "Initiated new website designs in high-traffic pages such as pricing page and events page, increasing weekly leads conversion by 11%.",
      ],
      expanded: true,
      color: "#24C5FF",
    },
    {
      company: "Trendsi",
      role: "Product Manager Intern",
      period: "AUG '23 - JUL '24",
      description: [
        "Directed the development of four frontend products such as product similarity recommendation module, achieving a 35% increase in conversion rates in shopping carts and a 100% improvement in user site retention length.",
        "Spearheaded the implementation of Stripe's 3D Secure and advanced Radar rules, leading to a 90% reduction in fraudulent transactions, translating to monthly savings of $20,000 USD.",
        "Initiated and guided the development of a novel revenue stream through international wholesale overseas freight, anticipated to contribute 25% to Trendsi's annual revenue.",
        "Co-led Trendsi's strategic venture into the Canadian and Mexican markets, overseeing a comprehensive overhaul of the design, logistics, and optimizing payment processes.",
        "Enhanced website visibility and user experience by boosting SEO rankings by 26% and accelerating page load speeds by 20%.",
      ],
      color: "#FF6B6B",
    },
    {
      company: "AskShop.ai",
      role: "CEO, Co-Founder",
      period: "FEB '24 - JUL '24",
      description: [
        "Led the development of a B2B e-commerce SaaS focused on product discovery and recommendation, that can be distributed across every Shopify store, in just 5 weeks. (Typescript, AWS, Liquid, Gadget, Javascript)",
        "Achieved funding from Stanford Startup Society and 2nd place in Stanford internal hackathon.",
        "Achieved >100 business users and 5 reviews on the Shopify app store. (5.0/5.0 app rating)",
      ],
      color: "#6BCB77",
    },
    {
      company: "Ernst & Young",
      role: "Software Engineer Intern",
      period: "MAY '23 - AUG '23",
      description: [
        "Spearheaded frontend development of an internal real-time dashboard for an international client, which will impact over a million users per year, while communicating with clients to solve evolving software needs. (ReactJS, .NET Framework, JQuery, C#, SQL, Microsoft Azure)",
      ],
      color: "#FFD93D",
    },
    {
      company: "NUS TSMI",
      role: "Software Engineer Intern",
      period: "FEB '23 - MAY '23",
      description: [
        "In charge of front-end development for a real-time research data platform under the National University of Singapore Tropical Marine Science Institute (NUS-TMSI) using Typescript, React and Tailwind CSS.",
        "Contributed to the establishment of an operational research data platform with multi-layered access and analytics that allows for incorporation to national networks. (Java, Java EE, Spring Boot, SQL)",
      ],
      color: "#4D96FF",
    },
    {
      company: "Pantas",
      role: "Software Engineer Intern",
      period: "MAY '22 - AUG '22",
      description: [
        "Improved application performance using AWS Lambda, S3 and AWS API Gateways for serverless computing (Amazon Web Services AWS).",
        "Improved security and reduced inbox spam by over 90% by implementing 4 backend features including reCAPTCHA and stricter input validations. (SQL, Python)",
      ],
      color: "#800080",
    },
  ]

  return (
    <section id="experience" className="py-20 md:py-32 bg-secondary/20">
      <div className="container mx-auto px-4 md:px-6">
        <div ref={ref} className="space-y-12">
          <div className="space-y-4">
            <motion.h2
              className="text-2xl font-semibold"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              EXPERIENCE
            </motion.h2>

            <motion.p
              className="text-lg text-muted-foreground max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              I have a diverse background in SaaS, iPaaS, AI, focusing on product-led growth and platform product
              management.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button className="group" variant="outline">
                GET RESUME
                <FileText className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="space-y-10"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative">
              <div className="absolute left-9 top-0 bottom-0 w-px bg-border" />

              {experiences.map((exp, index) => (
                <ParallaxSection key={index} offset={20} className="mb-12 last:mb-0">
                  <motion.div
                    className="relative pl-20"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <div
                      className="absolute left-0 w-[18px] h-[18px] rounded-full border-4 border-background z-10"
                      style={{ backgroundColor: exp.color || "#888", top: "6px" }}
                    />

                    <div className="bg-card rounded-lg p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-xl font-medium">{exp.company}</h3>
                          <p className="text-primary">{exp.role}</p>
                        </div>
                        <span className="text-sm text-muted-foreground px-3 py-1 bg-secondary/50 rounded-full whitespace-nowrap">
                          {exp.period}
                        </span>
                      </div>

                      <ul className="space-y-3 text-muted-foreground">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span className="mr-2 mt-1.5 text-primary">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </ParallaxSection>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

