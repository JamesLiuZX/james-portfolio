import type { CSSProperties, ReactNode } from "react"
import { ArrowDown, ArrowRight, Download } from "lucide-react"
import IdCard from "@/components/kyc/id-card"
import { Microtext, Rosette, WaveBand } from "@/components/kyc/guilloche"
import { contact, identity } from "@/lib/kyc"
import { RESUME_PATH } from "@/lib/site"

const at = (seconds: number, extra: Record<string, string> = {}) =>
  ({ "--enter-delay": `${seconds}s`, ...extra }) as CSSProperties

function Field({ label, value, big, className }: { label: string; value: ReactNode; big?: boolean; className?: string }) {
  return (
    <div className={className}>
      <dt className="font-mono text-[1.35cqw] uppercase tracking-[0.24em] text-ink-faint">{label}</dt>
      <dd className={big ? "stretch-wide mt-[0.4cqw] text-[3.7cqw] font-semibold leading-none text-ink" : "mt-[0.35cqw] text-[1.95cqw] font-medium uppercase leading-tight tracking-[0.02em] text-ink"}>
        {value}
      </dd>
    </div>
  )
}

/** A decorative barcode: bar widths taken from the letters of his name. */
function Barcode({ seed, className }: { seed: string; className?: string }) {
  const bars: number[] = []
  for (const char of seed) {
    const code = char.charCodeAt(0)
    bars.push((code % 3) + 1, ((code >> 2) % 2) + 1)
  }
  let x = 0
  const rects = bars.map((width, i) => {
    const rect = i % 2 === 0 ? <rect key={i} x={x} y={0} width={width} height={40} /> : null
    x += width + 1
    return rect
  })
  return (
    <svg viewBox={`0 0 ${x} 40`} preserveAspectRatio="none" aria-hidden="true" className={className} fill="currentColor">
      {rects}
    </svg>
  )
}

function CardFront() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[3.2cqw] border border-ink/10 bg-paper-card shadow-[0_2px_4px_rgba(11,18,36,0.06),0_50px_90px_-45px_rgba(11,18,36,0.5)]">
      {/* Security print */}
      <Rosette
        className="absolute -right-[20cqw] -top-[20cqw] w-[80cqw]"
        draw
        strokeWidth={1.15}
        layers={[
          { color: "#4434d9", opacity: 0.2, options: { curves: 10, base: 300, a: 70, n: 7, b: 22, m: 23 } },
          { color: "#0f766e", opacity: 0.2, options: { curves: 8, base: 185, a: 40, n: 11, b: 14, m: 29, twist: 0.4 } },
        ]}
      />
      <WaveBand className="absolute inset-x-0 top-[10.6cqw] h-[4cqw] text-violet" opacity={0.28} options={{ lines: 6, amplitude: 12, waves: 14 }} />
      <div className="holo pointer-events-none absolute inset-0" />

      {/* Header */}
      <div className="absolute left-[4.5cqw] right-[4.5cqw] top-[3.4cqw] flex items-start justify-between">
        <div>
          <p className="font-mono text-[1.4cqw] uppercase tracking-[0.32em] text-ink-faint">Know your candidate</p>
          <p className="stretch-wide mt-[0.7cqw] text-[3.2cqw] font-semibold leading-none text-ink">Candidate file</p>
        </div>
        <dl className="flex gap-[3.2cqw] text-right">
          <Field label="Type" value="P" />
          <Field label="Code" value="SGP" />
          <Field label="File" value="JL-01" />
        </dl>
      </div>

      {/* Photo, with one liveness pass */}
      <div className="absolute left-[4.5cqw] top-[16.5cqw] h-[30.5cqw] w-[24.5cqw] overflow-hidden rounded-[1.4cqw] bg-paper-deep">
        <img src={identity.photo} alt={`${identity.displayName}, photographed at Stanford`} className="h-full w-full object-cover object-[50%_35%] [filter:saturate(0.9)_contrast(1.04)]" />
        <span className="scan-pass absolute inset-x-0 top-0 h-[12%] bg-gradient-to-b from-transparent via-violet-bright/60 to-transparent" style={{ "--delay": "0.9s" } as CSSProperties} />
      </div>
      {/* Holographic seal over the photo's corner */}
      <div className="absolute left-[23cqw] top-[40cqw] grid h-[11cqw] w-[11cqw] place-items-center overflow-hidden rounded-full border border-white/60 shadow-[0_6px_16px_-8px_rgba(11,18,36,0.5)]">
        <div className="holo absolute inset-0 !opacity-90 [mix-blend-mode:normal]" />
        <Rosette className="spin-slow absolute inset-[-10%] w-[120%]" style={{ "--dur": "60s" } as CSSProperties} strokeWidth={4} layers={[{ color: "#ffffff", opacity: 0.55, options: { curves: 6, base: 280, a: 90, n: 9, b: 20, m: 27 } }]} />
        <span className="serif-accent relative text-[4.4cqw] leading-none text-ink/70">JL</span>
      </div>
      {/* Ghost image */}
      <img src={identity.photo} alt="" className="absolute right-[4.5cqw] top-[16.5cqw] h-[9cqw] w-[7cqw] rounded-[0.6cqw] object-cover opacity-20 grayscale" />

      {/* Fields */}
      <dl className="absolute left-[33.5cqw] right-[4.5cqw] top-[16.2cqw] grid grid-cols-2 gap-x-[3cqw] gap-y-[1.45cqw]">
        <Field big label="Surname" value={identity.surname.toUpperCase()} className="col-span-2" />
        <Field big label="Given names" value={identity.givenNames.toUpperCase()} className="col-span-2" />
        <Field label="Nationality" value={identity.nationality} />
        <Field label="Occupation" value="Product Owner (Tech.)" />
        <Field label="Employer" value={identity.employer} />
        <Field label="Domain" value={identity.domain} />
        <Field label="Languages" value={identity.languages} />
        <div>
          <dt className="font-mono text-[1.35cqw] uppercase tracking-[0.24em] text-ink-faint">Signature</dt>
          <dd className="serif-accent mt-[0.1cqw] text-[4.4cqw] leading-none text-violet-deep">{identity.displayName}</dd>
        </div>
      </dl>

      {/* Microprint and the machine-readable zone */}
      <Microtext className="absolute inset-x-[4.5cqw] bottom-[12.6cqw] !text-[1.05cqw] text-violet/60" />
      <div className="absolute inset-x-[4.5cqw] bottom-[3.2cqw] font-mono text-[3.05cqw] leading-[1.38] tracking-[0.045em] text-ink">
        {identity.mrz.map((line, index) => (
          <span key={line} className="mrz-line" style={{ "--delay": `${0.7 + index * 1.45}s`, "--dur": "1.35s" } as CSSProperties}>
            {line}
          </span>
        ))}
      </div>
    </div>
  )
}

