"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/**
 * Picks up reveals rendered by a client-side navigation.
 *
 * The inline bootstrap catches everything present when the document is
 * parsed, which covers every full page load. Only soft navigations introduce
 * `.reveal` elements afterwards, so a pathname effect is all that is needed —
 * and it costs nothing on first paint.
 */
export default function RevealRescan() {
  const pathname = usePathname()

  useEffect(() => {
    ;(window as { __revealScan?: () => void }).__revealScan?.()
  }, [pathname])

  return null
}
