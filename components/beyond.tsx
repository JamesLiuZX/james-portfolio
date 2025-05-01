"use client"

import type React from "react"

import { useRef } from "react"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Beyond() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const galleryRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!galleryRef.current) return

    const { clientX, clientY } = e
    const { left, top, width, height } = galleryRef.current.getBoundingClientRect()

    const x = (clientX - left) / width - 0.5
    const y = (clientY - top) / height - 0.5

    const images = galleryRef.current.querySelectorAll("img")
    images.forEach((img, i) => {
      const factor = 20 + i * 5
      const rotateX = -y * factor
      const rotateY = x * factor
      ;(img as HTMLElement).style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    })
  }

  const resetTransform = () => {
    if (!galleryRef.current) return

    const images = galleryRef.current.querySelectorAll("img")
    images.forEach((img) => {
      ;(img as HTMLElement).style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)"
    })
  }

  return (
    <section className="py-20 md:py-32 bg-black text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div ref={ref} className="space-y-12">
          <motion.h2
            className="text-2xl font-semibold text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            MORE IN MY LIFE
          </motion.h2>

          <motion.div
            ref={galleryRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={resetTransform}
          >
            <div className="aspect-square overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Beach"
                width={400}
                height={400}
                className="object-cover w-full h-full transition-transform duration-300"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Volleyball"
                width={400}
                height={400}
                className="object-cover w-full h-full transition-transform duration-300"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Travel"
                width={400}
                height={400}
                className="object-cover w-full h-full transition-transform duration-300"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Hiking"
                width={400}
                height={400}
                className="object-cover w-full h-full transition-transform duration-300"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

