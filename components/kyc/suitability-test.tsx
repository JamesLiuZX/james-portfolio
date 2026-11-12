"use client"

import { useState, type CSSProperties } from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Check, Lock } from "lucide-react"
import type { Question } from "@/lib/kyc"
import { cn } from "@/lib/utils"

const LETTERS = ["A", "B", "C", "D"]

const isInternal = (href: string) => href.startsWith("/") && !href.startsWith("/demos/") && !href.startsWith("/kino")

function Exhibit({ question, index, open }: { question: Question; index: number; open: boolean }) {
  const { evidence } = question
  return (
    <figure className="relative overflow-hidden rounded-2xl border border-ink/10 bg-paper-card shadow-[0_2px_4px_rgba(11,18,36,0.05),0_40px_80px_-50px_rgba(11,18,36,0.5)]">
      <div className="flex items-center justify-between border-b border-ink/10 px-5 py-3">
        <span className="field text-ink-faint">Exhibit {LETTERS[index]}</span>
        <span className={cn("field", open ? "text-signal" : "text-ink-faint")}>{open ? "Unsealed" : "Sealed"}</span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-paper-deep">
        <img
          src={evidence.image}
          alt={`${evidence.title}: ${evidence.category}`}
          className={cn("h-full w-full object-cover transition-[clip-path,transform,filter] [transition-duration:1100ms] [transition-timing-function:cubic-bezier(0.7,0,0.2,1)]", open ? "[clip-path:inset(0_0_0_0)]" : "scale-105 [clip-path:inset(0_0_100%_0)] blur-sm")}
        />
        {!open && (
          <div className="absolute inset-0 grid place-items-center">
            <span className="flex flex-col items-center gap-3 text-ink-faint">
              <span className="grid h-14 w-14 place-items-center rounded-full border border-dashed border-ink/25">
                <Lock className="h-5 w-5" />
              </span>
              <span className="field">Answer to unseal</span>
            </span>
          </div>
        )}
      </div>
      <figcaption aria-hidden={!open} className={cn("px-5 pb-6 pt-5 transition-[opacity,filter] duration-700", open ? "opacity-100" : "select-none opacity-40 blur-[5px]")}>
        <p className="field text-violet">{evidence.category}</p>
        <h4 className="stretch-wide mt-2 text-2xl font-semibold tracking-[-0.01em] text-ink">{evidence.title}</h4>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{evidence.body}</p>
        <p className="stretch-cond mt-4 border-t border-ink/10 pt-4 text-xl font-semibold text-ink">{evidence.result}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {evidence.links.map((link) =>
            isInternal(link.href) ? (
              <Link key={link.href} href={link.href} tabIndex={open ? 0 : -1} className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-3.5 py-1.5 text-sm text-ink transition-colors hover:border-violet/50">
                {link.label}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            ) : (
              <a key={link.href} href={link.href} tabIndex={open ? 0 : -1} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-3.5 py-1.5 text-sm text-ink transition-colors hover:border-violet/50">
                {link.label}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ),
          )}
        </div>
      </figcaption>
    </figure>
  )
}

/**
 * The appropriateness test platforms run before letting anyone trade
 * derivatives, run on him. Any answer is accepted; his opens the evidence.
 */
