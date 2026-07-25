"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Project {
  title: string
  category: string
  image: string
  link: string
  description: string
  impact: string
  technologies: string[]
}

export default function Projects() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const projects: Project[] = [
    {
      title: "AskShop.ai",
      category: "AI · E-Commerce",
      image: "/askshopai.png",
      link: "/projects/askshop-ai",
      description:
        "B2B Shopify SaaS for product discovery and recommendation — shipped end-to-end in five weeks.",
      impact: "100+ merchants · 5.0 Shopify rating · Stanford-backed",
      technologies: ["TypeScript", "AWS", "React", "OpenAI", "Shopify"],
    },
    {
      title: "Calendare",
      category: "Productivity · AI",
      image: "/calendare.png",
      link: "/projects/calendare",
      description:
        "AI productivity app that schedules events and tasks from goals and preferences automatically.",
      impact: "Goal-to-calendar automation for busy operators",
      technologies: ["Next.js", "TypeScript", "MongoDB", "AWS"],
    },
    {
      title: "HerbalBath Singapore",
      category: "E-Commerce · Health",
      image: "/herbalbath.png",
      link: "/projects/herbalbath-singapore",
      description:
        "Founded and grew a healthcare product company with disciplined unit economics.",
      impact: "$100k+/yr revenue · ~40% profit margin",
      technologies: ["Shopify", "Growth", "Analytics"],
    },
    {
      title: "NFT Sentiment Predictor",
      category: "Web3 · Data",
      image: "/NFinsighT.JPG",
      link: "/projects/nft-sentiment-predictor",
      description:
        "NFT price charts with predicted prices and sentiment over customizable time series.",
      impact: "Forecasting + sentiment in one research surface",
      technologies: ["TypeScript", "Next.js", "tRPC", "Python", "PySpark"],
    },
  ]

  return (
    <section id="projects" className="py-16 sm:py-24 lg:py-32 bg-secondary/40 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 relative z-10">
        <div ref={ref} className="space-y-10 sm:space-y-14">
          <div className="space-y-4 sm:space-y-5 max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground"
            >
              Featured work
            </motion.p>

            <motion.h2
              className="font-display text-[clamp(1.75rem,4.5vw,3.75rem)] font-bold tracking-tight"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.55, delay: 0.05 }}
            >
              Selected projects
            </motion.h2>

            <motion.p
              className="text-lg text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              Case studies across AI products, e-commerce, and data — each framed by outcomes, not just features.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.55, delay: 0.15 }}
            >
              <Button asChild size="lg" className="group bg-foreground text-background hover:bg-foreground/90">
                <Link href="/projects">
                  View all projects
                  <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                className="group relative"
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
                transition={{ duration: 0.5, delay: 0.08 * index }}
              >
                <Link href={project.link} className="block h-full">
                  <article className="relative h-full overflow-hidden border border-border bg-card transition-colors duration-300 group-hover:border-foreground/25">
                    <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                        <span className="text-[11px] uppercase tracking-[0.18em] text-white/80">
                          {project.category}
                        </span>
                        <ArrowUpRight className="h-5 w-5 text-white opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0" />
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-display text-2xl font-semibold tracking-tight">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      <p className="text-sm font-medium text-teal">{project.impact}</p>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2.5 py-1 border border-border text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
