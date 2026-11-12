import type { CSSProperties } from "react"
import { cn } from "@/lib/utils"

type Piece = string | { text: string; className?: string }

/**
 * A headline whose words climb out of their own masks when it scrolls into
 * view (the inline observer adds `.is-in`). Screen readers get the sentence.
 */
export default function Rise({
  as: Tag = "h2",
  pieces,
  className,
  delay = 0,
}: {
  as?: "h1" | "h2" | "h3" | "p"
  pieces: Piece[]
  className?: string
  delay?: number
}) {
  const words: { text: string; className?: string }[] = []
  for (const piece of pieces) {
    const text = typeof piece === "string" ? piece : piece.text
    const pieceClass = typeof piece === "string" ? undefined : piece.className
    for (const word of text.split(/\s+/).filter(Boolean)) words.push({ text: word, className: pieceClass })
  }
  return (
    <Tag className={cn("rise", className)} style={{ "--delay": `${delay}s` } as CSSProperties}>
      <span className="sr-only">{words.map((word) => word.text).join(" ")}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <span key={index}>
            <span className="w">
              <span className={word.className} style={{ "--i": index } as CSSProperties}>
                {word.text}
              </span>
            </span>{" "}
          </span>
        ))}
      </span>
    </Tag>
  )
}
