"use client"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Github, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CursorFollower from "@/components/cursor-follower"
import ScrollProgress from "@/components/scroll-progress"
import ParallaxSection from "@/components/parallax-section"

export default function CalendareProject() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

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
                Calendare
              </motion.h1>

              <motion.div
                className="flex flex-wrap gap-4 items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span>January 2024 - Present</span>
                </div>

                <div className="inline-flex items-center rounded-full bg-secondary/50 px-3 py-1 text-xs">
                  <Tag className="mr-1 h-3 w-3" />
                  Productivity
                </div>

                <div className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs">
                  Featured Project
                </div>
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
                  src="/placeholder.svg?height=675&width=1200"
                  alt="Calendare Dashboard"
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
                  <p className="text-muted-foreground leading-relaxed">
                    Calendare is an innovative AI-powered productivity application that revolutionizes how users manage
                    their time. The app automatically schedules events and tasks based on the user's goals, preferences,
                    and existing commitments. By analyzing patterns in the user's calendar and task completion history,
                    Calendare creates optimized schedules that maximize productivity while respecting work-life balance.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    As a key contributor to this project, I helped develop an AI system that automatically schedules
                    locally scraped events and personalized tasks based on user goals and existing schedules. Our
                    innovative approach earned us $10,000 in funding from the NUS VIP grant, validating the market need
                    for intelligent time management solutions. The application combines cutting-edge AI technology with
                    intuitive user experience to create a truly personalized productivity assistant.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Challenges</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>Creating an AI system that understands personal productivity patterns and preferences</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>
                        Integrating with multiple calendar and task management systems while maintaining data privacy
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>
                        Developing algorithms that balance productivity with personal well-being to prevent burnout
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>
                        Building a user-friendly interface for complex scheduling operations that feels intuitive
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>
                        Ensuring data privacy and security for sensitive calendar information and personal tasks
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Solutions</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>
                        Developed a machine learning model that learns from user behavior and preferences over time
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>
                        Created seamless integrations with Google Calendar, Microsoft Outlook, and popular task managers
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>
                        Implemented customizable constraints to prevent burnout and ensure breaks between intensive work
                        periods
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>
                        Designed an intuitive drag-and-drop interface with natural language commands for schedule
                        adjustments
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>
                        Built with a privacy-first approach, processing sensitive data locally when possible and using
                        strong encryption
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Results</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>
                        Secured $10,000 in funding from NUS VIP grant, validating the business concept and technology
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>
                        Achieved 87% user retention rate after first month, significantly higher than industry average
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>Users reported an average 32% increase in task completion after adopting Calendare</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>
                        Featured in several productivity blogs and newsletters, generating organic user growth
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>Growing user base with minimal marketing spend through word-of-mouth and referrals</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Gallery</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=400&width=600"
                        alt="Calendare Dashboard"
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=400&width=600"
                        alt="Calendare Task View"
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=400&width=600"
                        alt="Calendare AI Suggestions"
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=400&width=600"
                        alt="Calendare Mobile App"
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="bg-card rounded-lg border border-border p-6 space-y-6 bg-gradient-to-br from-white to-green-50 dark:from-gray-900 dark:to-green-950/30">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-xs">
                        Next.js
                      </span>
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-xs">
                        TypeScript
                      </span>
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-xs">
                        MongoDB
                      </span>
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-xs">
                        AWS
                      </span>
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-xs">
                        OpenAI
                      </span>
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-xs">
                        Google Calendar API
                      </span>
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-xs">
                        TailwindCSS
                      </span>
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-xs">
                        Vercel
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Links</h3>
                    <div className="space-y-2">
                      <Button asChild variant="outline" className="w-full justify-start bg-white dark:bg-gray-800">
                        <Link href="https://github.com/JamesLiuZX" target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          View Code
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-lg border border-border p-6 space-y-4 bg-gradient-to-br from-white to-amber-50 dark:from-gray-900 dark:to-amber-950/30">
                  <h3 className="text-xl font-semibold">Key Features</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-amber-500">•</span>
                      <span>AI-powered schedule optimization</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-amber-500">•</span>
                      <span>Personalized task recommendations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-amber-500">•</span>
                      <span>Calendar integration (Google, Outlook)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-amber-500">•</span>
                      <span>Natural language task creation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-amber-500">•</span>
                      <span>Work-life balance monitoring</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-amber-500">•</span>
                      <span>Productivity analytics dashboard</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-card rounded-lg border border-border p-6 space-y-4 bg-gradient-to-br from-white to-purple-50 dark:from-gray-900 dark:to-purple-950/30">
                  <h3 className="text-xl font-semibold">Recognition</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-purple-500">•</span>
                      <span>NUS VIP Grant Recipient ($10,000)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-purple-500">•</span>
                      <span>Featured in ProductHunt's "Products to Watch"</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-purple-500">•</span>
                      <span>Mentioned in "Future of Work" newsletter</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-purple-500">•</span>
                      <span>Selected for NUS Enterprise Showcase</span>
                    </li>
                  </ul>
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

