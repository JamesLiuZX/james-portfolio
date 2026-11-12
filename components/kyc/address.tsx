import type { CSSProperties } from "react"
import ChapterHead from "@/components/kyc/chapter-head"
import { Microtext, Rosette, WaveBand } from "@/components/kyc/guilloche"
import { address, passportPages, type Stamp } from "@/lib/kyc"

const INK: Record<Stamp["ink"], string> = {
  violet: "#4434d9",
  teal: "#0f766e",
  risk: "#c8321f",
  ink: "#1b2340",
  signal: "#127a42",
}

/** One stamp, drawn in its own shape, inked through #stamp-ink. */
function StampMark({ stamp, uid }: { stamp: Stamp; uid: string }) {
  const color = INK[stamp.ink]
  const place = stamp.place.toUpperCase()
  const lines = (cx: number, cy: number, size: number, gap: number) =>
    stamp.lines.map((line, i) => (
      <text
        key={line}
        x={cx}
        y={cy + (i - (stamp.lines.length - 1) / 2) * gap}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={color}
        fontSize={size}
        className="font-sans font-semibold uppercase"
        letterSpacing={0.6}
      >
        {line}
      </text>
    ))

  if (stamp.shape === "circle") {
    return (
      <svg viewBox="0 0 220 220" className="h-auto w-full overflow-visible">
        <defs>
          <path id={`${uid}-top`} d="M34 110 A76 76 0 0 1 186 110" />
          <path id={`${uid}-bottom`} d="M27 110 A83 83 0 0 0 193 110" />
        </defs>
        <g filter="url(#stamp-ink)">
          <circle cx={110} cy={110} r={104} fill="none" stroke={color} strokeWidth={5} />
          <circle cx={110} cy={110} r={92} fill="none" stroke={color} strokeWidth={1.6} />
          <text fill={color} fontSize={19} letterSpacing={5} className="font-mono font-bold">
            <textPath href={`#${uid}-top`} startOffset="50%" textAnchor="middle">
              {place}
            </textPath>
          </text>
          <text fill={color} fontSize={13} letterSpacing={3} className="font-mono">
            <textPath href={`#${uid}-bottom`} startOffset="50%" textAnchor="middle">
              {stamp.date}
            </textPath>
          </text>
          <line x1={52} y1={78} x2={168} y2={78} stroke={color} strokeWidth={1.2} strokeDasharray="2 3" />
          <line x1={52} y1={150} x2={168} y2={150} stroke={color} strokeWidth={1.2} strokeDasharray="2 3" />
          {lines(110, 114, 12, 19)}
        </g>
      </svg>
    )
  }

  if (stamp.shape === "rect") {
    return (
      <svg viewBox="0 0 260 160" className="h-auto w-full overflow-visible">
        <g filter="url(#stamp-ink)">
          <rect x={4} y={4} width={252} height={152} rx={6} fill="none" stroke={color} strokeWidth={5} />
          <rect x={14} y={14} width={232} height={132} rx={3} fill="none" stroke={color} strokeWidth={1.4} />
          <text x={130} y={50} textAnchor="middle" fill={color} fontSize={23} letterSpacing={3} className="font-mono font-bold">
            {place}
          </text>
          <line x1={30} y1={66} x2={230} y2={66} stroke={color} strokeWidth={1.2} />
          {lines(130, 92, 12.5, 18)}
          <rect x={150} y={118} width={86} height={20} fill={color} />
          <text x={193} y={132} textAnchor="middle" fill="#f4f5ef" fontSize={11.5} letterSpacing={1.5} className="font-mono font-bold">
            {stamp.date}
          </text>
        </g>
      </svg>
    )
  }

  if (stamp.shape === "oval") {
    return (
      <svg viewBox="0 0 270 180" className="h-auto w-full overflow-visible">
        <defs>
          <path id={`${uid}-top`} d="M42 90 A93 58 0 0 1 228 90" />
        </defs>
        <g filter="url(#stamp-ink)">
          <ellipse cx={135} cy={90} rx={130} ry={84} fill="none" stroke={color} strokeWidth={5} />
          <ellipse cx={135} cy={90} rx={117} ry={72} fill="none" stroke={color} strokeWidth={1.5} />
          <text fill={color} fontSize={17} letterSpacing={4} className="font-mono font-bold">
            <textPath href={`#${uid}-top`} startOffset="50%" textAnchor="middle">
              {place}
            </textPath>
          </text>
          {lines(135, 98, 12, 18)}
          <text x={135} y={140} textAnchor="middle" fill={color} fontSize={11.5} letterSpacing={2} className="font-mono">
            {stamp.date}
          </text>
        </g>
      </svg>
    )
  }

  // Hexagon
  return (
    <svg viewBox="0 0 230 200" className="h-auto w-full overflow-visible">
      <g filter="url(#stamp-ink)">
        <polygon points="58,6 172,6 226,100 172,194 58,194 4,100" fill="none" stroke={color} strokeWidth={5} strokeLinejoin="round" />
        <polygon points="64,17 166,17 214,100 166,183 64,183 16,100" fill="none" stroke={color} strokeWidth={1.4} strokeLinejoin="round" />
        <text x={115} y={58} textAnchor="middle" fill={color} fontSize={19} letterSpacing={3} className="font-mono font-bold">
          {place}
        </text>
        {lines(115, 106, 12, 18)}
        <text x={115} y={160} textAnchor="middle" fill={color} fontSize={12} letterSpacing={2.5} className="font-mono">
          {stamp.date}
        </text>
      </g>
    </svg>
  )
}

// Loose, hand-placed positions for four stamps on a page (percent of the page).
const SLOTS = [
  { left: "6%", top: "15%", width: "44%" },
  { left: "52%", top: "21%", width: "44%" },
  { left: "8%", top: "55%", width: "46%" },
  { left: "56%", top: "57%", width: "38%" },
]