const authorities = [
  { name: "NUS", years: "2021–2025" },
  { name: "Stanford", years: "2023–2024" },
  { name: "Trendsi", years: "2023–2024" },
  { name: "ByteDance", years: "2024–2025" },
  { name: "Crypto.com", years: "2025–2026" },
  { name: "Revolut", years: "2026–" },
]

function CardBack() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[3.2cqw] bg-ink text-white shadow-[0_50px_90px_-45px_rgba(11,18,36,0.6)]">
      <div className="absolute inset-x-0 top-[6cqw] h-[8.5cqw] bg-[#03050b]" />
      <Rosette className="absolute -bottom-[34cqw] -left-[24cqw] w-[86cqw]" strokeWidth={1.2} layers={[{ color: "#8f86ff", opacity: 0.16, options: { curves: 10, base: 300, a: 70, n: 7, b: 22, m: 23 } }]} />
      <div className="absolute left-[5cqw] right-[5cqw] top-[19cqw] grid grid-cols-[1.1fr_1fr] gap-[5cqw]">
        <div>
          <p className="font-mono text-[1.4cqw] uppercase tracking-[0.28em] text-white/45">Issuing authorities</p>
          <ul className="mt-[1.8cqw] space-y-[0.8cqw]">
            {authorities.map((item) => (
              <li key={item.name} className="flex items-baseline justify-between gap-[2cqw] border-b border-white/10 pb-[0.7cqw]">
                <span className="stretch-semi text-[2.3cqw] font-medium">{item.name}</span>
                <span className="font-mono text-[1.6cqw] text-white/55">{item.years}</span>
              </li>
            ))}
          </ul>
          <p className="mt-[1.6cqw] font-mono text-[1.45cqw] uppercase tracking-[0.2em] text-teal-bright/80">Self-issued: HerbalBath, 2021–</p>
        </div>
        <div className="flex flex-col">
          <p className="font-mono text-[1.4cqw] uppercase tracking-[0.28em] text-white/45">If found</p>
          <p className="mt-[1.6cqw] text-[2.4cqw] leading-snug text-white/85">
            Please return to <span className="whitespace-nowrap text-violet-bright">{contact.email}</span>
          </p>
          <Barcode seed="JAMESLIUZIXIN" className="mt-auto h-[9cqw] w-full text-white/80" />
        </div>
      </div>
      <p className="absolute bottom-[3.6cqw] left-[5cqw] font-mono text-[1.35cqw] uppercase tracking-[0.3em] text-white/35">
        This document is a portfolio. It is not a passport.
      </p>
    </div>
  )
}

