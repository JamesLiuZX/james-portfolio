/**
 * The home page, told as a KYC file: "Know your candidate".
 *
 * Every fact and figure here is ported from the site's own sources: the
 * résumé (resume/resume.html), the experience timeline and hero that the
 * previous home page carried (see the `archive/2026-11-12-classic` branch),
 * lib/projects.ts, the academic page and the toolkit. The KYC framing (field
 * names, stamps, "positions", the appropriateness test) is site copy; the
 * facts inside it are not new. Never add a number that is not already in one
 * of those sources, and never add non-public Revolut, Crypto.com or
 * ByteDance details.
 */

export const steps = [
  { id: "identity", name: "Identity", question: "Who is the candidate?" },
  { id: "address", name: "Proof of address", question: "Where has he lived, studied and worked?" },
  { id: "funds", name: "Source of funds", question: "Where does his experience come from?" },
  { id: "suitability", name: "Suitability", question: "Is he suitable for complex products?" },
  { id: "approval", name: "Approval", question: "Decision" },
] as const

export type StepId = (typeof steps)[number]["id"]

/* -------------------------------------------------------------------------- */
/* 01 Identity                                                                */
/* -------------------------------------------------------------------------- */

export const identity = {
  surname: "Liu",
  givenNames: "James Zixin",
  displayName: "James Liu",
  nationality: "Singaporean",
  occupation: "Product Owner (Technical)",
  employer: "Revolut",
  domain: "Wealth & trading · AI",
  languages: "English · 中文",
  basedIn: "Singapore",
  photo: "/linkedin.jpeg",
  // From the previous hero, verbatim apart from tense.
  statement:
    "I'm a product manager who started out as an engineer. I work on wealth and trading at Revolut, after leading derivative products at Crypto.com and building AI products at ByteDance. On the side, I build AI agents and tools for trading and multimodal generation.",
  stats: [
    { value: "3 yrs", label: "Product manager" },
    { value: "6 yrs", label: "Ex-founder", note: "$800K cumulative ARR" },
  ],
  // Machine-readable zone, two 44-character lines as on a passport. The first
  // follows the real format; the second is the file's own summary.
  mrz: [
    "P<SGPLIU<<JAMES<ZIXIN",
    "KYC<<PRODUCT<OWNER<<TRADING<AND<AI<<SGP",
  ].map((line) => line.padEnd(44, "<")),
}

/* -------------------------------------------------------------------------- */
/* 02 Proof of address                                                        */
/* -------------------------------------------------------------------------- */

export type Stamp = {
  place: string
  lines: string[]
  date: string
  shape: "circle" | "rect" | "oval" | "hex"
  ink: "violet" | "teal" | "risk" | "ink" | "signal"
  /** Resting rotation, degrees. */
  rotate: number
}

// Page one: Singapore. Page two: the Silicon Valley year. Lines are kept
// short so they fit inside each stamp's frame.
export const passportPages: { title: string; stamps: Stamp[] }[] = [
  {
    title: "Singapore",
    stamps: [
      { place: "NUS", lines: ["B.Comp.", "Computer Science", "Honours (Distinction)"], date: "2021 – 2025", shape: "circle", ink: "violet", rotate: -8 },
      { place: "VIP grant", lines: ["NUS Enterprise", "$10,000"], date: "2024", shape: "rect", ink: "signal", rotate: 6 },
      { place: "CS2103T", lines: ["Top 5% of cohort", "then mentor"], date: "2023", shape: "oval", ink: "teal", rotate: -4 },
      { place: "Datathon", lines: ["Citadel"], date: "2023", shape: "hex", ink: "ink", rotate: 10 },
    ],
  },
  {
    title: "Silicon Valley",
    stamps: [
      { place: "Silicon Valley", lines: ["NUS Overseas Colleges", "a year in tech"], date: "2023 – 2024", shape: "rect", ink: "teal", rotate: -6 },
      { place: "Stanford", lines: ["MS&E", "graduate coursework", "GPA 3.7 / 4.0"], date: "2023 – 2024", shape: "circle", ink: "risk", rotate: 7 },
      { place: "San Francisco", lines: ["Trendsi", "Product Manager"], date: "Aug 2023 – Jul 2024", shape: "oval", ink: "violet", rotate: -10 },
      { place: "2nd place", lines: ["Stanford Startup", "Society hackathon", "100+ entrants"], date: "2023", shape: "hex", ink: "signal", rotate: 4 },
    ],
  },
]

