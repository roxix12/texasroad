// Modern data fetching using Apollo Client GraphQL - Cleaned up version
import { 
  fetchPosts, 
  fetchPostBySlug, 
  fetchCategories, 
  fetchPostsByCategory, 
  fetchSiteSEO,
  fetchCategoryBySlug,
  fetchMenuItems 
} from './graphql/data-service'
import { Post as WPPost, WPCategory, Menu as MenuItem, SiteSEOResponse } from './types'
import { WORDPRESS_CONFIG } from './config'

// Posts functions - Refactored to use Apollo Client
export async function getPosts(
  first: number = 10, 
  after?: string
): Promise<{ posts: { nodes: WPPost[] }, pageInfo: any }> {
  try {
    // Validate parameters
    if (!first || first < 1) first = 10
    if (after && typeof after !== 'string') after = undefined

    const { posts, pageInfo, error } = await fetchPosts(first, after)
    
    if (error) {
      console.error('Error in getPosts:', error)
      // Return empty structure instead of throwing
      return {
        posts: { nodes: [] },
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: null,
          endCursor: null
        }
      }
    }
    
    // Ensure posts is an array
    const safePosts = Array.isArray(posts) ? posts : []
    
    return {
      posts: { nodes: safePosts },
      pageInfo: pageInfo || {}
    }
  } catch (error) {
    console.error('Critical error in getPosts:', error)
    return {
      posts: { nodes: [] },
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: null,
        endCursor: null
      }
    }
  }
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  try {
    // Validate slug parameter
    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
      console.error('Invalid slug provided to getPostBySlug:', slug)
      return null
    }

    const { post, error } = await fetchPostBySlug(slug.trim())
    
    if (error) {
      console.error(`Error fetching post "${slug}":`, error)
      return null
    }
    
    return post
  } catch (error) {
    console.error('Critical error in getPostBySlug:', error)
    return null
  }
}

// Categories functions - Refactored to use Apollo Client
export async function getCategories(): Promise<WPCategory[]> {
  const { categories, error } = await fetchCategories()
  
  if (error) {
    console.error('❌ Error fetching categories from WordPress:', error)
    return []
  }
  
  return categories
}

export async function getCategoryBySlug(slug: string): Promise<WPCategory | null> {
  const { category, error } = await fetchCategoryBySlug(slug)
  
  if (error) {
    console.error(`❌ Error fetching category "${slug}":`, error)
    return null
  }
  
  return category
}

export async function getPostsByCategory(
  categorySlug: string, 
  first: number = 10, 
  after?: string
): Promise<{ posts: { nodes: WPPost[] }, pageInfo: any }> {
  const { posts, pageInfo, error } = await fetchPostsByCategory(categorySlug, first, after)
  
  if (error) {
    console.error(`❌ Error fetching posts for category "${categorySlug}":`, error)
    return {
      posts: { nodes: [] },
      pageInfo: {}
    }
  }
  
  return {
    posts: { nodes: posts },
    pageInfo
  }
}

// Site SEO functions - Refactored to use Apollo Client
export async function getSiteSEOSettings(): Promise<SiteSEOResponse | null> {
  const { seo, error } = await fetchSiteSEO()
  
  if (error) {
    console.error('❌ Error fetching site SEO settings:', error)
    return null
  }
  
  return seo as SiteSEOResponse
}

// Menu functions - Refactored to use Apollo Client (if still needed)
export async function getMenus(
  first: number = 50,
  after?: string,
  filters?: any
): Promise<{ menus: { nodes: MenuItem[] }, pageInfo: any }> {
  const { menuItems, pageInfo, error } = await fetchMenuItems(first, after)
  
  if (error) {
    console.error('❌ Error fetching menu items:', error)
    return {
      menus: { nodes: [] },
      pageInfo: {}
    }
  }
  
  // Transform to match expected MenuItem interface
  const transformedMenus = menuItems.map((item: any) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    content: item.content,
    menuFields: item.menuFields || {
      price: 0,
      description: item.excerpt || '',
      category: 'General'
    },
    featuredImage: item.featuredImage
  }))
  
  return {
    menus: { nodes: transformedMenus },
    pageInfo
  }
}

export async function getMenuBySlug(slug: string): Promise<MenuItem | null> {
  // For now, fetch from posts since menu items are stored as posts
  const post = await getPostBySlug(slug)
  
  if (!post) {
    return null
  }
  
  // Transform post to MenuItem
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    content: post.content || '',
    menuFields: {
      price: 0,
      description: post.excerpt || '',
      category: 'General'
    },
    featuredImage: post.featuredImage
  }
}

// Helper function for backwards compatibility
export async function getAllPosts(): Promise<WPPost[]> {
  const { posts } = await getPosts(100) // Fetch more posts for sitemap generation
  return posts.nodes
}

// Featured menus function for homepage
export async function getFeaturedMenus(limit: number = 6): Promise<MenuItem[]> {
  const { menus } = await getMenus(limit)
  return menus.nodes
}

// Export configuration for backwards compatibility
export { WORDPRESS_CONFIG }