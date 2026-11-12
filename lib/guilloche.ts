/**
 * Guilloche: the engraved line patterns on passports and banknotes, generated
 * as SVG paths. A rosette is a set of closed polar curves,
 *   r(t) = base + a·sin(n·t + φ) + b·sin(m·t + ψ),
 * each one rotated a little from the last, so the curves weave. Coordinates
 * are rounded to whole units in a 1000-unit box to keep the markup small.
 */

type RosetteOptions = {
  curves?: number
  base?: number
  a?: number
  n?: number
  b?: number
  m?: number
  points?: number
  /** Shifts the whole family, so two rosettes on a page don't match. */
  twist?: number
}

export function rosette({
  curves = 10,
  base = 300,
  a = 70,
  n = 7,
  b = 22,
  m = 23,
  points = 360,
  twist = 0,
}: RosetteOptions = {}): string[] {
  const c = 500
  return Array.from({ length: curves }, (_, k) => {
    const phase = twist + (k / curves) * ((2 * Math.PI) / n)
    let d = ""
    for (let i = 0; i <= points; i++) {
      const t = (i / points) * 2 * Math.PI
      const r = base + a * Math.sin(n * (t + phase)) + b * Math.sin(m * t + k * 0.6)
      const x = c + r * Math.cos(t)
      const y = c + r * Math.sin(t)
      d += `${i === 0 ? "M" : " "}${Math.round(x)} ${Math.round(y)}`
    }
    return `${d}Z`
  })
}

/** Horizontal sine waves, phase-shifted, for borders and bands. */
export function waveBand({
  width = 1000,
  height = 60,
  lines = 7,
  amplitude = 14,
  waves = 9,
  points = 220,
}: {
  width?: number
  height?: number
  lines?: number
  amplitude?: number
  waves?: number
  points?: number
} = {}): string[] {
  const mid = height / 2
  return Array.from({ length: lines }, (_, k) => {
    const phase = (k / lines) * Math.PI * 2
    let d = ""
    for (let i = 0; i <= points; i++) {
      const x = (i / points) * width
      const y = mid + amplitude * Math.sin((x / width) * waves * Math.PI * 2 + phase) * Math.cos((x / width) * Math.PI * 1.5 + k * 0.4)
      d += `${i === 0 ? "M" : " "}${Math.round(x)} ${y.toFixed(1)}`
    }
    return d
  })
}
