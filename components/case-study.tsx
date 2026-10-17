import type { CSSProperties } from "react"
import { ArrowUpRight } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CursorFollower from "@/components/cursor-follower"
import ScrollProgress from "@/components/scroll-progress"
import PageHeader from "@/components/page-header"
import { Reveal } from "@/components/ui/section"

export interface CaseStudy {
  eyebrow: string
  title: string
  /** A word or phrase inside `title` to set in the serif accent. */
  accent?: string
  lede: string
  cover: { src: string; alt: string; href?: string }
  /** The first link renders as the primary button. */
  links: { label: string; href: string }[]
  /** Headline numbers, read at a glance under the cover. */
  metrics: { value: string; label: string }[]
  facts: { label: string; value: string }[]
  stack: string[]
  sections: {
    heading: string
    paragraphs?: string[]
    bullets?: string[]
    /** A short vertical clip of real output, shown under the section's text. */
    video?: { src: string; poster: string; caption: string }
  }[]
}

/**
 * Data-driven case study. A page supplies the copy; the layout, motion and
 * type scale stay identical across studies. Server-rendered and static, so
 * it exports cleanly and ships no JavaScript of its own.
 */
export default function CaseStudyPage({ study }: { study: CaseStudy }) {
  const [before, after] = study.accent ? study.title.split(study.accent) : [study.title, ""]

  return (
    <>
      <CursorFollower />
      <ScrollProgress />
      <Navbar />

      <main className="min-h-screen">
        <PageHeader
          eyebrow={study.eyebrow}
          backHref="/projects"
          backLabel="All projects"
          title={
            study.accent ? (
              <>
                {before}
                <span className="serif-accent text-brand">{study.accent}</span>
                {after}
              </>
            ) : (
              study.title
            )
          }
          lede={study.lede}
        >
          <div className="flex flex-wrap gap-3 pt-1">
            {study.links.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  index === 0
                    ? "group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-all duration-300 hover:shadow-lifted"
                    : "group inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:border-brand/40"
                }
              >
                {link.label}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}
          </div>
        </PageHeader>

        <section className="shell pb-24 md:pb-32">
          {/* Cover */}
          <div
            className="enter card-surface overflow-hidden shadow-soft"
            style={{ "--enter-delay": "0.12s", "--enter-duration": "0.6s" } as CSSProperties}
          >
            <div className="relative aspect-[16/10] bg-surface-muted">
              <img
                src={study.cover.src}
                alt={study.cover.alt}
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              {study.cover.href && (
                <a
                  href={study.cover.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0"
                  aria-label={`Open: ${study.cover.alt}`}
                />
              )}
            </div>
          </div>

          {/* Metrics */}
          <div
            className="enter mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/70 md:grid-cols-4"
            style={{ "--enter-delay": "0.2s", "--enter-duration": "0.6s" } as CSSProperties}
          >
            {study.metrics.map((metric) => (
              <div key={metric.label} className="bg-surface px-5 py-4">
                <div className="text-xl font-semibold tracking-tight md:text-2xl">{metric.value}</div>
                <div className="mt-1 font-mono text-[10px] uppercase leading-relaxed tracking-[0.1em] text-subtle">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
            {/* Narrative */}
            <div className="space-y-14">
              {study.sections.map((section) => (
                <Reveal key={section.heading}>
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{section.heading}</h2>
                    {section.paragraphs?.map((paragraph) => (
                      <p key={paragraph} className="leading-relaxed text-muted-foreground">
                        {paragraph}
                      </p>
                    ))}
                    {section.bullets && (
                      <ul className="space-y-3">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3 leading-relaxed text-muted-foreground">
                            <span aria-hidden="true" className="mt-[11px] h-px w-3 shrink-0 bg-brand/50" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.video && (
                      <figure className="pt-2">
                        <video
                          src={section.video.src}
                          poster={section.video.poster}
                          controls
                          muted
                          playsInline
                          preload="none"
                          className="aspect-[9/16] w-full max-w-[18rem] rounded-2xl border border-border/70 bg-surface-muted shadow-soft"
                        />
                        <figcaption className="mt-3 max-w-md text-sm leading-relaxed text-subtle">
                          {section.video.caption}
                        </figcaption>
                      </figure>
                    )}
                  </section>
                </Reveal>
              ))}
            </div>

            {/* Facts */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <div className="card-surface space-y-6 p-6">
                  <dl className="space-y-4">
                    {study.facts.map((fact) => (
                      <div key={fact.label}>
                        <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">
                          {fact.label}
                        </dt>
                        <dd className="mt-1 text-sm font-medium leading-snug">{fact.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="space-y-3 border-t border-border/70 pt-5">
                    <p className="eyebrow">Built with</p>
                    <div className="flex flex-wrap gap-1.5">
                      {study.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-border/70 bg-surface-muted px-2.5 py-1 text-[11px] text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
