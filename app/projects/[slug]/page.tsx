"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, ExternalLink, Github, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CursorFollower from "@/components/cursor-follower"
import ScrollProgress from "@/components/scroll-progress"
import ParallaxSection from "@/components/parallax-section"

interface ProjectDetail {
  id: string
  title: string
  description: string
  longDescription: string
  technologies: string[]
  category: string
  image: string
  gallery?: string[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  date: string
  challenges?: string[]
  solutions?: string[]
  results?: string[]
}

export default function ProjectDetail() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const [project, setProject] = useState<ProjectDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real application, you would fetch this data from your API or CMS
    // For now, we'll use a mock data object
    const projectsData: Record<string, ProjectDetail> = {
      "askshop-ai": {
        id: "askshop-ai",
        title: "AskShop.ai",
        description: "A B2B e-commerce SaaS focused on product discovery and recommendation",
        longDescription:
          "AskShop.ai is a revolutionary B2B e-commerce SaaS platform that transforms how online stores handle product discovery and recommendations. Built for Shopify, it leverages advanced AI to understand customer queries in natural language and provide personalized product recommendations. The platform integrates seamlessly with existing Shopify stores, requiring minimal setup while delivering maximum impact on conversion rates and customer satisfaction.",
        technologies: [
          "TypeScript",
          "AWS",
          "Liquid",
          "Gadget",
          "JavaScript",
          "OpenAI",
          "Shopify API",
          "Node.js",
          "React",
        ],
        category: "SaaS",
        image: "/placeholder.svg?height=600&width=800",
        gallery: [
          "/placeholder.svg?height=600&width=800",
          "/placeholder.svg?height=600&width=800",
          "/placeholder.svg?height=600&width=800",
        ],
        liveUrl: "https://apps.shopify.com/askshop-ai",
        githubUrl: "https://github.com/JamesLiuZX",
        featured: true,
        date: "February 2024",
        challenges: [
          "Creating a natural language interface that accurately understands customer intent",
          "Developing a recommendation engine that works across diverse product catalogs",
          "Ensuring seamless integration with Shopify's ecosystem",
          "Optimizing performance to handle high traffic volumes",
          "Building a solution that requires minimal configuration from store owners",
        ],
        solutions: [
          "Implemented OpenAI's GPT models with custom fine-tuning for e-commerce contexts",
          "Developed a hybrid recommendation system combining collaborative filtering and content-based approaches",
          "Created a lightweight Shopify app that integrates via API without affecting store performance",
          "Utilized AWS infrastructure for scalability and reliability",
          "Designed an intuitive dashboard for merchants to monitor and customize the AI assistant",
        ],
        results: [
          "Achieved funding from Stanford Startup Society",
          "Won 2nd place in Stanford internal hackathon",
          "Acquired over 100 business users within the first month",
          "Maintained a perfect 5.0/5.0 app rating on the Shopify app store",
          "Increased conversion rates by an average of 23% for client stores",
        ],
      },
      calendare: {
        id: "calendare",
        title: "Calendare",
        description: "An AI-powered productivity app for intelligent scheduling",
        longDescription:
          "Calendare is an innovative AI-powered productivity application that revolutionizes how users manage their time. The app automatically schedules events and tasks based on the user's goals, preferences, and existing commitments. By analyzing patterns in the user's calendar and task completion history, Calendare creates optimized schedules that maximize productivity while respecting work-life balance.",
        technologies: [
          "Next.js",
          "TypeScript",
          "MongoDB",
          "AWS",
          "OpenAI",
          "Google Calendar API",
          "TailwindCSS",
          "Vercel",
        ],
        category: "Productivity",
        image: "/placeholder.svg?height=600&width=800",
        gallery: [
          "/placeholder.svg?height=600&width=800",
          "/placeholder.svg?height=600&width=800",
          "/placeholder.svg?height=600&width=800",
        ],
        githubUrl: "https://github.com/JamesLiuZX",
        featured: true,
        date: "January 2024",
        challenges: [
          "Creating an AI system that understands personal productivity patterns",
          "Integrating with multiple calendar and task management systems",
          "Developing algorithms that balance productivity with personal well-being",
          "Building a user-friendly interface for complex scheduling operations",
          "Ensuring data privacy and security for sensitive calendar information",
        ],
        solutions: [
          "Developed a machine learning model that learns from user behavior and preferences",
          "Created seamless integrations with Google Calendar, Microsoft Outlook, and popular task managers",
          "Implemented customizable constraints to prevent burnout and ensure breaks",
          "Designed an intuitive drag-and-drop interface with natural language commands",
          "Built with a privacy-first approach, processing sensitive data locally when possible",
        ],
        results: [
          "Secured $10,000 in funding from NUS VIP grant",
          "Achieved 87% user retention rate after first month",
          "Users reported an average 32% increase in task completion",
          "Featured in several productivity blogs and newsletters",
          "Growing user base with minimal marketing spend through word-of-mouth",
        ],
      },
      // Add more projects as needed
    }

