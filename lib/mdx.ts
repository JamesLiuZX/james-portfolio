import fs from "fs"
import path from "path"
import matter from "gray-matter"

const root = process.cwd()

interface BlogPostMetadata {
  title: string
  date: string
  description: string
  category: string
  image: string
  readTime: string
  slug: string
}

export async function getBlogPosts() {
  try {
    const postsDirectory = path.join(root, "content", "blog")
    const filenames = fs.readdirSync(postsDirectory)

    const posts = filenames
      .filter((filename) => filename.endsWith(".mdx"))
      .map((filename) => {
        const filePath = path.join(postsDirectory, filename)
        const fileContents = fs.readFileSync(filePath, "utf8")
        const { data } = matter(fileContents)
        const slug = filename.replace(/\.mdx$/, "")

        return {
          slug,
          metadata: {
            ...data,
            slug,
          } as BlogPostMetadata,
        }
      })

    // Sort posts by date (newest first)
    return posts.sort((a, b) => {
      return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
    })
  } catch (error) {
    console.error("Error reading blog posts:", error)
    return []
  }
}

export async function getBlogPost(slug: string) {
  try {
    const realSlug = slug.replace(/\.mdx$/, "")
    const filePath = path.join(root, "content", "blog", `${realSlug}.mdx`)

    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      metadata: { ...data, slug: realSlug } as BlogPostMetadata,
      content,
    }
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error)
    throw new Error(`Blog post ${slug} not found`)
  }
}

