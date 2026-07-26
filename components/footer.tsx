import Link from "next/link"
import { ArrowUpRight, Github, Instagram, Linkedin, Mail } from "lucide-react"

const sitemap = [
  { name: "Work", href: "/#experience" },
  { name: "Projects", href: "/projects" },
  { name: "Academic", href: "/academic" },
  { name: "Feedback", href: "/employer-feedback" },
  { name: "Contact", href: "/#contact" },
]

const socials = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/james-liu-zx/", icon: Linkedin },
  { name: "GitHub", href: "https://github.com/JamesLiuZX", icon: Github },
  { name: "Instagram", href: "https://www.instagram.com/jamesyliu/", icon: Instagram },
  { name: "Email", href: "mailto:jamesliu@u.nus.edu", icon: Mail },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-border/70 bg-surface-muted/40">
      {/* Oversized wordmark bleeding off the bottom edge. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-6 select-none whitespace-nowrap text-center text-[14vw] font-semibold leading-none tracking-tighter text-foreground/[0.035] md:-bottom-10"
      >
        JAMES LIU
      </div>

      <div className="shell relative z-10 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-foreground text-[13px] font-semibold text-background">
                JL
              </span>
              <span className="text-base font-medium tracking-tight">James Liu</span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Product Manager in Singapore building AI-powered, product-led experiences.
              Currently at Crypto.com.
            </p>
            <a
              href="mailto:jamesliu@u.nus.edu"
              className="link-underline text-sm font-medium text-foreground"
            >
              jamesliu@u.nus.edu
            </a>
          </div>

          <div className="space-y-4">
            <h3 className="eyebrow">Sitemap</h3>
            <ul className="space-y-2.5">
              {sitemap.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="eyebrow">Elsewhere</h3>
            <ul className="space-y-2.5">
              {socials.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <social.icon className="h-3.5 w-3.5" />
                    {social.name}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-60" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-border/70 pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-subtle md:flex-row md:items-center">
          <span>© {currentYear} James Liu</span>
          <span>Next.js · Tailwind · Framer Motion</span>
        </div>
      </div>
    </footer>
  )
}
