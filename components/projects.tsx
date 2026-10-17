import type { CSSProperties } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { SectionHeading } from "@/components/ui/section"
import { isAppRoute, primaryHref, selectedWork, type Project } from "@/lib/projects"
import { cn } from "@/lib/utils"

/** The large card used for selected work, here and on /projects. */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const href = primaryHref(project)
  const links = project.links ?? []

  return (
    <article
      className={cn(
        "group card-surface relative isolate flex h-full flex-col overflow-hidden transition-all duration-500",
        href && "hover:-translate-y-1 hover:border-brand/25 hover:shadow-lifted",
      )}
    >
      {/* Media */}
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-muted">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform [transition-duration:900ms] ease-out-expo group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-50" />
        <div className="absolute inset-0 bg-brand/0 transition-colors duration-500 group-hover:bg-brand/[0.06]" />

        <span className="absolute left-4 top-4 rounded-full border border-border/60 bg-background/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground backdrop-blur-md">
          {project.category}
        </span>

        <span className="absolute right-4 top-4 font-mono text-[10px] tracking-[0.12em] text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-6 md:p-7">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{project.title}</h3>
          {href && (
            <span
              aria-hidden="true"
              className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:border-brand/40 group-hover:bg-brand group-hover:text-brand-foreground"
            >
              <ArrowUpRight className="h-4 w-4" />
            </span>
          )}
        </div>

        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

        {project.result && (
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-brand">{project.result}</p>
        )}

        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border/70 bg-surface-muted px-2.5 py-1 text-[11px] text-muted-foreground"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="rounded-full border border-border/70 bg-surface-muted px-2.5 py-1 text-[11px] text-muted-foreground">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/*
          Sits above the stretched link rather than inside it, so a click
          here reaches the demo or the code and never the case study.
        */}
        {links.length > 0 && (
          <div className="relative z-20 flex flex-wrap gap-2 border-t border-border/70 pt-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors duration-300 hover:border-brand/40 hover:text-foreground"
              >
                {link.label}
                <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </a>
            ))}
          </div>
        )}
      </div>

      {/*
        Stretched link: covers the whole card without nesting the other
        interactive elements inside an anchor.
      */}
      {href &&
        (isAppRoute(href) ? (
          <Link
            href={href}
            className="absolute inset-0 z-10 rounded-2xl"
            aria-label={`View ${project.title} case study`}
          >
            <span className="sr-only">View {project.title} case study</span>
          </Link>
        ) : (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-10 rounded-2xl"
            aria-label={`Open ${project.title}`}
          >
            <span className="sr-only">Open {project.title}</span>
          </a>
        ))}
    </article>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section-y relative overflow-hidden">
      {/* Soft brand wash behind the grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="orb left-1/2 top-0 h-[30rem] w-[60rem] -translate-x-1/2 bg-brand/[0.07]" />
      </div>

      <div className="shell">
        <SectionHeading
          eyebrow="Selected work"
          title={
            <>
              Things I&apos;ve <span className="serif-accent text-brand">built</span>, and what
              they proved.
            </>
          }
          lede="An AI trading desk that grades its own agents, two market-design simulators, an AI video studio, and the DTC brand those videos sell for."
          action={
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-all duration-300 hover:shadow-lifted"
            >
              View all projects
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          }
        />

        {/*
          The reveal sits on a wrapper rather than on the card: its settled
          `transform: none` would otherwise cancel the card's hover lift.
        */}
        <div className="mt-20 grid gap-6 md:grid-cols-2 md:gap-7">
          {selectedWork.map((project, index) => (
            <div
              key={project.id}
              className="reveal"
              style={
                {
                  "--reveal-delay": `${(index % 2) * 0.08}s`,
                  "--reveal-y": "32px",
                } as CSSProperties
              }
            >
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
