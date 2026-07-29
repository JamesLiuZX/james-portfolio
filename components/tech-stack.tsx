"use client"

import { motion } from "framer-motion"
import { Boxes, Code2, LineChart, PenTool } from "lucide-react"
import { EASE, SectionHeading } from "@/components/ui/section"

const groups = [
  {
    name: "Product",
    icon: Boxes,
    tools: ["Jira & Confluence", "Notion", "Figma", "Linear", "Amplitude"],
    note: "Specs, roadmaps and the boring rigour that makes launches land.",
  },
  {
    name: "Engineering",
    icon: Code2,
    tools: ["TypeScript", "React & Next.js", "Python", "Node.js", "AWS"],
    note: "Enough depth to write the spec, read the PR and unblock the team.",
  },
  {
    name: "Data & AI",
    icon: LineChart,
    tools: ["SQL", "LLMs & RAG", "Claude Code & MCP", "Multi-agent workflows", "A/B testing"],
    note: "Instrumenting the funnel, then arguing with the numbers.",
  },
  {
    name: "Design",
    icon: PenTool,
    tools: ["Figma", "Framer", "Webflow", "Adobe CC", "Design systems"],
    note: "Prototyping fast so decisions get made on artefacts, not opinions.",
  },
]

// Flattened, de-duplicated list for the scrolling band.
const marqueeItems = Array.from(new Set(groups.flatMap((group) => group.tools)))

export default function TechStack() {
  return (
    <section id="toolkit" className="section-y relative border-y border-border/70 bg-surface-muted/40">
      <div className="shell">
        <SectionHeading
          eyebrow="Toolkit"
          title={
            <>
              The stack I reach for, from{" "}
              <span className="serif-accent text-brand">spec</span> to ship.
            </>
          }
          lede="I started as an engineer and moved into product, so I work comfortably across the whole path — discovery, design, implementation and the analytics that tell you whether it worked."
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/70 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group, index) => (
            <motion.div
              key={group.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.07, ease: EASE }}
              className="group relative bg-surface p-6 transition-colors duration-300 hover:bg-elevated md:p-7"
            >
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg border border-border/70 bg-surface-muted text-muted-foreground transition-colors duration-300 group-hover:border-brand/30 group-hover:text-brand">
                  <group.icon className="h-4 w-4" />
                </span>
                <h3 className="text-sm font-semibold tracking-tight">{group.name}</h3>
              </div>

              <ul className="mt-5 space-y-2.5">
                {group.tools.map((tool) => (
                  <li key={tool} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <span aria-hidden="true" className="h-px w-2.5 shrink-0 bg-brand/40" />
                    {tool}
                  </li>
                ))}
              </ul>

              <p className="mt-6 border-t border-border/70 pt-4 text-xs leading-relaxed text-subtle">
                {group.note}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Continuous band — duplicated once so the -50% translate loops seamlessly. */}
      <div className="mask-fade-x mt-14 flex select-none overflow-hidden" aria-hidden="true">
        <div className="flex shrink-0 animate-marquee items-center gap-8 pr-8 motion-reduce:animate-none">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="flex items-center gap-8 whitespace-nowrap font-mono text-sm uppercase tracking-[0.14em] text-subtle"
            >
              {item}
              <span className="h-1 w-1 rounded-full bg-brand/40" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
