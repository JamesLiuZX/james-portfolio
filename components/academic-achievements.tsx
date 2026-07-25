"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import Image from "next/image"
import { Calendar, MapPin, ExternalLink, Award } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Achievement {
  title: string
  organization: string
  date: string
  description: string
  highlight?: boolean
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
      description: "Won $10,000 grant for technical startup from NUS Enterprise.",
      highlight: true,
    },
    {
      title: "NUS Overseas Colleges, Silicon Valley",
      organization: "National University of Singapore",
      date: "2023–2024",
      description: "Year-long tech internship program in San Francisco while studying at Stanford University.",
      highlight: true,
    },
    {
      title: "2nd Place, Stanford Hackathon",
      organization: "Stanford Startup Society",
      date: "2023",
      description: "2nd place among 100+ participants at the Stanford Startup Society hackathon.",
      highlight: true,
    },
    {
      title: "CS2103T Student Mentor",
      organization: "NUS School of Computing",
      date: "2023",
      description: "Top student for Software Engineering in Java; mentored junior students.",
      highlight: true,
    },
    {
      title: "School of Computing Ambassador",
      organization: "National University of Singapore",
      date: "2022–2025",
      description: "Representing the School of Computing at university events and to prospective students.",
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
      description: "Completed advanced track of independent software development project.",
    },
    {
      title: "Citadel Datathon",
      organization: "Citadel",
      date: "2023",
      description: "Participated in competitive data analysis challenge.",
    },
  ]

  return (
    <section id="academic" className="py-24 md:py-32 bg-secondary/40">
      <div className="container mx-auto px-4 md:px-6">
        <div ref={ref} className="space-y-12">
          <div className="space-y-4 max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground"
            >
              Education
            </motion.p>
            <motion.h2
              className="font-display text-4xl md:text-5xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.55, delay: 0.05 }}
            >
              Academic highlights
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              Computer Science at NUS — with Silicon Valley, venture, and teaching in the mix.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            <motion.div
              className="md:col-span-1"
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
              transition={{ duration: 0.55, delay: 0.15 }}
            >
              <div className="md:sticky md:top-28 border border-border bg-card overflow-hidden">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src="/nuslogo.png"
                    alt="National University of Singapore"
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-5">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-white/70 mb-2">
                      2021 – 2025
                    </span>
                    <h3 className="font-display text-xl font-semibold text-white tracking-tight">
                      National University of Singapore
                    </h3>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-display text-xl font-semibold tracking-tight">
                      Bachelor of Computing, Computer Science
                    </h3>
                    <p className="text-teal font-medium">Honours (Distinction)</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-1.5 h-4 w-4 flex-shrink-0" />
                      <span>Aug 2021 – May 2025</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-1.5 h-4 w-4 flex-shrink-0" />
                      <span>Singapore</span>
                    </div>
                  </div>

                  <Button asChild variant="outline" className="w-full group border-border">
                    <a href="https://www.comp.nus.edu.sg/" target="_blank" rel="noopener noreferrer">
                      Visit school website
                      <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="md:col-span-2 space-y-5"
              initial={{ opacity: 0, x: 16 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
              transition={{ duration: 0.55, delay: 0.2 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements
                  .filter((a) => a.highlight)
                  .map((achievement, index) => (
                    <motion.div
                      key={achievement.title}
                      className="border border-border bg-card p-5 h-full flex flex-col transition-colors hover:border-foreground/20"
                      initial={{ opacity: 0, y: 16 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                      transition={{ duration: 0.45, delay: 0.25 + index * 0.06 }}
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-start gap-2">
                          <Award className="h-4 w-4 mt-1 text-teal shrink-0" />
                          <h3 className="font-medium leading-snug">{achievement.title}</h3>
                        </div>
                        <span className="text-xs text-muted-foreground shrink-0">{achievement.date}</span>
                      </div>
                      <p className="text-muted-foreground text-sm flex-grow leading-relaxed">
                        {achievement.description}
                      </p>
                      <div className="text-xs text-muted-foreground mt-4">{achievement.organization}</div>
                    </motion.div>
                  ))}
              </div>

              <div className="border border-border bg-card p-6">
                <h3 className="font-display font-semibold mb-4 tracking-tight">Also</h3>
                <ul className="space-y-3">
                  {achievements
                    .filter((a) => !a.highlight)
                    .map((achievement) => (
                      <li key={achievement.title} className="flex items-start gap-2 text-sm">
                        <span className="mt-2 w-1 h-1 rounded-full bg-foreground shrink-0" />
                        <div>
                          <span className="font-medium">{achievement.title}</span>
                          <span className="text-muted-foreground"> — {achievement.description}</span>
                        </div>
                      </li>
                    ))}
                  <li className="flex items-start gap-2 text-sm">
                    <span className="mt-2 w-1 h-1 rounded-full bg-foreground shrink-0" />
                    <span className="text-muted-foreground">
                      NUS Kent Ridge Hall · Shopee Code League &apos;22 · Hack4Good &apos;23
                    </span>
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
