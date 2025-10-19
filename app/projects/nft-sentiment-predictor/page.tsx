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
import ParallaxSection from "@/components/parallax-section"

export default function NFTSentimentProject() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <main className="min-h-screen">
      <CursorFollower />
      <ScrollProgress />
      <Navbar />

      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4 md:px-6">
          <div ref={ref} className="space-y-12">
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
                NFT Sentiment Price Predictor
              </motion.h1>

              <motion.div
                className="flex flex-wrap gap-4 items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span>March 2023 - August 2023</span>
                </div>

                <div className="inline-flex items-center rounded-full bg-secondary/50 px-3 py-1 text-xs">
                  <Tag className="mr-1 h-3 w-3" />
                  Web3
                </div>

                <div className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs">
                  Featured Project
                </div>
              </motion.div>
            </div>

            <ParallaxSection offset={30}>
              <motion.div
                className="rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Image
                  src="/placeholder.svg?height=675&width=1200"
                  alt="NFT Sentiment Price Predictor Dashboard"
                  width={1200}
                  height={675}
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            </ParallaxSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <motion.div
                className="md:col-span-2 space-y-8"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Overview</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    The NFT Sentiment Price Predictor is an innovative platform that combines real-time market data with
                    social media sentiment analysis to predict NFT price movements. We implemented and optimized over 20
                    functional components for NFT price charts overlay with predicted prices and sentiment over
                    customizable time series parameters.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    This project leverages advanced natural language processing techniques to analyze social media
                    discussions, news articles, and community forums to gauge market sentiment around specific NFT
                    collections. By combining this sentiment data with historical price information and market trends,
                    the platform provides users with predictive insights to make more informed investment decisions in
                    the volatile NFT market.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Challenges</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>Processing and analyzing large volumes of unstructured social media data in real-time</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>
                        Developing accurate sentiment analysis models for the specialized language used in NFT and
                        crypto communities
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>
                        Creating intuitive visualizations for complex data relationships between sentiment and price
                        movements
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>Building a responsive and performant frontend that can handle real-time data updates</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>Integrating with multiple blockchain APIs to gather comprehensive NFT market data</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Solutions</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>
                        Implemented a distributed data processing pipeline using PySpark to handle large volumes of
                        social media data
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>
                        Developed custom NLP models using SparkNLP specifically trained on NFT and crypto terminology
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>
                        Created interactive chart components with customizable parameters using TypeScript and Next.js
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>
                        Built a responsive frontend with Tailwind CSS that adapts to different screen sizes and devices
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 text-primary">•</span>
                      <span>
                        Developed a unified API layer using tRPC to integrate data from multiple blockchain sources
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
                        Successfully completed NUS Orbital Apollo requirements.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Gallery</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=400&width=600"
                        alt="NFT Price Charts"
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=400&width=600"
                        alt="Sentiment Analysis Dashboard"
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=400&width=600"
                        alt="NFT Collection Comparison"
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=400&width=600"
                        alt="Predictive Analytics View"
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="bg-card rounded-lg border border-border p-6 space-y-6 bg-gradient-to-br from-white to-indigo-50 dark:from-gray-900 dark:to-indigo-950/30">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 px-3 py-1 rounded-full text-xs">
                        TypeScript
                      </span>
                      <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 px-3 py-1 rounded-full text-xs">
                        Next.js
                      </span>
                      <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 px-3 py-1 rounded-full text-xs">
                        Tailwind CSS
                      </span>
                      <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 px-3 py-1 rounded-full text-xs">
                        PostgreSQL
                      </span>
                      <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 px-3 py-1 rounded-full text-xs">
                        tRPC
                      </span>
                      <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 px-3 py-1 rounded-full text-xs">
                        Python
                      </span>
                      <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 px-3 py-1 rounded-full text-xs">
                        PySpark
                      </span>
                      <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 px-3 py-1 rounded-full text-xs">
                        SparkNLP
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Links</h3>
                    <div className="space-y-2">
                      <Button asChild variant="outline" className="w-full justify-start bg-white dark:bg-gray-800">
                        <Link href="https://nfinsight.vercel.app/" target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live Demo
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full justify-start bg-white dark:bg-gray-800">
                        <Link href="https://github.com/JamesLiuZX" target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          View Code
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-lg border border-border p-6 space-y-4 bg-gradient-to-br from-white to-cyan-50 dark:from-gray-900 dark:to-cyan-950/30">
                  <h3 className="text-xl font-semibold">Key Features</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-cyan-500">•</span>
                      <span>Real-time sentiment analysis</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-cyan-500">•</span>
                      <span>Price prediction algorithms</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-cyan-500">•</span>
                      <span>Interactive data visualizations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-cyan-500">•</span>
                      <span>Customizable time series parameters</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-cyan-500">•</span>
                      <span>Collection comparison tools</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-cyan-500">•</span>
                      <span>Market trend alerts</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-card rounded-lg border border-border p-6 space-y-4 bg-gradient-to-br from-white to-violet-50 dark:from-gray-900 dark:to-violet-950/30">
                  <h3 className="text-xl font-semibold">Data Sources</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-violet-500">•</span>
                      <span>Twitter/X API</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-violet-500">•</span>
                      <span>Discord channels</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-violet-500">•</span>
                      <span>Reddit communities</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-violet-500">•</span>
                      <span>OpenSea API</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-violet-500">•</span>
                      <span>Ethereum blockchain data</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-card rounded-lg border border-border p-6 space-y-4">
                  <h3 className="text-xl font-semibold">Need Something Similar?</h3>
                  <p className="text-muted-foreground">
                    Interested in working together on a project like this? Let's discuss how I can help bring your ideas
                    to life.
                  </p>
                  <Button asChild className="w-full">
                    <Link href="/#contact">Get in Touch</Link>
                  </Button>
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

