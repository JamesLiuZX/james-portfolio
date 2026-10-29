import type { CSSProperties } from "react"
import { ArrowUpRight, Award, GraduationCap, MapPin } from "lucide-react"
import { SectionHeading } from "@/components/ui/section"

interface School {
  name: string
  href: string
  /** Logo on a white plate; schools without one get a neutral icon plate. */
  logo?: string
  years: string
  programme: string
  /** The one line worth colouring: honours, GPA. */
  distinction: string
  note?: string
  place: string
}

const schools: School[] = [
  {
    name: "National University of Singapore",
    href: "https://www.comp.nus.edu.sg/",
    logo: "/nuslogo.webp",
    years: "2021 - 2025",
    programme: "Bachelor of Computing, Computer Science",
    distinction: "Honours (Distinction)",
    place: "Singapore",
  },
  {
    name: "Stanford University",
    href: "https://msande.stanford.edu/",
    years: "2023 - 2024",
    programme: "Graduate coursework, Management Science & Engineering",
    distinction: "GPA 3.7 / 4.0",
    note: "Graduate classes in AI, computer science and entrepreneurship, during the Silicon Valley year with NUS Overseas Colleges.",
    place: "Stanford, California",
  },
]

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
    date: "2023 - 2024",
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
      "Finished in the top 5% of the NUS cohort for CS2103T Software Engineering, then mentored the next cohort.",
    highlight: true,
  },
  {
    title: "School of Computing Ambassador",
    organization: "National University of Singapore",
    date: "2022 - 2025",
    description: "Represented the School of Computing at university events and to prospective students.",
  },
  {
    title: "School of Computing Leadership Programme",
    organization: "National University of Singapore",
    date: "2022 - 2024",
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
          lede="Honours in Computer Science at NUS, graduate classes at Stanford during a year in Silicon Valley, and a habit of entering things I wasn't sure I could win."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)] lg:gap-8">
          {/* Education card */}
          <div className="reveal lg:sticky lg:top-28 lg:self-start">
            <div className="card-surface overflow-hidden shadow-soft">
              {schools.map((school) => (
                <div key={school.name} className="border-b border-border/70 last:border-b-0">
                  <div className="relative overflow-hidden border-b border-border/70 bg-surface-muted px-6 py-5">
                    <div className="absolute inset-0 bg-dots opacity-60" aria-hidden="true" />
                    <div className="relative flex items-center gap-4">
                      {/*
                        A logo is a mark, not a photo: a contained white plate keeps
                        it legible without dropping a bright block into dark mode.
                      */}
                      <div
                        className={
                          school.logo
                            ? "grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-xl border border-border/70 bg-white p-1.5"
                            : "grid h-14 w-14 shrink-0 place-items-center rounded-xl border border-border/70 bg-surface text-brand"
                        }
                      >
                        {school.logo ? (
                          <img
                            src={school.logo}
                            alt={school.name}
                            width={120}
                            height={80}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <GraduationCap className="h-6 w-6" aria-hidden="true" />
                        )}
                      </div>
                      <div className="min-w-0 space-y-1">
                        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">
                          {school.years}
                        </span>
                        <h3 className="text-base font-semibold leading-snug tracking-tight">
                          <a
                            href={school.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-brand"
                          >
                            {school.name}
                            <ArrowUpRight className="h-3.5 w-3.5 text-subtle transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </a>
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 p-6">
                    <div className="space-y-1.5">
                      <p className="text-base font-medium leading-snug">{school.programme}</p>
                      <p className="text-sm font-medium text-brand">{school.distinction}</p>
                    </div>
                    {school.note && (
                      <p className="text-sm leading-relaxed text-muted-foreground">{school.note}</p>
                    )}
                    <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-subtle">
                      <MapPin className="h-3.5 w-3.5" />
                      {school.place}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="space-y-6">
            <div className="grid gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/70 sm:grid-cols-2">
              {highlights.map((achievement, index) => (
                <div
                  key={achievement.title}
                  style={
                    {
                      "--reveal-delay": `${index * 0.07}s`,
                      "--reveal-y": "20px",
                      "--reveal-duration": "0.6s",
                    } as CSSProperties
                  }
                  className="reveal group flex flex-col bg-surface p-6 transition-colors duration-300 hover:bg-elevated"
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
                </div>
              ))}
            </div>

            <div
              style={{ "--reveal-y": "20px", "--reveal-duration": "0.6s" } as CSSProperties}
              className="reveal card-surface p-6 md:p-7"
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
            </div>

            <div
              style={
                {
                  "--reveal-delay": "0.06s",
                  "--reveal-y": "20px",
                  "--reveal-duration": "0.6s",
                } as CSSProperties
              }
              className="reveal card-surface p-6 md:p-7"
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
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
