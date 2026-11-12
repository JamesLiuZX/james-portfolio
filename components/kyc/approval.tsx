import type { CSSProperties } from "react"
import Link from "next/link"
import { FileText, Github, Instagram, Linkedin } from "lucide-react"
import ApprovalForm from "@/components/kyc/approval-form"
import ChapterHead from "@/components/kyc/chapter-head"
import { Rosette, WaveBand } from "@/components/kyc/guilloche"
import { getBlogPosts } from "@/lib/mdx"
import { contact } from "@/lib/kyc"
import { RESUME_PATH } from "@/lib/site"

/** Step 05: approval. The decision, and the way in. */
export default async function Approval() {
  const posts = (await getBlogPosts()).slice(0, 6)

  return (
    <section id="approval" className="relative py-28 md:py-40">
      <span id="contact" aria-hidden="true" className="absolute top-0" />
      <div className="shell">
        <ChapterHead index={4} verdict="Approved" title={[{ text: "Approved.", className: "" }]} />

        <div className="observe relative mt-16 md:mt-20">
          <div className="relative overflow-hidden rounded-[22px] border border-ink/10 bg-paper-card shadow-[0_2px_4px_rgba(11,18,36,0.05),0_60px_100px_-60px_rgba(11,18,36,0.5)]">
            <WaveBand className="h-10 w-full text-violet" opacity={0.22} options={{ lines: 7, amplitude: 14, waves: 16, height: 60 }} />

            <div className="grid gap-12 px-6 pb-10 pt-8 md:px-12 md:pb-14 lg:grid-cols-12 lg:gap-14">
              {/* The decision */}
              <div className="relative lg:col-span-5">
                <p className="field text-ink-faint">Decision · File JL-01</p>
                <p className="stretch-wide mt-4 text-[clamp(1.8rem,3.2vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-ink">
                  Cleared for trading, AI agents and product.
                </p>
                <p className="mt-5 text-[15.5px] leading-relaxed text-ink-soft">
                  The account is open. Write about a role, a product, or an idea you can&apos;t stop thinking about: he replies to everything.
                </p>

                {/* Seal, then the stamp coming down on it */}
                <div className="relative mt-10 h-44 w-44">
                  <Rosette
                    className="absolute inset-0 h-full w-full"
                    draw
                    later
                    strokeWidth={2.2}
                    layers={[
                      { color: "#138a4a", opacity: 0.55, options: { curves: 8, base: 300, a: 80, n: 12, b: 20, m: 30 } },
                      { color: "#4434d9", opacity: 0.35, options: { curves: 6, base: 170, a: 50, n: 8, b: 14, m: 22, twist: 0.3 } },
                    ]}
                  />
                  <span className="approve-stamp absolute left-1/2 top-1/2 -ml-[5.5rem] -mt-7 inline-flex w-44 items-center justify-center rounded-md border-[3px] border-signal px-3 py-2 font-mono text-xl font-bold uppercase tracking-[0.24em] text-signal [filter:url(#stamp-ink)]" style={{ "--d": "1.6s" } as CSSProperties}>
                    Approved
                  </span>
                </div>
                <p className="serif-accent mt-6 text-2xl text-violet-deep">James Liu</p>
                <p className="field mt-1 text-ink-faint">Signed, and reviewed by himself</p>
              </div>

              {/* The final step */}
              <div className="lg:col-span-7">
                <p className="field text-ink-faint">Final step · Open a conversation</p>
                <div className="mt-5">
                  <ApprovalForm />
                </div>
              </div>
            </div>

            <div className="grid border-t border-ink/10 md:grid-cols-12">
              <div className="border-b border-ink/10 p-6 md:col-span-5 md:border-b-0 md:border-r md:p-8">
                <p className="field text-ink-faint">Documents on file</p>
                <ul className="mt-4 space-y-2.5 text-[15px]">
                  <li>
                    <a href={RESUME_PATH} download className="group inline-flex items-center gap-2.5 text-ink">
                      <FileText className="h-4 w-4 text-violet" />
                      <span className="link-underline">Résumé (PDF)</span>
                    </a>
                  </li>
                  <li>
                    <Link href="/projects" className="group inline-flex items-center gap-2.5 text-ink">
                      <FileText className="h-4 w-4 text-violet" />
                      <span className="link-underline">Every project</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/academic" className="group inline-flex items-center gap-2.5 text-ink">
                      <FileText className="h-4 w-4 text-violet" />
                      <span className="link-underline">Academic record</span>
                    </Link>
                  </li>
                </ul>
                <p className="field mt-8 text-ink-faint">Elsewhere</p>
                <div className="mt-3 flex gap-2.5">
                  {[
                    { name: "LinkedIn", href: contact.linkedin, icon: Linkedin },
                    { name: "GitHub", href: contact.github, icon: Github },
                    { name: "Instagram", href: contact.instagram, icon: Instagram },
                  ].map((item) => (
                    <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.name} className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 text-ink-soft transition-colors hover:border-violet/50 hover:text-ink">
                      <item.icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
              <div className="p-6 md:col-span-7 md:p-8">
                <p className="field text-ink-faint">Supporting documents · Writing</p>
                <ul className="mt-4 divide-y divide-ink/10">
                  {posts.map((post) => (
                    <li key={post.metadata.slug}>
                      <Link href={`/blog/${post.metadata.slug}`} className="group flex items-baseline justify-between gap-6 py-2.5">
                        <span className="text-[15px] text-ink transition-colors group-hover:text-violet">{post.metadata.title}</span>
                        <span className="shrink-0 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-faint">{post.metadata.category}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
