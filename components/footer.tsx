import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Microtext, Rosette } from "@/components/kyc/guilloche"
import { contact, identity, steps } from "@/lib/kyc"
import { RESUME_PATH } from "@/lib/site"

const documents = [
  { name: "Projects", href: "/projects" },
  { name: "Writing", href: "/blog" },
  { name: "Academic", href: "/academic" },
]

const elsewhere = [
  { name: "LinkedIn", href: contact.linkedin },
  { name: "GitHub", href: contact.github },
  { name: "Instagram", href: contact.instagram },
  { name: "Email", href: `mailto:${contact.email}` },
]

/** The back cover: his name as a document holder's, and the file's last line. */
export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-night text-white">
      <Microtext className="py-2 text-white/20" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-64 -right-40 w-[40rem] opacity-80">
        <Rosette strokeWidth={1} layers={[{ color: "#8f86ff", opacity: 0.12, options: { curves: 12, base: 320, a: 70, n: 9, b: 24, m: 29 } }]} />
      </div>

      <div className="shell relative pb-10 pt-16 md:pt-24">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-6">
            <p className="stretch-wide text-[clamp(2.4rem,6vw,4.6rem)] font-semibold uppercase leading-[0.9] tracking-[-0.03em]">{identity.displayName}</p>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/60">
              Product manager for trading and AI, based in Singapore. Wealth and trading at Revolut; AI agents and tools on the side.
            </p>
            <a href={`mailto:${contact.email}`} className="link-underline mt-5 text-[15px] text-violet-bright">
              {contact.email}
            </a>
          </div>

          <nav aria-label="The file" className="md:col-span-3">
            <p className="field text-white/40">The file</p>
            <ol className="mt-4 space-y-2.5 text-[15px]">
              {steps.map((step, index) => (
                <li key={step.id}>
                  <Link href={`/#${step.id}`} className="inline-flex items-baseline gap-3 text-white/70 transition-colors hover:text-white">
                    <span className="font-mono text-[10.5px] text-violet-bright">{String(index + 1).padStart(2, "0")}</span>
                    {step.name}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>

          <div className="space-y-8 md:col-span-3">
            <div>
              <p className="field text-white/40">Documents</p>
              <ul className="mt-4 space-y-2.5 text-[15px]">
                {documents.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-white/70 transition-colors hover:text-white">
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <a href={RESUME_PATH} download className="text-white/70 transition-colors hover:text-white">
                    Résumé (PDF)
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="field text-white/40">Elsewhere</p>
              <ul className="mt-4 space-y-2.5 text-[15px]">
                {elsewhere.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-white/70 transition-colors hover:text-white">
                      {item.name}
                      <ArrowUpRight className="h-3 w-3 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* The machine-readable zone, as the last line of the document. */}
        <div aria-hidden="true" className="mt-16 overflow-hidden border-t border-white/10 pt-6 font-mono text-[clamp(0.62rem,1.55vw,1.05rem)] leading-relaxed tracking-[0.08em] text-white/35">
          {identity.mrz.map((line) => (
            <p key={line} className="whitespace-nowrap">
              {line}
            </p>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} James Liu · Singapore
          </p>
          <Link href="/#identity" className="transition-colors hover:text-white">
            Back to the first check ↑
          </Link>
        </div>
      </div>
    </footer>
  )
}
