"use client"

import { useState } from "react"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CursorFollower from "@/components/cursor-follower"
import ScrollProgress from "@/components/scroll-progress"
import ParallaxSection from "@/components/parallax-section"

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
      image: "/placeholder.svg?height=600&width=800",
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
      image: "/placeholder.svg?height=600&width=800",
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
      image: "/placeholder.svg?height=600&width=800",
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
      image: "/placeholder.svg?height=600&width=800",
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
    <main className="min-h-screen">
      <CursorFollower />
      <ScrollProgress />
      <Navbar />

      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  <Button variant="ghost" size="sm" className="group">
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to Home
                  </Button>
                </Link>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold">Projects</h1>
              <p className="text-lg text-muted-foreground max-w-3xl">
                A showcase of my work across various domains, from AI-powered applications to e-commerce platforms.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant={filter === null ? "default" : "outline"} size="sm" onClick={() => setFilter(null)}>
                All Categories
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={filter === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(category)}
                >
                  {category}
                </Button>
              ))}
              <Button
                variant={showFeaturedOnly ? "default" : "outline"}
                size="sm"
                onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                className="ml-auto"
              >
                {showFeaturedOnly ? "All Projects" : "Featured Only"}
              </Button>
            </div>

            <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <ParallaxSection key={project.id} offset={10} className="h-full">
                  <motion.article
                    className="group flex flex-col h-full bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={`/projects/${project.id}`} className="relative h-48 overflow-hidden">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={800}
                        height={600}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {project.featured && (
                        <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                          Featured
                        </div>
                      )}
                    </Link>

                    <div className="flex-1 p-6 space-y-4">
                      <div>
                        <div className="inline-flex items-center rounded-full bg-secondary/50 px-3 py-1 text-xs">
                          {project.category}
                        </div>
                      </div>

                      <Link href={`/projects/${project.id}`}>
                        <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          {project.title}
                        </h2>
                      </Link>

                      <p className="text-muted-foreground text-sm line-clamp-3">{project.description}</p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span key={tech} className="text-xs bg-secondary px-2 py-1 rounded">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="text-xs bg-secondary px-2 py-1 rounded">
                            +{project.technologies.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-6 pt-0 flex gap-2">
                      <Button size="sm" variant="default" asChild className="flex-1">
                        <Link href={`/projects/${project.id}`}>View Details</Link>
                      </Button>

                      {project.liveUrl && (
                        <Button size="sm" variant="outline" asChild className="w-10 px-0">
                          <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                      )}

                      {project.githubUrl && (
                        <Button size="sm" variant="outline" asChild className="w-10 px-0">
                          <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </motion.article>
                </ParallaxSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

