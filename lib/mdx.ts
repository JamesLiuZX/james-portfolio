import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPostMetadata {
  title: string
  date: string
  description: string
  category: string
  image: string
  readTime: string
  slug: string
}

export interface BlogPost {
  slug: string
  metadata: BlogPostMetadata
  content: string
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  // Get file names under /content/blog
  const fileNames = fs.readdirSync(postsDirectory)
  
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      // Remove ".mdx" from file name to get slug
      const slug = fileName.replace(/\.mdx$/, '')

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      // Use gray-matter to parse the post metadata section
      const { data, content } = matter(fileContents)

      // Combine the data with the slug
      return {
        slug,
        metadata: {
          ...data,
          slug: data.slug || slug,
        } as BlogPostMetadata,
        content,
      }
    })

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    const dateA = new Date(a.metadata.date)
    const dateB = new Date(b.metadata.date)
    return dateB.getTime() - dateA.getTime()
  })
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
  // Try to find the post by slug in the frontmatter first
  const fileNames = fs.readdirSync(postsDirectory)
  
  for (const fileName of fileNames) {
    if (!fileName.endsWith('.mdx')) continue
    
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    // Check if this file's slug matches
    if (data.slug === slug || fileName.replace(/\.mdx$/, '') === slug) {
      return {
        slug: data.slug || fileName.replace(/\.mdx$/, ''),
        metadata: data as BlogPostMetadata,
        content,
      }
    }
  }

  throw new Error(`Post with slug "${slug}" not found`)
}

export function getAllBlogSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory)
  
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      
      // Return the slug from frontmatter if it exists, otherwise use filename
      return data.slug || fileName.replace(/\.mdx$/, '')
    })
}