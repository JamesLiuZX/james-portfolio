import type { Metadata } from "next"
import CaseStudyPage, { type CaseStudy } from "@/components/case-study"

// Revenue and customer figures are the ones on James's resume; the growth
// stack is described by what was built, not by results it has yet to report.
const herbalbath: CaseStudy = {
  eyebrow: "Case study · DTC · AI video ads",
  title: "HerbalBath: a DTC brand grown on AI video",
  accent: "AI video",
  lede: "The direct-to-consumer wellness brand I co-founded in Singapore in 2021, grown to S$200K+ in annual revenue and 30,000+ customers, with acquisition running on AI-generated video ads and UGC.",
  cover: {
    src: "/herbalbath.webp",
    alt: "The HerbalBath storefront at herbalbathsg.com",
    href: "https://herbalbathsg.com",
  },
  links: [{ label: "Visit herbalbathsg.com", href: "https://herbalbathsg.com" }],
  metrics: [
    { value: "S$200K+", label: "Annual revenue" },
    { value: "30,000+", label: "Customers" },
    { value: "Apr 2021", label: "Co-founded" },
    { value: "AI video", label: "Plus UGC, as the acquisition engine" },
  ],
  facts: [
    { label: "Role", value: "Co-founder" },
    { label: "Market", value: "Singapore, direct to consumer" },
    { label: "Acquisition", value: "AI-generated video ads and UGC, plus lifecycle and referral campaigns" },
    { label: "Creative", value: "Produced with Kino, my AI image and video studio" },
  ],
  stack: ["AI video ads", "UGC", "Next.js", "WhatsApp Cloud API", "PayNow", "RAG"],
  sections: [
    {
      heading: "Overview",
      paragraphs: [
        "HerbalBath is a direct-to-consumer wellness brand in Singapore. I co-founded it in April 2021 and have kept building it alongside every role since; it has grown to S$200K+ in annual revenue and 30,000+ customers.",
        "It is the same loop I work on in trading apps (the first purchase, the second purchase, the referral) with my own money on the line, which makes it the most honest growth lab I have.",
      ],
    },
    {
      heading: "Acquisition on AI video",
      paragraphs: [
        "Acquisition runs on AI-generated video ads and UGC, alongside lifecycle and referral campaigns.",
        "The ad creative comes out of Kino, the AI video studio I am building: its Ad Studio compiles a structured ad brief into shots, then into captioned 9:16 and 1:1 ads for TikTok and Meta.",
      ],
    },
    {
      heading: "The growth stack I built",
      bullets: [
        "PayNow checkout, so customers can pay by bank QR instead of a card.",
        "A WhatsApp reorder engine that nudges customers around when a bottle should be running low. It sends utility messages rather than marketing ones, follows up once, and keeps an opt-out through any repeat purchase.",
        "A referral “captain” kit: short, human-readable codes instead of links, and a share card that drops straight into WhatsApp, because in this audience a person forwarding a message is the distribution channel.",
        "An SEO content engine: a retrieval-augmented pipeline that drafts Singapore-focused articles.",
      ],
    },
  ],
}

export const metadata: Metadata = {
  title: "HerbalBath",
  description:
    "A Singapore DTC wellness brand co-founded in 2021: S$200K+ annual revenue, 30,000+ customers, acquisition on AI-generated video ads and UGC.",
}

export default function HerbalBathProject() {
  return <CaseStudyPage study={herbalbath} />
}
