import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ResolutionLinter from "@/components/demos/resolution-linter"

export const metadata: Metadata = {
  title: "Resolution linter | James Liu",
  description:
    "A deterministic linter for prediction-market resolution criteria. 16 rules, each mapped to a real dispute class. Load a market that actually blew up and watch it fail.",
}

export default function ResolutionLinterPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-10">
            <div className="space-y-4">
              <Link href="/#projects" className="text-muted-foreground hover:text-primary transition-colors">
                <Button variant="ghost" size="sm" className="group">
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Back to Projects
                </Button>
              </Link>

              <div className="space-y-3">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Market design
                </p>
                <h1 className="text-3xl font-bold md:text-5xl">Resolution linter</h1>
                <p className="max-w-3xl text-lg text-muted-foreground">
                  Paste market rules. See the dispute surface before your users find it.
                </p>
              </div>

              <div className="max-w-3xl space-y-3 text-sm leading-relaxed text-muted-foreground">
                <p>
                  Most prediction-market disputes are not oracle failures. They are writing failures.
                  A market resolves badly because the sentence describing it had two readings and
                  nobody noticed until money was on both.
                </p>
                <p>
                  This is a deterministic checker for that. 16 rules, each mapped to a real class of
                  dispute. It runs on every keystroke with no model call and no network request,
                  because the argument is that you do not need an LLM to catch this. You need a
                  checklist that someone actually runs.
                </p>
                <p>
                  The real Polymarket Ukraine minerals market scores{" "}
                  <strong className="text-foreground">3 out of 100</strong> here. The rewrite scores
                  95. The argument behind it is in{" "}
                  <Link
                    href="/blog/07-the-sentence-is-the-product"
                    className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
                  >
                    The sentence is the product
                  </Link>
                  .
                </p>
              </div>
            </div>

            <ResolutionLinter />

            <div className="max-w-3xl space-y-3 border-t pt-8">
              <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                How it is built
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Regex, a clause checklist, and a scoring function, all client side. A rule counts once
                toward the score even when it matches six times, because six vague adjectives are one
                writing problem, not six. Severity weights are 22, 12 and 5, so any single blocker is
                enough to fail a listing on its own.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                The examples are not illustrations. Three of them are markets that resolved into a
                real dispute, and the fourth is a control included to show the linter stays quiet on
                text that was written properly the first time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
