import { MetadataRoute } from 'next'

// Enable ISR for sitemap - revalidates every hour or when manually triggered
export const revalidate = 3600 // 1 hour

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

interface SitemapResponse {
  posts: { nodes: WordPressPost[] }
  pages: { nodes: WordPressPage[] }
  categories: { nodes: WordPressCategory[] }
}

async function fetchWordPressContent(): Promise<SitemapResponse | null> {
  try {
    console.log('🗺️ Fetching WordPress content for sitemap...')
    
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

    const graphqlEndpoint = process.env.WORDPRESS_GRAPHQL_ENDPOINT || 'https://admin.texasroadhouse-menus.us/graphql'
    
    const response = await fetch(graphqlEndpoint, {
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
      console.error('❌ WordPress GraphQL request failed:', response.status, response.statusText)
      return null
    }

    const result = await response.json()
    
    if (result.errors) {
      console.error('❌ GraphQL errors:', result.errors)
      return null
    }

    console.log('✅ WordPress content fetched for sitemap')
    return result.data
    
  } catch (error) {
    console.error('❌ Error fetching WordPress content for sitemap:', error)
    return null
  }
}

// Helper function to safely format dates for sitemap
function formatSitemapDate(dateString: string | null | undefined): string {
  if (!dateString) {
    return new Date().toISOString()
  }
  
  try {
    const date = new Date(dateString)
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      console.warn(`⚠️ Invalid date format: ${dateString}, using current date`)
      return new Date().toISOString()
    }
    
    return date.toISOString()
  } catch (error) {
    console.warn(`⚠️ Date parsing error for: ${dateString}, using current date`)
    return new Date().toISOString()
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const baseUrl = 'https://texasroadhouse-menus.us'
    const currentDate = new Date().toISOString()
    
    console.log('🗺️ Generating sitemap...')
    
    // Static pages with high priority (always included)
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

    let dynamicPages: MetadataRoute.Sitemap = []

    // Try to fetch WordPress content (non-blocking)
    try {
      const wordpressContent = await fetchWordPressContent()
      
      if (wordpressContent) {
        // Add blog posts
        const blogPosts = wordpressContent.posts?.nodes
          ?.filter(post => post.status === 'publish')
          ?.map(post => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: formatSitemapDate(post.modifiedGmt),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
          })) || []

        // Add WordPress pages
        const wpPages = wordpressContent.pages?.nodes
          ?.filter(page => page.status === 'publish')
          ?.map(page => ({
            url: `${baseUrl}/${page.slug}`,
            lastModified: formatSitemapDate(page.modifiedGmt),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
          })) || []

        // Add category pages
        const categoryPages = wordpressContent.categories?.nodes
          ?.filter(category => category.count > 0)
          ?.map(category => ({
            url: `${baseUrl}/category/${category.slug}`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.7,
          })) || []

        dynamicPages = [...blogPosts, ...wpPages, ...categoryPages]
        
        console.log(`📝 Added ${blogPosts.length} blog posts to sitemap`)
        console.log(`📄 Added ${wpPages.length} WordPress pages to sitemap`)
        console.log(`🏷️ Added ${categoryPages.length} category pages to sitemap`)
      }
    } catch (error) {
      console.warn('⚠️ WordPress content fetch failed, using static sitemap only:', error)
    }

    const allPages = [...staticPages, ...dynamicPages]
    
    console.log(`✅ Generated sitemap with ${allPages.length} total URLs`)
    
    return allPages
    
  } catch (error) {
    console.error('❌ Critical error generating sitemap:', error)
    
    // Fallback: Return minimal static sitemap
    const baseUrl = 'https://texasroadhouse-menus.us'
    const currentDate = new Date().toISOString()
    
    return [
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
    ]
  }
}