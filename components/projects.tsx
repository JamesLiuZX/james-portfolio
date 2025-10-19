"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
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
    <section id="projects" className="relative py-32 overflow-hidden bg-gray-50 dark:bg-gray-950">
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
                MY WORK
              </span>
            </motion.div>

            <motion.h2
              className="text-5xl md:text-6xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-black dark:text-white">
                FEATURED PROJECTS
              </span>
            </motion.h2>

            <motion.p
              className="text-lg text-gray-600 dark:text-gray-400"
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
              <Button 
                asChild 
                className="group border border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white bg-transparent hover:bg-black/5 dark:hover:bg-white/5 transition-all" 
                variant="outline"
              >
                <Link href="/projects">
                  VIEW ALL PROJECTS
                  <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="group"
              >
                <div className="relative h-full bg-white dark:bg-black border border-gray-200 dark:border-gray-900 hover:border-gray-300 dark:hover:border-gray-800 rounded-2xl overflow-hidden transition-all duration-300">
                  {/* Image container */}
                  <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-900">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={800}
                      height={500}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Subtle overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300" />
                    
                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 dark:bg-black/90 text-black dark:text-white border-0 backdrop-blur-sm">
                        {project.category}
                      </Badge>
                    </div>

                    {/* Action buttons */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      {project.github && (
                        <Button 
                          size="icon" 
                          className="h-9 w-9 rounded-full bg-white/90 dark:bg-black/90 hover:bg-white dark:hover:bg-black border-0 backdrop-blur-sm"
                          asChild
                        >
                          <Link href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 text-black dark:text-white" />
                          </Link>
                        </Button>
                      )}
                      
                      {project.link.startsWith("http") && (
                        <Button 
                          size="icon" 
                          className="h-9 w-9 rounded-full bg-white/90 dark:bg-black/90 hover:bg-white dark:hover:bg-black border-0 backdrop-blur-sm"
                          asChild
                        >
                          <Link href={project.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 text-black dark:text-white" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold text-black dark:text-white">
                      {project.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="font-normal bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-0"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 4 && (
                        <Badge variant="secondary" className="font-normal bg-gray-100 dark:bg-gray-900">
                          +{project.technologies.length - 4}
                        </Badge>
                      )}
                    </div>

                    {/* CTA Button */}
                    <div className="pt-2">
                      <Button 
                        asChild 
                        className="w-full bg-black text-white hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-100 border-0"
                      >
                        <Link href={project.link}>
                          <span>View Details</span>
                          <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}