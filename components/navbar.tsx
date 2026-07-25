"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === "/"

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const navLinks = [
    { name: "Experience", href: "/#experience" },
    { name: "Projects", href: "/#projects" },
    { name: "Academic", href: "/#academic" },
    { name: "Contact", href: "/#contact" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 py-4",
        scrolled || !isHome || isOpen
          ? "bg-background/85 backdrop-blur-md border-b border-border/60 text-foreground"
          : "bg-transparent text-white",
      )}
    >
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <Link
          href="/"
          className="font-display text-xl font-bold tracking-tight"
          onClick={() => setIsOpen(false)}
        >
          JAMES LIU
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm tracking-wide transition-opacity hover:opacity-100",
                scrolled || !isHome ? "text-muted-foreground hover:text-foreground" : "text-white/75 hover:text-white",
              )}
            >
              {link.name}
            </Link>
          ))}
          <Button
            asChild
            size="sm"
            className={cn(
              "h-9 px-4 text-sm font-medium",
              scrolled || !isHome
                ? "bg-foreground text-background hover:bg-foreground/90"
                : "bg-white text-black hover:bg-white/90",
            )}
          >
            <a href="mailto:jamesliu@u.nus.edu">Email me</a>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "md:hidden",
            scrolled || !isHome || isOpen ? "text-foreground" : "text-white hover:text-white hover:bg-white/10",
          )}
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </Button>
      </nav>

      {isOpen && (
        <div className="md:hidden fixed inset-0 top-[65px] bg-background text-foreground z-40">
          <div className="flex flex-col items-start px-6 pt-10 gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-display text-3xl font-semibold tracking-tight"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Button asChild className="mt-4 bg-foreground text-background">
              <a href="mailto:jamesliu@u.nus.edu" onClick={() => setIsOpen(false)}>
                Email me
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
