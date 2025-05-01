"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return

      const { clientX, clientY } = e
      const { width, height, left, top } = heroRef.current.getBoundingClientRect()

      const x = (clientX - left) / width - 0.5
      const y = (clientY - top) / height - 0.5

      heroRef.current.style.setProperty("--mouse-x", `${x * 20}px`)
      heroRef.current.style.setProperty("--mouse-y", `${y * 20}px`)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={
        {
          "--mouse-x": "0px",
          "--mouse-y": "0px",
        } as React.CSSProperties
      }
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/50 z-10" />

      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-grid-white/[0.2] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <div className="container relative z-20 px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter max-w-3xl mx-auto leading-tight">
              JAMES LIU
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-[700px] mx-auto">
              Product Manager & Software Engineer
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Button
              className="group"
              size="lg"
              onClick={() => {
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              EXPLORE MY WORK
              <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
            </Button>
          </motion.div>
        </div>
      </div>

      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),transparent_60%)] z-0"
        style={{
          transform: "translate3d(var(--mouse-x), var(--mouse-y), 0)",
          transition: "transform 0.2s cubic-bezier(0.1, 0.5, 0.5, 1)",
        }}
      />
    </section>
  )
}

