import { MetadataRoute } from 'next'

// Enable ISR for sitemap - revalidates every hour or when manually triggered
export const revalidate = 3600 // 1 hour
export const dynamic = 'force-dynamic'

interface WordPressPost {
  slug: string
  modifiedGmt: string
  status: string
}

interface WordPressPage {
  slug: string
  modifiedGmt: string
  status: string
}

interface WordPressCategory {
  slug: string
  count: number
}

interface MenuItem {
  id: number
  name: string
  category: string
}

interface SitemapResponse {
  posts: { nodes: WordPressPost[] }
  pages: { nodes: WordPressPage[] }
  categories: { nodes: WordPressCategory[] }
}

async function fetchWordPressContent(): Promise<SitemapResponse | null> {
  try {
    console.log('🗺️ Generating dynamic sitemap from WordPress...')
    
    const query = `
      query SitemapQuery {
        posts(first: 1000, where: { status: PUBLISH }) {
          nodes {
            slug
            modifiedGmt
            status
          }
        }
        pages(first: 1000, where: { status: PUBLISH }) {
          nodes {
            slug
            modifiedGmt
            status
          }
        }
        categories(first: 100, where: { hideEmpty: true }) {
          nodes {
            slug
            count
          }
        }
      }
    `

    const response = await fetch('https://admin.texasroadhouse-menus.us/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      next: { 
        revalidate: 3600, // Cache for 1 hour
        tags: ['sitemap', 'posts', 'pages', 'categories'] 
      }
    })

    if (!response.ok) {
      console.error('❌ WordPress GraphQL request failed:', response.status)
      return null
    }

    const { data } = await response.json()
    console.log('✅ WordPress content fetched for sitemap')
    
    return data
  } catch (error) {
    console.error('❌ Error fetching WordPress content for sitemap:', error)
    return null
  }
}

async function fetchMenuItems(): Promise<MenuItem[]> {
  try {
    // Fetch menu items from your local data
    const menuData = await import('@/data/enhanced-menu-2025.json')
    return menuData.default || []
  } catch (error) {
    console.error('❌ Error fetching menu items for sitemap:', error)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://texasroadhouse-menus.us'
  const currentDate = new Date().toISOString()
  
  // Static pages with high priority
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/menus-prices`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/coupons`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gift-cards`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.7,
    },
  ]

  // Fetch WordPress content
  const wordpressContent = await fetchWordPressContent()
  let dynamicPages: MetadataRoute.Sitemap = []

  if (wordpressContent) {
    // Add blog posts
    const blogPosts = wordpressContent.posts.nodes
      .filter(post => post.status === 'publish')
      .map(post => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.modifiedGmt || currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }))

    // Add WordPress pages
    const wpPages = wordpressContent.pages.nodes
      .filter(page => page.status === 'publish')
      .map(page => ({
        url: `${baseUrl}/${page.slug}`,
        lastModified: page.modifiedGmt || currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))

    // Add category pages
    const categoryPages = wordpressContent.categories.nodes
      .filter(category => category.count > 0)
      .map(category => ({
        url: `${baseUrl}/category/${category.slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }))

    dynamicPages = [...blogPosts, ...wpPages, ...categoryPages]
    
    console.log(`📝 Added ${blogPosts.length} blog posts to sitemap`)
    console.log(`📄 Added ${wpPages.length} WordPress pages to sitemap`)
    console.log(`🏷️ Added ${categoryPages.length} category pages to sitemap`)
  }

  // Fetch and add menu items
  const menuItems = await fetchMenuItems()
  const menuPages = menuItems.map(item => ({
    url: `${baseUrl}/menu/${item.id}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  if (menuItems.length > 0) {
    console.log(`🍽️ Added ${menuItems.length} menu items to sitemap`)
  }

  const allPages = [...staticPages, ...dynamicPages, ...menuPages]
  
  console.log(`✅ Generated sitemap with ${allPages.length} total URLs`)
  
  return allPages
}
