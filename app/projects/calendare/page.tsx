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

export default function CalendareProject() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  // Use the same image path as in the projects list
  const projectImage = "/calendare.png"

  return (
    <main className="min-h-screen">
      <CursorFollower />
      <ScrollProgress />
      <Navbar />

      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4 md:px-6">
          <div ref={ref} className="space-y-12">
            {/* Header */}
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

            {/* Main Image - Reduced size */}
            <motion.div
              className="rounded-xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-primary/5 to-primary/10">
                <Image
                  src={projectImage}
                  alt="Calendare Dashboard"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Main Content */}
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
                      <span>Created seamless integrations with Google Calendar and Outlook</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>
                        Implemented customizable constraints to prevent burnout and ensure breaks between intensive work periods
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>
                        Designed an intuitive drag-and-drop interface with natural language commands for schedule adjustments
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
                  </ul>
                </div>
              </motion.div>

              {/* Sidebar */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="bg-card rounded-xl border border-border p-6 space-y-6 sticky top-24">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Next.js", "TypeScript", "MongoDB", "AWS", "OpenAI", "Google Calendar API", "TailwindCSS", "Vercel"].map(
                        (tech) => (
                          <span
                            key={tech}
                            className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-medium"
                          >
                            {tech}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold">Links</h3>
                    <div className="space-y-2">
                      <Button asChild variant="outline" className="w-full justify-start">
                        <Link href="https://github.com/JamesLiuZX" target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          View Code
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <h3 className="text-xl font-semibold">Key Features</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-primary">✓</span>
                        <span>AI-powered schedule optimization</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-primary">✓</span>
                        <span>Personalized task recommendations</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-primary">✓</span>
                        <span>Calendar integration (Google, Outlook)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-primary">✓</span>
                        <span>Natural language task creation</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-primary">✓</span>
                        <span>Work-life balance monitoring</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-primary">✓</span>
                        <span>Productivity analytics dashboard</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="text-xl font-semibold mb-3">Recognition</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5">🏆</span>
                        <span>NUS VIP Grant Recipient ($10,000)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t">
                    <Button asChild className="w-full">
                      <Link href="/#contact">Get in Touch</Link>
                    </Button>
                  </div>
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