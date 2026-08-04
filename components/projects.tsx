import type { CSSProperties } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Github } from "lucide-react"
import { SectionHeading } from "@/components/ui/section"
import { cn } from "@/lib/utils"

interface Project {
  title: string
  category: string
  image: string
  link: string
  description: string
  technologies: string[]
  /** Single headline outcome shown on the card. */
  result?: string
  github?: string
}

const projects: Project[] = [
  {
    title: "AskShop.ai",
    category: "AI · E-Commerce",
    image: "/askshopai.webp",
    link: "/projects/askshop-ai",
    description:
      "A B2B e-commerce SaaS for product discovery and recommendation, distributable across every Shopify store. Built and shipped in five weeks.",
    technologies: ["TypeScript", "AWS", "React", "OpenAI", "Shopify API"],
    result: "100+ business users · 5.0 rating",
    github: "https://github.com/JamesLiuZX",
  },
  {
    title: "Calendare",
    category: "Productivity · AI",
    image: "/calendare.webp",
    link: "/projects/calendare",
    description:
      "An AI-powered productivity app that automatically schedules events and tasks around your goals, calendar and preferences.",
    technologies: ["Next.js", "TypeScript", "MongoDB", "AWS"],
    result: "$10K NUS VIP grant",
    github: "https://github.com/JamesLiuZX",
  },
  {
    title: "HerbalBath Singapore",
    category: "E-Commerce · Health",
    image: "/herbalbath.webp",
    link: "/projects/herbalbath-singapore",
    description:
      "Founded and grew a healthcare product company, leading social media marketing, logistics and sales end to end.",
    technologies: ["Shopify", "Marketing", "Analytics"],
    result: "$100K+ yearly revenue · 40% margin",
  },
  {
    title: "NFT Sentiment Predictor",
    category: "Web3 · Data",
    image: "/NFinsighT.webp",
    link: "/projects/nft-sentiment-predictor",
    description:
      "NFT price charts overlaid with predicted prices and market sentiment across customisable time-series parameters.",
    technologies: ["TypeScript", "Next.js", "tRPC", "Python", "PySpark"],
    result: "20+ functional components",
    github: "https://github.com/JamesLiuZX",
  },
]

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
              Things I&apos;ve <span className="serif-accent text-brand">built</span> and
              taken to market.
            </>
          }
          lede="A founder-led SaaS, an AI scheduling app, a profitable D2C brand and a Web3 analytics tool — each one shipped to real users."
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
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="reveal"
              style={
                {
                  "--reveal-delay": `${(index % 2) * 0.08}s`,
                  "--reveal-y": "32px",
                } as CSSProperties
              }
            >
              <article
                className={cn(
                  "group card-surface relative isolate h-full overflow-hidden transition-all duration-500",
                  "hover:-translate-y-1 hover:border-brand/25 hover:shadow-lifted",
                )}
              >
                {/* Media */}
                <div className="relative aspect-[16/10] overflow-hidden bg-surface-muted">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform [transition-duration:900ms] ease-out-expo group-hover:scale-[1.06]"
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
                <div className="space-y-4 p-6 md:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                      {project.title}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:border-brand/40 group-hover:bg-brand group-hover:text-brand-foreground"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  {project.result && (
                    <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-brand">
                      {project.result}
                    </p>
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
                </div>

                {/*
                  Stretched link: covers the whole card without nesting the other
                  interactive elements inside an anchor.
                */}
                <Link
                  href={project.link}
                  className="absolute inset-0 z-10 rounded-2xl"
                  aria-label={`View ${project.title} case study`}
                >
                  <span className="sr-only">View {project.title} case study</span>
                </Link>

                {/*
                  Sits above the stretched link rather than inside it, so a
                  click here reaches GitHub and never the case study.
                */}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} on GitHub`}
                    className="absolute right-4 top-16 z-20 grid h-8 w-8 place-items-center rounded-full border border-border/60 bg-background/80 text-muted-foreground opacity-0 backdrop-blur-md transition-all duration-300 hover:text-foreground group-hover:opacity-100 focus-visible:opacity-100"
                  >
                    <Github className="h-3.5 w-3.5" />
                  </a>
                )}
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
