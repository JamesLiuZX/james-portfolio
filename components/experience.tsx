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
      role: "Growth Product Manager",
      period: "JUL '24 - SEP '25",
      description: [
        "Received full-time conversion in 2024 and Spot Bonus award for full-time employees in Q2 2025, given to top 10% performers.",
        "Co-led the development of a multi-modal AI content generation platform for SEO, utilizing LLMs and RAG, writing technical specs and working with a team of 7, which increased unique monthly visitors by 20% over 3 months.",
        "Co-led Lark's partnership with Perplexity AI, bringing over $20 million USD in value.",
        "Initiated revamps of over 20 key pages, resulting in over 40% increased conversion rate on average.",
      ],
      color: "#000000",
    },
    {
      company: "Trendsi",
      role: "Product Manager Intern",
      period: "AUG '23 - JUL '24",
      description: [
        "Worked on optimizing onboarding flow, user acquisition, and incentivizing first transactions.",
        "Directed the development of four frontend products, achieving a 35% increase in conversion rates in shopping carts and a 100% improvement in user site retention length.",
        "Spearheaded the implementation of Stripe's 3D Secure and advanced Radar rules, leading to a 90% reduction in fraudulent transactions, translating to monthly savings of $20,000 USD.",
        "Enhanced website visibility and user experience by boosting SEO rankings by 26% and accelerating page load speeds by 20%.",
      ],
      color: "#1a1a1a",
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
      color: "#2a2a2a",
    },
    {
      company: "Ernst & Young",
      role: "Software Engineer Intern",
      period: "MAY '23 - AUG '23",
      description: [
        "Spearheaded frontend development of an internal real-time dashboard for an international client, which will impact over a million users per year, while communicating with clients to solve evolving software needs. (ReactJS, .NET Framework, JQuery, C#, SQL, Microsoft Azure)",
      ],
      color: "#3a3a3a",
    },
    {
      company: "NUS TSMI",
      role: "Software Engineer Intern",
      period: "FEB '23 - MAY '23",
      description: [
        "In charge of front-end development for a real-time research data platform under the National University of Singapore Tropical Marine Science Institute (NUS-TMSI) using Typescript, React and Tailwind CSS.",
        "Contributed to the establishment of an operational research data platform with multi-layered access and analytics that allows for incorporation to national networks. (Java, Java EE, Spring Boot, SQL)",
      ],
      color: "#4a4a4a",
    },
    {
      company: "Pantas",
      role: "Software Engineer Intern",
      period: "MAY '22 - AUG '22",
      description: [
        "Improved application performance using AWS Lambda, S3 and AWS API Gateways for serverless computing (Amazon Web Services AWS).",
        "Improved security and reduced inbox spam by over 90% by implementing 4 backend features including reCAPTCHA and stricter input validations. (SQL, Python)",
      ],
      color: "#5a5a5a",
    },
  ]

  return (
    <section id="experience" className="relative py-32 overflow-hidden bg-white dark:bg-black">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div ref={ref} className="space-y-16">
          {/* Header */}
          <div className="space-y-6 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white" />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400 tracking-wide">
                PROFESSIONAL JOURNEY
              </span>
            </motion.div>

            <motion.h2
              className="text-5xl md:text-6xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-black dark:text-white">
                EXPERIENCE
              </span>
            </motion.h2>

            <motion.p
              className="text-lg text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              I have a diverse background in growth products and AI, focusing on product-led growth and platform product management.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button 
                className="group border border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white bg-transparent hover:bg-black/5 dark:hover:bg-white/5 transition-all" 
                variant="outline"
                asChild
              >
                <a
                  href="https://www.linkedin.com/in/james-liu-zx/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  VIEW LINKEDIN
                  <Linkedin className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-6 top-6 bottom-0 w-px bg-gray-200 dark:bg-gray-800" />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <div className="flex gap-6 md:gap-8">
                    {/* Timeline dot */}
                    <div className="relative flex-shrink-0">
                      <div 
                        className="w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center border-4 border-white dark:border-black bg-black dark:bg-white z-20 relative"
                      >
                        <div className="w-2 h-2 rounded-full bg-white dark:bg-black" />
                      </div>
                    </div>

                    {/* Content card */}
                    <motion.div
                      className="flex-1 group pb-4"
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <div className="relative bg-white dark:bg-black border border-gray-100 dark:border-gray-900 hover:border-gray-200 dark:hover:border-gray-800 rounded-2xl p-6 md:p-8 transition-all duration-300">
                        <div className="space-y-6">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                            <div>
                              <h3 className="text-xl md:text-2xl font-semibold text-black dark:text-white mb-1">
                                {exp.company}
                              </h3>
                              <p className="text-base text-gray-600 dark:text-gray-400 font-medium">
                                {exp.role}
                              </p>
                            </div>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-900 whitespace-nowrap">
                              {exp.period}
                            </span>
                          </div>

                          <ul className="space-y-3">
                            {exp.description.map((item, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-3 text-gray-600 dark:text-gray-400 text-sm leading-relaxed"
                              >
                                <div className="w-1 h-1 rounded-full bg-black dark:bg-white mt-2 flex-shrink-0" />
                                <span className="flex-1">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
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