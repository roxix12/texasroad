import { Menu, MenusResponse, MenuResponse, Post, PostsResponse, PostResponse, CategoriesResponse, WPCategory, MenuFilters, SiteSEOResponse, GeneralSettings } from './types'
import { wpFetch, POSTS_QUERY, POST_BY_SLUG_QUERY, MENUS_QUERY, MENU_BY_SLUG_QUERY, CATEGORIES_QUERY, POSTS_BY_CATEGORY_QUERY, SITE_SEO_QUERY } from './wp'
import { WORDPRESS_CONFIG } from './config'

// Posts functions
export async function getPosts(
  first: number = 10, 
  after?: string, 
  before?: string,
  last?: number
): Promise<PostsResponse> {
  // Always use WordPress - no fallback to dummy data
  try {
    const variables: any = {}
    
    if (before && last) {
      // For previous page navigation
      variables.before = before
      variables.last = last
    } else {
      // For next page navigation or initial load
      variables.first = first
      if (after) variables.after = after
    }

    const response = await wpFetch<PostsResponse>(POSTS_QUERY, variables, {
      revalidate: 60, // 60 seconds for real-time updates
      tags: ['posts']
    })
    
    return response
  } catch (error) {
    console.error('❌ Error fetching posts from WordPress:', error)
    // Return empty response instead of crashing
    return {
      posts: {
        nodes: [],
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: null,
          endCursor: null,
        },
      },
    }
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  // Always use WordPress - no fallback to dummy data
  try {
    const response = await wpFetch<PostResponse>(POST_BY_SLUG_QUERY, { slug }, {
      revalidate: 60, // 60 seconds for real-time updates
      tags: ['posts', `post-${slug}`]
    })
    
    // Handle case where WordPress query fails but we still get a response
    if (!response) {
      console.error(`No response received for post "${slug}"`)
      return null
    }
    
    if (response.post && response.post.id) {
      return response.post
    }
    
    return null
  } catch (error) {
    console.error(`❌ Error fetching post "${slug}" from WordPress:`, error)
    return null
  }
}

export async function getPostsByCategory(
  categorySlug: string, 
  first: number = 10, 
  after?: string,
  before?: string,
  last?: number
): Promise<PostsResponse> {
  // Always use WordPress - no fallback to dummy data
  try {
    const variables: any = { categorySlug }
    
    if (before && last) {
      // For previous page navigation
      variables.before = before
      variables.last = last
    } else {
      // For next page navigation or initial load
      variables.first = first
      if (after) variables.after = after
    }

    const response = await wpFetch<PostsResponse>(POSTS_BY_CATEGORY_QUERY, variables, {
      revalidate: 60, // 60 seconds for real-time updates
      tags: ['posts', `category-${categorySlug}`]
    })

    return response
  } catch (error) {
    console.error(`❌ Error fetching posts for category "${categorySlug}":`, error)
    return {
      posts: {
        nodes: [],
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: null,
          endCursor: null,
        },
      },
    }
  }
}

// Menu functions
export async function getMenus(first: number = 20, after?: string): Promise<Menu[]> {
  // Always use WordPress - no fallback to dummy data
  try {
    const response = await wpFetch<MenusResponse>(MENUS_QUERY, { first, after }, {
      revalidate: 60, // 60 seconds for real-time updates
      tags: ['menus']
    })
    
    // Transform posts into menu items with default values for missing customFields
    const menus = response.posts.nodes.map(post => ({
      ...post,
      menuFields: {
        price: 0, // Default price
        description: post.excerpt || post.title || '',
        category: post.categories?.nodes?.[0]?.name || 'General',
        calories: undefined,
        allergens: undefined,
        isNew: false,
        isPopular: false
      }
    }))
    
    return menus
  } catch (error) {
    console.error('❌ Error fetching menus from WordPress:', error)
    // Return empty array instead of crashing
    return []
  }
}

export async function getMenuBySlug(slug: string): Promise<Menu | null> {
  // Always use WordPress - no fallback to dummy data
  try {
    const response = await wpFetch<MenuResponse>(MENU_BY_SLUG_QUERY, { slug }, {
      revalidate: 60, // 60 seconds for real-time updates
      tags: ['menus', `menu-${slug}`]
    })
    
    if (response.post) {
      // Transform the post into a menu item with default values for missing customFields
      return {
        ...response.post,
        menuFields: {
          price: 0, // Default price
          description: response.post.excerpt || response.post.title || '',
          category: response.post.categories?.nodes?.[0]?.name || 'General',
          calories: undefined,
          allergens: undefined,
          isNew: false,
          isPopular: false
        }
      }
    }
    
    return null
  } catch (error) {
    console.error(`❌ Error fetching menu "${slug}" from WordPress:`, error)
    return null
  }
}

