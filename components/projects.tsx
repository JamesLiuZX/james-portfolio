"use client"
import { useRef } from "react"
import { useInView } from "react-intersection-observer"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Project {
  title: string
  category: string
  image: string
  link: string
  description: string
  technologies: string[]
  featured: boolean
  github?: string
}

export default function Projects() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const projects: Project[] = [
    {
      title: "ASKSHOP.AI",
      category: "AI, E-Commerce",
      image: "/askshopai.png",
      link: "/projects/askshop-ai",
      description:
        "A B2B e-commerce SaaS focused on product discovery and recommendation, distributed across Shopify stores.",
      technologies: ["TypeScript", "AWS", "React", "OpenAI", "Shopify API"],
      featured: true,
      github: "https://github.com/JamesLiuZX",
    },
    {
      title: "CALENDARE",
      category: "Productivity, AI",
      image: "/calendare.png",
      link: "/projects/calendare",
      description:
        "AI-powered productivity app that automatically schedules events and tasks based on goals and preferences.",
      technologies: ["Next.js", "TypeScript", "MongoDB", "AWS"],
      featured: true,
      github: "https://github.com/JamesLiuZX",
    },
    {
      title: "HERBALBATH SINGAPORE",
      category: "E-Commerce, Health",
      image: "/herbalbath.png",
      link: "/projects/herbalbath-singapore",
      description: "Founded and grew a healthcare product company to over 100k in yearly revenue on 40% profit margin.",
      technologies: ["Shopify", "Marketing", "E-commerce", "Analytics"],
      featured: true,
    },
    {
      title: "NFT SENTIMENT PREDICTOR",
      category: "Web3, Data Analysis",
      image: "/NFinsighT.JPG",
      link: "/projects/nft-sentiment-predictor",
      description:
        "Implemented NFT price charts with predicted prices and sentiment over customizable time series parameters.",
      technologies: ["TypeScript", "Next.js", "tRPC", "Python", "PySpark"],
      featured: true,
      github: "https://github.com/JamesLiuZX",
    },
  ]

  return (
    <section
      id="projects"
      className="py-20 md:py-32 bg-background relative overflow-hidden bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-gray-100/30 via-background to-background dark:from-gray-800/10 dark:via-background dark:to-background"
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern" />
        <div className="absolute -top-[30%] -right-[10%] w-[40%] h-[70%] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-[30%] -left-[10%] w-[40%] h-[70%] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div ref={ref} className="space-y-12">
          <div className="space-y-4">
            <motion.h2
              className="text-2xl font-semibold"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              FEATURED PROJECTS
            </motion.h2>

            <motion.p
              className="text-lg text-muted-foreground max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Discover my featured work across various domains, from AI-powered applications to e-commerce platforms.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button asChild className="group" variant="outline">
                <Link href="/projects">
                  VIEW ALL PROJECTS
                  <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </Button>
            </motion.div>
          </div>

          <div ref={containerRef} className="relative">
            <motion.div
              style={{ y }}
              className="absolute -right-20 top-1/2 transform -translate-y-1/2 w-40 h-40 rounded-full bg-primary/5 blur-3xl"
            />
            <motion.div
              style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
              className="absolute -left-20 top-1/3 transform -translate-y-1/2 w-40 h-40 rounded-full bg-primary/5 blur-3xl"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  className="group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="bg-card rounded-xl overflow-hidden border border-border shadow-sm transition-all duration-300 group-hover:shadow-md h-full flex flex-col bg-gradient-to-br from-white to-gray-50/80 dark:from-gray-900 dark:to-gray-800/10">
                    <div className="relative overflow-hidden aspect-[16/9]">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={800}
                        height={500}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                        <Badge variant="outline" className="bg-black/50 text-white border-none w-fit mb-2">
                          {project.category}
                        </Badge>
                        <h3 className="text-xl font-medium text-white">{project.title}</h3>
                      </div>
                    </div>

                    <div className="flex-1 p-6 space-y-4">
                      <h3 className="text-xl font-medium">{project.title}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">{project.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="font-normal bg-secondary/80 text-secondary-foreground/90"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="secondary" className="font-normal">
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="p-6 pt-0 flex gap-2 mt-auto">
                      <Button asChild size="sm" className="flex-1">
                        <Link href={project.link}>View Details</Link>
                      </Button>

                      <div className="flex gap-1">
                        {project.github && (
                          <Button size="icon" variant="outline" asChild className="h-9 w-9">
                            <Link href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4" />
                            </Link>
                          </Button>
                        )}

                        {project.link.startsWith("http") && (
                          <Button size="icon" variant="outline" asChild className="h-9 w-9">
                            <Link href={project.link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </Button>
                        )}
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