export default function SuitabilityTest({ questions, competencies }: { questions: Question[]; competencies: { name: string; note: string }[] }) {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null))
  const [showAll, setShowAll] = useState(false)

  const question = questions[index]
  const picked = answers[index]
  const answered = picked !== null
  const complete = answers.every((answer) => answer !== null)
  const last = index === questions.length - 1

  const choose = (option: number) => {
    if (answered) return
    setAnswers((current) => current.map((value, i) => (i === index ? option : value)))
  }

  return (
    <div className="mt-16 md:mt-20">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="field text-ink-faint">
          {showAll ? "All evidence on file" : complete ? "Assessment complete" : `Question ${index + 1} of ${questions.length}`}
        </p>
        <button type="button" onClick={() => setShowAll((value) => !value)} className="font-mono text-[11px] uppercase tracking-[0.16em] text-violet underline-offset-4 hover:underline">
          {showAll ? "Take the test instead" : "Skip the test: show all evidence"}
        </button>
      </div>

      {showAll ? (
        <div className="enter mt-8 grid gap-6 md:grid-cols-2" style={{ "--enter-duration": "0.6s" } as CSSProperties}>
          {questions.map((item, i) => (
            <Exhibit key={item.id} question={item} index={i} open />
          ))}
        </div>
      ) : (
        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="flex gap-1.5" aria-hidden="true">
              {questions.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  tabIndex={-1}
                  onClick={() => setIndex(i)}
                  className={cn("h-1 flex-1 rounded-full transition-colors duration-500", answers[i] !== null ? "bg-signal" : i === index ? "bg-violet" : "bg-ink/15")}
                />
              ))}
            </div>

            <div key={question.id} className="enter" style={{ "--enter-duration": "0.6s", "--enter-y": "10px" } as CSSProperties}>
              <p className="stretch-semi mt-8 text-[clamp(1.6rem,2.6vw,2.2rem)] font-semibold leading-[1.12] tracking-[-0.015em] text-ink" id={`q-${question.id}`}>
                {question.prompt}
              </p>
              <div role="radiogroup" aria-labelledby={`q-${question.id}`} className="mt-7 space-y-2.5">
                {question.options.map((option, i) => {
                  const his = i === question.answer
                  const mine = picked === i
                  return (
                    <button
                      key={option}
                      type="button"
                      role="radio"
                      aria-checked={mine}
                      disabled={answered && !mine && !his}
                      onClick={() => choose(i)}
                      className={cn(
                        "group flex w-full items-center gap-4 rounded-xl border px-4 py-3.5 text-left transition-[border-color,background-color,opacity] duration-300",
                        !answered && "border-ink/15 bg-paper-card hover:border-violet/50",
                        answered && his && "border-signal/50 bg-signal/[0.07]",
                        answered && mine && !his && "border-ink/25 bg-paper-card",
                        answered && !mine && !his && "border-ink/10 opacity-45",
                      )}
                    >
                      <span
                        className={cn(
                          "grid h-7 w-7 shrink-0 place-items-center rounded-full border font-mono text-[11px] transition-colors",
                          answered && his ? "border-signal bg-signal text-white" : "border-ink/25 text-ink-soft group-hover:border-violet/60",
                        )}
                      >
                        {answered && his ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : LETTERS[i]}
                      </span>
                      <span className="flex-1 text-[15.5px] text-ink">{option}</span>
                      {answered && his && <span className="field shrink-0 text-signal">His answer</span>}
                      {answered && mine && !his && <span className="field shrink-0 text-ink-faint">Yours</span>}
                    </button>
                  )
                })}
              </div>

              <div className="mt-6 flex min-h-[3rem] items-center gap-4">
                {answered && (
                  <>
                    <p className="serif-accent flex-1 text-lg text-ink-soft">{picked === question.answer ? "Same answer. Noted." : "Noted. Here is the evidence for his."}</p>
                    {!last && (
                      <button type="button" onClick={() => setIndex(index + 1)} className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-violet-deep">
                        Next question
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Exhibit key={question.id} question={question} index={index} open={answered} />
          </div>
        </div>
      )}

      {/* The verdict, and what he declared he knows. */}
      <div className={cn("mt-16 rounded-2xl border p-6 transition-colors duration-700 md:p-10", complete || showAll ? "border-signal/35 bg-signal/[0.05]" : "border-ink/10 bg-paper-card/60")}>
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <p className="field text-ink-faint">Assessment result</p>
          <p className={cn("field", complete || showAll ? "text-signal" : "text-ink-faint")}>{complete || showAll ? "✓ Passed" : `${answers.filter((a) => a !== null).length} of ${questions.length} answered`}</p>
        </div>
        <p className="stretch-wide mt-4 text-[clamp(1.7rem,3.4vw,2.8rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-ink">
          {complete || showAll ? "Suitable for complex products." : "Pending: finish the test, or skip it."}
        </p>
        <p className="field mt-10 text-ink-faint">Knowledge and experience declared</p>
        <ul className="mt-4 grid gap-px overflow-hidden rounded-xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {competencies.map((item) => (
            <li key={item.name} className="bg-paper-card p-5">
              <p className="flex items-center gap-2 text-[15px] font-semibold text-ink">
                <Check className="h-4 w-4 text-signal" strokeWidth={2.5} />
                {item.name}
              </p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">{item.note}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/projects" className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-violet-deep">
            Every project on file
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a href="/kino/" className="group inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-violet/50">
            Try Kino live
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
