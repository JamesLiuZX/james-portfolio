import type { Metadata } from "next"
import CaseStudyPage, { type CaseStudy } from "@/components/case-study"

// Every figure below is from the Quorum write-up of 12 Oct 2026: real Binance
// data from 2018 to 12 Oct 2026, replayed through the desk.
const quorum: CaseStudy = {
  eyebrow: "Case study · AI agents · Trading",
  title: "Quorum: the AI trading desk that kills its own ideas",
  accent: "kills its own ideas",
  lede: "A crypto trading desk where nine AI agents argue, a deterministic kernel decides, and I approve every order. Built to test the one claim four viral AI-trading posts never measured: that the AI adds anything.",
  cover: {
    src: "/quorum.webp",
    alt: "Quorum live demo: the desk terminal with a SOL short ticket awaiting approval",
    href: "/demos/quorum/",
  },
  links: [{ label: "Open the live demo", href: "/demos/quorum/" }],
  metrics: [
    { value: "0 of 9", label: "Strategy runs that survived the Lab" },
    { value: "3.0%", label: "Rules desk, Jul to Oct 2026, while BTC rose 41.9%" },
    { value: "2,554", label: "Calls settled and graded in one ledger" },
    { value: "~330", label: "Lines of risk kernel, no model inside" },
  ],
  facts: [
    { label: "Data", value: "Real Binance market data, 2018 to 12 Oct 2026" },
    { label: "Mode", value: "Paper trading; live trading locked three ways" },
    { label: "Runs on", value: "One Fly.io machine in Singapore, ~US$7–9 a month" },
    { label: "Model budget", value: "US$5 a day cap, about two desk meetings" },
    { label: "Demo", value: "A recorded 12 Oct 2026 session, replayed in the browser" },
  ],
  stack: ["Python", "React", "Claude Haiku, Sonnet & Opus 5.5", "OpenAI-compatible APIs", "Fly.io", "Telegram"],
  sections: [
    {
      heading: "The question",
      paragraphs: [
        "I built Quorum to learn from four viral posts about AI trading, and to test the one claim none of them measured: that the AI adds something.",
        "So the design starts from distrust. A bad idea dies in the Lab, a bad order dies in the kernel, and every opinion a model gives is graded against plain rules in the same ledger.",
      ],
    },
    {
      heading: "Two speeds",
      paragraphs: [
        "Large models meet once per 4-hour bar. The kernel and a spine of plain code run on every bar, and the spine checks stops on 1-minute bars every minute without calling a model.",
        "Market data and Lab verdicts go to the desk. Its ratings go to the ledger and its tickets go to the kernel. Only a ticket I approve, and that passes the kernel twice (once at draft, once on a fresh quote at approval), reaches the broker.",
      ],
    },
    {
      heading: "The Lab: a gauntlet built to kill strategies",
      paragraphs: [
        "Pass marks were fixed before the first run: as published, best of N, walk-forward (Sharpe ≥ 0.5), deflated Sharpe (≥ 0.90), probability of backtest overfitting (≤ 0.35 across 16 CSCV blocks), random timing (1,000 random start dates, p ≤ 0.05), cost stress (Sharpe ≥ 0.3 at 2x fees and slippage), regimes and parameter plateau, and money rules with a 20% drawdown kill switch.",
        "The engine is pessimistic on purpose. It decides at the bar close and fills at the next open, the stop wins when both levels are touched, gaps fill at the open, perps pay funding every bar, and positions and the account can be liquidated.",
      ],
      bullets: [
        "Nine strategy runs went in, several straight from published papers. Six came out fragile, two dead, one benchmark. Nothing survived.",
        "Betting against beta posted a walk-forward Sharpe of 1.04, and its published version was still liquidated on 16 Apr 2021. A good Sharpe can still be dead.",
        "Funding is the hidden cost of perps: a BTC perp held since Dec 2018 made 34% a year, against 49% a year without funding.",
        "“Flip” had the best walk-forward Sharpe, 1.99 on 1-hour bars over 90 days, and 0.03 on 4-hour bars since 2020. Rules depend on the window.",
      ],
    },
    {
      heading: "The desk: nine roles, one ballot",
      paragraphs: [
        "Models are tiered by the job. A scout (Haiku 5.5) ranks coins by attention and a tape analyst (Haiku 5.5) reads price. A derivatives analyst (Sonnet 5.5) weighs funding against its 30-day mean and a catalyst analyst (Sonnet 5.5) only counts headlines confirmed by a primary source. A bull and a bear (Opus 5.5) make the case and the rebuttal, a risk manager (Opus 5.5) may cut size or veto, and the portfolio manager (Fable 5.1, Opus 5.5 fallback) rates 1 to 5 and drafts at most three tickets. A lesson writer closes the loop.",
        "Every role answers a fixed JSON schema that cites fields from its data packet, so a validator can check each number. In the recorded cycle of 12 Oct 2026, 12:00 UTC, the PM shorted SOL with a 1.6 ATR stop and a 3.2 ATR target, the risk manager cut size to 75%, and no validator had to correct a single number.",
        "Model choice is config, not code: any OpenAI-compatible endpoint works, and a rules-only brain needs no key at all.",
      ],
    },
    {
      heading: "The kernel: arithmetic, not opinions",
      paragraphs: [
        "About 330 lines of Python with no model inside. It answers PASS, BLOCK or NEEDS DATA, sizes the order, and prints every check with its numbers: reward-to-risk of at least 1.5, drift since the evidence of at most 0.5 ATR, a 0.5% risk-per-trade cap, leverage and liquidation distance, margin, and drawdown and daily-loss limits on the book. The same kernel runs in backtest, paper and live.",
        "Risk is size times stop distance; leverage only sets margin and liquidation distance. If the price moves more than 0.5 ATR before approval, nothing is sent. Live trading is locked three ways, and every live order needs its ticket id typed out by hand.",
      ],
    },
    {
      heading: "Memory: every call gets a grade",
      paragraphs: [
        "One ledger holds both desks. Calls settle after 6 bars, each settled call earns a one-line lesson, and the next debate reads the latest 30.",
        "A rules-only twin is the control group. Replayed every 4 hours from 1 July to 12 October, it settled 2,554 calls and was right on 45.7% of directional calls: longs 49% over 1,400, shorts 38% over 570, in a quarter when BTC rose 42%. It made 3.0% while BTC rose 41.9%.",
        "The LLM desk has 4 calls on record and none has settled yet, so the core question is still open. That is the honest state of it, and the ledger and a calibration chart (a desk that says 70% should be right about 70% of the time) are built to answer it.",
      ],
    },
    {
      heading: "The terminal",
      paragraphs: [
        "Colour answers one question: who decided this? Violet is an agent, blue is the kernel, and amber is a decision only I can make. The approve button is the only amber button on the page. Green and red mean long and short, nothing else.",
        "Desk, Book, Lab, Ledger, Activity, a hash-chained Records page and Settings, where money rules can be tightened at any time and loosened only when the book is flat. Approvals work phone-first through Telegram.",
      ],
    },
    {
      heading: "Limits, stated honestly",
      bullets: [
        "Too few LLM calls to judge yet: a fair read needs about 540 paper cycles, roughly three months.",
        "Replay approves every ticket.",
        "Spot bars stand in for perp prices, and fills are simple.",
        "The coin universe has survivorship bias, and news coverage is thin.",
        "Hiding tickers and dates from the models is a mitigation, not proof.",
      ],
    },
    {
      heading: "The product call underneath",
      paragraphs: [
        "It is the call I would make on any AI feature that touches money. Put the model where judgement helps, keep the arithmetic out of its hands, make the human decision impossible to miss, and keep a control group, so the model has to earn its seat with numbers rather than with a good demo.",
      ],
    },
  ],
}

export const metadata: Metadata = {
  title: "Quorum, an AI trading desk",
  description:
    "Nine AI agents argue, a deterministic kernel decides, a human approves every order, and every model call is graded against a rules-only control group.",
}

export default function QuorumCaseStudy() {
  return <CaseStudyPage study={quorum} />
}
