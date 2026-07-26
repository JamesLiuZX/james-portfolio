"use client"

import { useState, type FormEvent } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { Check, Copy, Github, Instagram, Linkedin, Mail, Phone, Send } from "lucide-react"
import { EASE, SectionHeading } from "@/components/ui/section"

const EMAIL = "jamesliu@u.nus.edu"
const PHONE = "+65 8426 1225"

const socials = [
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/james-liu-zx/" },
  { name: "GitHub", icon: Github, href: "https://github.com/JamesLiuZX" },
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/jamesyliu/" },
]

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      toast.success("Email copied to clipboard")
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error("Couldn't copy — you can select the address manually")
    }
  }

  /**
   * The site is a static export with no backend, so the form composes a
   * pre-filled email and hands off to the visitor's mail client.
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const subject = `Portfolio enquiry from ${form.name}`
    const body = `${form.message}\n\n—\n${form.name}\n${form.email}`
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    toast.success("Opening your email client", {
      description: "Your message is pre-filled and ready to send.",
    })
  }

  const inputClass =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors duration-200 placeholder:text-subtle focus:border-brand/60"

  return (
    <section id="contact" className="section-y relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 h-[26rem] w-[52rem] -translate-x-1/2 rounded-full bg-brand/[0.07] blur-[140px]" />
      </div>

      <div className="shell">
        <SectionHeading
          align="center"
          eyebrow="Get in touch"
          title={
            <>
              Building something{" "}
              <span className="serif-accent text-brand">interesting</span>? Let&apos;s talk.
            </>
          }
          lede="I'm always up for a conversation about product, applied AI, or an idea you can't stop thinking about. I reply to everything."
        />

        <div className="mx-auto mt-16 grid max-w-5xl gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-8">
          {/* Direct channels */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="space-y-4"
          >
            <div className="card-surface p-6">
              <div className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-foreground text-background">
                  <Mail className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">
                    Email
                  </p>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="link-underline mt-1 block truncate text-sm font-medium"
                  >
                    {EMAIL}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  aria-label="Copy email address"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-border/70 text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-brand" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            <a href="tel:+6584261225" className="card-surface card-surface-hover block p-6">
              <div className="flex items-center gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-foreground text-background">
                  <Phone className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">
                    Phone
                  </p>
                  <p className="mt-1 text-sm font-medium">{PHONE}</p>
                </div>
              </div>
            </a>

            <div className="card-surface p-6">
              <p className="eyebrow">Elsewhere</p>
              <div className="mt-4 flex gap-2.5">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="grid h-11 w-11 place-items-center rounded-xl border border-border/70 bg-surface-muted text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:text-foreground"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
            className="card-surface space-y-5 p-6 md:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle"
                >
                  Your name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  placeholder="Ada Lovelace"
                  className={inputClass}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                  placeholder="ada@example.com"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="message"
                className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={form.message}
                onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
                placeholder="Tell me what you're working on..."
                className={`${inputClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-all duration-300 hover:shadow-lifted"
            >
              Compose message
              <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>

            <p className="text-center text-xs text-subtle">
              Opens in your email client, pre-filled — nothing is sent from this page.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
