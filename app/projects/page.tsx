"use client"

import { useState } from "react"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ExternalLink, Github, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CursorFollower from "@/components/cursor-follower"
import ScrollProgress from "@/components/scroll-progress"

interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  category: string
  image: string
  liveUrl?: string
  githubUrl?: string
  featured: boolean
}

export default function Projects() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [filter, setFilter] = useState<string | null>(null)
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)

  const projects: Project[] = [
    {
      id: "askshop-ai",
      title: "AskShop.ai",
      description:
        "A B2B e-commerce SaaS focused on product discovery and recommendation, distributed across Shopify stores. Achieved funding from Stanford Startup Society and 2nd place in Stanford internal hackathon.",
      technologies: ["TypeScript", "AWS", "Liquid", "Gadget", "JavaScript"],
      category: "SaaS",
      image: "/askshopai.png",
      liveUrl: "https://apps.shopify.com/askshop-ai",
      githubUrl: "https://github.com/JamesLiuZX",
      featured: true,
    },
    {
      id: "calendare",
      title: "Calendare",
      description:
        "An AI-powered productivity app that automatically schedules locally scraped events and personalized tasks based on goals and user schedule. Achieved 10k in funding from NUS VIP grant.",
      technologies: ["Next.js", "TypeScript", "MongoDB", "AWS"],
      category: "Productivity",
      image: "/calendare.png",
      githubUrl: "https://github.com/JamesLiuZX",
      featured: true,
    },
    {
      id: "herbalbath-singapore",
      title: "HerbalBath Singapore",
      description:
        "Founded and grew a healthcare product company to over 100k in yearly revenue on 40% profit margin, leading a team in social media marketing, logistics and sales.",
      technologies: ["Ruby", "HTML", "CSS", "JavaScript", "Figma", "Shopify"],
      category: "E-Commerce",
      image: "/herbalbath.png",
      liveUrl: "https://herbalbathsg.com",
      featured: true,
    },
    {
      id: "nft-sentiment-predictor",
      title: "NFT Sentiment Price Predictor",
      description:
        "Implemented and optimised over 20 functional components for NFT price charts overlay with predicted prices and sentiment over customisable time series parameters.",
      technologies: ["TypeScript", "Next.js", "Tailwind CSS", "PostgreSQL", "tRPC", "Python", "PySpark", "SparkNLP"],
      category: "Web3",
      image: "/NFinsighT.JPG",
      liveUrl: "https://nfinsight.vercel.app/",
      githubUrl: "https://github.com/JamesLiuZX",
      featured: true,
    },
    {
      id: "dunman-helper",
      title: "Dunman Helper",
      description:
        "Developed and deployed a chatbot for school used by over 500 users per year using Dialogflow AI, a powerful natural language processing platform.",
      technologies: ["Dialogflow", "Python", "HTML", "JavaScript"],
      category: "AI",
      image: "/placeholder.svg?height=600&width=800",
      liveUrl: "https://jamesliuzx.github.io/AI-Chatbot/",
      githubUrl: "https://github.com/JamesLiuZX/AI-Chatbot",
      featured: false,
    },
    {
      id: "ey-dashboard",
      title: "EY Client Dashboard",
      description:
        "Spearheaded frontend development of an internal real-time dashboard for an international client, which impacts over a million users per year.",
      technologies: ["ReactJS", ".NET Framework", "JQuery", "C#", "SQL", "Microsoft Azure"],
      category: "Enterprise",
      image: "/placeholder.svg?height=600&width=800",
      featured: false,
    },
  ]

  const categories = Array.from(new Set(projects.map((project) => project.category)))

  const filteredProjects = projects
    .filter((project) => (filter ? project.category === filter : true))
    .filter((project) => (showFeaturedOnly ? project.featured : true))

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-secondary/5 to-background">
      <CursorFollower />
      <ScrollProgress />
      <Navbar />

      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-12">
            {/* Header */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  <Button variant="ghost" size="sm" className="group">
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to Home
                  </Button>
                </Link>
              </div>

              <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <Badge variant="outline" className="mb-2">
                  <Sparkles className="mr-1 h-3 w-3" />
                  Portfolio
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold">All Projects</h1>
                <p className="text-lg text-muted-foreground max-w-3xl">
                  A comprehensive showcase of my work across various domains—from AI-powered applications to e-commerce platforms. Each project demonstrates unique technical challenges and innovative solutions.
                </p>
              </motion.div>
            </div>

            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-3"
            >
              <Button 
                variant={filter === null ? "default" : "outline"} 
                size="sm" 
                onClick={() => setFilter(null)}
                className="rounded-full"
              >
                All Categories
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={filter === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
              <div className="ml-auto">
                <Button
                  variant={showFeaturedOnly ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                  className="rounded-full"
                >
                  <Sparkles className="mr-1 h-3 w-3" />
                  {showFeaturedOnly ? "Show All" : "Featured Only"}
                </Button>
              </div>
            </motion.div>

            {/* Projects Grid */}
            <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  className="group relative h-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex flex-col h-full bg-card rounded-xl overflow-hidden border border-border/50 hover:border-primary/30 shadow-sm hover:shadow-xl transition-all duration-500">
                    {/* Image */}
                    <Link href={`/projects/${project.id}`} className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
                      
                      {project.featured && (
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-primary text-primary-foreground border-0 shadow-lg">
                            <Sparkles className="mr-1 h-3 w-3" />
                            Featured
                          </Badge>
                        </div>
                      )}

                      {/* Category Badge */}
                      <div className="absolute bottom-3 left-3">
                        <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-black border-0">
                          {project.category}
                        </Badge>
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="flex-1 p-5 space-y-4 flex flex-col">
                      <Link href={`/projects/${project.id}`}>
                        <h2 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-1">
                          {project.title}
                        </h2>
                      </Link>

                      <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span key={tech} className="text-xs bg-secondary/80 px-2 py-0.5 rounded-md">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="text-xs bg-secondary/80 px-2 py-0.5 rounded-md">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="default" asChild className="flex-1 rounded-lg">
                          <Link href={`/projects/${project.id}`}>View Details</Link>
                        </Button>

                        <div className="flex gap-1">
                          {project.liveUrl && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              asChild 
                              className="w-9 h-9 p-0 rounded-lg"
                            >
                              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4" />
                              </Link>
                            </Button>
                          )}

                          {project.githubUrl && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              asChild 
                              className="w-9 h-9 p-0 rounded-lg"
                            >
                              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="h-4 w-4" />
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                  No projects found matching your filters.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setFilter(null)
                    setShowFeaturedOnly(false)
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}