import { MetadataRoute } from 'next'
import { wpFetch } from './lib/wp'
import { WORDPRESS_CONFIG } from './lib/config'

// Revalidate sitemap every 60 seconds for real-time updates
export const revalidate = 60

interface SitemapPost {
  slug: string
  date: string
  uri?: string
}

interface SitemapPage {
  slug: string
  date: string
  uri?: string
}

interface SitemapCategory {
  slug: string
  name: string
}

interface SitemapData {
  posts?: {
    nodes: SitemapPost[]
  }
  pages?: {
    nodes: SitemapPage[]
  }
  categories?: {
    nodes: SitemapCategory[]
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = WORDPRESS_CONFIG.SITE_URL.replace(/\/$/, '') // Remove trailing slash

  // Static pages with priorities and change frequencies
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${siteUrl}/menus`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/posts`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${siteUrl}/legal`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  try {
    // Comprehensive GraphQL query for sitemap data
    const query = `
      query SitemapQuery {
        posts(first: 1000, where: { status: PUBLISH }) {
          nodes {
            slug
            date
            uri
            modified
          }
        }
        pages(first: 1000, where: { status: PUBLISH }) {
          nodes {
            slug
            date
            uri
            modified
          }
        }
        categories(first: 100, where: { hideEmpty: true }) {
          nodes {
            slug
            name
          }
        }
      }
    `

    console.log('🗺️ Generating dynamic sitemap from WordPress...')
    const data: SitemapData = await wpFetch(query, {}, {
      revalidate: 60, // Cache for 60 seconds
      tags: ['sitemap', 'posts', 'pages', 'categories']
    })

    const dynamicUrls: MetadataRoute.Sitemap = []

    // Add blog posts
    if (data?.posts?.nodes) {
      const postUrls = data.posts.nodes.map((post) => ({
        url: `${siteUrl}/posts/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
      dynamicUrls.push(...postUrls)
      console.log(`📝 Added ${postUrls.length} blog posts to sitemap`)
    }

    // Add WordPress pages (if any)
    if (data?.pages?.nodes) {
      const pageUrls = data.pages.nodes
        .filter(page => page.slug !== 'home') // Exclude home page if it exists
        .map((page) => ({
          url: `${siteUrl}/${page.slug}`,
          lastModified: new Date(page.date),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        }))
      dynamicUrls.push(...pageUrls)
      console.log(`📄 Added ${pageUrls.length} WordPress pages to sitemap`)
    }

    // Add category pages
    if (data?.categories?.nodes) {
      const categoryUrls = data.categories.nodes.map((category) => ({
        url: `${siteUrl}/categories/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.5,
      }))
      dynamicUrls.push(...categoryUrls)
      console.log(`🏷️ Added ${categoryUrls.length} category pages to sitemap`)
    }

    // Also add menu items from our existing data functions
    try {
      const { getMenus } = await import('./lib/data')
      const menus = await getMenus(1000) // Get all menu items
      
      const menuUrls = menus.map((menu) => ({
        url: `${siteUrl}/menus/${menu.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }))
      dynamicUrls.push(...menuUrls)
      console.log(`🍽️ Added ${menuUrls.length} menu items to sitemap`)
    } catch (error) {
      console.warn('⚠️ Could not load menu items for sitemap:', error)
    }

    const totalUrls = staticPages.length + dynamicUrls.length
    console.log(`✅ Generated sitemap with ${totalUrls} total URLs`)

    return [...staticPages, ...dynamicUrls]

  } catch (error) {
    console.error('❌ Error generating dynamic sitemap:', error)
    console.log('📋 Falling back to static pages only')
    
    // Return static pages if WordPress is unavailable
    return staticPages
  }
}

// Optional: Export function to manually trigger sitemap regeneration
export async function regenerateSitemap() {
  console.log('🔄 Manually regenerating sitemap...')
  return sitemap()
}
