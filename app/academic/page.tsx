"use client"

import type { CSSProperties } from "react"
import Link from "next/link"
import { Award, BookOpen, Calendar, GraduationCap, MapPin } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CursorFollower from "@/components/cursor-follower"
import ScrollProgress from "@/components/scroll-progress"
import PageHeader from "@/components/page-header"

interface Education {
  institution: string
  degree: string
  period: string
  location: string
  description: string[]
  image: string
}

interface AwardItem {
  title: string
  issuer: string
  date: string
  description: string
}

export default function Academic() {


  const education: Education[] = [
    {
      institution: "National University of Singapore",
      degree: "Bachelor of Computing in Computer Science, Honours (Distinction)",
      period: "Aug 2021 - May 2025",
      location: "Singapore",
      description: [
        "NUS Overseas College: Silicon Valley – Top 0.3% student tech and entrepreneurship program in Singapore.",
        "Recipient of NUS Enterprise Venture Initiation Programme $10,000 award for technical startup.",
        "Student mentor (Top 5%) for CS2103T, Software Engineering.",
        "Selected for Meta Above and Beyond CS Program and JP Morgan Finance for Non-Finance Program.",
      ],
      image: "/nuslogo.webp",
    },
    {
      institution: "Stanford University",
      degree: "Management Science & Engineering, Fall Quarter",
      period: "Sep 2023 - Dec 2023",
      location: "California, USA",
      description: [
        "Achieved 2nd place in internal hackathon and grant funding from Stanford Startup Society.",
        "Shortlisted for best project in Stanford Treehacks Hackathon under YCombinator category.",
        "3.7/4.0 GPA",
      ],
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  const awards: AwardItem[] = [
    {
      title: "NUS Enterprise Venture Initiation Programme",
      issuer: "National University of Singapore",
      date: "2024",
      description: "$10,000 award for technical startup Calendare.",
    },
    {
      title: "Stanford Leadership Challenge (Third Place)",
      issuer: "Stanford University Undergraduate Association",
      date: "Aug 2018",
      description:
        "A yearly challenge pioneered by Stanford undergraduates which involves participants from other competitive institutions such as Anglo Chinese School (Independent) and Hwa Chong International School.",
    },
    {
      title: "NTU Model UN (2nd Place)",
      issuer: "Nanyang Technological University",
      date: "Feb 2018",
      description:
        "Represented South Korea in the largest and most prestigious MUN in Singapore and across Southeast Asia. Was the main submitter of both main resolutions that passed in the 3 days of debate.",
    },
  ]

  return (
    <>
      <CursorFollower />
      <ScrollProgress />
      <Navbar />

      <main className="min-h-screen">
        <PageHeader
          eyebrow="Academic"
          title={
            <>
              The degree, the detour, and the{" "}
              <span className="serif-accent text-brand">awards</span> along the way.
            </>
          }
          lede="Computer Science at NUS, a quarter at Stanford, and the programmes and competitions that shaped how I build."
        />

      <section className="pb-24 md:pb-32">
        <div className="shell">
          <div className="space-y-16">
            <div className="space-y-12">
              <h2 className="text-2xl font-semibold flex items-center">
                <GraduationCap className="mr-2 h-5 w-5" />
                Education
              </h2>

              <div className="space-y-12">
                {education.map((edu, index) => (
                  <div key={index} className="enter grid grid-cols-1 md:grid-cols-3 gap-8 items-start" style={{ "--enter-duration": "0.5s" } as CSSProperties}>
                    <div className="md:col-span-1">
                      <div className="rounded-lg overflow-hidden">
                        <img
                          src={edu.image || "/placeholder.svg"}
                          alt={edu.institution}
                          width={600}
                          height={400}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-4">
                      <h3 className="text-xl font-medium">{edu.institution}</h3>
                      <p className="text-primary font-medium">{edu.degree}</p>

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4" />
                          <span>{edu.period}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-1 h-4 w-4" />
                          <span>{edu.location}</span>
                        </div>
                      </div>

                      <ul className="space-y-2 text-muted-foreground">
                        {edu.description.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span className="mr-2 mt-1.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-12">
              <h2 className="text-2xl font-semibold flex items-center">
                <Award className="mr-2 h-5 w-5" />
                Honors & Awards
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {awards.map((award, index) => (
                  <div key={index} className="enter bg-card rounded-lg p-6 border border-border" style={{ "--enter-duration": "0.5s" } as CSSProperties}>
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">{award.title}</h3>

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <BookOpen className="mr-1 h-4 w-4" />
                          <span>{award.issuer}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4" />
                          <span>{award.date}</span>
                        </div>
                      </div>

                      <p className="text-muted-foreground">{award.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </>
  )
}

