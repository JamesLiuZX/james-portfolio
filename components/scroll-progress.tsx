"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"
import { ArrowUp } from "lucide-react"

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)
  const [showTop, setShowTop] = useState(false)

  /*
   * One passive scroll listener, coalesced into a single rAF, writing one
   * transform. The bar used to be a spring-smoothed motion value, which meant
   * the animation runtime ran a physics tick on every frame of every scroll
   * for a 2px decoration.
   */
  useEffect(() => {
    let frame = 0

    const paint = () => {
      frame = 0
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`
      }
      setShowTop(window.scrollY > window.innerHeight * 0.8)
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
  }, [])

  return (
    <>
      <div
        ref={barRef}
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left scale-x-0 bg-gradient-to-r from-brand via-brand-alt to-brand"
      />

      {/*
        The entrance lives on the wrapper: a filled `transform` animation on
        the button itself would win the cascade and pin out the hover lift.
      */}
      {showTop && (
        <div
          className="enter fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8"
          style={{ "--enter-y": "12px", "--enter-duration": "0.3s" } as CSSProperties}
        >
          <button
            type="button"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="grid h-11 w-11 place-items-center rounded-full border border-border/70 bg-background/95 text-foreground shadow-soft transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-brand/40 md:bg-background/70 md:backdrop-blur-xl"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      )}
    </>
  )
}
