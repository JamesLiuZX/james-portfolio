"use client"

import Navbar from "@/components/navbar"
import HeroAbout from "@/components/hero-about"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import TechStack from "@/components/tech-stack"
import AcademicAchievements from "@/components/academic-achievements"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import CursorFollower from "@/components/cursor-follower"
import ScrollProgress from "@/components/scroll-progress"

export default function Home() {
  return (
    <main className="min-h-screen">
      <CursorFollower />
      <ScrollProgress />
      <Navbar />
      <HeroAbout />
      <Experience />
      <Projects />
      <TechStack />
      <AcademicAchievements />
      <Contact />
      <Footer />
    </main>
  )
}