export const address = {
  onFile: "Singapore",
  languages: "English and Mandarin, bilingual",
  specialisations: "Artificial Intelligence; Networking and Distributed Systems",
}

/* -------------------------------------------------------------------------- */
/* 03 Source of funds                                                         */
/* -------------------------------------------------------------------------- */

export type Position = {
  id: string
  company: string
  role: string
  /** Chart span, ISO months. `end` omitted = still open. */
  start: string
  end?: string
  period: string
  kind: "employment" | "business"
  summary: string
  pnl: { value: string; label: string }[]
  notes: string[]
  media?: { src: string; title: string; alt: string; href: string }[]
}

// Verbatim from the previous experience timeline (James's résumés and LinkedIn).
export const positions: Position[] = [
  {
    id: "revolut",
    company: "Revolut",
    role: "Product Owner (Technical)",
    start: "2026-11",
    period: "Nov 2026 – Present",
    kind: "employment",
    summary: "Technical product owner for wealth and trading inside the main Revolut app.",
    pnl: [],
    notes: [],
  },
  {
    id: "crypto-com",
    company: "Crypto.com",
    role: "Product Manager, Trading & Derivative Products",
    start: "2025-09",
    end: "2026-11",
    period: "Sep 2025 – Nov 2026",
    kind: "employment",
    summary:
      "AI and trading for 140 million users worldwide. PM for the main app's trading surface and the infrastructure beneath it, focused on derivatives: options, futures and prediction markets.",
    pnl: [
      { value: "+60%", label: "Prediction Markets MAU, QoQ" },
      { value: "+90%", label: "New-user trading volume, referrals" },
      { value: "−90%", label: "AI workflow turnaround" },
    ],
    notes: [
      "Owned Prediction Markets: market mechanics, pricing and quotation logic, market operations and rewards, with launches tied to the FIFA World Cup and NBA Finals.",
      "Worked with engineering on an AI trading agent that places and manages trades in natural language through OpenClaw and third-party bots: the tool-calling surface, the model's context and the safety constraints. Contributed code via PRs.",
      "Spearheaded the main referral programme and the welcome bonus, lifting new-user trading volume 90% and 15% respectively.",
      "Owned compliance for onboarding, KYC, AML and anti-fraud, and the expansion of trading products into the EEA and more US states.",
      "Designed the team's internal AI workflows (RAG retrieval, multi-agent orchestration, PRD drafting, prototypes on the company domain) on Claude Code, MCP and the Google Workspace CLI.",
    ],
    media: [
      { src: "/media/crypto-com/prediction-trading.webp", title: "Prediction trading", alt: "Crypto.com prediction trading: make predictions with greater confidence", href: "https://crypto.com/us/product-news/prediction-upgrade-2026" },
      { src: "/media/crypto-com/ai-agent-trading.webp", title: "AI trading agent", alt: "Crypto.com: stay in control while your AI agent does the trading", href: "https://crypto.com/sg/product-news/openclaw-integration" },
      { src: "/media/crypto-com/ai-search.webp", title: "AI search", alt: "Crypto.com: AI-powered search for all things crypto", href: "https://crypto.com/en/product-news/delphi-ai-search" },
      { src: "/media/crypto-com/welcome-bonus.webp", title: "Welcome bonus", alt: "Crypto.com: play, trade and win welcome bonuses", href: "https://help.crypto.com/en/articles/9575514-welcome-bonus" },
    ],
  },
  {
    id: "bytedance",
    company: "ByteDance",
    role: "AI Product Manager",
    start: "2024-07",
    end: "2025-09",
    period: "Jul 2024 – Sep 2025",
    kind: "employment",
    summary:
      "Developed an AI generative content pipeline and fine-tuned frontier models for multimodal generation quality; co-led a team of 16.",
    pnl: [
      { value: "+30%", label: "SEO and leads" },
      { value: "$20M+", label: "Perplexity AI collaboration" },
      { value: ">20%", label: "Lead conversion, per page" },
    ],
    notes: [
      "Led partnerships, including the Perplexity AI collaboration: model evaluation, commercial negotiation and technical integration, covering 200,000+ user licenses.",
      "Redesigned 20+ core high-traffic web pages, lifting lead conversion more than 20% per page on average; ran a B2B referral campaign.",
      "Converted to full time in 2024; a Spot Bonus award in Q2 2025.",
    ],
  },
  {
    id: "trendsi",
    company: "Trendsi",
    role: "Product Manager, San Francisco",
    start: "2023-08",
    end: "2024-07",
    period: "Aug 2023 – Jul 2024",
    kind: "employment",
    summary:
      "Lead PM for 9 projects, with teams of 10 to 15, across payments, frontend conversion and SEO at a Series A ($25M) Silicon Valley e-commerce startup.",
    pnl: [
      { value: "+25%", label: "Checkout conversion" },
      { value: "+300%", label: "Weekly app reviews" },
      { value: "−90%", label: "Fraudulent transactions" },
    ],
    notes: [
      "Lifted funnel checkout conversion 25%, SEO 30% and weekly app reviews 300%.",
      "Cut fraudulent transactions 90% through data analysis and Stripe 3D Secure and Radar risk rules, about US$20,000 a month.",
    ],
  },
  {
    id: "herbalbath",
    company: "HerbalBath",
    role: "Co-founder",
    start: "2021-04",
    period: "Apr 2021 – Present",
    kind: "business",
    summary:
      "Grew a DTC wellness brand on AI-generated video ads and UGC, alongside lifecycle and referral campaigns.",
    pnl: [
      { value: "S$200K+", label: "Annual revenue" },
      { value: "30,000+", label: "Customers" },
    ],
    notes: [
      "Built its growth stack: PayNow checkout, a WhatsApp reorder engine, a referral captain kit and an SEO content engine.",
    ],
  },
]

