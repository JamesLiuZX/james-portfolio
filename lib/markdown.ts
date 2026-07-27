// lib/markdown.ts
//
// Block-level markdown to HTML, with no dependencies.
//
// This replaces an earlier inline converter in app/blog/[slug]/page.tsx that ran
// a sequence of global regexes over the whole document. That approach silently
// dropped anything it did not know about: tables rendered as literal pipe
// characters, "1." ordered lists rendered as literal text, "---" rules rendered
// as three dashes, and inline formatting was applied inside fenced code blocks.
//
// Parsing block by block fixes all of those, and lets fenced code and raw HTML
// be held out of inline processing entirely, which is the part that matters most
// for correctness.

/** Escape only where we are emitting text we did not generate. */
function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

/**
 * Inline formatting, applied to the text inside a block.
 * Order matters: code spans are pulled out first so their contents are never
 * treated as emphasis, then restored at the end.
 */
// Code spans are lifted out before the emphasis passes and put back after, so
// that `**not bold**` inside backticks stays literal. The sentinel is NUL, which
// cannot occur in a markdown source file.
const NUL = "\u0000"

function inline(src: string): string {
  const codes: string[] = []
  let s = src.replace(/`([^`]+)`/g, (_, code: string) => {
    codes.push(`<code>${escapeHtml(code)}</code>`)
    return `${NUL}${codes.length - 1}${NUL}`
  })

  // Images before links: the syntaxes differ only by the leading bang.
  s = s.replace(
    /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g,
    (_, alt: string, src2: string, title?: string) =>
      `<img src="${src2}" alt="${escapeHtml(alt)}"${title ? ` title="${escapeHtml(title)}"` : ""} />`
  )

  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label: string, href: string) => {
    const external = /^https?:\/\//.test(href)
    return `<a href="${href}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${label}</a>`
  })

  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
  s = s.replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>")

  return s.replace(/\u0000(\d+)\u0000/g, (_, i: string) => codes[Number(i)])
}

/** A markdown table: header row, delimiter row, then body rows. */
function renderTable(lines: string[]): string {
  const cells = (row: string) =>
    row
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((c) => c.trim())

  const head = cells(lines[0])
  const body = lines.slice(2).map(cells)

  return `<table>
<thead><tr>${head.map((c) => `<th>${inline(c)}</th>`).join("")}</tr></thead>
<tbody>${body
    .map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`)
    .join("\n")}</tbody>
</table>`
}

const isTableDelimiter = (s: string) => /^\|?[\s:-]*-[\s|:-]*\|?$/.test(s) && s.includes("-")

export function markdownToHtml(markdown: string): string {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n")
  const out: string[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // blank
    if (!line.trim()) {
      i++
      continue
    }

    // fenced code. Contents are escaped and never touched by inline().
    if (/^```/.test(line.trim())) {
      const lang = line.trim().slice(3).trim()
      const buf: string[] = []
      i++
      while (i < lines.length && !/^```/.test(lines[i].trim())) buf.push(lines[i++])
      i++ // closing fence
      out.push(
        `<pre><code${lang ? ` class="language-${lang}"` : ""}>${escapeHtml(buf.join("\n"))}</code></pre>`
      )
      continue
    }

    // horizontal rule, before any list or emphasis handling
    if (/^\s*([-*_])(\s*\1){2,}\s*$/.test(line)) {
      out.push("<hr />")
      i++
      continue
    }

    // heading
    const h = /^(#{1,6})\s+(.*)$/.exec(line)
    if (h) {
      const level = h[1].length
      out.push(`<h${level}>${inline(h[2].trim())}</h${level}>`)
      i++
      continue
    }

    // raw HTML block: emitted verbatim so <figure>, <img> and friends survive.
    if (/^\s*<(\/?)([a-zA-Z][\w-]*)/.test(line)) {
      const buf: string[] = []
      while (i < lines.length && lines[i].trim()) buf.push(lines[i++])
      out.push(buf.join("\n"))
      continue
    }

    // table
    if (line.includes("|") && i + 1 < lines.length && isTableDelimiter(lines[i + 1])) {
      const buf: string[] = []
      while (i < lines.length && lines[i].trim() && lines[i].includes("|")) buf.push(lines[i++])
      out.push(renderTable(buf))
      continue
    }

    // blockquote
    if (/^\s*>\s?/.test(line)) {
      const buf: string[] = []
      while (i < lines.length && /^\s*>\s?/.test(lines[i])) buf.push(lines[i++].replace(/^\s*>\s?/, ""))
      out.push(`<blockquote>${markdownToHtml(buf.join("\n"))}</blockquote>`)
      continue
    }

    // ordered list
    if (/^\s*\d+[.)]\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\s*\d+[.)]\s+/.test(lines[i])) {
        items.push(lines[i++].replace(/^\s*\d+[.)]\s+/, ""))
      }
      out.push(`<ol>${items.map((t) => `<li>${inline(t)}</li>`).join("")}</ol>`)
      continue
    }

    // unordered list
    if (/^\s*[-*+]\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) {
        items.push(lines[i++].replace(/^\s*[-*+]\s+/, ""))
      }
      out.push(`<ul>${items.map((t) => `<li>${inline(t)}</li>`).join("")}</ul>`)
      continue
    }

    // paragraph: consume until a blank line or the start of another block
    const buf: string[] = []
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{1,6}\s|```|\s*>\s?|\s*[-*+]\s+|\s*\d+[.)]\s+|\s*<)/.test(lines[i]) &&
      !/^\s*([-*_])(\s*\1){2,}\s*$/.test(lines[i])
    ) {
      buf.push(lines[i++])
    }
    if (buf.length) out.push(`<p>${inline(buf.join(" ").trim())}</p>`)
  }

  return out.join("\n")
}
