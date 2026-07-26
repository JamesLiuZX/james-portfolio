import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono, Instrument_Serif } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import SmoothScroll from "@/components/smooth-scroll"
import { Toaster } from "@/components/ui/sonner"

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

const siteUrl = "https://jamesliu.dev"
const description =
  "James Liu — Product Manager at Crypto.com, based in Singapore. Building AI-powered, product-led experiences that drive measurable growth. Previously ByteDance, Lark, Trendsi and Ernst & Young."

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "James Liu — Product Manager",
    template: "%s — James Liu",
  },
  description,
  keywords: [
    "James Liu",
    "Product Manager",
    "Singapore",
    "AI product",
    "growth product management",
    "Crypto.com",
    "ByteDance",
    "NUS Computer Science",
  ],
  authors: [{ name: "James Liu", url: "https://www.linkedin.com/in/james-liu-zx/" }],
  creator: "James Liu",
  openGraph: {
    type: "website",
    locale: "en_SG",
    url: siteUrl,
    siteName: "James Liu",
    title: "James Liu — Product Manager",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "James Liu — Product Manager",
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
    { media: "(prefers-color-scheme: dark)", color: "#0c0c0e" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${mono.variable} ${display.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SmoothScroll>{children}</SmoothScroll>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
