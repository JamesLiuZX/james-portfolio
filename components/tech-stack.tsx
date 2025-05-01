"use client"

import type React from "react"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Framer, Figma, Code2, Database, PenTool, Trello, FileCode, Terminal, Server } from "lucide-react"

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
    { name: "Framer", category: "Web Development", icon: <Framer className="h-8 w-8" /> },
    { name: "Webflow", category: "Web Development", icon: <Code2 className="h-8 w-8" /> },
    { name: "Figma", category: "UI/UX Design", icon: <Figma className="h-8 w-8" /> },
    { name: "Adobe CC", category: "Design", icon: <PenTool className="h-8 w-8" /> },
    { name: "Atlassian", category: "Productivity", icon: <Trello className="h-8 w-8" /> },
    { name: "Notion", category: "Productivity", icon: <FileCode className="h-8 w-8" /> },
    { name: "React", category: "Programming", icon: <Code2 className="h-8 w-8" /> },
    { name: "Python", category: "Programming", icon: <Terminal className="h-8 w-8" /> },
    { name: "SQL", category: "Programming", icon: <Database className="h-8 w-8" /> },
    { name: "Next.js", category: "Web Development", icon: <Code2 className="h-8 w-8" /> },
    { name: "TypeScript", category: "Programming", icon: <FileCode className="h-8 w-8" /> },
    { name: "AWS", category: "Cloud", icon: <Server className="h-8 w-8" /> },
  ]

  return (
    <section id="tech-stack" className="py-20 md:py-32 bg-secondary/20">
      <div className="container mx-auto px-4 md:px-6">
        <div ref={ref} className="space-y-12">
          <div className="space-y-4">
            <motion.h2
              className="text-2xl font-semibold"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              MY FAVOURITE STACK
            </motion.h2>

            <motion.p
              className="text-lg text-muted-foreground max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Well-versed in web development, UI/UX design tools, and modern programming technologies.
            </motion.p>
          </div>

          <motion.div
            className="tech-stack-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                className="tech-item p-4 rounded-lg bg-background shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <div className="flex justify-center mb-3 text-primary">{tech.icon}</div>
                <h3 className="text-sm font-medium">{tech.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{tech.category}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

