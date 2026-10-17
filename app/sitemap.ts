import type { MetadataRoute } from "next"
import { getBlogPosts } from "@/lib/mdx"
import { siteUrl } from "@/lib/site"

// Required for `output: 'export'` — the sitemap is generated once at build time.
export const dynamic = "force-static"

const staticPaths = [
  "",
  "/blog",
  "/projects",
  "/academic",
  "/projects/quorum",
  "/demos/quorum/",
  "/projects/kino",
  "/projects/askshop-ai",
  "/projects/calendare",
  "/projects/herbalbath-singapore",
  "/projects/nft-sentiment-predictor",
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts()

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${siteUrl}${path}`,
  }))

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.metadata.slug}`,
    lastModified: new Date(post.metadata.date),
  }))

  return [...staticEntries, ...blogEntries]
}
