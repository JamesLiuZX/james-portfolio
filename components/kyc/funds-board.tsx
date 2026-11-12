"use client"

import { useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent } from "react"
import { ArrowUpRight } from "lucide-react"
import type { Position } from "@/lib/kyc"
import { cn } from "@/lib/utils"

const START = { y: 2021, m: 1 }
const END = { y: 2027, m: 6 }
const SPAN = (END.y - START.y) * 12 + (END.m - START.m)
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const monthIndex = (iso: string) => {
  const [y, m] = iso.split("-").map(Number)
  return (y - START.y) * 12 + (m - START.m)
}
const pct = (iso: string) => (monthIndex(iso) / SPAN) * 100
const labelAt = (percent: number) => {
  const total = Math.round((percent / 100) * SPAN) + (START.m - 1)
  return `${MONTHS[((total % 12) + 12) % 12]} ${START.y + Math.floor(total / 12)}`
}

/** Figures that flip into place, once, like a departures board. */
function Flap({ text, run }: { text: string; run: boolean }) {
  const [shown, setShown] = useState(text)
  const [flipping, setFlipping] = useState(false)
  useEffect(() => {
    if (!run || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const glyphs = "0123456789+−%$K>"
    const chars = [...text]
    let tick = 0
    setFlipping(true)
    const id = window.setInterval(() => {
      tick++
      setShown(chars.map((c, i) => (tick > 5 + i * 2 || /\s/.test(c) ? c : glyphs[Math.floor(Math.random() * glyphs.length)])).join(""))
      if (tick > 6 + chars.length * 2) {
        window.clearInterval(id)
        setShown(text)
        setFlipping(false)
      }
    }, 55)
    return () => window.clearInterval(id)
  }, [run, text])
  return (
    <span aria-label={text} className="inline-flex">
      {[...shown].map((c, i) => (
        <span key={`${i}-${c}`} aria-hidden="true" className={cn("flap", flipping && "flipping")}>
          {c}
        </span>
      ))}
    </span>
  )
}

type StudyBar = { id: string; label: string; start: string; end: string }

export default function FundsBoard({ positions, study, now }: { positions: Position[]; study: StudyBar[]; now: string }) {
  const [active, setActive] = useState(0)
  const [seen, setSeen] = useState<Set<string>>(() => new Set())
  const [hover, setHover] = useState<number | null>(null)
  const tickets = useRef<(HTMLElement | null)[]>([])

  // The position being read drives the chart.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = Number((entry.target as HTMLElement).dataset.index)
          if (entry.isIntersecting) {
            setActive(index)
            setSeen((current) => (current.has(positions[index].id) ? current : new Set(current).add(positions[index].id)))
          }
        }
      },
      { rootMargin: "-42% 0px -42% 0px" },
    )
    tickets.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [positions])

  const bars = useMemo(
    () =>
      positions.map((position) => {
        const left = pct(position.start)
        const right = position.end ? pct(position.end) : 100
        return { ...position, left, width: right - left }
      }),
    [positions],
  )

  const focus = bars[active]
  // Rest the crosshair in the middle of the focused position, up to today.
  const focusEnd = Math.min(focus.end ? pct(focus.end) : pct(now), pct(now))
  const crosshair = hover ?? (focusEnd > focus.left ? (focus.left + focusEnd) / 2 : focus.left)
  const atCrosshair = [
    ...bars.filter((bar) => crosshair >= bar.left && crosshair <= bar.left + bar.width).map((bar) => bar.company),
    ...study.filter((item) => crosshair >= pct(item.start) && crosshair <= pct(item.end)).map((item) => item.label),
  ]

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setHover(Math.min(100, Math.max(0, ((event.clientX - rect.left) / rect.width) * 100)))
  }

  const years = Array.from({ length: END.y - START.y + 1 }, (_, i) => START.y + i)
  const silicon = study.find((item) => item.id === "noc")

  return (
    <div className="mt-16 md:mt-20">
      {/* The chart: sticky on wide screens while the positions scroll under it. */}
      <div className="z-20 lg:sticky lg:top-[calc(var(--nav-h)+0.75rem)]">
        <div className="rounded-2xl border border-white/10 bg-night-soft/95 px-4 pb-4 pt-4 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur-md md:px-6 md:pb-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="field text-white/50">Declared sources · 2021 to now</p>
            <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-3 rounded-sm bg-violet-bright/80" /> Employment</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-3 rounded-sm bg-teal-bright/70" /> Business</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-3 rounded-sm border border-white/40" /> Study</span>
            </div>
          </div>

          <div className="mt-4 flex">
            <div className="hidden w-24 shrink-0 flex-col justify-around pb-6 font-mono text-[10px] uppercase tracking-[0.14em] text-white/40 md:flex">
              <span>Study</span>
              <span>Employment</span>
              <span>Business</span>
            </div>
            <div
              className="relative h-[120px] flex-1 cursor-crosshair select-none md:h-[132px]"
              onPointerMove={onMove}
              onPointerLeave={() => setHover(null)}
              role="img"
              aria-label={`Timeline from 2021 to now. ${positions.map((p) => `${p.company}, ${p.period}`).join("; ")}.`}
            >
              {/* Year grid */}
              {years.map((year) => {
                const left = pct(`${year}-01`)
                return (
                  <span key={year} className="absolute bottom-0 top-0" style={{ left: `${left}%` }}>
                    <span className="absolute inset-y-0 w-px bg-white/[0.07]" />
                    <span className="absolute -bottom-0.5 left-1 font-mono text-[10px] text-white/35">{year}</span>
                  </span>
                )
              })}

              {/* The Silicon Valley year, shaded like a marked period. */}
              {silicon && (
                <span className="absolute bottom-5 top-0 rounded-md bg-[repeating-linear-gradient(135deg,rgba(143,134,255,0.13)_0_2px,transparent_2px_7px)]" style={{ left: `${pct(silicon.start)}%`, width: `${pct(silicon.end) - pct(silicon.start)}%` }}>
                  <span className="absolute -top-0.5 left-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-violet-bright/80">Silicon Valley</span>
                </span>
              )}

              {/* Lanes */}
              {study
                .filter((item) => item.id !== "noc")
                .map((item) => (
                  <span key={item.id} className="absolute top-[10%] flex h-[18%] items-center rounded-md border border-dashed border-white/30 px-2 font-mono text-[10px] uppercase tracking-[0.12em] text-white/55" style={{ left: `${pct(item.start)}%`, width: `${pct(item.end) - pct(item.start)}%` }}>
                    {item.label}
                  </span>
                ))}
              {bars.map((bar, index) => {
                const on = index === active
                const open = !bar.end
                return (
                  <span
                    key={bar.id}
                    className={cn(
                      "absolute flex h-[18%] items-center overflow-hidden rounded-md px-2 font-mono text-[10px] uppercase tracking-[0.1em] transition-[background-color,color,box-shadow] duration-500",
                      bar.kind === "business" ? "top-[66%]" : "top-[38%]",
                      bar.kind === "business"
                        ? on
                          ? "bg-teal-bright text-night shadow-[0_0_0_3px_rgba(45,212,191,0.18)]"
                          : "bg-teal-bright/25 text-teal-bright"
                        : on
                          ? "bg-violet-bright text-night shadow-[0_0_0_3px_rgba(143,134,255,0.22)]"
                          : "bg-violet-bright/20 text-violet-bright",
                      open && "rounded-r-none",
                    )}
                    style={{ left: `${bar.left}%`, width: `${bar.width}%`, ...(open ? { maskImage: "linear-gradient(to right, black 70%, transparent)", WebkitMaskImage: "linear-gradient(to right, black 70%, transparent)" } : {}) } as CSSProperties}
                  >
                    <span className="truncate">{bar.company}</span>
                  </span>
                )
              })}

              {/* Today */}
              <span className="absolute bottom-5 top-0 w-px bg-signal-bright/70" style={{ left: `${pct(now)}%` }}>
                <span className="absolute -top-0.5 left-1 font-mono text-[9px] uppercase tracking-[0.12em] text-signal-bright">Now</span>
              </span>

              {/* Crosshair */}
              <span className="pointer-events-none absolute bottom-5 top-0 w-px bg-white/70 transition-[left] duration-500 ease-out" style={{ left: `${crosshair}%`, transitionDuration: hover === null ? "600ms" : "0ms" }}>
                <span className={cn("absolute top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded bg-white px-1.5 py-0.5 font-mono text-[10px] text-night", crosshair > 88 && "-translate-x-full", crosshair < 8 && "translate-x-0")}>
                  {labelAt(crosshair)}
                </span>
              </span>
            </div>
          </div>
          <p className="mt-5 truncate font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/50 md:pl-24" aria-live="polite">
            <span className="text-white/80">{labelAt(crosshair)}</span>
            <span className="mx-2 text-white/25">→</span>
            {atCrosshair.length ? atCrosshair.join("  ·  ") : "Nothing declared"}
          </p>
        </div>
      </div>

      {/* Positions: a ledger, not a card grid. */}
      <ol className="mt-10 divide-y divide-white/10 border-y border-white/10 lg:mt-14">
        {positions.map((position, index) => {
          const open = !position.end
          const on = index === active
          return (
            <li
              key={position.id}
              ref={(el) => {
                tickets.current[index] = el
              }}
              data-index={index}
              className={cn("grid gap-8 py-12 transition-opacity duration-700 md:py-16 lg:grid-cols-12 lg:gap-10", on ? "lg:opacity-100" : "lg:opacity-45")}
            >
              <div className="lg:col-span-4">
                <p className="field flex items-center gap-3 text-white/45">
                  <span>Position {String(index + 1).padStart(2, "0")}</span>
                  <span className="opacity-50">·</span>
                  <span>{position.kind === "business" ? "Business ownership" : "Employment"}</span>
                </p>
                <h3 className="stretch-wide mt-4 text-[clamp(2rem,3.6vw,3rem)] font-semibold leading-none tracking-[-0.02em] text-white">{position.company}</h3>
                <p className="mt-3 text-[15px] text-white/75">{position.role}</p>
                <p className="mt-1 font-mono text-[12px] text-white/45">{position.period}</p>
                <p className={cn("mt-5 inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em]", open ? "border-signal-bright/40 text-signal-bright" : "border-white/15 text-white/45")}>
                  <span className={cn("h-1.5 w-1.5 rounded-full", open ? "animate-pulse bg-signal-bright" : "bg-white/40")} />
                  {open ? "Open position" : "Closed"}
                </p>
              </div>

              <div className="lg:col-span-8">
                {position.pnl.length > 0 ? (
                  <dl className="flex flex-wrap gap-x-10 gap-y-6">
                    {position.pnl.map((item) => (
                      <div key={item.label}>
                        <dd className="stretch-cond text-[clamp(2.4rem,4.4vw,3.5rem)] font-semibold leading-none tracking-[-0.01em] text-signal-bright">
                          <Flap text={item.value} run={seen.has(position.id)} />
                        </dd>
                        <dt className="mt-2 font-mono text-[10.5px] uppercase leading-snug tracking-[0.12em] text-white/50">{item.label}</dt>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="serif-accent text-[1.6rem] leading-snug text-white/60">No figures yet. The position is still open.</p>
                )}
                <p className="mt-8 max-w-2xl text-[16.5px] leading-relaxed text-white/80">{position.summary}</p>
                {position.notes.length > 0 && (
                  <ul className="mt-5 max-w-2xl space-y-2.5">
                    {position.notes.map((note) => (
                      <li key={note} className="flex gap-3 text-[14.5px] leading-relaxed text-white/55">
                        <span aria-hidden="true" className="mt-[0.65em] h-px w-3 shrink-0 bg-violet-bright/70" />
                        {note}
                      </li>
                    ))}
                  </ul>
                )}
                {position.media && (
                  <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {position.media.map((item) => (
                      <li key={item.src}>
                        <a href={item.href} target="_blank" rel="noopener noreferrer" className="group block">
                          <span className="block overflow-hidden rounded-lg border border-white/10 bg-night">
                            <img src={item.src} alt={item.alt} loading="lazy" className="aspect-[16/10] w-full object-cover opacity-85 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100" />
                          </span>
                          <span className="mt-2 flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white/50 group-hover:text-white/80">
                            {item.title}
                            <ArrowUpRight className="h-3 w-3" />
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
