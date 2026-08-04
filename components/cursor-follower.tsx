"use client"

import { useEffect, useState, type ComponentType } from "react"

/**
 * Mounts the custom cursor, but only where there is a cursor to replace.
 *
 * The check has to happen in the browser, so the guard cannot be a build-time
 * one — but it can still gate the *download*. Importing the implementation
 * from inside the effect means a phone evaluates two lines of media query and
 * then stops: no rAF loop, no pointer listeners, and no chunk fetched for a
 * decoration it was never going to render.
 */
export default function CursorFollower() {
  const [Impl, setImpl] = useState<ComponentType | null>(null)

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!finePointer || reducedMotion) return

    let cancelled = false
    import("@/components/cursor-follower-impl").then((mod) => {
      if (!cancelled) setImpl(() => mod.default)
    })

    return () => {
      cancelled = true
    }
  }, [])

  return Impl ? <Impl /> : null
}
