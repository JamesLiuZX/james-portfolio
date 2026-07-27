"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, Check, Copy, RotateCcw, Wand2, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { EXAMPLES, lint, report, type Severity } from "@/lib/resolution-linter"

/* Severity is a status, so it never rests on colour alone: each row carries a
 * word and an icon as well as a tint. That also keeps it legible in dark mode,
 * where the tints get much closer together. */
const SEV_META: Record<Severity, { label: string; dot: string; text: string; ring: string }> = {
  blocker: {
    label: "Blocker",
    dot: "bg-red-500",
    text: "text-red-600 dark:text-red-400",
    ring: "border-red-500/30 bg-red-500/[0.06]",
  },
  major: {
    label: "Major",
    dot: "bg-amber-500",
    text: "text-amber-600 dark:text-amber-400",
    ring: "border-amber-500/30 bg-amber-500/[0.06]",
  },
  minor: {
    label: "Minor",
    dot: "bg-sky-500",
    text: "text-sky-600 dark:text-sky-400",
    ring: "border-sky-500/30 bg-sky-500/[0.06]",
  },
}

const VERDICT_META = {
  critical: { text: "text-red-600 dark:text-red-400", bar: "bg-red-500" },
  warning: { text: "text-amber-600 dark:text-amber-400", bar: "bg-amber-500" },
  good: { text: "text-emerald-600 dark:text-emerald-400", bar: "bg-emerald-500" },
} as const

function ScoreDial({ score, tone }: { score: number; tone: keyof typeof VERDICT_META }) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline gap-2">
        <span className={cn("text-5xl font-bold tabular-nums tracking-tight", VERDICT_META[tone].text)}>
          {score}
        </span>
        <span className="text-sm text-muted-foreground">/ 100</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className={cn("h-full rounded-full", VERDICT_META[tone].bar)}
          initial={false}
          animate={{ width: `${score}%` }}
          transition={{ type: "spring", stiffness: 160, damping: 22 }}
        />
      </div>
    </div>
  )
}

