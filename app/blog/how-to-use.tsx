"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CursorFollower from "@/components/cursor-follower"
import ScrollProgress from "@/components/scroll-progress"

export default function HowToUse() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <main className="min-h-screen">
      <CursorFollower />
      <ScrollProgress />
      <Navbar />

      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4 md:px-6">
          <div ref={ref} className="space-y-12 max-w-3xl mx-auto">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  <Button variant="ghost" size="sm" className="group">
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to Blog
                  </Button>
                </Link>
              </div>

              <motion.h1
                className="text-3xl md:text-4xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
              >
                How to Use the Blog CMS
              </motion.h1>
            </div>

            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Overview</h2>
                <p className="text-muted-foreground">
                  This portfolio uses a simple file-based MDX system for blog posts. MDX allows you to use JSX in your
                  markdown content, giving you the full power of React components within your blog posts.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">File Structure</h2>
                <p className="text-muted-foreground">
                  All blog posts are stored in the{" "}
                  <code className="bg-secondary/50 px-1 py-0.5 rounded">content/blog</code> directory. Each post is a
                  separate MDX file with a unique filename that becomes the URL slug.
                </p>
                <div className="bg-card rounded-lg border border-border p-4">
                  <pre className="text-sm overflow-auto">
                    content/ ├── blog/ │ ├── product-management-ai.mdx │ ├── building-saas-products.mdx │ ├──
                    ux-design-principles.mdx │ └── startup-journey.mdx
                  </pre>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Creating a New Post</h2>
                <p className="text-muted-foreground">
                  To create a new blog post, add a new MDX file to the{" "}
                  <code className="bg-secondary/50 px-1 py-0.5 rounded">content/blog</code> directory. The filename will
                  become the URL slug.
                </p>
                <p className="text-muted-foreground">
                  Each post must include frontmatter at the top of the file with the following fields:
                </p>
                <div className="bg-card rounded-lg border border-border p-4">
                  <pre className="text-sm overflow-auto">
                    {`---
title: "The Future of Product Management in the Age of AI"
date: "March 15, 2025"
description: "Exploring how artificial intelligence is transforming the role of product managers and what skills will be essential in the coming years."
category: "Product Management"
image: "/placeholder.svg?height=600&width=800"
readTime: "8 min read"
---

Your content goes here...`}
                  </pre>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Writing Content</h2>
                <p className="text-muted-foreground">
                  After the frontmatter, you can write your blog post content using Markdown syntax. You can also use
                  React components within your MDX files.
                </p>
                <div className="bg-card rounded-lg border border-border p-4">
                  <pre className="text-sm overflow-auto">
                    {`# Main Heading

This is a paragraph with **bold text** and *italic text*.

## Subheading

- List item 1
- List item 2
- List item 3

[This is a link](https://example.com)

![Alt text for image](/path/to/image.jpg)

\`\`\`javascript
// Code block
function hello() {
  console.log("Hello, world!");
}
\`\`\`

<CustomComponent prop="value" />`}
                  </pre>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Adding Images</h2>
                <p className="text-muted-foreground">
                  You can add images to your blog posts by placing them in the{" "}
                  <code className="bg-secondary/50 px-1 py-0.5 rounded">public</code> directory and referencing them in
                  your MDX files.
                </p>
                <div className="bg-card rounded-lg border border-border p-4">
                  <pre className="text-sm overflow-auto">
                    {`// Using the Image component from next/image
<Image 
  src="/blog/my-image.jpg" 
  alt="Description of the image" 
  width={800} 
  height={600} 
  className="rounded-lg"
/>`}
                  </pre>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Publishing</h2>
                <p className="text-muted-foreground">
                  To publish a new blog post, simply commit and push the MDX file to your repository. The blog will
                  automatically update with the new post.
                </p>
              </div>

              <div className="bg-card rounded-lg border border-border p-6 space-y-4">
                <h3 className="text-xl font-semibold">Need Help?</h3>
                <p className="text-muted-foreground">
                  If you need assistance with the blog CMS or have any questions, feel free to reach out.
                </p>
                <Button asChild className="group">
                  <Link href="/#contact">
                    Contact Me
                    <FileText className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