    if (slug && projectsData[slug]) {
      setProject(projectsData[slug])
    } else {
      // Handle case where project doesn't exist
      router.push("/projects")
    }

    setLoading(false)
  }, [slug, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!project) {
    return null
  }

  return (
    <main className="min-h-screen">
      <CursorFollower />
      <ScrollProgress />
      <Navbar />

      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4 md:px-6">
          <div ref={ref} className="space-y-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Link href="/projects" className="text-muted-foreground hover:text-primary transition-colors">
                  <Button variant="ghost" size="sm" className="group">
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to Projects
                  </Button>
                </Link>
              </div>

              <motion.h1
                className="text-3xl md:text-5xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
              >
                {project.title}
              </motion.h1>

              <motion.div
                className="flex flex-wrap gap-4 items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span>{project.date}</span>
                </div>

                <div className="inline-flex items-center rounded-full bg-secondary/50 px-3 py-1 text-xs">
                  <Tag className="mr-1 h-3 w-3" />
                  {project.category}
                </div>

                {project.featured && (
                  <div className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs">
                    Featured Project
                  </div>
                )}
              </motion.div>
            </div>

            <ParallaxSection offset={30}>
              <motion.div
                className="rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={1200}
                  height={675}
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            </ParallaxSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <motion.div
                className="md:col-span-2 space-y-8"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Overview</h2>
                  <p className="text-muted-foreground leading-relaxed">{project.longDescription}</p>
                </div>

                {project.challenges && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Challenges</h2>
                    <ul className="space-y-2 text-muted-foreground">
                      {project.challenges.map((challenge, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2 mt-1.5 text-primary">•</span>
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.solutions && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Solutions</h2>
                    <ul className="space-y-2 text-muted-foreground">
                      {project.solutions.map((solution, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2 mt-1.5 text-primary">•</span>
                          <span>{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.results && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Results</h2>
                    <ul className="space-y-2 text-muted-foreground">
                      {project.results.map((result, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2 mt-1.5 text-primary">•</span>
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.gallery && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Gallery</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.gallery.map((image, i) => (
                        <div key={i} className="rounded-lg overflow-hidden">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`${project.title} screenshot ${i + 1}`}
                            width={600}
                            height={400}
                            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>

              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="bg-card rounded-lg border border-border p-6 space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="bg-secondary px-3 py-1 rounded-full text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Links</h3>
                    <div className="space-y-2">
                      {project.liveUrl && (
                        <Button asChild variant="outline" className="w-full justify-start">
                          <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Live Demo
                          </Link>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button asChild variant="outline" className="w-full justify-start">
                          <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" />
                            View Code
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-lg border border-border p-6 space-y-4">
                  <h3 className="text-xl font-semibold">Need Something Similar?</h3>
                  <p className="text-muted-foreground">
                    Interested in working together on a project like this? Let's discuss how I can help bring your ideas
                    to life.
                  </p>
                  <Button asChild className="w-full">
                    <Link href="/#contact">Get in Touch</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

