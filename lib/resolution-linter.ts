// lib/resolution-linter.ts
//
// A deterministic linter for prediction-market resolution criteria.
//
// The thesis: most prediction-market disputes are not oracle failures, they are
// writing failures. Every rule below maps to a real class of dispute, and the
// loaded examples are real markets that went wrong in exactly the way the rule
// describes.
//
// No model call. Regex, a clause checklist, and a scoring function. That is the
// point: you do not need an LLM to catch this, you need a checklist that someone
// actually runs.
//
// This module is pure. It has no DOM and no React, so it can be unit tested and
// run on the server.

export type Severity = "blocker" | "major" | "minor";

export interface Hit {
  excerpt: string;
  note: string;
}

export interface Rule {
  id: string;
  label: string;
  severity: Severity;
  /** Why this class of wording causes disputes. */
  why: string;
  /** The concrete rewrite that removes the ambiguity. */
  fix: string;
  test: (t: string) => Hit[];
}

export interface Finding extends Hit {
  id: string;
  label: string;
  severity: Severity;
  why: string;
  fix: string;
}

export interface GroupedFinding extends Finding {
  hits: Finding[];
}

export interface Verdict {
  key: "block" | "work" | "ok";
  label: string;
  tone: "critical" | "warning" | "good";
}

export interface LintResult {
  findings: Finding[];
  grouped: GroupedFinding[];
  score: number;
  counts: Record<Severity, number>;
  verdict: Verdict;
  rulesRun: number;
}

const SEV: Record<Severity, number> = { blocker: 22, major: 12, minor: 5 };

export const SEVERITY_ORDER: Severity[] = ["blocker", "major", "minor"];

const SPORT_WORDS =
  /\b(match|game|fight|bout|race|series|final|semifinal|tournament|season|playoff)\b/i;

// A threshold is a number carrying a unit, not any digit in the text. Without
// the unit this matched dates and timestamps and fired on every clean market.
const HAS_THRESHOLD =
  /\b\d[\d,]*(\.\d+)?\s?(%|percent|bps|basis points?|points?|dollars?|usd|btc|eth|shares?|contracts?)\b/i;

/* ---------------------------------------------------------------- helpers */

function matchAll(text: string, re: RegExp): Hit[] {
  const out: Hit[] = [];
  const seen = new Set<string>();
  for (const m of text.matchAll(re)) {
    const key = m[0].toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ excerpt: m[0], note: contextOf(text, m.index ?? 0, m[0].length) });
  }
  return out;
}

function contextOf(text: string, at: number, len: number): string {
  const s = Math.max(0, at - 34);
  const e = Math.min(text.length, at + len + 34);
  return `${s > 0 ? "..." : ""}${text.slice(s, e).replace(/\s+/g, " ")}${
    e < text.length ? "..." : ""
  }`;
}

function sentencesOf(t: string): string[] {
  return t.split(/(?<=[.!?])\s+|\n+/).filter((s) => s.trim().length > 3);
}

const trim = (s: string, n: number) => (s.length > n ? `${s.slice(0, n).trim()}...` : s.trim());

/* ------------------------------------------------------------------ rules */

