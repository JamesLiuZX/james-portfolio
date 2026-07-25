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
      organization: "NUS Enterprise",
      date: "2024",
      description: "$10,000 grant for a technical startup.",
      highlight: true,
      color: "#0f766e",
    },
    {
      title: "NUS Overseas Colleges, Silicon Valley",
      organization: "National University of Singapore",
      date: "2023–2024",
      description: "Top 0.3% program — year in SF with Stanford coursework (MS&E, GPA 3.7/4.0).",
      highlight: true,
      color: "#0369a1",
    },
    {
      title: "2nd Place, Stanford Hackathon",
      organization: "Stanford Startup Society",
      date: "2023",
      description: "2nd place among 100+ participants.",
      highlight: true,
      color: "#047857",
    },
    {
      title: "CS2103T Student Mentor",
      organization: "NUS School of Computing",
      date: "2023",
      description: "Top 5% in Software Engineering; mentored junior students.",
      highlight: true,
      color: "#b45309",
    },
    {
      title: "School of Computing Ambassador",
      organization: "National University of Singapore",
      date: "2022–2025",
      description: "Represented SoC at university events and to prospective students.",
    },
    {
      title: "School of Computing Leadership Programme",
      organization: "National University of Singapore",
      date: "2022–2024",
      description: "Selected for leadership development for promising computing students.",
    },
    {
      title: "Orbital (Independent Software Project)",
      organization: "National University of Singapore",
      date: "2022",
      description: "Completed advanced track of independent software development.",
    },
    {
      title: "Citadel Datathon",
      organization: "Citadel",
      date: "2023",
      description: "Competitive data analysis challenge.",
    },
  ]

  return (
    <section id="academic" className="py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-secondary/40 via-background to-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute top-20 right-0 w-80 h-80 bg-teal/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 relative z-10">
        <div ref={ref} className="space-y-10 sm:space-y-12">
          <div className="space-y-3 sm:space-y-4 max-w-3xl">
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-teal" />
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Education
              </p>
            </motion.div>

            <motion.h2
              className="font-display text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.05 }}
            >
              Academic highlights
            </motion.h2>

            <motion.p
              className="text-base sm:text-lg text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Computer Science at NUS — with Silicon Valley, venture, and teaching in the mix.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12">
            <motion.div
              className="lg:col-span-4 xl:col-span-4"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <ParallaxSection offset={16} className="lg:sticky lg:top-28">
                <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm bg-gradient-to-br from-background to-teal/5">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src="/nuslogo.png"
                      alt="National University of Singapore"
                      width={600}
                      height={400}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent flex flex-col justify-end p-5 sm:p-6">
                      <Badge variant="outline" className="bg-teal/90 text-white border-none w-fit mb-2">
                        2021 – 2025
                      </Badge>
                      <h3 className="font-display text-lg sm:text-xl font-semibold text-white tracking-tight">
                        National University of Singapore
                      </h3>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-display text-lg sm:text-xl font-semibold tracking-tight">
                        Bachelor of Computing, Computer Science
                      </h3>
                      <p className="text-teal font-medium">Honours (Distinction)</p>
                      <p className="text-sm text-muted-foreground">
                        Specializations: AI; Networking & Distributed Systems
                      </p>

                      <div className="flex items-center text-sm text-muted-foreground pt-1">
                        <Calendar className="mr-1.5 h-4 w-4 flex-shrink-0 text-teal" />
                        <span>Aug 2021 – May 2025</span>
                      </div>

                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-1.5 h-4 w-4 flex-shrink-0 text-teal" />
                        <span>Singapore</span>
                      </div>
                    </div>

                    <Button
                      asChild
                      variant="outline"
                      className="w-full group bg-teal/5 hover:bg-teal/10 border-teal/20"
                    >
                      <a href="https://www.comp.nus.edu.sg/" target="_blank" rel="noopener noreferrer">
                        Visit school website
                        <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </ParallaxSection>
            </motion.div>

            <motion.div
              className="lg:col-span-8 space-y-5 sm:space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {achievements
                  .filter((a) => a.highlight)
                  .map((achievement, index) => (
                    <ParallaxSection key={achievement.title} offset={8} className="h-full">
                      <motion.div
                        className="bg-card rounded-xl p-5 sm:p-6 border h-full flex flex-col shadow-sm"
                        style={{
                          background: `linear-gradient(to bottom right, hsl(var(--card)), ${achievement.color}0d)`,
                          borderColor: `${achievement.color}33`,
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.45, delay: 0.25 + index * 0.08 }}
                        whileHover={{ y: -4 }}
                      >
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-start gap-2 min-w-0">
                            <Award className="h-5 w-5 mt-0.5 shrink-0" style={{ color: achievement.color }} />
                            <h3 className="font-medium leading-snug">{achievement.title}</h3>
                          </div>
                          <Badge
                            variant="outline"
                            className="shrink-0"
                            style={{
                              backgroundColor: `${achievement.color}18`,
                              color: achievement.color,
                              borderColor: `${achievement.color}40`,
                            }}
                          >
                            {achievement.date}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm flex-grow leading-relaxed">
                          {achievement.description}
                        </p>
                        <div className="text-xs text-muted-foreground mt-4">{achievement.organization}</div>
                      </motion.div>
                    </ParallaxSection>
                  ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-card rounded-xl p-5 sm:p-6 border border-sky-200/70 dark:border-sky-800/30 bg-gradient-to-br from-card to-sky-50/60 dark:to-sky-950/20">
                  <h3 className="font-display font-semibold mb-3 text-sky-700 dark:text-sky-400 tracking-tight">
                    Additional achievements
                  </h3>
                  <ul className="space-y-2.5">
                    {achievements
                      .filter((a) => !a.highlight)
                      .map((achievement) => (
                        <li key={achievement.title} className="flex items-start text-sm">
                          <span className="mr-2 mt-1.5 text-sky-500">•</span>
                          <div>
                            <span className="font-medium">{achievement.title}</span>
                            <span className="text-muted-foreground"> — {achievement.description}</span>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="bg-card rounded-xl p-5 sm:p-6 border border-emerald-200/70 dark:border-emerald-800/30 bg-gradient-to-br from-card to-emerald-50/60 dark:to-emerald-950/20">
                  <h3 className="font-display font-semibold mb-3 text-emerald-700 dark:text-emerald-400 tracking-tight">
                    Additional activities
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {["NUS Kent Ridge Hall", "Shopee Code League '22", "Hack4Good '23"].map((item) => (
                      <li key={item} className="flex items-start">
                        <span className="mr-2 mt-1.5 text-emerald-500">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
