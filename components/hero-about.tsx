"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroAbout() {
  const heroRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[100svh] flex items-end overflow-hidden bg-foreground text-background"
    >
      {/* Full-bleed visual plane */}
      <motion.div style={{ scale: imageScale }} className="absolute inset-0">
        <Image
          src="/james-LA.jpg"
          alt="James Liu"
          fill
          priority
          className="object-cover object-[center_20%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 hero-grain opacity-[0.12] mix-blend-overlay pointer-events-none" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full"
      >
        <div className="container mx-auto px-4 md:px-6 pb-16 md:pb-20 pt-28">
          <div className="max-w-3xl space-y-8">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-xs md:text-sm uppercase tracking-[0.28em] text-white/70"
            >
              Product Manager · Singapore
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="font-display text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] text-white"
            >
              JAMES LIU
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.18 }}
              className="text-lg md:text-xl text-white/80 max-w-xl leading-relaxed text-balance"
            >
              Building AI-powered, product-led experiences at Crypto.com —
              previously growth & AI at ByteDance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.28 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2"
            >
              <Button
                size="lg"
                className="group bg-white text-black hover:bg-white/90 border-0 px-7 h-12 text-sm font-semibold tracking-wide"
                onClick={() => {
                  document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Explore my work
                <ArrowDown className="w-4 h-4 ml-2 transition-transform group-hover:translate-y-0.5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="group px-7 h-12 text-sm font-semibold tracking-wide border-white/35 bg-transparent text-white hover:bg-white/10 hover:text-white"
                asChild
              >
                <a
                  href="https://www.linkedin.com/in/james-liu-zx/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Let&apos;s connect
                  <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Trust strip — below the primary hero composition */}
        <div className="border-t border-white/15 bg-black/40 backdrop-blur-sm">
          <div className="container mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-8">
            <span className="text-[11px] uppercase tracking-[0.22em] text-white/45 shrink-0">
              Experience with
            </span>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/75">
              {["Crypto.com", "ByteDance", "Lark", "Trendsi", "Ernst & Young"].map((company) => (
                <span key={company} className="font-medium tracking-wide">
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
