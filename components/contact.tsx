"use client"

import type React from "react"

import { useState } from "react"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, Mail, Phone, Linkedin, Github, Instagram } from "lucide-react"

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields")
      return
    }
    
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    console.log(formData)
    setFormData({ name: "", email: "", message: "" })
    setIsSubmitting(false)
    alert("Message sent! I'll get back to you soon.")
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
    <section id="contact" className="relative py-32 overflow-hidden bg-white dark:bg-black">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div ref={ref} className="space-y-16">
          {/* Header */}
          <div className="text-center space-y-6 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white" />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400 tracking-wide">
                LET'S TALK
              </span>
            </motion.div>

            <motion.h2
              className="text-5xl md:text-6xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-black dark:text-white">
                GET IN TOUCH
              </span>
            </motion.h2>

            <motion.p
              className="text-lg text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Have a project in mind or just want to chat? I'd love to hear from you.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Left side - Contact info */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Contact cards */}
              <div className="space-y-4">
                <a
                  href="mailto:jamesliu@u.nus.edu"
                  className="group block"
                >
                  <div className="bg-gray-50 dark:bg-gray-950 rounded-xl p-6 border border-gray-100 dark:border-gray-900 hover:border-gray-200 dark:hover:border-gray-800 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-black dark:bg-white flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Mail className="w-5 h-5 text-white dark:text-black" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 dark:text-gray-500 mb-1 uppercase tracking-wide">Email</p>
                        <p className="text-base font-medium text-black dark:text-white">
                          jamesliu@u.nus.edu
                        </p>
                      </div>
                    </div>
                  </div>
                </a>

                <a
                  href="tel:+6584261225"
                  className="group block"
                >
                  <div className="bg-gray-50 dark:bg-gray-950 rounded-xl p-6 border border-gray-100 dark:border-gray-900 hover:border-gray-200 dark:hover:border-gray-800 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-black dark:bg-white flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Phone className="w-5 h-5 text-white dark:text-black" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 dark:text-gray-500 mb-1 uppercase tracking-wide">Phone</p>
                        <p className="text-base font-medium text-black dark:text-white">
                          +65 84261225
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </div>

              {/* Social links */}
              <div>
                <h3 className="text-sm font-medium text-black dark:text-white mb-4 uppercase tracking-wide">
                  Connect on Social
                </h3>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-900 hover:border-gray-200 dark:hover:border-gray-800 flex items-center justify-center transition-all">
                        <social.icon className="w-5 h-5 text-black dark:text-white" />
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right side - Contact form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 border border-gray-100 dark:border-gray-900">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="h-12 bg-white dark:bg-black border-gray-200 dark:border-gray-800 focus:border-black dark:focus:border-white rounded-xl"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="h-12 bg-white dark:bg-black border-gray-200 dark:border-gray-800 focus:border-black dark:focus:border-white rounded-xl"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">
                      Your Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project or just say hi..."
                      value={formData.message}
                      onChange={handleChange}
                      className="min-h-[150px] bg-white dark:bg-black border-gray-200 dark:border-gray-800 focus:border-black dark:focus:border-white rounded-xl resize-none"
                    />
                  </div>
                  
                  <Button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full h-12 bg-black text-white hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-100 border-0 rounded-xl text-sm font-medium transition-all group"
                  >
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}