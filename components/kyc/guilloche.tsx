import type { CSSProperties } from "react"
import { rosette, waveBand } from "@/lib/guilloche"
import { cn } from "@/lib/utils"

type Layer = { color: string; opacity?: number; options?: Parameters<typeof rosette>[0] }

/**
 * A guilloche rosette, drawn in hairlines. With `draw`, every curve draws
 * itself in (on load, or once its parent arrives with `later`).
 */
export function Rosette({
  layers,
  className,
  strokeWidth = 1.1,
  draw,
  later,
  style,
}: {
  layers: Layer[]
  className?: string
  strokeWidth?: number
  draw?: boolean
  later?: boolean
  style?: CSSProperties
}) {
  return (
    <svg viewBox="0 0 1000 1000" aria-hidden="true" className={cn("overflow-visible", className)} style={style}>
      {layers.map((layer, li) =>
        rosette(layer.options).map((d, ci) => (
          <path
            key={`${li}-${ci}`}
            d={d}
            fill="none"
            stroke={layer.color}
            strokeOpacity={layer.opacity ?? 1}
            strokeWidth={strokeWidth}
            pathLength={draw ? 1 : undefined}
            className={draw ? (later ? "draw-later" : "draw") : undefined}
            style={draw ? ({ "--delay": `${0.15 + li * 0.25 + ci * 0.05}s`, "--dur": "2.4s" } as CSSProperties) : undefined}
          />
        )),
      )}
    </svg>
  )
}

/** A band of interlaced waves: the border of a security document. */
export function WaveBand({
  className,
  color = "currentColor",
  opacity = 1,
  options,
  strokeWidth = 1,
}: {
  className?: string
  color?: string
  opacity?: number
  options?: Parameters<typeof waveBand>[0]
  strokeWidth?: number
}) {
  const width = options?.width ?? 1000
  const height = options?.height ?? 60
  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true" className={className}>
      {waveBand(options).map((d, i) => (
        <path key={i} d={d} fill="none" stroke={color} strokeOpacity={opacity} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  )
}

/** Banknote microprint: his name, repeated, too small to read at a glance. */
export function Microtext({ text = "JAMES LIU · KNOW YOUR CANDIDATE · ", className }: { text?: string; className?: string }) {
  return (
    <div aria-hidden="true" className={cn("microtext", className)}>
      {text.repeat(24)}
    </div>
  )
}