export async function getFilteredMenus(filters: MenuFilters): Promise<Menu[]> {
  const allMenus = await getMenus()
  
  return allMenus.filter(menu => {
    // Category filter
    if (filters.category && menu.menuFields.category !== filters.category) {
      return false
    }

    // Price range filter
    if (filters.minPrice !== undefined && menu.menuFields.price < filters.minPrice) {
      return false
    }
    if (filters.maxPrice !== undefined && menu.menuFields.price > filters.maxPrice) {
      return false
    }

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      const titleMatch = menu.title.toLowerCase().includes(searchTerm)
      const descriptionMatch = menu.menuFields.description.toLowerCase().includes(searchTerm)
      const categoryMatch = menu.menuFields.category.toLowerCase().includes(searchTerm)
      
      if (!titleMatch && !descriptionMatch && !categoryMatch) {
        return false
      }
    }

    return true
  })
}

export async function getMenuCategories(): Promise<string[]> {
  const menus = await getMenus()
  const categories = [...new Set(menus.map(menu => menu.menuFields.category))]
  return categories.sort()
}

export async function getFeaturedMenus(limit: number = 6): Promise<Menu[]> {
  const menus = await getMenus()
  return menus
    .filter(menu => menu.menuFields.isPopular || menu.menuFields.isNew)
    .slice(0, limit)
}

// Categories functions
export async function getCategories(): Promise<WPCategory[]> {
  // Always use WordPress - no fallback to dummy data
  try {
    const response = await wpFetch<CategoriesResponse>(CATEGORIES_QUERY, {}, {
      revalidate: 60, // 60 seconds for real-time updates
      tags: ['categories']
    })
    
    return response.categories.nodes
  } catch (error) {
    console.error('❌ Error fetching categories from WordPress:', error)
    // Return empty array instead of crashing
    return []
  }
}

export async function getCategoryBySlug(slug: string): Promise<WPCategory | null> {
  // Always use WordPress - no fallback to dummy data
  try {
    const response = await wpFetch<CategoriesResponse>(CATEGORIES_QUERY, {}, {
      revalidate: 60, // 60 seconds for real-time updates
      tags: ['categories', `category-${slug}`]
    })
    
    if (!response || !response.categories || !response.categories.nodes) {
      return null
    }
    
    const category = response.categories.nodes.find(cat => cat.slug === slug)
    return category || null
  } catch (error) {
    console.error(`❌ Error fetching category "${slug}" from WordPress:`, error)
    return null
  }
}

// Utility functions
export function getPriceRange(menus: Menu[]): { min: number; max: number } {
  if (menus.length === 0) {
    return { min: 0, max: 100 }
  }

  const prices = menus.map(menu => menu.menuFields.price)
  return {
    min: Math.floor(Math.min(...prices)),
    max: Math.ceil(Math.max(...prices)),
  }
}

export function sortMenus(menus: Menu[], sortBy: 'price' | 'name' | 'popularity', direction: 'asc' | 'desc' = 'asc'): Menu[] {
  return [...menus].sort((a, b) => {
    let aValue: string | number
    let bValue: string | number

    switch (sortBy) {
      case 'price':
        aValue = a.menuFields.price
        bValue = b.menuFields.price
        break
      case 'name':
        aValue = a.title
        bValue = b.title
        break
      case 'popularity':
        aValue = (a.menuFields.isPopular ? 2 : 0) + (a.menuFields.isNew ? 1 : 0)
        bValue = (b.menuFields.isPopular ? 2 : 0) + (b.menuFields.isNew ? 1 : 0)
        break
      default:
        return 0
    }

    if (aValue < bValue) return direction === 'asc' ? -1 : 1
    if (aValue > bValue) return direction === 'asc' ? 1 : -1
    return 0
  })
}

// Site-wide SEO settings (simplified to avoid GraphQL conflicts)
export async function getSiteSEOSettings(): Promise<SiteSEOResponse | null> {
  try {
    const response = await wpFetch<{ generalSettings: GeneralSettings }>(SITE_SEO_QUERY, {}, {
      revalidate: 60, // 60 seconds for real-time updates
      tags: ['site-seo', 'general-settings']
    })
    
    return response ? {
      seo: undefined, // Yoast site-wide settings disabled due to GraphQL schema conflicts
      generalSettings: response.generalSettings
    } : null
  } catch (error) {
    console.error('❌ Error fetching site SEO settings:', error)
    return null
  }
}
