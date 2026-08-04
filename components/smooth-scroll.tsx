"use client"

import { useEffect, type ReactNode } from "react"

/**
 * Momentum scrolling for the whole document.
 *
 * Lenis is skipped entirely when the visitor prefers reduced motion or is on a
 * touch device, so those users keep the platform's native scrolling.
 *
 * The import is dynamic so that skipping it also means not downloading it:
 * a phone never fetches, parses or executes the smooth-scroll library it was
 * always going to opt out of. Anchor scrolling falls back to the native
 * `scroll-behavior: smooth` already set in the stylesheet.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches
    if (prefersReducedMotion || isCoarsePointer) return

    let frame = 0
    let cleanup: (() => void) | null = null
    let cancelled = false

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return

      const lenis = new Lenis({
        duration: 1.05,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.5,
      })

      const raf = (time: number) => {
        lenis.raf(time)
        frame = requestAnimationFrame(raf)
      }
      frame = requestAnimationFrame(raf)

      // Route in-page anchor clicks through Lenis so jumps are eased, not instant.
      const handleAnchorClick = (event: MouseEvent) => {
        const anchor = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
          'a[href*="#"]',
        )
        if (!anchor) return

        const url = new URL(anchor.href, window.location.href)
        if (url.pathname !== window.location.pathname || !url.hash) return

        const target = document.querySelector(url.hash)
        if (!target) return

        event.preventDefault()
        lenis.scrollTo(target as HTMLElement, { offset: -96 })
        window.history.pushState(null, "", url.hash)
      }

      document.addEventListener("click", handleAnchorClick)

      cleanup = () => {
        document.removeEventListener("click", handleAnchorClick)
        cancelAnimationFrame(frame)
        lenis.destroy()
      }
    })

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [])

  return <>{children}</>
}