/** Study runs alongside on the chart, for context. */
export const study = [
  { id: "nus", label: "NUS", start: "2021-08", end: "2025-05" },
  { id: "noc", label: "Silicon Valley year", start: "2023-08", end: "2024-07" },
]

export const fundsLede =
  "Three years as a product manager, from AI at ByteDance to trading products for 140 million users, after starting out as an engineer. Alongside it, six years as a founder: $800K in cumulative ARR before I handed the business over."

/* -------------------------------------------------------------------------- */
/* 04 Suitability                                                             */
/* -------------------------------------------------------------------------- */

export type Question = {
  id: string
  prompt: string
  options: string[]
  /** Index of James's answer in `options`. */
  answer: number
  evidence: {
    title: string
    category: string
    image: string
    body: string
    result: string
    links: { label: string; href: string }[]
  }
}

// The evidence is each project's own card copy from lib/projects.ts.
export const questions: Question[] = [
  {
    id: "quorum",
    prompt: "Nine AI agents disagree about a trade. Who decides?",
    options: ["The most confident agent", "A majority vote", "A deterministic risk kernel, then a human"],
    answer: 2,
    evidence: {
      title: "Quorum",
      category: "AI agents · Trading",
      image: "/quorum.webp",
      body: "A crypto trading desk where nine AI agents argue, a deterministic risk kernel decides, and I approve every order. Built to test the one claim four viral AI-trading posts never measured: that the AI adds anything.",
      result: "9 strategy runs · 0 survived the Lab",
      links: [
        { label: "Case study", href: "/projects/quorum" },
        { label: "Live demo", href: "/demos/quorum/" },
      ],
    },
  },
  {
    id: "market-design",
    prompt: "What does it cost to make a prediction market feel alive?",
    options: ["Nothing: liquidity is free", "It depends on the slippage you'll accept", "Whatever the marketing budget is"],
    answer: 1,
    evidence: {
      title: "Market Design Toolkit",
      category: "Market design · Prediction markets",
      image: "/liquidity-labs.svg",
      body: "Two tools that turn market-quality arguments into budget lines. Market Depth Budget prices “this market feels dead” with Hanson's LMSR; Rewards Check runs Polymarket's published maker-rewards rule and shows what the pool buys per filled share.",
      result: "0.5% slippage bar: $34,484 subsidy per market",
      links: [
        { label: "Market Depth Budget", href: "https://jamesliuzx.github.io/linkedin-operator-notes/demos/liquidity-lab" },
        { label: "Rewards Check", href: "https://jamesliuzx.github.io/linkedin-operator-notes/demos/farm-lab" },
      ],
    },
  },
  {
    id: "kino",
    prompt: "A small brand needs a TikTok ad that passes review. Where do you start?",
    options: ["A blank prompt box", "A guided task that previews the result first", "An agency retainer"],
    answer: 1,
    evidence: {
      title: "Kino",
      category: "Multimodal AI · Video",
      image: "/kino.webp",
      body: "An AI image and video studio for small brands. Guided tasks preview the result before anything is made, an ad maker writes and compliance-checks TikTok and Meta ads, and Advanced runs the official ComfyUI workflows on RunPod GPUs.",
      result: "Live web demo · 8 guided tasks",
      links: [
        { label: "Try it live", href: "/kino/" },
        { label: "Case study", href: "/projects/kino" },
      ],
    },
  },
  {
    id: "herbalbath",
    prompt: "What grows a DTC brand past its first customers?",
    options: ["One viral post", "AI video ads and UGC, then a growth stack that brings them back", "Discounts, forever"],
    answer: 1,
    evidence: {
      title: "HerbalBath",
      category: "DTC · AI video ads",
      image: "/herbalbath.webp",
      body: "The DTC wellness brand I co-founded, grown on AI-generated video ads and UGC. I build its growth stack too: PayNow checkout, a WhatsApp reorder engine, a referral captain kit and an SEO content engine.",
      result: "S$200K+ annual revenue · 30,000+ customers",
      links: [
        { label: "Case study", href: "/projects/herbalbath-singapore" },
        { label: "herbalbathsg.com", href: "https://herbalbathsg.com" },
      ],
    },
  },
]

