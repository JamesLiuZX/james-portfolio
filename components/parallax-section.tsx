"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface ParallaxSectionProps {
  children: React.ReactNode
  className?: string
  offset?: number
}

export default function ParallaxSection({ children, className = "", offset = 50 }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const outer = ref.current
    const inner = innerRef.current
    if (!outer || !inner) return

    // Parallax is decoration; skip it for reduced motion and on touch, where
    // the scroll listener would cost more than the effect is worth.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (window.matchMedia("(pointer: coarse)").matches) return

    let frame = 0

    const paint = () => {
      frame = 0
      const rect = outer.getBoundingClientRect()
      // 0 when the element's top hits the bottom of the viewport, 1 when its
      // bottom clears the top — matching the old ["start end", "end start"].
      const span = rect.height + window.innerHeight
      const progress = span > 0 ? (window.innerHeight - rect.top) / span : 0
      const clamped = Math.min(1, Math.max(0, progress))
      inner.style.transform = `translate3d(0, ${-offset + clamped * offset * 2}px, 0)`
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint)
    }

    paint()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [offset])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <div ref={innerRef} className="h-full w-full">
        {children}
      </div>
    </div>
  )
}
