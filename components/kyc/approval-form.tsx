"use client"

import { useState, type FormEvent } from "react"
import { Check, CircleCheck, Copy, Loader2, Send } from "lucide-react"
import { contact } from "@/lib/kyc"

/*
 * Fetched on first use: a toast only happens after someone uses the form.
 */
const notify = () => import("sonner").then((mod) => mod.toast)

/*
 * The site is a static export, so messages go through FormSubmit, which
 * emails them to the address below (same endpoint as before the redesign).
 */
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${contact.email}`

type Status = "idle" | "sending" | "sent" | "error"

export default function ApprovalForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<Status>("idle")
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      ;(await notify()).success("Email copied")
    } catch {
      ;(await notify()).error("Couldn't copy. Select the address instead")
    }
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === "sending") return
    // Bots fill every field, including this one, which people never see.
    if (new FormData(event.currentTarget).get("_honey")) return
    setStatus("sending")
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, _subject: `Portfolio message from ${form.name}`, _template: "table" }),
      })
      const result = await response.json().catch(() => null)
      // FormSubmit reports success as the string "true".
      if (!response.ok || String(result?.success) !== "true") throw new Error(result?.message)
      setStatus("sent")
      ;(await notify()).success("Message sent", { description: "Thanks for reaching out. I'll reply by email." })
    } catch {
      setStatus("error")
      ;(await notify()).error("Your message didn't go through", { description: `Please try again, or email ${contact.email}.` })
    }
  }

  const input =
    "w-full rounded-lg border border-ink/15 bg-paper px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-ink-faint/70 focus:border-violet/60"

  if (status === "sent") {
    return (
      <div role="status" className="flex h-full flex-col items-start justify-center gap-4 rounded-2xl border border-signal/35 bg-signal/[0.06] p-8">
        <CircleCheck className="h-8 w-8 text-signal" />
        <p className="stretch-wide text-2xl font-semibold text-ink">Message received.</p>
        <p className="text-[15px] leading-relaxed text-ink-soft">
          Thanks, {form.name.split(" ")[0] || "there"}. It&apos;s in my inbox, and I&apos;ll reply to {form.email}.
        </p>
        <button type="button" onClick={() => { setForm({ name: "", email: "", message: "" }); setStatus("idle") }} className="mt-2 rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium text-ink">
          Send another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} aria-busy={status === "sending"} className="space-y-5">
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className="field text-ink-faint">Your name</span>
          <input name="name" required autoComplete="name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Ada Lovelace" className={input} />
        </label>
        <label className="block space-y-2">
          <span className="field text-ink-faint">Email</span>
          <input name="email" type="email" required autoComplete="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="ada@example.com" className={input} />
        </label>
      </div>
      <label className="block space-y-2">
        <span className="field text-ink-faint">Message</span>
        <textarea name="message" required rows={5} value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} placeholder="The role, the product, the idea you can't stop thinking about…" className={`${input} resize-none`} />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status === "sending"} className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-violet-deep disabled:cursor-wait disabled:opacity-70">
          {status === "sending" ? (
            <>
              Sending
              <Loader2 className="h-4 w-4 animate-spin" />
            </>
          ) : (
            <>
              Open the conversation
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
        <button type="button" onClick={copy} className="inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink">
          {copied ? <Check className="h-4 w-4 text-signal" /> : <Copy className="h-4 w-4" />}
          {contact.email}
        </button>
      </div>
      <p aria-live="polite" className="text-xs text-ink-faint">
        {status === "error" ? <span className="text-risk">That didn&apos;t send. Try again, or email {contact.email}.</span> : "Goes straight to his inbox. He replies to everything."}
      </p>
    </form>
  )
}