// The toolkit's six domains, declared as knowledge and experience.
export const competencies = [
  { name: "Trading & derivatives", note: "Options, perpetual futures, prediction markets, tokenized stocks, liquidity and market making." },
  { name: "Growth & rewards", note: "Referral programmes, welcome bonuses, incentive design, KYC-to-first-trade funnels, A/B testing." },
  { name: "Risk & compliance", note: "KYC and AML, licensing and market expansion, Stripe 3DS and Radar, risk limits, safety constraints for agents." },
  { name: "AI agents & evals", note: "Tool-calling design, context and memory, multi-agent systems, evals and calibration, MCP integrations." },
  { name: "Multimodal & video AI", note: "Image and video generation, ComfyUI workflows, RAG and vector search, AI video ads and UGC." },
  { name: "Build & data", note: "Python and SQL, TypeScript, React and Next.js, Claude Code and Cursor, AWS, Amplitude and Mixpanel." },
]

/* -------------------------------------------------------------------------- */
/* 05 Approval                                                                */
/* -------------------------------------------------------------------------- */

export const contact = {
  email: "jamesliuzx@outlook.com",
  linkedin: "https://www.linkedin.com/in/james-liu-zx/",
  github: "https://github.com/JamesLiuZX",
  instagram: "https://www.instagram.com/jamesyliu/",
}
