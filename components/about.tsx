"use client"

import type React from "react"

import { useRef } from "react"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import Image from "next/image"

export default function About() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const imageGalleryRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageGalleryRef.current) return

    const { clientX } = e
    const { left, width } = imageGalleryRef.current.getBoundingClientRect()

    const images = imageGalleryRef.current.querySelectorAll("img")
    const x = (clientX - left) / width - 0.5

    images.forEach((img, i) => {
      const factor = (i - 1) * 15
      ;(img as HTMLElement).style.transform = `rotateY(${x * factor}deg) translateZ(${Math.abs(factor)}px)`
    })
  }

  return (
    <section id="about" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <div className="space-y-6">
            <motion.h2
              className="text-2xl font-semibold"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              ABOUT ME
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl leading-relaxed text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              I&apos;m James, an incoming Product Manager at ByteDance based in Singapore. I build impactful user
              experiences that drive success and user delight.
            </motion.p>

            <motion.p
              className="text-base leading-relaxed text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              With a background in Computer Science from NUS and experience at Stanford University, I combine technical
              expertise with product vision. I&apos;ve worked on various projects from AI-powered productivity tools to
              e-commerce platforms, always focusing on creating exceptional user experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button className="group" variant="outline" asChild>
                <a href="https://www.linkedin.com/in/james-liu-zx/" target="_blank" rel="noopener noreferrer">
                  LET&apos;S CONNECT
                  <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="relative h-[300px] md:h-[400px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div ref={imageGalleryRef} className="image-gallery h-full" onMouseMove={handleMouseMove}>
              <Image
                src="/linkedin.jpeg"
                alt="James at work"
                width={300}
                height={400}
                className="object-cover rounded-md shadow-lg"
              />
              <Image
                src="/Lark-1.jpeg"
                alt="James at an event"
                width={300}
                height={400}
                className="object-cover rounded-md shadow-lg"
              />
              <Image
                src="/presenting.jpg"
                alt="James presenting"
                width={300}
                height={400}
                className="object-cover rounded-md shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

