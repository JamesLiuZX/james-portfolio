"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import Image from "next/image"
import { GraduationCap, Award, Calendar, MapPin, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ParallaxSection from "./parallax-section"

interface Achievement {
  title: string
  organization: string
  date: string
  description: string
  highlight?: boolean
  color?: string
}

export default function AcademicAchievements() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const achievements: Achievement[] = [
    {
      title: "NUS Venture Initiation Program",
      organization: "National University of Singapore",
      date: "2024",
      description: "$10,000 Grant Recipient for technical startup Calendare",
      highlight: true,
      color: "#4338ca", // Deeper indigo
    },
    {
      title: "NUS Overseas Colleges, Silicon Valley",
      organization: "National University of Singapore",
      date: "2023-2024",
      description: "A year-long tech internship program in San Francisco while studying at Stanford University",
      highlight: true,
      color: "#0369a1", // Deeper sky blue
    },
    {
      title: "J.P. Morgan FNAF Program",
      organization: "J.P. Morgan",
      date: "2023",
      description: "An Early Insight Program for 50 outstanding non-Finance majors from Asia",
      highlight: true,
      color: "#047857", // Deeper emerald
    },
    {
      title: "Meta Above and Beyond Computer Science Program",
      organization: "Meta",
      date: "2022",
      description: "Selected for exclusive mentorship and development program",
      highlight: true,
      color: "#b45309", // Deeper amber
    },
    {
      title: "School of Computing Ambassador",
      organization: "National University of Singapore",
      date: "2022-2025",
      description: "Representing the School of Computing at university events and to prospective students",
    },
    {
      title: "School of Computing Leadership Programme",
      organization: "National University of Singapore",
      date: "2022-2024",
      description: "Selected for leadership development program for promising computing students",
    },
    {
      title: "Orbital (Independent Software Development Project)",
      organization: "National University of Singapore",
      date: "2022",
      description: "Completed advanced track of independent software development project",
    },
    {
      title: "Citadel Datathon",
      organization: "Citadel",
      date: "2023",
      description: "Participated in competitive data analysis challenge",
    },
  ]

  return (
    <section id="academic" className="py-20 md:py-32 bg-gradient-to-b from-secondary/20 to-background/80">
      <div className="container mx-auto px-4 md:px-6">
        <div ref={ref} className="space-y-12">
          <div className="space-y-4">
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <GraduationCap className="h-6 w-6 text-indigo-500" />
              <h2 className="text-2xl font-semibold">ACADEMIC ACHIEVEMENTS</h2>
            </motion.div>

            <motion.p
              className="text-lg text-muted-foreground max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Educational background and key accomplishments from my academic journey.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <motion.div
              className="md:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <ParallaxSection offset={20} className="sticky top-32">
                <div className="bg-card rounded-xl overflow-hidden border border-border shadow-sm bg-gradient-to-br from-white to-indigo-50 dark:from-gray-900 dark:to-indigo-950/30">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="National University of Singapore"
                      width={600}
                      height={400}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 via-indigo-800/50 to-transparent flex flex-col justify-end p-6">
                      <Badge variant="outline" className="bg-indigo-500/80 text-white border-none w-fit mb-2">
                        2021 - 2025
                      </Badge>
                      <h3 className="text-xl font-medium text-white">National University of Singapore</h3>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-medium">Bachelor of Computing, Computer Science</h3>
                      <p className="text-indigo-600 dark:text-indigo-400 font-medium">Honours (Distinction)</p>

                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-4 w-4 flex-shrink-0 text-indigo-500" />
                        <span>Aug 2021 - May 2025</span>
                      </div>

                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-1 h-4 w-4 flex-shrink-0 text-indigo-500" />
                        <span>Singapore</span>
                      </div>
                    </div>

                    <Button
                      asChild
                      variant="outline"
                      className="w-full group bg-indigo-50 dark:bg-indigo-950/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 border-indigo-200 dark:border-indigo-800"
                    >
                      <a href="https://www.comp.nus.edu.sg/" target="_blank" rel="noopener noreferrer">
                        Visit School Website
                        <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </Button>
                  </div>
                </div>
              </ParallaxSection>
            </motion.div>

            <motion.div
              className="md:col-span-2 space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements
                  .filter((a) => a.highlight)
                  .map((achievement, index) => (
                    <ParallaxSection key={achievement.title} offset={10} className="h-full">
                      <motion.div
                        className="bg-card rounded-lg p-6 border border-border h-full flex flex-col"
                        style={{
                          background: `linear-gradient(to bottom right, white, ${achievement.color}05)`,
                          borderColor: `${achievement.color}20`,
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                        whileHover={{ y: -5 }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            <Award className="h-5 w-5" style={{ color: achievement.color }} />
                            <h3 className="font-medium ml-2">{achievement.title}</h3>
                          </div>
                          <Badge
                            variant="outline"
                            className="ml-2 shrink-0"
                            style={{
                              backgroundColor: `${achievement.color}15`,
                              color: achievement.color,
                              borderColor: `${achievement.color}30`,
                            }}
                          >
                            {achievement.date}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm flex-grow">{achievement.description}</p>
                        <div className="text-xs text-muted-foreground mt-4">{achievement.organization}</div>
                      </motion.div>
                    </ParallaxSection>
                  ))}
              </div>

              <div className="bg-card rounded-lg p-6 border border-border bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-900 dark:to-blue-950/20 border-blue-200/70 dark:border-blue-800/20">
                <h3 className="font-medium mb-4 text-blue-600 dark:text-blue-400">Additional Achievements</h3>
                <ul className="space-y-3">
                  {achievements
                    .filter((a) => !a.highlight)
                    .map((achievement) => (
                      <li key={achievement.title} className="flex items-start">
                        <span className="mr-2 mt-1 text-blue-500">•</span>
                        <div>
                          <span className="font-medium">{achievement.title}</span>
                          <span className="text-muted-foreground text-sm"> - {achievement.description}</span>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border bg-gradient-to-br from-white to-emerald-50/50 dark:from-gray-900 dark:to-emerald-950/20 border-emerald-200/70 dark:border-emerald-800/20">
                <h3 className="font-medium mb-4 text-emerald-600 dark:text-emerald-400">Additional Activities</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 text-emerald-500">•</span>
                    <span>NUS Kent Ridge Hall</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 text-emerald-500">•</span>
                    <span>Shopee Code League '22</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 text-emerald-500">•</span>
                    <span>Hack4Good '23</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

