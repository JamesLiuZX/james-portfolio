import ChapterHead from "@/components/kyc/chapter-head"
import SuitabilityTest from "@/components/kyc/suitability-test"
import { competencies, questions } from "@/lib/kyc"

/** Step 04: suitability. The appropriateness test, with his work as evidence. */
export default function Suitability() {
  return (
    <section id="suitability" className="relative py-28 md:py-40">
      <span id="projects" aria-hidden="true" className="absolute top-0" />
      <span id="toolkit" aria-hidden="true" className="absolute top-0" />
      <div className="shell">
        <ChapterHead index={3} verdict="Suitable" titleClassName="max-md:text-[8.4vw] max-md:[font-stretch:100%]" title={["Appropriateness", { text: "test.", className: "serif-accent font-normal tracking-[-0.02em] text-violet" }]}>
          <p className="reveal mt-8 max-w-2xl text-[1.06rem] leading-relaxed text-ink-soft">
            Before anyone trades derivatives, a platform checks they understand what they are buying. Four questions, the same check, run on him. Pick any answer; his opens the evidence.
          </p>
        </ChapterHead>
        <SuitabilityTest questions={questions} competencies={competencies} />
      </div>
    </section>
  )
}
