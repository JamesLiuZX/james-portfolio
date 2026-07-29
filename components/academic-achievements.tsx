"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUpRight, Award, Calendar, MapPin } from "lucide-react"
import { EASE, SectionHeading } from "@/components/ui/section"

interface Achievement {
  title: string
  organization: string
  date: string
  description: string
  highlight?: boolean
}

const achievements: Achievement[] = [
  {
    title: "NUS Venture Initiation Programme",
    organization: "National University of Singapore",
    date: "2024",
    description: "Won a $10,000 grant for a technical startup from NUS Enterprise.",
    highlight: true,
  },
  {
    title: "NUS Overseas Colleges, Silicon Valley",
    organization: "National University of Singapore",
    date: "2023 — 2024",
    description:
      "A year-long tech internship programme in San Francisco while studying at Stanford University.",
    highlight: true,
  },
  {
    title: "2nd Place, Stanford Hackathon",
    organization: "Stanford Startup Society",
    date: "2023",
    description: "Placed 2nd among 100+ participants at the Stanford Startup Society hackathon.",
    highlight: true,
  },
  {
    title: "Student Mentor, Software Engineering",
    organization: "NUS School of Computing",
    date: "2023",
    description:
      "Top student for CS2103T Software Engineering in Java, then taught the following cohort.",
    highlight: true,
  },
  {
    title: "School of Computing Ambassador",
    organization: "National University of Singapore",
    date: "2022 — 2025",
    description: "Represented the School of Computing at university events and to prospective students.",
  },
  {
    title: "School of Computing Leadership Programme",
    organization: "National University of Singapore",
    date: "2022 — 2024",
    description: "Selected for the leadership development programme for promising computing students.",
  },
  {
    title: "Orbital (Independent Software Development)",
    organization: "National University of Singapore",
    date: "2022",
    description: "Completed the advanced track of the independent software development project.",
  },
  {
    title: "Citadel Datathon",
    organization: "Citadel",
    date: "2023",
    description: "Competed in Citadel's data analysis challenge.",
  },
]

const activities = ["NUS Kent Ridge Hall", "Shopee Code League '22", "Hack4Good '23"]

export default function AcademicAchievements() {
  const highlights = achievements.filter((a) => a.highlight)
  const others = achievements.filter((a) => !a.highlight)

  return (
    <section id="academic" className="section-y relative">
      <div className="shell">
        <SectionHeading
          eyebrow="Academic"
          title={
            <>
              Four years of computer science, and the{" "}
              <span className="serif-accent text-brand">detours</span> that mattered most.
            </>
          }
          lede="Honours in Computer Science at NUS, a year in Silicon Valley with NUS Overseas Colleges, and a habit of entering things I wasn't sure I could win."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)] lg:gap-8">
          {/* Education card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <div className="card-surface overflow-hidden shadow-soft">
              {/*
                The logo is a mark, not a photo — a contained white plate keeps
                it legible without dropping a bright block into dark mode.
              */}
              <div className="relative overflow-hidden border-b border-border/70 bg-surface-muted p-6">
                <div className="absolute inset-0 bg-dots opacity-60" aria-hidden="true" />
                <div className="relative flex items-center gap-4">
                  <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-xl border border-border/70 bg-white p-1.5">
                    <Image
                      src="/nuslogo.webp"
                      alt="National University of Singapore"
                      width={120}
                      height={80}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="min-w-0 space-y-1.5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">
                      2021 — 2025
                    </span>
                    <h3 className="text-base font-semibold leading-snug tracking-tight">
                      National University of Singapore
                    </h3>
                  </div>
                </div>
              </div>

              <div className="space-y-5 p-6 md:p-7">
                <div className="space-y-1.5">
                  <p className="text-base font-medium">Bachelor of Computing, Computer Science</p>
                  <p className="text-sm font-medium text-brand">Honours (Distinction)</p>
                </div>

                <div className="space-y-2 font-mono text-[11px] uppercase tracking-[0.1em] text-subtle">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5" />
                    Aug 2021 — May 2025
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5" />
                    Singapore
                  </div>
                </div>

                <a
                  href="https://www.comp.nus.edu.sg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-surface-muted px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:border-brand/40"
                >
                  Visit school website
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Achievements */}
          <div className="space-y-6">
            <div className="grid gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/70 sm:grid-cols-2">
              {highlights.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: index * 0.07, ease: EASE }}
                  className="group flex flex-col bg-surface p-6 transition-colors duration-300 hover:bg-elevated"
                >
                  <div className="flex items-start justify-between gap-3">
                    <Award className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-subtle">
                      {achievement.date}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold leading-snug tracking-tight">
                    {achievement.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {achievement.description}
                  </p>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.1em] text-subtle">
                    {achievement.organization}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="card-surface p-6 md:p-7"
            >
              <h3 className="eyebrow">Also</h3>
              <ul className="mt-5 divide-y divide-border/70">
                {others.map((achievement) => (
                  <li
                    key={achievement.title}
                    className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <span className="text-sm font-medium">{achievement.title}</span>
                    <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-subtle">
                      {achievement.date}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.06, ease: EASE }}
              className="card-surface p-6 md:p-7"
            >
              <h3 className="eyebrow">Activities</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {activities.map((activity) => (
                  <span
                    key={activity}
                    className="rounded-full border border-border/70 bg-surface-muted px-3 py-1.5 text-sm text-muted-foreground"
                  >
                    {activity}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
