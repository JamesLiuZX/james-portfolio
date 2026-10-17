import type { CSSProperties } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, ExternalLink, Github } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CursorFollower from "@/components/cursor-follower"
import ScrollProgress from "@/components/scroll-progress"
import PageHeader from "@/components/page-header"
import { ProjectCard } from "@/components/projects"
import { earlierWork, isAppRoute, primaryHref, selectedWork, type Project } from "@/lib/projects"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Quorum, a multi-agent AI trading desk; Liquidity & Reward Labs for prediction-market design; Kino, an AI image and video studio; HerbalBath; and earlier work.",
}

export default function ProjectsPage() {
  return (
    <>
      <CursorFollower />
      <ScrollProgress />
      <Navbar />

      <main className="min-h-screen">
        <PageHeader
          eyebrow="Portfolio"
          title={
            <>
              Everything I&apos;ve <span className="serif-accent text-brand">shipped</span>,
              in one place.
            </>
          }
          lede="Four projects that show how I work now: AI agents that touch markets, market design with the arithmetic shown, and AI video that runs as real ads. The earlier work below is how I got here."
        />

        <section className="shell pb-20 md:pb-24">
          <GroupHeading title="Selected work" count={selectedWork.length} />
          <div className="mt-8 grid gap-6 md:grid-cols-2 md:gap-7">
            {selectedWork.map((project, index) => (
              <div
                key={project.id}
                className="enter"
                style={
                  {
                    "--enter-delay": `${0.1 + index * 0.05}s`,
                    "--enter-duration": "0.5s",
                    "--enter-y": "20px",
                  } as CSSProperties
                }
              >
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>
        </section>

        <section className="shell pb-24 md:pb-32">
          <GroupHeading title="Earlier work" count={earlierWork.length} />
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {earlierWork.map((project, index) => (
              <div
                key={project.id}
                className="reveal"
                style={
                  {
                    "--reveal-delay": `${(index % 3) * 0.06}s`,
                    "--reveal-y": "20px",
                    "--reveal-duration": "0.5s",
                  } as CSSProperties
                }
              >
                <EarlierCard project={project} />
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

function GroupHeading({ title, count }: { title: string; count: number }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border/70 pb-4">
      <h2 className="eyebrow">
        <span className="h-1.5 w-1.5 rounded-full bg-brand" />
        {title}
      </h2>
      <span className="font-mono text-[11px] text-subtle">{String(count).padStart(2, "0")}</span>
    </div>
  )
}

/** Compact card for earlier work: smaller cover, secondary links on hover. */
function EarlierCard({ project }: { project: Project }) {
  const href = primaryHref(project)
  // The card already goes to its primary target; only the others get a button.
  const links = (project.links ?? []).filter((link) => link.href !== href)

  return (
    <article className="group card-surface relative isolate flex h-full flex-col overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-brand/25 hover:shadow-lifted">
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-muted">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform [transition-duration:900ms] ease-out-expo group-hover:scale-[1.06]"
          />
        ) : (
          // No screenshot on file — fall back to a typographic plate.
          <div className="absolute inset-0 grid place-items-center bg-dots">
            <span className="text-5xl font-semibold tracking-tighter text-foreground/[0.12] transition-transform duration-700 group-hover:scale-105">
              {project.title
                .split(" ")
                .slice(0, 2)
                .map((word) => word[0])
                .join("")}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />

        <span className="absolute left-4 top-4 rounded-full border border-border/60 bg-background/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground backdrop-blur-md">
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
          {href && (
            <span
              aria-hidden="true"
              className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:border-brand/40 group-hover:bg-brand group-hover:text-brand-foreground"
            >
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          )}
        </div>

        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border/70 bg-surface-muted px-2.5 py-1 text-[11px] text-muted-foreground"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="rounded-full border border-border/70 bg-surface-muted px-2.5 py-1 text-[11px] text-muted-foreground">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Stretched primary link, with secondary links layered above it. */}
      {href &&
        (isAppRoute(href) ? (
          <Link href={href} className="absolute inset-0 z-10 rounded-2xl" aria-label={`View ${project.title}`} />
        ) : (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-10 rounded-2xl"
            aria-label={`View ${project.title}`}
          />
        ))}

      {links.length > 0 && (
        <div className="absolute bottom-6 right-6 z-20 flex gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-within:opacity-100">
          {links.map((link) => {
            const Icon = link.href.includes("github.com") ? Github : ExternalLink
            return (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title}: ${link.label}`}
                className="grid h-8 w-8 place-items-center rounded-lg border border-border/70 bg-background/90 text-muted-foreground backdrop-blur-md transition-colors hover:text-foreground"
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            )
          })}
        </div>
      )}
    </article>
  )
}
