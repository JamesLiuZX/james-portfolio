/**
 * Project data shared by the home page's "Selected work" grid and the
 * /projects index, so a card is only ever edited in one place.
 *
 * Every number in here traces to James's resumes or a project's own write-up;
 * see the claims ledger that came with this change before adding a new one.
 */

export interface ProjectLink {
  label: string
  href: string
}

export interface Project {
  /** Slug. With `caseStudy`, also the route under /projects. */
  id: string
  title: string
  category: string
  /** Cover in /public. An empty string falls back to a typographic plate. */
  image: string
  description: string
  technologies: string[]
  /** Single headline outcome shown on the card. */
  result?: string
  /** Has its own page at /projects/[id]. */
  caseStudy?: boolean
  /** Live demo, live site, code. The first one doubles as the card's target when there is no case study. */
  links?: ProjectLink[]
  /** Kept out of every list until it has a cover and somewhere to link. */
  draft?: boolean
}

const OPERATOR_NOTES = "https://jamesliuzx.github.io/linkedin-operator-notes"

const KINO_REPO_URL = "https://github.com/JamesLiuZX/james-portfolio/tree/main/kino"

const allSelectedWork: Project[] = [
  {
    id: "quorum",
    title: "Quorum",
    category: "AI agents · Trading",
    image: "/quorum.webp",
    description:
      "A crypto trading desk where nine AI agents argue, a deterministic risk kernel decides, and I approve every order. Built to test the one claim four viral AI-trading posts never measured: that the AI adds anything.",
    technologies: ["Multi-agent LLMs", "Python", "React", "Backtesting", "Fly.io"],
    result: "9 strategy runs · 0 survived the Lab",
    caseStudy: true,
    links: [{ label: "Live demo", href: "/demos/quorum/" }],
  },
  {
    id: "liquidity-reward-labs",
    title: "Liquidity & Reward Labs",
    category: "Market design · Prediction markets",
    image: "/liquidity-labs.svg",
    description:
      "Two simulators that turn market-quality arguments into budget lines. Liquidity Lab prices “this market feels dead” with Hanson's LMSR; Farm Lab runs Polymarket's published maker-rewards rule and shows what the pool buys per filled share.",
    technologies: ["LMSR", "Market microstructure", "JavaScript", "SVG charts"],
    result: "0.5% slippage bar: $34,484 subsidy per market",
    links: [
      { label: "Liquidity Lab", href: `${OPERATOR_NOTES}/demos/liquidity-lab` },
      { label: "Farm Lab", href: `${OPERATOR_NOTES}/demos/farm-lab` },
      { label: "Code", href: "https://github.com/JamesLiuZX/linkedin-operator-notes" },
    ],
  },
  {
    id: "kino",
    title: "Kino",
    category: "Multimodal AI · Video",
    image: "/kino.webp",
    description:
      "A one-box AI image and video studio that runs the official ComfyUI workflows for MiniMax H3, Qwen Image 2.1, Z-Image-Turbo and LTX-2.3 on RunPod GPUs. Its Ad Studio turns a brand profile into compliance-checked, captioned ads for TikTok and Meta.",
    technologies: ["ComfyUI", "RunPod", "MiniMax H3", "Qwen Image 2.1", "Claude", "ffmpeg"],
    result: "11 official workflows · 20 camera moves",
    caseStudy: true,
    links: [{ label: "Code", href: KINO_REPO_URL }],
  },
  {
    id: "herbalbath-singapore",
    title: "HerbalBath",
    category: "DTC · AI video ads",
    image: "/herbalbath.webp",
    description:
      "The DTC wellness brand I co-founded, grown on AI-generated video ads and UGC. I build its growth stack too: PayNow checkout, a WhatsApp reorder engine, a referral captain kit and an SEO content engine.",
    technologies: ["AI video ads", "UGC", "Next.js", "WhatsApp Cloud API", "PayNow"],
    result: "S$200K+ annual revenue · 30,000+ customers",
    caseStudy: true,
    links: [{ label: "herbalbathsg.com", href: "https://herbalbathsg.com" }],
  },
]

export const selectedWork = allSelectedWork.filter((p) => !p.draft)

export const earlierWork: Project[] = [
  {
    id: "askshop-ai",
    title: "AskShop.ai",
    category: "AI · SaaS",
    image: "/askshopai.webp",
    description:
      "An LLM-powered product discovery engine for Shopify stores, taken from concept to launch in five weeks with a team of five. Reached 100+ business users and a 5.0/5.0 App Store rating, with Stanford Startup Society grant funding.",
    technologies: ["TypeScript", "AWS", "Liquid", "Gadget", "JavaScript"],
    caseStudy: true,
    links: [
      { label: "Shopify App Store", href: "https://apps.shopify.com/askshop-ai" },
      { label: "Code", href: "https://github.com/JamesLiuZX" },
    ],
  },
  {
    id: "calendare",
    title: "Calendare",
    category: "Productivity",
    image: "/calendare.webp",
    description:
      "An AI-powered productivity app that schedules locally scraped events and personalised tasks around your goals and calendar. Won a $10K NUS VIP grant.",
    technologies: ["Next.js", "TypeScript", "MongoDB", "AWS"],
    caseStudy: true,
    links: [{ label: "Code", href: "https://github.com/JamesLiuZX" }],
  },
  {
    id: "nft-sentiment-predictor",
    title: "NFT Sentiment Price Predictor",
    category: "Web3",
    image: "/NFinsighT.webp",
    description:
      "NFT price charts overlaid with predicted prices and market sentiment, across customisable time-series windows.",
    technologies: ["TypeScript", "Next.js", "Tailwind CSS", "PostgreSQL", "tRPC", "Python", "PySpark"],
    caseStudy: true,
    links: [
      { label: "Live site", href: "https://nfinsight.vercel.app/" },
      { label: "Code", href: "https://github.com/JamesLiuZX" },
    ],
  },
  {
    id: "dunman-helper",
    title: "Dunman Helper",
    category: "AI",
    image: "",
    description: "A school chatbot built on Dialogflow's natural-language platform.",
    technologies: ["Dialogflow", "Python", "HTML", "JavaScript"],
    links: [
      { label: "Live demo", href: "https://jamesliuzx.github.io/AI-Chatbot/" },
      { label: "Code", href: "https://github.com/JamesLiuZX/AI-Chatbot" },
    ],
  },
  {
    id: "ey-dashboard",
    title: "EY Client Dashboard",
    category: "Enterprise",
    image: "",
    description:
      "Frontend development of a real-time analytics dashboard for an international enterprise client serving 1M+ users a year.",
    technologies: ["ReactJS", ".NET Framework", "JQuery", "C#", "SQL", "Microsoft Azure"],
  },
]

/** Where the card itself goes: the case study, else the first link, else nowhere. */
export const primaryHref = (project: Project): string | null =>
  project.caseStudy ? `/projects/${project.id}` : (project.links?.[0]?.href ?? null)

/**
 * Next.js routes go through <Link>. Anything else, including the
 * self-contained demos served as plain files from /public/demos, needs a
 * normal anchor: client-side routing would look for a page that isn't there.
 */
export const isAppRoute = (href: string) => href.startsWith("/") && !href.startsWith("/demos/")
