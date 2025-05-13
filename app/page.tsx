//"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import TechStack from "@/components/tech-stack"
import AcademicAchievements from "@/components/academic-achievements"
import Beyond from "@/components/beyond"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import CursorFollower from "@/components/cursor-follower"
import ScrollProgress from "@/components/scroll-progress"

export default function Home() {
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const options: Intl.DateTimeFormatOptions = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
      }
      setCurrentTime(now.toLocaleTimeString("en-US", options))
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen">
      <CursorFollower />
      <ScrollProgress />
      <Navbar />
      <Hero currentTime={currentTime} />
      <About />
      <Experience />
      <Projects />
      <TechStack />
      <AcademicAchievements />
      <Beyond />
      <Contact />
      <Footer />
    </main>
  )
}

