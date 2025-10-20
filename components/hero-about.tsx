"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroAbout() {
  const heroRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.98])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return

      const cards = heroRef.current.querySelectorAll('.float-card')
      const { clientX, clientY } = e
      const { width, height } = heroRef.current.getBoundingClientRect()

      const x = (clientX / width - 0.5) * 20
      const y = (clientY / height - 0.5) * 20

      cards.forEach((card, i) => {
        const factor = (i + 1) * 0.5
        ;(card as HTMLElement).style.transform = `translate(${x * factor}px, ${y * factor}px)`
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const stats = [
    { label: "Years Experience", value: "2+" },
  ]

  const companies = [
    "Crypto.com",
    "ByteDance",
    "Lark",
    "Trendsi",
    "Ernst & Young"
  ]

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-white dark:bg-black"
    >
      {/* Paper grid background */}
      <div className="absolute inset-0 bg-white dark:bg-black" />
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
          opacity: 0.5
        }}
      />
      
      {/* Animated geometric shapes */}
      <motion.div
        className="float-card absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 opacity-40 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="float-card absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full bg-gradient-to-tr from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-900 opacity-30 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <motion.div 
        style={{ opacity, scale }}
        className="container relative z-20 px-4 md:px-6 py-20 md:py-24"
      >
        <div className="max-w-5xl mx-auto space-y-12 mt-12 md:mt-16">
          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.9]">
              <span className="text-black dark:text-white">
                JAMES LIU
              </span>
            </h1>
            
            <div className="h-1 w-24 bg-black dark:bg-white" />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed"
          >
            Product Manager at <span className="text-black dark:text-white font-medium">Crypto.com</span> based in Singapore — building AI-powered, product-led experiences that drive measurable growth.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-xl"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="inline-block"
              >
                <div className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-gray-500 dark:text-gray-500 uppercase tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Companies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-4"
          >
            <p className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wide">
              Experience With
            </p>
            <div className="flex flex-wrap gap-3">
              {companies.map((company, index) => (
                <motion.div
                  key={company}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
                  className="relative px-4 py-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm font-medium text-black dark:text-white"
                >
                  {company}
                  {company === "Trendsi"}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4"
          >
            <Button
              className="group bg-black text-white hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-100 border-0 px-8 py-6 text-base font-medium transition-all"
              size="lg"
              onClick={() => {
                document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              EXPLORE MY WORK
              <ArrowDown className="w-4 h-4 ml-2 transition-transform group-hover:translate-y-1" />
            </Button>

            <Button 
              className="group px-8 py-6 text-base font-medium border-2 border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white bg-transparent hover:bg-black/5 dark:hover:bg-white/5 transition-all" 
              variant="outline" 
              asChild
            >
              <a href="https://www.linkedin.com/in/james-liu-zx/" target="_blank" rel="noopener noreferrer">
                LET&apos;S CONNECT
                <ExternalLink className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </Button>
          </motion.div>

          {/* Floating info cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8"
          >
            {[
              { label: "Location", value: "Singapore" },
              { label: "Focus", value: "AI & Growth" },
              { label: "Role", value: "Product Manager" },
              { label: "Education", value: "National University of Singapore, Computer Science" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className="float-card p-5 rounded-xl bg-white/70 dark:bg-black/70 border border-gray-200 dark:border-gray-800 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, delay: 0.1 * index }}
              >
                <div className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wide mb-1.5">
                  {item.label}
                </div>
                <div className="text-sm font-medium text-black dark:text-white">
                  {item.value}
                </div>
                {item.subtitle && (
                  <div className="text-[10px] text-gray-500 dark:text-gray-500 mt-1 leading-tight">
                    {item.subtitle}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Minimal scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-400 uppercase tracking-wide">Scroll</span>
          <div className="w-5 h-8 rounded-full border-2 border-gray-300 dark:border-gray-700 flex items-start justify-center p-1">
            <motion.div
              className="w-1 h-2 bg-gray-400 dark:bg-gray-600 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}