/** Step 01: identity. The cover, with his document. */
export default function Identity() {
  return (
    <section id="identity" className="relative overflow-hidden">
      {/* A rosette the size of the room, turning very slowly behind the card. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <Rosette
          className="spin-slow absolute -right-[22rem] top-1/2 w-[62rem] -translate-y-1/2 opacity-60 max-lg:hidden"
          style={{ "--dur": "240s" } as CSSProperties}
          strokeWidth={0.8}
          layers={[{ color: "#4434d9", opacity: 0.09, options: { curves: 14, base: 330, a: 80, n: 9, b: 26, m: 31 } }]}
        />
        <Microtext className="absolute inset-x-0 top-[calc(var(--nav-h)+0.75rem)] text-ink/25" />
      </div>

      <div className="shell grid min-h-[100svh] content-center gap-x-10 gap-y-12 pb-20 pt-[calc(var(--nav-h)+4rem)] lg:grid-cols-12 lg:gap-y-0 lg:pb-24">
        <div className="lg:col-span-6 lg:row-start-1 lg:self-end">
          <p className="enter field flex flex-wrap items-center gap-x-3 gap-y-2 text-ink-faint" style={at(0.05)}>
            <span className="text-violet">Step 01 of 05</span>
            <span aria-hidden="true">·</span>
            Identity
            <span className="ml-1 inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-2.5 py-1 text-ink-soft">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet" />
              File open
            </span>
          </p>

          <h1 className="mt-8 font-semibold leading-[0.9] tracking-[-0.04em] text-ink">
            <span className="sr-only">Know your candidate: James Liu.</span>
            <span aria-hidden="true" className="stretch-wide block whitespace-nowrap text-[clamp(2.5rem,5.3vw,4.7rem)]">
              {["Know", "your"].map((word, i) => (
                <span key={word} className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-top">
                  <span className="enter-mask inline-block" style={at(0.12 + i * 0.07)}>
                    {word}
                  </span>
                </span>
              ))}
            </span>
            <span aria-hidden="true" className="-mt-[0.04em] block overflow-hidden pb-[0.14em] text-[clamp(3.9rem,10.4vw,9rem)]">
              <span className="enter-mask serif-accent inline-block font-normal tracking-[-0.03em] text-violet" style={at(0.28)}>
                candidate.
              </span>
            </span>
          </h1>

          <p className="enter serif-accent mt-6 text-[1.55rem] leading-snug text-ink-soft md:text-[1.8rem]" style={at(0.5)}>
            Five checks on James Liu, the way he would run them.
          </p>
        </div>

        <div className="enter relative lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:self-center" style={at(0.25, { "--enter-y": "28px", "--enter-duration": "1.1s" })}>
          <div className="relative mx-auto max-w-[36rem] lg:ml-auto">
            <IdCard front={<CardFront />} back={<CardBack />} />
            {/* Stuck on once the MRZ has printed. */}
            <span
              className="sticker absolute -right-2 -top-4 inline-flex rotate-[6deg] items-center gap-1.5 rounded-full bg-signal px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-white shadow-[0_8px_20px_-8px_rgba(19,138,74,0.7)] sm:-right-4"
              style={{ "--d": "3.9s" } as CSSProperties}
            >
              ✓ Identity verified
            </span>
          </div>
        </div>
        <div className="lg:col-span-6 lg:row-start-2 lg:self-start">
          <figure className="enter mt-9 max-w-xl border-l-2 border-violet/50 pl-5" style={at(0.6)}>
            <figcaption className="field text-ink-faint">Applicant&apos;s statement</figcaption>
            <blockquote className="mt-2 text-[1.06rem] leading-relaxed text-ink-soft">{identity.statement}</blockquote>
          </figure>

          <div className="enter mt-10 flex flex-wrap items-center gap-3" style={at(0.7)}>
            <a href="#address" className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-violet-deep">
              Begin verification
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            <a href="#approval" className="group inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:border-violet/50">
              Skip to approval
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <a href={RESUME_PATH} download className="inline-flex items-center gap-2 px-3 py-3.5 text-sm font-medium text-ink-soft transition-colors hover:text-ink">
              <Download className="h-4 w-4" />
              Résumé
            </a>
          </div>

          <dl className="enter mt-12 flex flex-wrap gap-x-12 gap-y-6 border-t border-ink/10 pt-6" style={at(0.8)}>
            {identity.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="field text-ink-faint">{stat.label}</dt>
                <dd className="stretch-cond mt-1 text-4xl font-semibold tracking-[-0.02em] text-ink">{stat.value}</dd>
                {stat.note && <dd className="mt-1 text-xs text-ink-soft">{stat.note}</dd>}
              </div>
            ))}
          </dl>
        </div>

      </div>
    </section>
  )
}
