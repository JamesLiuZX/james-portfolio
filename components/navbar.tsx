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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const navLinks = [
    { name: "ABOUT", href: "/#about" },
    { name: "PROJECTS", href: "/#projects" },
    { name: "BLOG", href: "/blog" },
    { name: "CONTACT", href: "/#contact" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 py-4",
        scrolled ? "bg-background/80 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="text-xl font-bold">
          JAMES
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm hover:text-primary transition-colors",
                pathname === link.href ? "text-primary font-medium" : "text-muted-foreground",
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="bg-secondary/50 px-3 py-1 rounded-full text-xs text-muted-foreground">
            Open To Work / Web Development Services
          </div>
        </div>

        {/* Mobile Navigation Toggle */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </nav>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-background z-40 animate-in slide-down">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-2xl font-medium hover:text-primary transition-colors",
                  pathname === link.href ? "text-primary" : "text-muted-foreground",
                )}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="bg-secondary/50 px-4 py-2 rounded-full text-sm text-muted-foreground mt-4">
              Open To Work / Web Development Services
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

