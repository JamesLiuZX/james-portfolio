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
      <main className="min-h-screen bg-background">
        <Navbar />

        <article className="pt-32 pb-20 md:pt-40 md:pb-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              {/* Back button */}
              <div className="mb-8">
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  <Button variant="ghost" size="sm" className="group">
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to Blog
                  </Button>
                </Link>
              </div>

              {/* Header */}
              <header className="space-y-6 mb-12">
                <div className="inline-flex items-center rounded-full bg-secondary/50 px-4 py-1.5 text-sm">
                  <Tag className="mr-2 h-4 w-4" />
                  {metadata.category}
                </div>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  {metadata.title}
                </h1>

                <p className="text-xl text-muted-foreground">
                  {metadata.description}
                </p>

                <div className="flex flex-wrap gap-6 items-center text-sm text-muted-foreground pt-4 border-t">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{metadata.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>{metadata.readTime}</span>
                  </div>
                </div>
              </header>

              {/* Featured Image */}
              {metadata.image && (
                <div className="rounded-xl overflow-hidden mb-12 shadow-lg">
                  <div className="relative w-full aspect-[16/9]">
                    <Image
                      src={metadata.image || "/placeholder.svg"}
                      alt={metadata.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              )}

              {/* Content */}
              <div 
                className="prose prose-lg prose-gray dark:prose-invert max-w-none
                  prose-headings:font-bold prose-headings:tracking-tight
                  prose-h1:text-4xl prose-h1:mb-8
                  prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                  prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                  prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-foreground prose-strong:font-semibold
                  prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
                  prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
                  prose-li:my-2 prose-li:text-muted-foreground
                  prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic
                  prose-code:text-primary prose-code:bg-secondary/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                  prose-pre:bg-secondary/50 prose-pre:border prose-pre:border-border prose-pre:rounded-lg
                  prose-img:rounded-lg prose-img:shadow-md
                  prose-hr:my-12 prose-hr:border-border"
                dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(content) }}
              />

              {/* Footer Navigation */}
              <div className="mt-16 pt-8 border-t">
                <Link href="/blog">
                  <Button variant="outline" size="lg" className="group">
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    View All Posts
                  </Button>
                </Link>
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

// Simple markdown to HTML converter
// In production, you'd want to use a proper MDX renderer like next-mdx-remote
function convertMarkdownToHtml(markdown: string): string {
  let html = markdown

  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>')
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>')
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>')

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')

  // Italic
  html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>')

  // Code blocks
  html = html.replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>')

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>')

  // Lists
  html = html.replace(/^\- (.*$)/gim, '<li>$1</li>')
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')

  // Paragraphs
  html = html.split('\n\n').map(paragraph => {
    if (paragraph.match(/^<[h|u|o|l|p]/)) {
      return paragraph
    }
    return `<p>${paragraph}</p>`
  }).join('\n')

  return html
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const { getAllBlogSlugs } = await import("@/lib/mdx")
  const slugs = getAllBlogSlugs()
  
  return slugs.map((slug) => ({
    slug: slug,
  }))
}