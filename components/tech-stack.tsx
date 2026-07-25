"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"

interface TechGroup {
  category: string
  items: string[]
}

export default function TechStack() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const groups: TechGroup[] = [
    {
      category: "Product & Growth",
      items: ["Roadmapping", "Experimentation", "SEO / ASO", "Analytics", "User Research"],
    },
    {
      category: "AI & Platforms",
      items: ["LLMs", "RAG", "Prompt Systems", "OpenAI", "Evaluation"],
    },
    {
      category: "Engineering",
      items: ["TypeScript", "React", "Next.js", "Python", "SQL", "AWS"],
    },
    {
      category: "Design & Ops",
      items: ["Figma", "Framer", "Notion", "Jira", "Amplitude"],
    },
  ]

  return (
    <section id="tech-stack" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div ref={ref} className="space-y-12">
          <div className="space-y-4 max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground"
            >
              Toolkit
            </motion.p>
            <motion.h2
              className="font-display text-4xl md:text-5xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.55, delay: 0.05 }}
            >
              How I work
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              A PM stack biased toward shipping: discovery, AI systems, and enough engineering fluency to partner with builders.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {groups.map((group, index) => (
              <motion.div
                key={group.category}
                className="border border-border p-6 space-y-4 bg-card/30"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.45, delay: 0.08 * index }}
              >
                <h3 className="font-display text-lg font-semibold tracking-tight">
                  {group.category}
                </h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
