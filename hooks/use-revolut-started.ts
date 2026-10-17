"use client"

import { useEffect, useState } from "react"

/** First day at Revolut, midnight Singapore time. */
export const REVOLUT_START = new Date("2026-11-01T00:00:00+08:00")

/**
 * Whether the Revolut role has started, decided in the visitor's browser so a
 * static export built in October still reads correctly in November without a
 * redeploy. It starts false on every render so prerendered HTML and the first
 * client render agree; the effect flips it once mounted.
 */
export function useRevolutStarted() {
  const [started, setStarted] = useState(false)
  useEffect(() => {
    setStarted(Date.now() >= REVOLUT_START.getTime())
  }, [])
  return started
}
