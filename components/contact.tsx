"use client"

import type React from "react"
import { useState } from "react"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, Mail, Linkedin, Github, Instagram, CheckCircle2 } from "lucide-react"

export default function Contact() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all fields.")
      return
    }

    // Open native mail client with prefilled content — no fake "sent" state
    const subject = encodeURIComponent(`Portfolio inquiry from ${formData.name}`)
    const body = encodeURIComponent(
      `${formData.message}\n\n—\n${formData.name}\n${formData.email}`,
    )
    window.location.href = `mailto:jamesliu@u.nus.edu?subject=${subject}&body=${body}`

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setFormData({ name: "", email: "", message: "" })
    }, 400)
  }

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com/in/james-liu-zx",
    },
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/JamesLiuZX",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/jamesyliu/",
    },
  ]

  return (
    <section id="contact" className="relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 relative z-10">
        <div ref={ref} className="space-y-10 sm:space-y-14">
          <div className="max-w-2xl space-y-3 sm:space-y-4">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground"
            >
              Let&apos;s talk
            </motion.p>

            <motion.h2
              className="font-display text-[clamp(1.75rem,4.5vw,3.75rem)] font-bold tracking-tight"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.55, delay: 0.05 }}
            >
              Get in touch
            </motion.h2>

            <motion.p
              className="text-lg text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              Open to product roles, collaborations, and interesting problems. Prefer email for anything substantive.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
              transition={{ duration: 0.55, delay: 0.15 }}
            >
              <a href="mailto:jamesliu@u.nus.edu" className="group block">
                <div className="border border-border hover:border-foreground/25 p-6 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-foreground text-background flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1 uppercase tracking-[0.16em]">
                        Email
                      </p>
                      <p className="text-base font-medium">jamesliu@u.nus.edu</p>
                    </div>
                  </div>
                </div>
              </a>

              <div>
                <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground mb-3">
                  Social
                </h3>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="w-11 h-11 border border-border hover:border-foreground/30 flex items-center justify-center transition-colors"
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
              transition={{ duration: 0.55, delay: 0.2 }}
            >
              <form
                onSubmit={handleSubmit}
                className="border border-border bg-secondary/30 p-6 md:p-8 space-y-5"
              >
                {submitted ? (
                  <div className="flex flex-col items-start gap-3 py-8">
                    <CheckCircle2 className="h-8 w-8 text-teal" />
                    <p className="font-display text-xl font-semibold tracking-tight">
                      Mail client opened
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Send the draft when you&apos;re ready — or email me directly anytime.
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-2"
                      onClick={() => setSubmitted(false)}
                    >
                      Write another
                    </Button>
                  </div>
                ) : (
                  <>
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-[0.16em]"
                      >
                        Your name
                      </label>
                      <Input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Alex Chen"
                        value={formData.name}
                        onChange={handleChange}
                        className="h-12 bg-background border-border rounded-md"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-[0.16em]"
                      >
                        Email address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="h-12 bg-background border-border rounded-md"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-[0.16em]"
                      >
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="What are you working on?"
                        value={formData.message}
                        onChange={handleChange}
                        className="min-h-[140px] bg-background border-border rounded-md resize-none"
                      />
                    </div>

                    {error && <p className="text-sm text-destructive">{error}</p>}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 border-0 text-sm font-medium group"
                    >
                      {isSubmitting ? (
                        <span>Opening mail…</span>
                      ) : (
                        <>
                          <span>Compose email</span>
                          <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </>
                      )}
                    </Button>
                  </>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
