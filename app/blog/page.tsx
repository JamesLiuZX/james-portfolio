import { getBlogPosts } from "@/lib/mdx"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Clock } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageHeader from "@/components/page-header"

/** Posts without real artwork fall back to a typographic row. */
const hasArtwork = (image?: string) => Boolean(image) && !image!.startsWith("/placeholder")

export default async function Blog() {
  const posts = await getBlogPosts()

  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <PageHeader
          eyebrow="Writing"
          title={
            <>
              Notes on product, <span className="serif-accent text-brand">AI</span> and
              building things.
            </>
          }
          lede="Book breakdowns, product teardowns and the occasional deep dive into whatever I've been reading lately."
        />

        <section className="shell pb-24 md:pb-32">
          {posts.length > 0 ? (
            <ol className="border-t border-border/70">
              {posts.map((post, index) => (
                <li key={post.slug}>
                  <article className="group relative border-b border-border/70">
                    <div className="flex items-start gap-5 py-8 transition-transform duration-500 ease-out-expo group-hover:translate-x-1 md:gap-8 md:py-10">
                      <span className="hidden pt-1 font-mono text-[11px] tracking-[0.12em] text-subtle sm:block">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {hasArtwork(post.metadata.image) && (
                        <div className="relative hidden h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-surface-muted md:block">
                          <Image
                            src={post.metadata.image}
                            alt={post.metadata.title}
                            fill
                            sizes="112px"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                      )}

                      <div className="min-w-0 flex-1 space-y-3">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">
                          {post.metadata.category && (
                            <span className="text-brand">{post.metadata.category}</span>
                          )}
                          {post.metadata.date && <span>{post.metadata.date}</span>}
                          {post.metadata.readTime && (
                            <span className="inline-flex items-center gap-1.5">
                              <Clock className="h-3 w-3" />
                              {post.metadata.readTime}
                            </span>
                          )}
                        </div>

                        <h2 className="max-w-2xl text-xl font-semibold leading-snug tracking-tight transition-colors duration-300 group-hover:text-brand md:text-2xl">
                          {post.metadata.title}
                        </h2>

                        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                          {post.metadata.description}
                        </p>
                      </div>

                      <span
                        aria-hidden="true"
                        className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:border-brand/40 group-hover:bg-brand group-hover:text-brand-foreground"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>

                    <Link
                      href={`/blog/${post.metadata.slug}`}
                      className="absolute inset-0"
                      aria-label={`Read ${post.metadata.title}`}
                    />
                  </article>
                </li>
              ))}
            </ol>
          ) : (
            <div className="card-surface px-6 py-20 text-center">
              <p className="text-muted-foreground">
                No posts yet — check back soon for new writing.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  )
}
