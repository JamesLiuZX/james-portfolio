"use client"

import { useMemo, useState, type CSSProperties } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, ExternalLink, Github, Star } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CursorFollower from "@/components/cursor-follower"
import ScrollProgress from "@/components/scroll-progress"
import PageHeader from "@/components/page-header"
import { cn } from "@/lib/utils"

interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  category: string
  image: string
  liveUrl?: string
  githubUrl?: string
  featured: boolean
}

const projects: Project[] = [
  {
    id: "askshop-ai",
    title: "AskShop.ai",
    description:
      "A B2B e-commerce SaaS focused on product discovery and recommendation, distributed across Shopify stores. Funded by Stanford Startup Society and 2nd place in the Stanford internal hackathon.",
    technologies: ["TypeScript", "AWS", "Liquid", "Gadget", "JavaScript"],
    category: "SaaS",
    image: "/askshopai.webp",
    liveUrl: "https://apps.shopify.com/askshop-ai",
    githubUrl: "https://github.com/JamesLiuZX",
    featured: true,
  },
  {
    id: "calendare",
    title: "Calendare",
    description:
      "An AI-powered productivity app that automatically schedules locally scraped events and personalised tasks around your goals and calendar. Won a $10K NUS VIP grant.",
    technologies: ["Next.js", "TypeScript", "MongoDB", "AWS"],
    category: "Productivity",
    image: "/calendare.webp",
    githubUrl: "https://github.com/JamesLiuZX",
    featured: true,
  },
  {
    id: "herbalbath-singapore",
    title: "HerbalBath Singapore",
    description:
      "Founded and grew a healthcare product company past $100K in yearly revenue on a 40% profit margin, leading a team across social media marketing, logistics and sales.",
    technologies: ["Ruby", "HTML", "CSS", "JavaScript", "Figma", "Shopify"],
    category: "E-Commerce",
    image: "/herbalbath.webp",
    liveUrl: "https://herbalbathsg.com",
    featured: true,
  },
  {
    id: "nft-sentiment-predictor",
    title: "NFT Sentiment Price Predictor",
    description:
      "Built and optimised 20+ functional components for NFT price charts overlaid with predicted prices and sentiment across customisable time-series parameters.",
    technologies: ["TypeScript", "Next.js", "Tailwind CSS", "PostgreSQL", "tRPC", "Python", "PySpark"],
    category: "Web3",
    image: "/NFinsighT.webp",
    liveUrl: "https://nfinsight.vercel.app/",
    githubUrl: "https://github.com/JamesLiuZX",
    featured: true,
  },
  {
    id: "dunman-helper",
    title: "Dunman Helper",
    description:
      "A school chatbot serving 500+ users a year, built on Dialogflow's natural language platform.",
    technologies: ["Dialogflow", "Python", "HTML", "JavaScript"],
    category: "AI",
    image: "/placeholder.svg",
    liveUrl: "https://jamesliuzx.github.io/AI-Chatbot/",
    githubUrl: "https://github.com/JamesLiuZX/AI-Chatbot",
    featured: false,
  },
  {
    id: "ey-dashboard",
    title: "EY Client Dashboard",
    description:
      "Frontend development of an internal real-time dashboard for an international client, projected to impact over a million users per year.",
    technologies: ["ReactJS", ".NET Framework", "JQuery", "C#", "SQL", "Microsoft Azure"],
    category: "Enterprise",
    image: "/placeholder.svg",
    featured: false,
  },
]

// Detail pages only exist for the four featured case studies.
const hasCaseStudy = (id: string) =>
  ["askshop-ai", "calendare", "herbalbath-singapore", "nft-sentiment-predictor"].includes(id)

const hasArtwork = (image: string) => Boolean(image) && !image.startsWith("/placeholder")