export default function ResolutionLinter() {
  const [text, setText] = useState("")
  const [exampleId, setExampleId] = useState<string>("")
  const [showingRewrite, setShowingRewrite] = useState(false)
  const [copied, setCopied] = useState(false)
  const [open, setOpen] = useState<string | null>(null)

  const result = useMemo(() => lint(text), [text])
  const example = EXAMPLES.find((e) => e.id === exampleId) ?? null

  function loadExample(id: string) {
    const ex = EXAMPLES.find((e) => e.id === id)
    if (!ex) return
    setExampleId(id)
    setText(ex.text)
    setShowingRewrite(false)
    setOpen(null)
  }

  function toggleRewrite() {
    if (!example?.rewrite) return
    setText(showingRewrite ? example.text : example.rewrite)
    setShowingRewrite(!showingRewrite)
    setOpen(null)
  }

  async function copyReport() {
    try {
      await navigator.clipboard.writeText(report(text))
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard blocked (insecure origin, or denied). The report is still
         on screen, so failing silently is better than an alert. */
    }
  }

  const empty = text.trim().length === 0

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,44%)_minmax(0,1fr)] lg:items-start">
      {/* ------------------------------------------------------------ input */}
      {/* min-w-0 on both columns: grid items default to min-width:auto, so the
          long monospace excerpts and the textarea's intrinsic width would force
          the track wider than the viewport and scroll the whole page sideways. */}
      <div className="min-w-0 space-y-4 lg:sticky lg:top-24">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label htmlFor="rules" className="text-sm font-medium">
            Resolution criteria
          </label>
          <Select value={exampleId} onValueChange={loadExample}>
            <SelectTrigger className="h-9 w-[240px] text-xs">
              <SelectValue placeholder="Load a real market..." />
            </SelectTrigger>
            <SelectContent>
              {EXAMPLES.map((e) => (
                <SelectItem key={e.id} value={e.id} className="text-xs">
                  {e.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Textarea
          id="rules"
          value={text}
          spellCheck={false}
          onChange={(e) => {
            setText(e.target.value)
            setShowingRewrite(false)
          }}
          placeholder="Paste the market question and its resolution criteria."
          className="min-h-[340px] resize-y font-mono text-[13px] leading-relaxed"
        />

        <AnimatePresence initial={false}>
          {example && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <p className="border-l-2 border-primary/40 pl-3 text-xs leading-relaxed text-muted-foreground">
                {example.receipt}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setText("")
              setExampleId("")
              setShowingRewrite(false)
            }}
          >
            <RotateCcw className="mr-2 h-3.5 w-3.5" />
            Clear
          </Button>
          {example?.rewrite && (
            <Button variant={showingRewrite ? "default" : "outline"} size="sm" onClick={toggleRewrite}>
              <Wand2 className="mr-2 h-3.5 w-3.5" />
              {showingRewrite ? "Show the original" : "Show the rewrite"}
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={copyReport} disabled={empty}>
            {copied ? <Check className="mr-2 h-3.5 w-3.5" /> : <Copy className="mr-2 h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy report"}
          </Button>
        </div>
      </div>

      {/* ----------------------------------------------------------- output */}
      <div className="min-w-0 space-y-4">
        {empty ? (
          <Card className="border-dashed">
            <CardContent className="space-y-3 p-6 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Nothing to lint yet.</p>
              <p>
                Load one of the four markets on the left. Three of them are real markets that resolved
                into a dispute, and one is a control showing how the same rules should read.
              </p>
              <p>
                {result.rulesRun} rules run on every keystroke. No model call, no network request. The
                argument is that this class of failure is catchable by a checklist nobody runs.
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card>
              <CardContent className="flex flex-wrap items-end justify-between gap-6 p-6">
                <div className="min-w-[160px]">
                  <ScoreDial score={result.score} tone={result.verdict.tone} />
                </div>
                <div className="space-y-1">
                  <div className={cn("text-lg font-semibold", VERDICT_META[result.verdict.tone].text)}>
                    {result.verdict.label}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {result.counts.blocker} blocker, {result.counts.major} major, {result.counts.minor}{" "}
                    minor
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {result.rulesRun} rules, {result.grouped.length} fired
                  </div>
                </div>
              </CardContent>
            </Card>

            {result.grouped.length === 0 && (
              <Card className="border-emerald-500/30 bg-emerald-500/[0.06]">
                <CardContent className="p-6 text-sm">
                  <p className="font-medium text-emerald-600 dark:text-emerald-400">
                    No rule fired.
                  </p>
                  <p className="mt-1 text-muted-foreground">
                    The source is named, the deadline is an instant, the unresolvable case has an
                    instruction, and no adjective is doing work a number should do.
                  </p>
                </CardContent>
              </Card>
            )}

            <div className="space-y-2">
              {result.grouped.map((g) => {
                const meta = SEV_META[g.severity]
                const isOpen = open === g.id
                return (
                  <Card key={g.id} className={cn("overflow-hidden border", meta.ring)}>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : g.id)}
                      aria-expanded={isOpen}
                      className="flex w-full items-start gap-3 p-4 text-left transition-colors hover:bg-foreground/[0.03]"
                    >
                      <span className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", meta.dot)} />
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="font-medium">{g.label}</span>
                          <Badge variant="outline" className={cn("text-[10px]", meta.text)}>
                            {meta.label}
                          </Badge>
                          {g.hits.length > 1 && (
                            <span className="text-xs text-muted-foreground">
                              {g.hits.length} places
                            </span>
                          )}
                        </span>
                        {!isOpen && (
                          <span className="mt-1 block truncate font-mono text-xs text-muted-foreground">
                            {g.hits[0].excerpt}
                          </span>
                        )}
                      </span>
                      <ChevronDown
                        className={cn(
                          "mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                          isOpen && "rotate-180"
                        )}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.18 }}
                          className="overflow-hidden"
                        >
                          <Separator />
                          <div className="space-y-4 p-4 text-sm">
                            <div className="flex flex-wrap gap-1.5">
                              {g.hits.slice(0, 8).map((h, i) => (
                                <code
                                  key={i}
                                  className="max-w-full break-all rounded bg-muted px-1.5 py-0.5 font-mono text-xs"
                                  title={h.note}
                                >
                                  {h.excerpt}
                                </code>
                              ))}
                              {g.hits.length > 8 && (
                                <span className="self-center text-xs text-muted-foreground">
                                  +{g.hits.length - 8} more
                                </span>
                              )}
                            </div>
                            <div>
                              <div className="mb-1 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                <AlertTriangle className="h-3 w-3" />
                                Why it disputes
                              </div>
                              <p className="leading-relaxed text-muted-foreground">{g.why}</p>
                            </div>
                            <div>
                              <div className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                The fix
                              </div>
                              <p className="leading-relaxed">{g.fix}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