export const RULES: Rule[] = [
  {
    id: "no-source",
    label: "No named source of truth",
    severity: "blocker",
    why: "If the text does not name who decides, the oracle decides what the text meant. That is where token-weighted voting starts mattering more than the event.",
    fix: 'Name one primary source and one fallback: "per the official classification published at <URL> by <body>. If unavailable, <secondary source>."',
    test: (t) => {
      // Three ways a source can be named, any one of which counts:
      // an explicit attribution phrase, a "<verb> by/at <someone>" clause
      // (which must tolerate "as FIRST published by"), or a bare domain.
      const attribution = /\b(according to|per the|source of truth|resolution source|based on data from)\b/i;
      const byClause =
        /\b(published|reported|announced|determined|recorded|stated|filed|released|calculated)\s+(by|at|with|on|in)\s+\S/i;
      const domain = /\b[a-z0-9-]+\.(gov|com|org|io|net|co|edu)\b/i;
      return attribution.test(t) || byClause.test(t) || domain.test(t)
        ? []
        : [{ excerpt: "(absent)", note: "no resolution source named anywhere in the text" }];
    },
  },
  {
    id: "no-timezone",
    label: "Deadline without a timezone",
    severity: "blocker",
    why: "A market that closes 'on March 31' closes at different moments for the trader, the source, and the resolver. Disputes cluster in that gap.",
    fix: 'Write the instant, not the day: "before 23:59:59 UTC on 2026-03-31".',
    test: (t) => {
      const hasDate =
        /\b(20\d\d-\d{2}-\d{2}|\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+\d{1,2}|\b\d{1,2}\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec))/i.test(
          t
        ) || /\b(before|by|prior to|deadline|expires?|closes?)\b/i.test(t);
      const hasTz =
        /\b(utc|gmt|z\b|est|edt|et\b|pst|pdt|pt\b|cet|sgt|jst|local time|[+-]\d{2}:\d{2})\b/i.test(t);
      return hasDate && !hasTz
        ? [{ excerpt: "(absent)", note: "a date or deadline is present but no timezone is fixed" }]
        : [];
    },
  },
  {
    id: "no-source-failure",
    label: "No fallback if the source fails",
    severity: "major",
    why: "Sources get delayed, revised, paywalled, and retracted. If the text is silent, every one of those becomes a judgement call made after money is at risk.",
    fix: 'Add: "If <source> has not published by <instant>, resolution defers to <secondary>. If <source> later revises, the first published value stands."',
    test: (t) =>
      /\b(if|where|should|unless)\b[^.]{0,80}\b(unavailable|not published|has not|have not|does not publish|do not publish|neither|fails? to|delayed|silent|revis|retract|conflict|withdrawn|annulled|amended|superseded)\b/i.test(
        t
      ) || /\bin the event (that )?(the )?(source|data|report|filing)\b/i.test(t)
        ? []
        : [{ excerpt: "(absent)", note: "no clause covers a late, revised, or conflicting source" }],
  },
  {
    id: "no-void-rule",
    label: "No void / tie / N-A rule",
    severity: "major",
    why: "When an event becomes unresolvable, an oracle with no instruction can settle the market 50-50. Nobody was wrong about the world. The sentence was just unwriteable.",
    fix: 'State it: "If the event does not occur by <instant>, the market resolves NO" or "...voids and all positions are refunded."',
    test: (t) => {
      const vocabulary =
        /\b(void(s|ed|ing)?|invalid(ated)?|refund(s|ed|ing)?|cancel(s|led|ed|lation)?|tie(s|d)?|draw|50-50|50\/50|n\/a|does not occur|fails to occur|no official result)\b/i;
      // "If X has not published by <instant>, this market resolves NO" is a
      // complete instruction for the unresolvable case even with no void word.
      const explicitFallthrough =
        /\b(if|where|unless|should)\b[^.]{0,120}\b(not|neither|fails?|no )\b[^.]{0,120}\bresolves?\s+(yes|no)\b/i;
      return vocabulary.test(t) || explicitFallthrough.test(t)
        ? []
        : [{ excerpt: "(absent)", note: "no instruction for the unresolvable case" }];
    },
  },
  {
    id: "no-edge-cases",
    label: "Sports market with no abandonment rule",
    severity: "major",
    why: "Postponement, abandonment, forfeit, walkover, and extra time are not rare. Over a season they are the single largest source of settlement tickets.",
    fix: 'Enumerate them: "Extra time and penalties count. A match postponed beyond <instant> resolves NO. An abandoned match resolves per <governing body> official result."',
    test: (t) => {
      if (!SPORT_WORDS.test(t)) return [];
      return /\b(postpon|abandon|forfeit|walkover|suspend|rescheduled|extra time|overtime|penalt|replay|no contest|retire)\b/i.test(
        t
      )
        ? []
        : [{ excerpt: "(absent)", note: "sports event with no postponement or abandonment clause" }];
    },
  },
  {
    id: "subjective-adjective",
    label: "Subjective adjective doing load-bearing work",
    severity: "blocker",
    why: "These words feel precise while carrying no test. Two honest readers land on opposite settlements and both can defend it.",
    fix: "Replace each with a threshold and a source. 'Significant' becomes a number. 'Officially' becomes a named publisher.",
    test: (t) =>
      matchAll(
        t,
        /\b(significant(ly)?|major|substantial(ly)?|material(ly)?|widely|successful(ly)?|meaningful|credible|notable|reasonable|appropriate|properly|acceptable|clearly|effectively|essentially|largely|primarily)\b/gi
      ),
  },
  {
    id: "unbounded-time",
    label: "Unbounded time reference",
    severity: "blocker",
    why: "A market with no terminal instant cannot be settled, only argued about. It also cannot be priced, because the discount rate is undefined.",
    fix: "Every temporal phrase resolves to a timestamp. If you cannot write one, the market is not listable.",
    test: (t) =>
      matchAll(
        t,
        /\b(soon|in the near future|eventually|at some point|in due course|shortly|imminent(ly)?|end of (the )?(year|month|quarter|season)(?!\s+on)|by year[- ]end)\b/gi
      ),
  },
  {
    id: "announce-vs-complete",
    label: "Announcement and completion conflated",
    severity: "major",
    why: "A deal announced is not a deal signed is not a deal closed. Markets that do not pick one settle on whichever the largest holder argues for.",
    fix: 'Pick the earliest verifiable one and say so: "resolves YES on public announcement by <party>, regardless of whether the transaction later closes."',
    test: (t) => {
      const ann = /\b(announce[sd]?|announcement|reveal(s|ed)?|confirms?)\b/i.test(t);
      const comp =
        /\b(complete[sd]?|completion|clos(e|es|ed|ing)|finaliz|execut(e|ed)|sign(s|ed)?|settle[sd]?)\b/i.test(
          t
        );
      // If the text explicitly designates one of the two, it has already done
      // the thing this rule asks for.
      const designated =
        /\b(is not sufficient|are not sufficient|does not qualify|do not qualify|regardless of whether|is required|alone does not|is insufficient)\b/i.test(
          t
        );
      return ann && comp && !designated
        ? [{ excerpt: "announce + complete", note: "both trigger words present, neither is designated" }]
        : [];
    },
  },
  {
    id: "weasel-quantifier",
    label: "Approximate number in a threshold",
    severity: "major",
    why: "'Approximately 10,000' has no edge. The dispute is always about the boundary case, so the boundary is the only part that matters.",
    fix: "State the comparison exactly: 'at or above 10,000' or 'strictly greater than 10,000'.",
    test: (t) => matchAll(t, /\b(approximately|around|roughly|about|nearly|almost|close to|circa|~)\s*\d/gi),
  },
  {
    id: "passive-determiner",
    label: "Passive verb with no actor",
    severity: "major",
    why: "'Is deemed' by whom. The passive voice hides the exact fact the resolver needs, which is the identity of the decider.",
    fix: "Name the actor: 'as determined by <named body>'.",
    test: (t) => {
      const hits = matchAll(
        t,
        /\b(is|are|will be|shall be|has been|have been)\s+(confirmed|determined|deemed|considered|judged|verified|established|recognized|recognised|accepted|declared)\b/gi
      );
      return hits.filter((h) => {
        const at = t.indexOf(h.excerpt);
        const after = t.slice(at + h.excerpt.length, at + h.excerpt.length + 40);
        return !/\bby\s+[A-Z"']/.test(after) && !/\bby the\b/i.test(after);
      });
    },
  },
  {
    id: "ambiguous-deadline",
    label: "Inclusive or exclusive deadline is undefined",
    severity: "major",
    why: "'Before April' excludes April 1. 'By April' probably includes it. The two readings are one day apart and that day is where the money sits.",
    fix: "Use an instant with an explicit operator: 'at or before 23:59:59 UTC on 2026-03-31'.",
    test: (t) => {
      const hits = matchAll(t, /\b(before|by|prior to|through|until)\s+(the\s+)?[A-Z0-9]/g);
      const explicit = /\b(at or before|on or before|inclusive|exclusive|23:59|00:00|end of day)\b/i.test(t);
      return explicit ? [] : hits;
    },
  },
  {
    id: "compound-condition",
    label: "Compound condition with no grouping",
    severity: "major",
    why: "'A and B or C' has two readings. Traders price one, the resolver applies the other.",
    fix: "Break into a numbered list, or parenthesise: '(A and B) or C'.",
    test: (t) =>
      sentencesOf(t)
        .filter((s) => {
          // "at or before" and "at or above" are fixed comparison phrases, not
          // disjunctions. Counting their "or" flags every well-written deadline.
          const cleaned = s.replace(/\b(at|on)\s+or\s+(above|below|before|after|later|earlier|equal)\b/gi, " ");
          const ands = (cleaned.match(/\band\b/gi) || []).length;
          const ors = (cleaned.match(/\bor\b/gi) || []).length;
          return ands >= 1 && ors >= 1 && !/[()]/.test(s) && !/^\s*\d+[.)]/.test(s);
        })
        .map((s) => ({ excerpt: trim(s, 110), note: "mixes AND and OR without grouping" })),
  },
  {
    id: "any-all-scope",
    label: "Quantifier scope undefined",
    severity: "minor",
    why: "'Any of the following' and 'all of the following' are opposite tests, and 'the following' is often a list of three things where only two are checkable.",
    fix: "Say the count: 'at least one of', 'each of the three'.",
    test: (t) =>
      matchAll(t, /\b(any|all|either|each)\s+(of\s+)?(the\s+)?(following|these|them|criteria|conditions)\b/gi),
  },
  {
    id: "undefined-superlative",
    label: "Superlative with no tie-break",
    severity: "minor",
    why: "'The largest' and 'the first' both have tie cases, and ties in a binary market have to go somewhere.",
    fix: "Add the tie-break rule and the measurement instant.",
    test: (t) => {
      // "the first published figure" is a precision clause, not a contest with
      // a tie case. Only fire on superlatives that rank competitors.
      const hits = matchAll(
        t,
        /\b(first|largest|highest|lowest|best|most|top|leading|biggest)\b(?!\s+(published|filed|reported|released|stated|announced|recorded|instance|publication|figure|value|print|filing))/gi
      );
      return /\b(tie|tied|tie-break|tiebreak|in the event of a tie)\b/i.test(t) ? [] : hits;
    },
  },
  {
    id: "no-rounding",
    label: "Threshold with no rounding or comparison rule",
    severity: "minor",
    why: "Sources publish to different precision than the market assumes. The revision that adds a decimal place flips the settlement.",
    fix: "State precision and operator: 'as published to one decimal place, resolves YES if at or above 3.0'.",
    test: (t) => {
      if (!HAS_THRESHOLD.test(t)) return [];
      return /\b(at or above|at or below|greater than or equal|less than or equal|>=|<=|rounded|round(s|ing)? to|decimal place|inclusive)\b/i.test(
        t
      )
        ? []
        : [
            {
              excerpt: "(absent)",
              note: "a numeric threshold exists with no comparison operator or precision",
            },
          ];
    },
  },
  {
    id: "vague-pronoun",
    label: "Sentence opens on an unanchored pronoun",
    severity: "minor",
    why: "Cheap to fix, and it is the difference between a rule and a paragraph about a rule.",
    fix: "Repeat the noun. Resolution text is not prose, repetition is a feature.",
    test: (t) =>
      sentencesOf(t)
        .filter((s) => /^(it|this|that|they|these|those)\b/i.test(s.trim()))
        .map((s) => ({ excerpt: trim(s, 90), note: "opens on a pronoun with no clear antecedent" })),
  },
];