function Page({ index, title, stamps }: { index: number; title: string; stamps: Stamp[] }) {
  const left = index === 0
  return (
    <div className="relative aspect-[0.76/1] overflow-hidden bg-[#f3f5ee] md:aspect-[0.8/1]">
      {/* Security background: interlaced waves and a watermark rosette. */}
      <div aria-hidden="true" className="absolute inset-0">
        {[8, 30, 52, 74, 92].map((top, i) => (
          <div key={top} className="absolute inset-x-0 h-[9%]" style={{ top: `${top}%` }}>
            <WaveBand className="h-full w-full" options={{ lines: 4, amplitude: 10, waves: 6 + i, height: 60 }} color={i % 2 ? "#0f766e" : "#4434d9"} opacity={0.09} />
          </div>
        ))}
        <Rosette className="absolute left-1/2 top-1/2 w-[86%] -translate-x-1/2 -translate-y-1/2" strokeWidth={1} layers={[{ color: "#4434d9", opacity: 0.07, options: { curves: 9, base: 320, a: 60, n: 8, b: 20, m: 25, twist: index * 0.3 } }]} />
        {/* The fold. */}
        <div className={left ? "absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-ink/10 to-transparent" : "absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-ink/10 to-transparent"} />
      </div>

      <div className="absolute left-[7%] right-[7%] top-[5%] flex items-baseline justify-between">
        <p className="stretch-wide text-[clamp(0.95rem,1.6vw,1.25rem)] font-semibold uppercase tracking-[0.04em] text-ink">{title}</p>
        <p className="field text-ink-faint">Visas · Entries</p>
      </div>

      {stamps.map((stamp, i) => (
        <div
          key={stamp.place}
          className="stamp absolute"
          style={{ ...SLOTS[i], "--r": `${stamp.rotate}deg`, "--d": `${0.25 + index * 0.75 + i * 0.18}s` } as CSSProperties}
        >
          <StampMark stamp={stamp} uid={`stamp-${index}-${i}`} />
        </div>
      ))}

      <div className="absolute inset-x-[7%] bottom-[4%] flex items-center gap-4">
        <Microtext className="flex-1 text-ink/30" />
        <span className="font-mono text-[11px] text-ink-faint">{String(index + 2).padStart(2, "0")}</span>
      </div>
    </div>
  )
}

/** Step 02: proof of address. His passport, open at the visa pages. */
export default function Address() {
  return (
    <section id="address" className="relative py-28 md:py-40">
      <span id="academic" aria-hidden="true" className="absolute top-0" />
      {/* Shared ink for every stamp: displaced edges, uneven coverage. */}
      <svg aria-hidden="true" className="absolute h-0 w-0">
        <filter id="stamp-ink" x="-4%" y="-4%" width="108%" height="108%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="grain" />
          <feDisplacementMap in="SourceGraphic" in2="grain" scale="2.6" xChannelSelector="R" yChannelSelector="G" result="rough" />
          <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="2" seed="3" result="blots" />
          <feColorMatrix in="blots" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -0.9 1.25" result="coverage" />
          <feComposite in="rough" in2="coverage" operator="in" />
        </filter>
      </svg>

      <div className="shell">
        <ChapterHead index={1} title={["Proof of", { text: "address.", className: "serif-accent font-normal tracking-[-0.02em] text-violet" }]} />

        <div className="observe relative mt-16 md:mt-24">
          <div className="relative mx-auto max-w-5xl">
            <div className="grid overflow-hidden rounded-[20px] border border-ink/10 shadow-[0_2px_4px_rgba(11,18,36,0.05),0_60px_100px_-60px_rgba(11,18,36,0.55)] md:grid-cols-2">
              {passportPages.map((page, index) => (
                <Page key={page.title} index={index} title={page.title} stamps={page.stamps} />
              ))}
            </div>

            {/* The flight out and back, across the fold. */}
            <svg aria-hidden="true" viewBox="0 0 1000 400" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-[38%] hidden h-[26%] w-full md:block">
              <defs>
                <mask id="flight-mask">
                  <path d="M250 330 C 420 40, 600 40, 760 150" fill="none" stroke="white" strokeWidth={6} pathLength={1} className="draw-later" style={{ "--delay": "1.4s", "--dur": "1.8s" } as CSSProperties} />
                </mask>
              </defs>
              <path d="M250 330 C 420 40, 600 40, 760 150" fill="none" stroke="#4434d9" strokeOpacity={0.55} strokeWidth={1.6} strokeDasharray="5 7" vectorEffect="non-scaling-stroke" mask="url(#flight-mask)" />
            </svg>
            <span className="field pointer-events-none absolute left-[23%] top-[63%] hidden rounded-full bg-paper-card px-2 py-1 text-violet shadow-sm md:block">SIN</span>
            <span className="field pointer-events-none absolute left-[74%] top-[46%] hidden rounded-full bg-paper-card px-2 py-1 text-violet shadow-sm md:block">SFO</span>
          </div>
        </div>

        <dl className="mx-auto mt-14 grid max-w-5xl gap-px overflow-hidden rounded-xl border border-ink/10 bg-ink/10 sm:grid-cols-3">
          {[
            { label: "Address on file", value: address.onFile },
            { label: "Languages", value: address.languages },
            { label: "Specialisations (NUS)", value: address.specialisations },
          ].map((field) => (
            <div key={field.label} className="reveal bg-paper-card px-5 py-4">
              <dt className="field text-ink-faint">{field.label}</dt>
              <dd className="mt-1.5 text-[15px] font-medium text-ink">{field.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