export default function ProjectsPage() {
  const [filter, setFilter] = useState<string | null>(null)
  const categories = useMemo(() => Array.from(new Set(projects.map((p) => p.category))), [])
  const filtered = filter ? projects.filter((p) => p.category === filter) : projects

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
          lede="Case studies and side projects across AI, e-commerce, Web3 and enterprise — each one built for real users, not a portfolio slot."
        >
          <div className="flex flex-wrap gap-2 pt-2">
            <FilterChip active={filter === null} onClick={() => setFilter(null)}>
              All
              <span className="ml-1.5 font-mono text-[10px] opacity-60">{projects.length}</span>
            </FilterChip>
            {categories.map((category) => (
              <FilterChip
                key={category}
                active={filter === category}
                onClick={() => setFilter(category)}
              >
                {category}
                <span className="ml-1.5 font-mono text-[10px] opacity-60">
                  {projects.filter((p) => p.category === category).length}
                </span>
              </FilterChip>
            ))}
          </div>
        </PageHeader>

        <section className="shell pb-24 md:pb-32">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, index) => {
              const detailHref = hasCaseStudy(project.id) ? `/projects/${project.id}` : null
              const primaryHref = detailHref ?? project.liveUrl ?? project.githubUrl ?? null

              return (
                /*
                 * Keyed on the active filter as well as the project, so
                 * changing filters remounts the cards and replays the
                 * entrance — the CSS stand-in for the old exit animation.
                 */
                <div
                  key={`${filter ?? "all"}-${project.id}`}
                  className="enter"
                  style={
                    {
                      "--enter-delay": `${index * 0.04}s`,
                      "--enter-duration": "0.45s",
                      "--enter-y": "20px",
                    } as CSSProperties
                  }
                >
                  <article
                    className="group card-surface relative isolate flex h-full flex-col overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-brand/25 hover:shadow-lifted"
                  >
                      <div className="relative aspect-[16/10] overflow-hidden bg-surface-muted">
                        {hasArtwork(project.image) ? (
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                            className="object-cover transition-transform [transition-duration:900ms] ease-out-expo group-hover:scale-[1.06]"
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

                        {project.featured && (
                          <span
                            className="absolute right-4 top-4 grid h-7 w-7 place-items-center rounded-full border border-brand/30 bg-background/80 text-brand backdrop-blur-md"
                            title="Featured project"
                          >
                            <Star className="h-3 w-3 fill-current" />
                          </span>
                        )}
                      </div>

                      <div className="flex flex-1 flex-col gap-4 p-6">
                        <div className="flex items-start justify-between gap-3">
                          <h2 className="text-lg font-semibold tracking-tight">{project.title}</h2>
                          {primaryHref && (
                            <span
                              aria-hidden="true"
                              className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:border-brand/40 group-hover:bg-brand group-hover:text-brand-foreground"
                            >
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </span>
                          )}
                        </div>

                        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                          {project.description}
                        </p>

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
                      {primaryHref &&
                        (detailHref ? (
                          <Link
                            href={detailHref}
                            className="absolute inset-0 z-10 rounded-2xl"
                            aria-label={`View ${project.title}`}
                          />
                        ) : (
                          <a
                            href={primaryHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute inset-0 z-10 rounded-2xl"
                            aria-label={`View ${project.title}`}
                          />
                        ))}

                      <div className="absolute bottom-6 right-6 z-20 flex gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-within:opacity-100">
                        {project.liveUrl && detailHref && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.title} live site`}
                            className="grid h-8 w-8 place-items-center rounded-lg border border-border/70 bg-background/90 text-muted-foreground backdrop-blur-md transition-colors hover:text-foreground"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.title} on GitHub`}
                            className="grid h-8 w-8 place-items-center rounded-lg border border-border/70 bg-background/90 text-muted-foreground backdrop-blur-md transition-colors hover:text-foreground"
                          >
                            <Github className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                  </article>
                </div>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-muted-foreground">No projects in this category yet.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-full border px-4 py-2 text-sm transition-all duration-300",
        active
          ? "border-transparent bg-foreground text-background"
          : "border-border bg-surface/60 text-muted-foreground hover:border-brand/40 hover:text-foreground",
      )}
    >
      {children}
    </button>
  )
}
