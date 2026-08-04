"use client"

import { useEffect, useRef } from "react"

/**
 * A soft trailing ring plus a precise dot. The ring lags behind the pointer via
 * a critically-damped spring; the dot tracks it exactly.
 *
 * The spring is ~20 lines of rAF rather than a `useSpring` from an animation
 * library. Mounted only by `CursorFollower`, which checks for a real pointer
 * before importing this file at all.
 */
export default function CursorFollowerImpl() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ring = ringRef.current
    const dot = dotRef.current
    if (!ring || !dot) return

    // Target (pointer) and the ring's lagging position + velocity.
    let targetX = -100
    let targetY = -100
    let ringX = -100
    let ringY = -100
    let velocityX = 0
    let velocityY = 0

    let hovering = false
    let pressed = false
    let visible = false
    let frame = 0

    // Matches the previous spring: stiffness 220, damping 26, mass 0.4.
    const STIFFNESS = 220
    const DAMPING = 26
    const MASS = 0.4
    const STEP = 1 / 60

    const tick = () => {
      const ax = (-STIFFNESS * (ringX - targetX) - DAMPING * velocityX) / MASS
      const ay = (-STIFFNESS * (ringY - targetY) - DAMPING * velocityY) / MASS
      velocityX += ax * STEP
      velocityY += ay * STEP
      ringX += velocityX * STEP
      ringY += velocityY * STEP

      const size = hovering ? 44 : 28
      const scale = pressed ? 0.82 : 1

      ring.style.width = `${size}px`
      ring.style.height = `${size}px`
      ring.style.opacity = visible ? (hovering ? "1" : "0.55") : "0"
      ring.style.backgroundColor = hovering ? "hsl(var(--brand) / 0.1)" : "transparent"
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${scale})`

      dot.style.opacity = visible && !hovering ? "0.9" : "0"
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`

      frame = requestAnimationFrame(tick)
    }

    const onMove = (event: MouseEvent) => {
      targetX = event.clientX
      targetY = event.clientY
      visible = true

      // Delegated hit-testing keeps this correct for content rendered later.
      const target = event.target as HTMLElement | null
      hovering = Boolean(target?.closest("a, button, [role='button'], input, textarea"))
    }

    const onLeave = () => {
      visible = false
    }
    const onDown = () => {
      pressed = true
    }
    const onUp = () => {
      pressed = false
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    document.addEventListener("mouseleave", onLeave)
    window.addEventListener("mousedown", onDown)
    window.addEventListener("mouseup", onUp)
    frame = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
      window.removeEventListener("mousedown", onDown)
      window.removeEventListener("mouseup", onUp)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[70] hidden rounded-full border border-brand/50 opacity-0 transition-[width,height,background-color] duration-200 md:block"
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-1.5 w-1.5 rounded-full bg-brand opacity-0 transition-opacity duration-200 md:block"
      />
    </>
  )
}
