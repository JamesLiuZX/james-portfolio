"use client"
import type { CSSProperties } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, ExternalLink, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CursorFollower from "@/components/cursor-follower"
import ScrollProgress from "@/components/scroll-progress"

export default function HerbalBathProject() {

  // Use the same image path as in the projects list
  const projectImage = "/herbalbath.webp"

  return (
    <main className="min-h-screen">
      <CursorFollower />
      <ScrollProgress />
      <Navbar />

      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-12">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Link href="/projects" className="text-muted-foreground hover:text-primary transition-colors">
                  <Button variant="ghost" size="sm" className="group">
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to Projects
                  </Button>
                </Link>
              </div>

              <h1 className="enter text-3xl md:text-5xl font-bold" style={{ "--enter-duration": "0.6s" } as CSSProperties}>
                HerbalBath Singapore
              </h1>

              <div className="enter flex flex-wrap gap-4 items-center" style={{ "--enter-delay": "0.1s", "--enter-duration": "0.6s" } as CSSProperties}>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span>2022 - Present</span>
                </div>

                <div className="inline-flex items-center rounded-full bg-secondary/50 px-3 py-1 text-xs">
                  <Tag className="mr-1 h-3 w-3" />
                  E-Commerce
                </div>

                <div className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs">
                  Featured Project
                </div>
              </div>
            </div>

            {/* Main Image - Reduced size */}
            <div className="enter rounded-xl overflow-hidden shadow-xl" style={{ "--enter-delay": "0.2s", "--enter-duration": "0.6s" } as CSSProperties}>
              <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-primary/5 to-primary/10">
                <img
                  src={projectImage}
                  alt="HerbalBath Singapore Website"
                  fetchPriority="high"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="enter md:col-span-2 space-y-8" style={{ "--enter-delay": "0.3s", "--enter-duration": "0.6s", "--enter-x": "-20px", "--enter-y": "0px" } as CSSProperties}>
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Overview</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    HerbalBath Singapore is a healthcare product company I founded and grew to over 100k in yearly
                    revenue with a 40% profit margin. The company specializes in natural herbal bath products that
                    combine traditional Asian herbal remedies with modern wellness practices. As the founder, I led a
                    team handling everything from product development and manufacturing to marketing, logistics, and
                    customer service.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    What began as a small passion project quickly grew into a successful e-commerce business with a
                    loyal customer base across Singapore and neighboring countries. By focusing on high-quality, natural
                    ingredients and exceptional customer service, HerbalBath Singapore has established itself as a
                    trusted brand in the wellness space, with products that genuinely improve customers' well-being.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Challenges</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>Breaking into a competitive market dominated by established international brands</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>Building consumer trust for products with health and wellness claims</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>Managing a complex supply chain for natural ingredients while maintaining quality</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>Scaling operations while maintaining product quality and customer service standards</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>Navigating regulatory requirements for health and wellness products</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Solutions</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>
                        Developed a unique brand identity focused on the fusion of traditional Asian herbal knowledge
                        and modern wellness
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>
                        Implemented a comprehensive social media marketing strategy targeting specific customer segments
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>
                        Established direct relationships with suppliers to ensure ingredient quality and ethical sourcing
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>
                        Created an efficient logistics system for timely order fulfillment and delivery tracking
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>
                        Built a customer-centric approach with personalized recommendations and responsive support
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Results</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>Grew the business to over 100k in yearly revenue with a 40% profit margin</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>Established a loyal customer base with a 65% repeat purchase rate</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>Expanded product line from 3 initial offerings to over 15 products</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Sidebar */}
              <div className="enter space-y-6" style={{ "--enter-delay": "0.4s", "--enter-duration": "0.6s", "--enter-x": "20px", "--enter-y": "0px" } as CSSProperties}>
                <div className="bg-card rounded-xl border border-border p-6 space-y-6 sticky top-24">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Business Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Founded:</span>
                        <span>2022</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Location:</span>
                        <span>Singapore</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Industry:</span>
                        <span>Health & Wellness</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Team Size:</span>
                        <span>5 members</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Annual Revenue:</span>
                        <span>$100k+</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Profit Margin:</span>
                        <span>40%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold">Links</h3>
                    <div className="space-y-2">
                      <Button asChild variant="outline" className="w-full justify-start">
                        <Link href="https://herbalbathsg.com" target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Visit Website
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <h3 className="text-xl font-semibold">Product Categories</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-primary">✓</span>
                        <span>Herbal Bath Sachets</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-primary">✓</span>
                        <span>Essential Oil Blends</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-primary">✓</span>
                        <span>Natural Body Scrubs</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-primary">✓</span>
                        <span>Herbal Teas</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-primary">✓</span>
                        <span>Wellness Gift Sets</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="text-xl font-semibold mb-3">Business Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {["E-commerce Strategy", "Social Media Marketing", "Supply Chain", "Product Development", "CRM", "Financial Planning"].map(
                        (skill) => (
                          <span
                            key={skill}
                            className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-medium"
                          >
                            {skill}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button asChild className="w-full">
                      <Link href="/#contact">Get in Touch</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}