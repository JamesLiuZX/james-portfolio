import type { CSSProperties } from "react"
import { Bot, CandlestickChart, Clapperboard, Code2, Gift, ShieldCheck } from "lucide-react"
import { SectionHeading } from "@/components/ui/section"

// Domain first, craft second — the domain columns are the differentiator.
const groups = [
  {
    name: "Trading & Derivatives",
    icon: CandlestickChart,
    tools: ["Options & strike options", "Perpetual futures", "Prediction markets", "Tokenized stocks", "Liquidity & market making"],
    note: "Contract mechanics, pricing and the plumbing under the trade button.",
  },
  {
    name: "Growth & Rewards",
    icon: Gift,
    tools: ["Referral programmes", "Welcome bonuses", "Incentive design", "KYC-to-first-trade funnels", "A/B testing"],
    note: "Getting the first trade to happen, then the second.",
  },
  {
    name: "Risk & Compliance",
    icon: ShieldCheck,
    tools: ["KYC & AML", "Licensing & market expansion", "Stripe 3DS & Radar", "Risk limits & kill switches", "Safety constraints for agents"],
    note: "The unglamorous work that decides which markets you can launch in.",
  },
  {
    name: "AI Agents & Evals",
    icon: Bot,
    tools: ["Tool-calling design", "Context & memory", "Multi-agent systems", "Evals & calibration", "MCP integrations"],
    note: "Agents that touch money, graded against plain rules.",
  },
  {
    name: "Multimodal & Video AI",
    icon: Clapperboard,
    tools: ["Image & video generation", "ComfyUI workflows", "FLUX, Qwen-Image, Wan 2.2", "RAG & vector search", "AI video ads & UGC"],
    note: "From a structured brief to a captioned 9:16 ad.",
  },
  {
    name: "Build & Data",
    icon: Code2,
    tools: ["Python & SQL", "TypeScript, React & Next.js", "Claude Code & Cursor", "AWS & REST APIs", "Amplitude & Mixpanel"],
    note: "Enough depth to write the spec, read the PR and ship the prototype.",
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
              What I know, from{" "}
              <span className="serif-accent text-brand">markets</span> to the models underneath.
            </>
          }
          lede="Three domains I've owned and three I build with. I started as an engineer and moved into product, so I work the whole path: the spec, the PR, the eval and the dashboard that says whether it worked."
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/70 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group, index) => (
            <div
              key={group.name}
              style={
                {
                  "--reveal-delay": `${index * 0.07}s`,
                  "--reveal-y": "20px",
                  "--reveal-duration": "0.6s",
                } as CSSProperties
              }
              className="reveal group relative bg-surface p-6 transition-colors duration-300 hover:bg-elevated md:p-7"
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
            </div>
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
