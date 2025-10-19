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
      className="py-20 md:py-32 bg-gradient-to-b from-background via-secondary/10 to-background relative overflow-hidden"
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div ref={ref} className="space-y-16">
          {/* Header Section */}
          <div className="space-y-6 text-center md:text-left max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="outline" className="mb-4">Featured Work</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                SELECTED PROJECTS
              </h2>
            </motion.div>

            <motion.p
              className="text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Discover my featured work across various domains—from AI-powered applications to e-commerce platforms. Each project represents a unique challenge and innovative solution.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button asChild size="lg" className="group">
                <Link href="/projects">
                  VIEW ALL PROJECTS
                  <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Projects Grid */}
          <div ref={containerRef} className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  className="group relative"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Link href={project.link}>
                    <div className="relative h-full bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl transition-all duration-500 group-hover:border-primary/30">
                      {/* Image Container */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-black border-0">
                            {project.category}
                          </Badge>
                        </div>

                        {/* Links Overlay */}
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {project.github && (
                            <Button 
                              size="icon" 
                              variant="secondary" 
                              className="h-8 w-8 bg-white/90 backdrop-blur-sm hover:bg-white"
                              onClick={(e) => {
                                e.preventDefault()
                                window.open(project.github, '_blank')
                              }}
                            >
                              <Github className="h-4 w-4" />
                            </Button>
                          )}
                          <Button 
                            size="icon" 
                            variant="secondary" 
                            className="h-8 w-8 bg-white/90 backdrop-blur-sm hover:bg-white"
                          >
                            <ArrowUpRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {project.description}
                          </p>
                        </div>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="text-xs px-2.5 py-1 rounded-full bg-secondary/80 text-secondary-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="text-xs px-2.5 py-1 rounded-full bg-secondary/80 text-secondary-foreground">
                              +{project.technologies.length - 4}
                            </span>
                          )}
                        </div>

                        {/* View Details Button */}
                        <div className="pt-2">
                          <span className="text-sm font-medium text-primary inline-flex items-center group-hover:gap-2 transition-all">
                            View Details 
                            <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}