/* ------------------------------------------------------------------- lint */

export function lint(text: string): LintResult {
  const findings: Finding[] = [];
  for (const rule of RULES) {
    const hits = rule.test(text || "");
    for (const h of hits) {
      findings.push({
        id: rule.id,
        label: rule.label,
        severity: rule.severity,
        why: rule.why,
        fix: rule.fix,
        excerpt: h.excerpt,
        note: h.note,
      });
    }
  }

  // A rule fires once for scoring even if it matched six times. Six vague
  // adjectives is one writing problem, not six.
  const byRule = new Map<string, Finding>();
  for (const f of findings) if (!byRule.has(f.id)) byRule.set(f.id, f);

  const penalty = [...byRule.values()].reduce((n, f) => n + SEV[f.severity], 0);
  const score = Math.max(0, 100 - penalty);

  const counts: Record<Severity, number> = {
    blocker: [...byRule.values()].filter((f) => f.severity === "blocker").length,
    major: [...byRule.values()].filter((f) => f.severity === "major").length,
    minor: [...byRule.values()].filter((f) => f.severity === "minor").length,
  };

  const verdict: Verdict =
    counts.blocker > 0 || score < 55
      ? { key: "block", label: "Do not list", tone: "critical" }
      : score < 80
        ? { key: "work", label: "Needs a rewrite", tone: "warning" }
        : { key: "ok", label: "Listable", tone: "good" };

  // Group multiple hits of one rule under a single card, ordered by severity.
  const grouped: GroupedFinding[] = [];
  for (const f of findings) {
    const existing = grouped.find((g) => g.id === f.id);
    if (existing) existing.hits.push(f);
    else grouped.push({ ...f, hits: [f] });
  }
  grouped.sort((a, b) => SEVERITY_ORDER.indexOf(a.severity) - SEVERITY_ORDER.indexOf(b.severity));

  return { findings, grouped, score, counts, verdict, rulesRun: RULES.length };
}

