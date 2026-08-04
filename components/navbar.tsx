"use client"

import { useCallback, useEffect, useState, type CSSProperties } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUpRight, Menu, X } from "lucide-react"
import ThemeToggle from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

type NavLink = {
  name: string
  href: string
  /** Present when the link targets a section on the home page. */
  sectionId?: string
}

const navLinks: NavLink[] = [
  { name: "Work", href: "/#experience", sectionId: "experience" },
  { name: "Projects", href: "/#projects", sectionId: "projects" },
  { name: "Toolkit", href: "/#toolkit", sectionId: "toolkit" },
  { name: "Academic", href: "/#academic", sectionId: "academic" },
  { name: "Contact", href: "/#contact", sectionId: "contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const pathname = usePathname()
  const isHome = pathname === "/"

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll spy — highlights whichever section currently owns the upper viewport.
  useEffect(() => {
    if (!isHome) {
      setActiveSection(null)
      return
    }

    const ids = navLinks.map((link) => link.sectionId).filter(Boolean) as string[]
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))

    // While the hero fills the viewport no nav item should read as active.
    const clearOverHero = () => {
      if (window.scrollY < window.innerHeight * 0.6) setActiveSection(null)
    }
    clearOverHero()
    window.addEventListener("scroll", clearOverHero, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", clearOverHero)
    }
  }, [isHome])

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const isActive = useCallback(
    (link: NavLink) => {
      if (link.sectionId) return isHome && activeSection === link.sectionId
      return pathname === link.href
    },
    [activeSection, isHome, pathname],
  )

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-5">
        <nav
          style={{ "--enter-y": "-24px", "--enter-duration": "0.6s" } as CSSProperties}
          className={cn(
            "enter flex w-full max-w-5xl items-center justify-between gap-4 rounded-full px-3 py-2 transition-[background-color,border-color,box-shadow] duration-500 md:px-4",
            scrolled
              ? "nav-scrolled border border-border/70 shadow-soft"
              : "border border-transparent bg-transparent",
          )}
        >
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2.5 rounded-full px-2 py-1"
            aria-label="James Liu — home"
          >
            <span className="relative grid h-8 w-8 place-items-center overflow-hidden rounded-full bg-foreground text-[13px] font-semibold text-background transition-transform duration-500 ease-out-expo group-hover:scale-105">
              JL
            </span>
            <span className="hidden text-sm font-medium tracking-tight sm:block">James Liu</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const active = isActive(link)
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-3.5 py-1.5 text-sm transition-colors duration-300",
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {active && (
                    <span
                      aria-hidden="true"
                      className="enter-fade absolute inset-0 rounded-full bg-foreground/[0.06] dark:bg-foreground/[0.09]"
                      style={{ "--enter-duration": "0.25s" } as CSSProperties}
                    />
                  )}
                  <span className="relative">{link.name}</span>
                </Link>
              )
            })}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <a
              href="https://www.linkedin.com/in/james-liu-zx/"
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-all duration-300 hover:opacity-90 sm:inline-flex"
            >
              Connect
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="grid h-9 w-9 place-items-center rounded-full border border-border/70 bg-surface/60 md:hidden"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile sheet */}
      {isOpen && (
        <div
          className="enter-fade fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden"
          style={{ "--enter-duration": "0.25s" } as CSSProperties}
        >
          <div className="flex h-full flex-col justify-center px-8">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <div
                  key={link.name}
                  className="enter"
                  style={
                    {
                      "--enter-delay": `${0.06 * index + 0.08}s`,
                      "--enter-y": "16px",
                      "--enter-duration": "0.5s",
                    } as CSSProperties
                  }
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-baseline gap-4 border-b border-border/60 py-4 text-3xl font-medium tracking-tight"
                  >
                    <span className="font-mono text-xs text-subtle">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {link.name}
                  </Link>
                </div>
              ))}
            </nav>

            <a
              href="https://www.linkedin.com/in/james-liu-zx/"
              target="_blank"
              rel="noopener noreferrer"
              className="enter mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background"
              style={
                {
                  "--enter-delay": "0.42s",
                  "--enter-y": "16px",
                  "--enter-duration": "0.5s",
                } as CSSProperties
              }
            >
              Let&apos;s connect
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </>
  )
}
