"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * The identity document. It leans toward the pointer, its hologram catches
 * the light where the pointer is, and it turns over to show the back.
 * Faces are server-rendered and passed in; this only handles the motion.
 */
export default function IdCard({ front, back }: { front: ReactNode; back: ReactNode }) {
  const tiltRef = useRef<HTMLDivElement>(null)
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    const el = tiltRef.current
    if (!el) return
    if (!window.matchMedia("(pointer: fine)").matches) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let frame = 0
    let px = 0.5
    let py = 0.5
    const paint = () => {
      frame = 0
      el.style.setProperty("--rx", `${((0.5 - py) * 9).toFixed(2)}deg`)
      el.style.setProperty("--ry", `${((px - 0.5) * 12).toFixed(2)}deg`)
      el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`)
      el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`)
      el.style.setProperty("--holo-angle", `${(px * 140 + py * 60).toFixed(0)}deg`)
    }
    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      px = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))
      py = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height))
      if (!frame) frame = requestAnimationFrame(paint)
    }
    const onLeave = () => {
      px = 0.5
      py = 0.5
      if (!frame) frame = requestAnimationFrame(paint)
    }
    // Listen on the whole hero so the card responds before the pointer reaches it.
    const zone = el.closest("section") ?? el
    zone.addEventListener("pointermove", onMove as EventListener, { passive: true })
    zone.addEventListener("pointerleave", onLeave)
    return () => {
      zone.removeEventListener("pointermove", onMove as EventListener)
      zone.removeEventListener("pointerleave", onLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="perspective-1000">
      <div
        ref={tiltRef}
        className="relative transition-transform duration-300 ease-out"
        style={{ transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))", transformStyle: "preserve-3d" }}
      >
        <div
          className="relative aspect-[1.586/1] w-full transition-transform [transition-duration:900ms] [transition-timing-function:cubic-bezier(0.7,0,0.2,1)] [container-type:inline-size]"
          style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "none" }}
        >
          <div className="absolute inset-0 [backface-visibility:hidden]" aria-hidden={flipped}>
            {front}
          </div>
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]" aria-hidden={!flipped}>
            {back}
          </div>
        </div>
      </div>
      <div className="mt-5 flex justify-center">
        <button
          type="button"
          onClick={() => setFlipped((value) => !value)}
          className="group inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft transition-colors hover:text-ink"
        >
          <RotateCcw className={cn("h-3.5 w-3.5 transition-transform duration-700", flipped && "-rotate-180")} />
          {flipped ? "Back to the front" : "Turn the card over"}
        </button>
      </div>
    </div>
  )
}
