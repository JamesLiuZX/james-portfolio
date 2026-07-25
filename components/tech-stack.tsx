"use client"

import type React from "react"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import {
  Figma,
  Code2,
  Database,
  Terminal,
  Server,
  LineChart,
  Bot,
  LayoutDashboard,
  GitBranch,
  Sparkles,
  Boxes,
  Workflow,
} from "lucide-react"

interface TechItem {
  name: string
  category: string
  icon: React.ReactNode
}

export default function TechStack() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const techStack: TechItem[] = [
    { name: "Figma", category: "Design", icon: <Figma className="h-7 w-7 sm:h-8 sm:w-8" /> },
    { name: "Jira", category: "Delivery", icon: <LayoutDashboard className="h-7 w-7 sm:h-8 sm:w-8" /> },
    { name: "Amplitude", category: "Analytics", icon: <LineChart className="h-7 w-7 sm:h-8 sm:w-8" /> },
    { name: "Mixpanel", category: "Analytics", icon: <Workflow className="h-7 w-7 sm:h-8 sm:w-8" /> },
    { name: "Cursor", category: "AI Dev", icon: <Sparkles className="h-7 w-7 sm:h-8 sm:w-8" /> },
    { name: "Claude Code", category: "AI Dev", icon: <Bot className="h-7 w-7 sm:h-8 sm:w-8" /> },
    { name: "React", category: "Engineering", icon: <Code2 className="h-7 w-7 sm:h-8 sm:w-8" /> },
    { name: "TypeScript", category: "Engineering", icon: <Boxes className="h-7 w-7 sm:h-8 sm:w-8" /> },
    { name: "Next.js", category: "Engineering", icon: <Code2 className="h-7 w-7 sm:h-8 sm:w-8" /> },
    { name: "Python", category: "Engineering", icon: <Terminal className="h-7 w-7 sm:h-8 sm:w-8" /> },
    { name: "SQL", category: "Data", icon: <Database className="h-7 w-7 sm:h-8 sm:w-8" /> },
    { name: "AWS", category: "Cloud", icon: <Server className="h-7 w-7 sm:h-8 sm:w-8" /> },
    { name: "LLMs / RAG", category: "AI Product", icon: <Bot className="h-7 w-7 sm:h-8 sm:w-8" /> },
    { name: "Git", category: "Engineering", icon: <GitBranch className="h-7 w-7 sm:h-8 sm:w-8" /> },
  ]

  return (
    <section id="tech-stack" className="py-16 sm:py-24 lg:py-32 bg-secondary/30 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-16 right-0 w-72 h-72 bg-teal/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-foreground/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 relative z-10">
        <div ref={ref} className="space-y-10 sm:space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-end">
            <div className="lg:col-span-8 space-y-3 sm:space-y-4">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.5 }}
                className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground"
              >
                Toolkit
              </motion.p>
              <motion.h2
                className="font-display text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-tight"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.55, delay: 0.05 }}
              >
                My favourite stack
              </motion.h2>
              <motion.p
                className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.55, delay: 0.1 }}
              >
                Product, analytics, and enough engineering fluency to prototype and ship with AI-assisted workflows.
              </motion.p>
            </div>
          </div>

          <motion.div
            className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 xl:grid-cols-7 gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="group tech-item p-4 sm:p-5 rounded-xl bg-background/90 border border-border shadow-sm hover:border-teal/40 hover:shadow-md transition-all"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.35, delay: 0.04 * index }}
                whileHover={{ y: -4 }}
              >
                <div className="flex justify-center mb-3 text-foreground group-hover:text-teal transition-colors">
                  {tech.icon}
                </div>
                <h3 className="text-xs sm:text-sm font-medium">{tech.name}</h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">{tech.category}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
