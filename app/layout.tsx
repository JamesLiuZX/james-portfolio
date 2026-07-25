import type React from "react"
import type { Metadata } from "next"
import { Syne, DM_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://jamesliuzx.com"),
  title: {
    default: "James Liu | Product Manager",
    template: "%s | James Liu",
  },
  description:
    "Product Manager at Crypto.com — building AI-powered, product-led experiences that drive measurable growth. Previously ByteDance, Trendsi, and founder of AskShop.ai.",
  keywords: [
    "James Liu",
    "Product Manager",
    "Crypto.com",
    "ByteDance",
    "Growth PM",
    "AI Product",
    "Singapore",
  ],
  authors: [{ name: "James Liu", url: "https://jamesliuzx.com" }],
  openGraph: {
    title: "James Liu | Product Manager",
    description:
      "Building AI-powered, product-led experiences that drive measurable growth.",
    url: "https://jamesliuzx.com",
    siteName: "James Liu",
    locale: "en_SG",
    type: "website",
    images: [{ url: "/james-LA.jpg", width: 1200, height: 630, alt: "James Liu" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "James Liu | Product Manager",
    description:
      "Building AI-powered, product-led experiences that drive measurable growth.",
    images: ["/james-LA.jpg"],
  },
  alternates: {
    canonical: "https://jamesliuzx.com",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${syne.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
