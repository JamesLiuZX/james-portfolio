import ChapterHead from "@/components/kyc/chapter-head"
import FundsBoard from "@/components/kyc/funds-board"
import { fundsLede, positions, study } from "@/lib/kyc"

/** The build month, for the chart's "now" line (the site is static). */
const now = (() => {
  const date = new Date()
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
})()

/** Step 03: source of funds. Where his experience comes from, declared. */
export default function Funds() {
  return (
    <section id="funds" className="relative overflow-x-clip bg-night py-28 text-white md:py-40">
      <span id="experience" aria-hidden="true" className="absolute top-0" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" />
      <div className="shell relative">
        <ChapterHead index={2} tone="dark" title={["Source of", { text: "funds.", className: "serif-accent font-normal tracking-[-0.02em] text-violet-bright" }]}>
          <figure className="reveal mt-10 max-w-2xl border-l-2 border-violet-bright/50 pl-5">
            <figcaption className="field text-white/45">Applicant&apos;s declaration</figcaption>
            <blockquote className="mt-2 text-[1.06rem] leading-relaxed text-white/75">{fundsLede}</blockquote>
          </figure>
        </ChapterHead>
        <FundsBoard positions={positions} study={study} now={now} />
      </div>
    </section>
  )
}
