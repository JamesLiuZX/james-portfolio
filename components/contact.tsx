"use client"

import { useState, type CSSProperties, type FormEvent } from "react"
import { Check, CircleCheck, Copy, FileDown, Github, Instagram, Linkedin, Loader2, Mail, Send } from "lucide-react"
import { SectionHeading } from "@/components/ui/section"
import { RESUME_PATH } from "@/lib/site"

/*
 * Fetched on first use rather than imported at module scope: a toast can only
 * happen after someone interacts with this form, so the toast library has no
 * business being in the bundle that renders the page.
 */
const notify = () => import("sonner").then((mod) => mod.toast)

const EMAIL = "jamesliuzx@outlook.com"

/*
 * The site is a static export with no server of its own, so messages go
 * through FormSubmit, which emails them to EMAIL. The first message sent
 * after a change of address triggers an activation email that has to be
 * confirmed once before deliveries start.
 */
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${EMAIL}`

type Status = "idle" | "sending" | "sent" | "error"

const socials = [
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/james-liu-zx/" },
  { name: "GitHub", icon: Github, href: "https://github.com/JamesLiuZX" },
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/jamesyliu/" },
]

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<Status>("idle")
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      ;(await notify()).success("Email copied to clipboard")
    } catch {
      ;(await notify()).error("Couldn't copy. Select the address manually instead")
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === "sending") return

    // Bots fill every field, including this one, which people never see.
    const honeypot = new FormData(event.currentTarget).get("_honey")
    if (honeypot) return

    setStatus("sending")
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Portfolio message from ${form.name}`,
          _template: "table",
        }),
      })
      const result = await response.json().catch(() => null)
      // FormSubmit reports success as the string "true".
      if (!response.ok || String(result?.success) !== "true") throw new Error(result?.message)

      setStatus("sent")
      ;(await notify()).success("Message sent", {
        description: "Thanks for reaching out. I'll reply by email.",
      })
    } catch {
      setStatus("error")
      ;(await notify()).error("Your message didn't go through", {
        description: `Please try again, or email ${EMAIL}.`,
      })
    }
  }

  const resetForm = () => {
    setForm({ name: "", email: "", message: "" })
    setStatus("idle")
  }

  const inputClass =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors duration-200 placeholder:text-subtle focus:border-brand/60"

  return (
    <section id="contact" className="section-y relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="orb bottom-0 left-1/2 h-[26rem] w-[52rem] -translate-x-1/2 bg-brand/[0.07]" />
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
          <div className="reveal space-y-4">
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

            <a
              href={RESUME_PATH}
              download
              className="card-surface group flex items-center gap-4 p-6 transition-colors duration-300 hover:border-brand/30"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border/70 bg-surface-muted text-muted-foreground transition-colors group-hover:text-foreground">
                <FileDown className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">
                  Resume
                </span>
                <span className="mt-1 block text-sm font-medium">Download the PDF</span>
              </span>
            </a>
          </div>

          {/* Form */}
          {status === "sent" ? (
            <div
              role="status"
              className="card-surface flex flex-col items-center justify-center gap-4 p-8 text-center md:p-10"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full bg-brand/10 text-brand">
                <CircleCheck className="h-6 w-6" />
              </span>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold tracking-tight">Message sent</h3>
                <p className="mx-auto max-w-sm text-sm leading-relaxed text-muted-foreground">
                  Thanks, {form.name.split(" ")[0] || "there"}. It&apos;s in my inbox, and I&apos;ll
                  reply to {form.email}.
                </p>
              </div>
              <button
                type="button"
                onClick={resetForm}
                className="mt-2 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors duration-300 hover:border-brand/40"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              aria-busy={status === "sending"}
              style={{ "--reveal-delay": "0.08s" } as CSSProperties}
              className="reveal card-surface space-y-5 p-6 md:p-8"
            >
              {/* Honeypot: off-screen and skipped by keyboard and screen readers. */}
              <input
                type="text"
                name="_honey"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-px w-px opacity-0"
              />

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
                    autoComplete="name"
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
                    autoComplete="email"
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
                disabled={status === "sending"}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-all duration-300 hover:shadow-lifted disabled:cursor-wait disabled:opacity-70"
              >
                {status === "sending" ? (
                  <>
                    Sending
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Send message
                    <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </>
                )}
              </button>

              <p aria-live="polite" className="text-center text-xs text-subtle">
                {status === "error" ? (
                  <span className="text-destructive">
                    That didn&apos;t send. Try again, or email{" "}
                    <a href={`mailto:${EMAIL}`} className="underline underline-offset-2">
                      {EMAIL}
                    </a>
                    .
                  </span>
                ) : (
                  "Goes straight to my inbox."
                )}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
