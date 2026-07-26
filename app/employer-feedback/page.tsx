"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import EmployerFeedback from "@/components/employer-feedback"
import CursorFollower from "@/components/cursor-follower"
import ScrollProgress from "@/components/scroll-progress"
import PageHeader from "@/components/page-header"

export default function EmployerFeedbackPage() {
  return (
    <>
      <CursorFollower />
      <ScrollProgress />
      <Navbar />

      <main className="min-h-screen">
        <PageHeader
          eyebrow="Feedback"
          title={
            <>
              An honest <span className="serif-accent text-brand">read</span> on this
              portfolio.
            </>
          }
          lede="An objective assessment from an employer and investor perspective — what lands, and what still needs work."
        />

        <section className="shell pb-24 md:pb-32">
          <EmployerFeedback />
        </section>
      </main>

      <Footer />
    </>
  )
}
