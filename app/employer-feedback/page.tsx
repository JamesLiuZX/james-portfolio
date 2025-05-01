"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import EmployerFeedback from "@/components/employer-feedback"
import CursorFollower from "@/components/cursor-follower"
import ScrollProgress from "@/components/scroll-progress"

export default function EmployerFeedbackPage() {
  return (
    <main className="min-h-screen">
      <CursorFollower />
      <ScrollProgress />
      <Navbar />

      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-4 mb-12">
            <div className="flex items-center space-x-2">
              <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                <Button variant="ghost" size="sm" className="group">
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Back to Home
                </Button>
              </Link>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold">Employer Feedback</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              An objective assessment of this portfolio from an employer or investor perspective, highlighting strengths
              and areas for improvement.
            </p>
          </div>

          <EmployerFeedback />
        </div>
      </section>

      <Footer />
    </main>
  )
}

