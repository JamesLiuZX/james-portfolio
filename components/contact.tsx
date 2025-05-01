"use client"

import type React from "react"

import { useState } from "react"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log(formData)
    // Reset form
    setFormData({ name: "", email: "", message: "" })
    // Show success message
    alert("Message sent! I'll get back to you soon.")
  }

  return (
    <section id="contact" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div ref={ref} className="space-y-12">
          <motion.h2
            className="text-2xl md:text-3xl font-semibold text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block whitespace-nowrap">GET IN TOUCH</span>{" "}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-lg font-medium">SOCIALS</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://linkedin.com/in/james-liu-zx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/JamesLiuZX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/jamesyliu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Instagram
                  </a>
                </li>
              </ul>

              <h3 className="text-lg font-medium pt-4">CONTACT</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:jamesliu@u.nus.edu"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    jamesliu@u.nus.edu
                  </a>
                </li>
                <li>
                  <a href="tel:+6584261225" className="text-muted-foreground hover:text-primary transition-colors">
                    +65 84261225
                  </a>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-secondary/50 border-none"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-secondary/50 border-none"
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="bg-secondary/50 border-none min-h-[150px]"
                  />
                </div>
                <Button type="submit" className="w-full group">
                  Send Message
                  <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

