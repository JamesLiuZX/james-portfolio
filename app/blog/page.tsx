import { getBlogPosts } from "@/lib/mdx"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default async function Blog() {
  const posts = await getBlogPosts()

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  <Button variant="ghost" size="sm" className="group">
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to Home
                  </Button>
                </Link>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold">Blog</h1>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Thoughts, insights, and experiences from my journey in product management, engineering, and
                entrepreneurship.
              </p>
            </div>

            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {posts.map((post) => (
                  <article key={post.slug} className="group">
                    <Link href={`/blog/${post.metadata.slug}`}>
                      <div className="space-y-4">
                        <div className="overflow-hidden rounded-lg">
                          <Image
                            src={post.metadata.image || "/placeholder.svg"}
                            alt={post.metadata.title}
                            width={800}
                            height={600}
                            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-4 w-4" />
                            <span>{post.metadata.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4" />
                            <span>{post.metadata.readTime}</span>
                          </div>
                        </div>

                        <div>
                          <div className="inline-flex items-center rounded-full bg-secondary/50 px-3 py-1 text-xs">
                            <Tag className="mr-1 h-3 w-3" />
                            {post.metadata.category}
                          </div>
                        </div>

                        <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          {post.metadata.title}
                        </h2>

                        <p className="text-muted-foreground">{post.metadata.description}</p>

                        <div className="pt-2">
                          <span className="text-sm font-medium text-primary">Read more →</span>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No blog posts found. Check back soon for new content!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

