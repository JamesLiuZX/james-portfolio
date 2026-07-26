"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

/**
 * A soft trailing ring plus a precise dot. The ring lags behind the pointer via
 * a spring; the dot tracks it exactly. Hidden on touch devices and when the
 * visitor prefers reduced motion.
 */
export default function CursorFollower() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [pressed, setPressed] = useState(false)
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 220, damping: 26, mass: 0.4 })
  const ringY = useSpring(y, { stiffness: 220, damping: 26, mass: 0.4 })

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!finePointer || reducedMotion) return

    setEnabled(true)

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
      setVisible(true)

      // Delegated hit-testing keeps this correct for content rendered later.
      const target = event.target as HTMLElement | null
      setHovering(Boolean(target?.closest("a, button, [role='button'], input, textarea")))
    }

    const onLeave = () => setVisible(false)
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)

    window.addEventListener("mousemove", onMove, { passive: true })
    document.addEventListener("mouseleave", onLeave)
    window.addEventListener("mousedown", onDown)
    window.addEventListener("mouseup", onUp)

    return () => {
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
      window.removeEventListener("mousedown", onDown)
      window.removeEventListener("mouseup", onUp)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[70] hidden rounded-full border border-brand/50 md:block"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 44 : 28,
          height: hovering ? 44 : 28,
          opacity: visible ? (hovering ? 1 : 0.55) : 0,
          scale: pressed ? 0.82 : 1,
          backgroundColor: hovering ? "hsl(var(--brand) / 0.1)" : "hsl(var(--brand) / 0)",
        }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-1.5 w-1.5 rounded-full bg-brand md:block"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible && !hovering ? 0.9 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </>
  )
}
