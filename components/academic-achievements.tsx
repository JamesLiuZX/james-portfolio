import { ArrowUpRight, GraduationCap, MapPin } from "lucide-react"
import { SectionHeading } from "@/components/ui/section"

interface School {
  name: string
  href: string
  /** Logo on a white plate; schools without one get a neutral icon plate. */
  logo?: string
  programme: string
  /** The one line worth colouring, such as honours. */
  distinction?: string
  note?: string
  place: string
}

const schools: School[] = [
  {
    name: "National University of Singapore",
    href: "https://www.comp.nus.edu.sg/",
    logo: "/nuslogo.webp",
    programme: "Bachelor of Computing, Computer Science",
    distinction: "Honours (Distinction)",
    place: "Singapore",
  },
  {
    name: "Stanford University",
    href: "https://msande.stanford.edu/",
    programme: "Graduate coursework, Management Science & Engineering",
    note: "Graduate classes in AI, computer science and entrepreneurship, during the Silicon Valley year with NUS Overseas Colleges.",
    place: "Stanford, California",
  },
]

export default function AcademicAchievements() {
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
          lede="Honours in Computer Science at NUS, and graduate classes at Stanford during a year in Silicon Valley,."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:gap-8">
          {schools.map((school) => (
            <div key={school.name} className="reveal">
              <div className="card-surface h-full overflow-hidden shadow-soft">
                <div>
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
                      {school.distinction && (
                        <p className="text-sm font-medium text-brand">{school.distinction}</p>
                      )}
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
