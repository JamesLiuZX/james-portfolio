"use client"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, ExternalLink, Github, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CursorFollower from "@/components/cursor-follower"
import ScrollProgress from "@/components/scroll-progress"

export default function AskShopAIProject() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  // Use the same image path as in the projects list
  const projectImage = "/askshopai.png"

  return (
    <main className="min-h-screen">
      <CursorFollower />
      <ScrollProgress />
      <Navbar />

      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4 md:px-6">
          <div ref={ref} className="space-y-12">
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

              <motion.h1
                className="text-3xl md:text-5xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
              >
                AskShop.ai
              </motion.h1>

              <motion.div
                className="flex flex-wrap gap-4 items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span>February 2024 - July 2024</span>
                </div>

                <div className="inline-flex items-center rounded-full bg-secondary/50 px-3 py-1 text-xs">
                  <Tag className="mr-1 h-3 w-3" />
                  SaaS
                </div>

                <div className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs">
                  Featured Project
                </div>
              </motion.div>
            </div>

            {/* Main Image - Reduced size */}
            <motion.div
              className="rounded-xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-primary/5 to-primary/10">
                <Image
                  src={projectImage}
                  alt="AskShop.ai Dashboard"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Main Content */}
              <motion.div
                className="md:col-span-2 space-y-8"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Overview</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    AskShop.ai is a revolutionary B2B e-commerce SaaS platform that transforms how online stores handle
                    product discovery and recommendations. Built for Shopify, it leverages advanced AI to understand
                    customer queries in natural language and provide personalized product recommendations. The platform
                    integrates seamlessly with existing Shopify stores, requiring minimal setup while delivering maximum
                    impact on conversion rates and customer satisfaction.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    As CEO and Co-Founder, I led the development of this AI-powered solution that can be distributed
                    across every Shopify store. We built the entire platform in just 5 weeks, using TypeScript, AWS,
                    Liquid, Gadget, and JavaScript. Our efforts were recognized with funding from Stanford Startup
                    Society and a 2nd place finish in the Stanford internal hackathon. The platform quickly gained
                    traction, achieving over 100 installs and maintaining a perfect 5.0/5.0 rating on the Shopify
                    app store.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Challenges</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>
                        Creating a natural language interface that accurately understands customer intent and shopping
                        preferences
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>
                        Developing a recommendation engine that works across diverse product catalogs with varying
                        levels of detail and organization
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>
                        Ensuring seamless integration with Shopify's ecosystem without requiring extensive technical
                        knowledge from store owners
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>Optimizing performance to handle high traffic volumes during peak shopping periods</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>
                        Building a solution that requires minimal configuration from store owners while delivering
                        personalized experiences
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Solutions</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>
                        Implemented OpenAI's GPT models with custom fine-tuning for e-commerce contexts, enabling the AI
                        to understand product attributes and customer preferences
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>
                        Developed a hybrid recommendation system combining collaborative filtering and content-based
                        approaches to provide relevant product suggestions
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>
                        Created a lightweight Shopify app that integrates via API without affecting store performance,
                        with a one-click installation process
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>
                        Utilized AWS infrastructure for scalability and reliability, with auto-scaling capabilities to
                        handle traffic spikes
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>
                        Designed an intuitive dashboard for merchants to monitor AI performance, customize responses,
                        and gain insights into customer behavior
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Results</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>
                        Achieved funding from Stanford Startup Society, validating the business model and technology
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>
                        Won 2nd place in Stanford internal hackathon, competing against numerous innovative projects
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>
                        Acquired over 100 business users within the first month of launch, demonstrating strong
                        product-market fit
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>
                        Maintained a perfect 5.0/5.0 app rating on the Shopify app store, reflecting high customer
                        satisfaction
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>
                        Increased conversion rates by an average of 23% for client stores, directly impacting their
                        bottom line
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>
                        Reduced customer support inquiries by 15% as the AI effectively answered product-related
                        questions
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Gallery</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                      <Image
                        src="/askshopblog1.png"
                        alt="AskShop.ai Dashboard"
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                      <Image
                        src={projectImage}
                        alt="AskShop.ai Chat Interface"
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Sidebar */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="bg-card rounded-xl border border-border p-6 space-y-6 sticky top-24">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {["TypeScript", "AWS", "Liquid", "Gadget", "JavaScript", "OpenAI", "Shopify API", "Node.js", "React"].map(
                        (tech) => (
                          <span
                            key={tech}
                            className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-medium"
                          >
                            {tech}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold">Links</h3>
                    <div className="space-y-2">
                      <Button asChild variant="outline" className="w-full justify-start">
                        <Link href="https://apps.shopify.com/askshop-ai" target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Shopify App Store
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full justify-start">
                        <Link href="https://github.com/JamesLiuZX" target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          View Code
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <h3 className="text-xl font-semibold">Key Features</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-primary">✓</span>
                        <span>Natural language product search</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-primary">✓</span>
                        <span>Personalized recommendations</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-primary">✓</span>
                        <span>One-click Shopify integration</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-primary">✓</span>
                        <span>Merchant analytics dashboard</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-primary">✓</span>
                        <span>Customizable AI personality</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-primary">✓</span>
                        <span>Multi-language support</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="text-xl font-semibold mb-3">Recognition</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5">🏆</span>
                        <span>Stanford Startup Society Funding</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5">🥈</span>
                        <span>2nd Place, Stanford Hackathon</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5">⭐</span>
                        <span>5.0/5.0 App Store Rating</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t">
                    <Button asChild className="w-full">
                      <Link href="/#contact">Get in Touch</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}