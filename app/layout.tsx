import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono, Instrument_Serif } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import SmoothScroll from "@/components/smooth-scroll"
import { Toaster } from "@/components/ui/sonner"
import RevealRescan from "@/components/reveal-rescan"
import { REVEAL_BOOTSTRAP } from "@/lib/reveal-script"
import { siteUrl } from "@/lib/site"

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
})

const description =
  "James Liu, product manager for wealth and trading at Revolut. Previously product lead for derivative products at Crypto.com, where he owned Prediction Markets. Builds multi-agent trading desks and AI video tools in Singapore."

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "James Liu - Trading & AI Product Manager",
    template: "%s - James Liu",
  },
  description,
  keywords: [
    "James Liu",
    "Product Owner",
    "Product Manager",
    "Revolut",
    "wealth and trading",
    "Crypto.com",
    "crypto trading",
    "derivatives",
    "options",
    "perpetual futures",
    "prediction markets",
    "AI agents",
    "multimodal AI",
    "AI video generation",
    "ByteDance",
    "Singapore",
  ],
  authors: [{ name: "James Liu", url: "https://www.linkedin.com/in/james-liu-zx/" }],
  creator: "James Liu",
  openGraph: {
    type: "website",
    locale: "en_SG",
    url: siteUrl,
    siteName: "James Liu",
    title: "James Liu - Trading & AI Product Manager",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "James Liu - Trading & AI Product Manager",
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0c12" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="no-js" suppressHydrationWarning>
      <head>
        {/*
          Runs before first paint: clears `no-js` and starts the scroll-reveal
          observer, so revealed sections do not wait on hydration to appear.
        */}
        <script dangerouslySetInnerHTML={{ __html: REVEAL_BOOTSTRAP }} />
      </head>
      <body className={`${sans.variable} ${mono.variable} ${display.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SmoothScroll>{children}</SmoothScroll>
          <RevealRescan />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