/* --------------------------------------------------------------- examples */

export interface Example {
  id: string;
  name: string;
  /** What actually happened, with the numbers. */
  receipt: string;
  text: string;
  rewrite: string | null;
}

export const EXAMPLES: Example[] = [
  {
    id: "ukraine",
    name: "Ukraine minerals (real, resolved wrong)",
    receipt:
      "Traded on Polymarket. Between 24 and 25 March 2025 the odds moved 9% to 100% and it resolved YES with no agreement reached. The attacker cast 5M UMA, about 25% of that resolution round.",
    text: `Will Ukraine agree to Trump's mineral deal before April?

This market will resolve YES if Ukraine officially agrees to the minerals deal before April. Otherwise it will resolve NO.

The resolution will be determined by credible reporting.`,
    rewrite: `Will Ukraine sign the US minerals agreement at or before 23:59:59 UTC on 2026-03-31?

Resolves YES if, at or before 23:59:59 UTC on 2026-03-31, the Cabinet of Ministers of Ukraine publishes a signed bilateral minerals agreement with the United States on kmu.gov.ua, or the US Department of State publishes the executed text on state.gov.

Announcement is not sufficient. A signed and published document is required. A framework, memorandum of understanding, or statement of intent does not qualify.

If neither source has published by the deadline, this market resolves NO. This market does not void.

If a signed text is published and later withdrawn, the first publication stands. The same applies if the agreement is annulled.`,
  },
  {
    id: "strategy-btc",
    name: "Strategy sells Bitcoin (real, $60M disputed)",
    receipt:
      "A $60M+ dispute over whether Strategy sold Bitcoin in May put UMA's token-voting oracle on trial. A WSJ investigation in May 2026 found that in most disputed markets, more than half the votes came from the ten largest wallets.",
    text: `Will Strategy sell Bitcoin in May?

Resolves YES if Strategy sells any significant amount of its Bitcoin holdings during May.

This will be determined by official company filings or credible reporting.`,
    rewrite: `Will Strategy report a decrease in total bitcoin holdings for May 2026?

Resolves YES if Strategy's total bitcoin held is lower at 2026-05-31 than at 2026-04-30. The figure is taken from the next Form 8-K or 10-Q filed with the SEC, as published on sec.gov.

The comparison uses total BTC count, not USD value. Any decrease, however small, resolves YES.

If the relevant filing has not been published by 23:59:59 UTC on 2026-08-15, this market resolves NO.

Press reports, executive statements, and on-chain analysis do not resolve this market. Only the SEC filing does.

If a filing is later amended, the first filed figure stands.`,
  },
  {
    id: "match",
    name: "Sports abandonment (the season-long ticket generator)",
    receipt:
      "Not one incident, a recurring class. Postponement, abandonment, forfeit and extra time are the largest steady source of settlement tickets across a season.",
    text: `Will Team A win the match on Saturday?

Resolves YES if Team A wins the match. Resolves NO if they do not.

The result will be confirmed after the game ends.`,
    rewrite: `Will Team A be the winner of the Team A vs Team B fixture scheduled 2026-08-15?

Resolves YES if Team A is recorded as the winner in the official result published by the competition organiser at <organiser URL>.

Extra time and penalty shootouts count toward the result. A draw after regulation, where the competition records no winner, resolves NO.

If the fixture is postponed and completed at or before 23:59:59 UTC on 2026-08-29, the market follows the rescheduled result. If the fixture is not completed by that instant, the market voids and all positions are refunded. An abandoned fixture with no official result recorded also voids.

If the organiser has not published an official result within 72 hours of the final whistle, the market voids.

A walkover or forfeit awarded to Team A resolves YES.`,
  },
  {
    id: "cpi",
    name: "CPI print (control: how it should read)",
    receipt:
      "Nothing broke here. This is what a market looks like when the sentence was written before the listing, not after the dispute.",
    text: `Will US CPI year-over-year for July 2026 come in at or above 3.0%?

Resolves YES if the year-over-year change in the US Consumer Price Index for All Urban Consumers (CPI-U, not seasonally adjusted), as first published by the Bureau of Labor Statistics at bls.gov, is at or above 3.0%.

The figure is read to one decimal place exactly as published. 2.95 rounded by BLS to 3.0 resolves YES. 3.04 published as 3.0 resolves YES.

Scheduled release is 2026-08-12 at 12:30 UTC. If BLS has not published by 23:59:59 UTC on 2026-08-26, this market voids and all positions are refunded.

Subsequent revisions do not change the resolution. The first published figure stands.`,
    rewrite: null,
  },
];

/** Plain-text report, for the copy button. */
export function report(text: string): string {
  const r = lint(text);
  const lines = [
    `RESOLUTION LINT REPORT`,
    `score ${r.score}/100  verdict: ${r.verdict.label}`,
    `${r.counts.blocker} blocker, ${r.counts.major} major, ${r.counts.minor} minor across ${r.rulesRun} rules`,
    ``,
  ];
  for (const g of r.grouped) {
    lines.push(`[${g.severity.toUpperCase()}] ${g.label}`);
    lines.push(`  why: ${g.why}`);
    lines.push(`  fix: ${g.fix}`);
    for (const h of g.hits.slice(0, 6)) lines.push(`  - ${h.excerpt}`);
    lines.push(``);
  }
  return lines.join("\n");
}
