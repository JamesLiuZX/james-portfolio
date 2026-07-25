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

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.06])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const ownership = [
    { label: "Owns", value: "Prediction Markets" },
    { label: "Also", value: "Options · Strike Options" },
    { label: "Scale", value: "10M+ MAU product" },
  ]

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden bg-foreground text-background"
    >
      <motion.div style={{ scale: imageScale }} className="absolute inset-0">
        <Image
          src="/james-LA.jpg"
          alt="James Liu"
          fill
          priority
          className="object-cover object-[58%_28%] sm:object-[55%_24%] lg:object-[52%_22%] 3xl:object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/20 lg:via-black/35 lg:to-transparent" />
        <div className="absolute inset-0 hero-grain opacity-[0.12] mix-blend-overlay pointer-events-none" />
      </motion.div>

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 pb-10 sm:pb-12 lg:pb-14 pt-24 sm:pt-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-end">
            <div className="lg:col-span-7 xl:col-span-8 space-y-5 sm:space-y-6 lg:space-y-8">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.28em] text-white/70"
              >
                Product Manager · Singapore
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.08 }}
                className="font-display font-bold tracking-tight leading-[0.9] text-white text-[clamp(2.75rem,7.5vw,7rem)] 3xl:text-[7.5rem]"
              >
                JAMES LIU
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.18 }}
                className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed text-balance"
              >
                Sole product owner of Prediction Markets at Crypto.com — previously growth & AI at ByteDance.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.28 }}
                className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3 pt-1"
              >
                <Button
                  size="lg"
                  className="group bg-white text-black hover:bg-white/90 border-0 px-6 sm:px-7 h-11 sm:h-12 text-sm font-semibold tracking-wide"
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
                  className="group px-6 sm:px-7 h-11 sm:h-12 text-sm font-semibold tracking-wide border-white/35 bg-transparent text-white hover:bg-white/10 hover:text-white"
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

            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="hidden lg:block lg:col-span-5 xl:col-span-4"
            >
              <div className="border border-white/20 bg-black/35 backdrop-blur-md p-5 xl:p-6 space-y-4">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/50">
                  Currently
                </p>
                <div className="space-y-4">
                  {ownership.map((item) => (
                    <div key={item.label} className="border-t border-white/15 pt-3 first:border-0 first:pt-0">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-white/45 mb-1">
                        {item.label}
                      </p>
                      <p className="font-display text-lg xl:text-xl font-semibold text-white tracking-tight">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.aside>
          </div>
        </div>

        <div className="border-t border-white/15 bg-black/45 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-3.5 sm:py-4 flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-6 lg:gap-10">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-white/45 shrink-0">
              Experience with
            </span>
            <div className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-1.5 text-xs sm:text-sm text-white/75">
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
