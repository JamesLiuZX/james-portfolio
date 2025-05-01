import { getBlogPost } from "@/lib/mdx"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const { metadata, content } = await getBlogPost(params.slug)

    return (
      <main className="min-h-screen">
        <Navbar />

        <article className="pt-32 pb-20 md:pt-40 md:pb-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="space-y-8 max-w-3xl mx-auto">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                    <Button variant="ghost" size="sm" className="group">
                      <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                      Back to Blog
                    </Button>
                  </Link>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold">{metadata.title}</h1>

                <div className="flex flex-wrap gap-4 items-center text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    <span>{metadata.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>{metadata.readTime}</span>
                  </div>
                  <div className="inline-flex items-center rounded-full bg-secondary/50 px-3 py-1 text-xs">
                    <Tag className="mr-1 h-3 w-3" />
                    {metadata.category}
                  </div>
                </div>
              </div>

              {metadata.image && (
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src={metadata.image || "/placeholder.svg"}
                    alt={metadata.title}
                    width={1200}
                    height={675}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              <div className="prose prose-gray dark:prose-invert max-w-none">
                <div className="text-muted-foreground">
                  <p className="text-lg mb-4">{metadata.description}</p>
                  <p>This blog post is currently being updated. Please check back later for the full content.</p>
                </div>
              </div>
            </div>
          </div>
        </article>

        <Footer />
      </main>
    )
  } catch (error) {
    console.error("Error loading blog post:", error)
    notFound()
  }
}

