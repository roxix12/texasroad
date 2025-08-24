import { getApolloClient } from '../apollo-client'
import { 
  GET_POSTS, 
  GET_POST_BY_SLUG, 
  GET_CATEGORIES, 
  GET_POSTS_BY_CATEGORY, 
  GET_SITE_SEO,
  GET_MENU_ITEMS 
} from './queries'
import { Post as WPPost, WPCategory, SiteSEOResponse } from '../types'

// Initialize Apollo Client
const client = getApolloClient()

// Fetch multiple posts with pagination
export async function fetchPosts(first: number = 10, after?: string) {
  try {
    const { data, error } = await client.query({
      query: GET_POSTS,
      variables: { first, after },
      errorPolicy: 'all',
      fetchPolicy: 'cache-first',
    })

    if (error) {
      console.error('Apollo Client error:', error)
    }

    return {
      posts: (data as any)?.posts?.nodes || [],
      pageInfo: (data as any)?.posts?.pageInfo || {},
      error
    }
  } catch (error) {
    console.error('Error fetching posts:', error)
    return {
      posts: [],
      pageInfo: {},
      error
    }
  }
}

// Fetch a single post by slug
export async function fetchPostBySlug(slug: string) {
  try {
    const { data, error } = await client.query({
      query: GET_POST_BY_SLUG,
      variables: { slug },
      errorPolicy: 'all',
      fetchPolicy: 'cache-first',
    })

    if (error) {
      console.error('Apollo Client error:', error)
    }

    return {
      post: (data as any)?.post || null,
      error
    }
  } catch (error) {
    console.error('Error fetching post by slug:', error)
    return {
      post: null,
      error
    }
  }
}

// Fetch categories
export async function fetchCategories() {
  try {
    const { data, error } = await client.query({
      query: GET_CATEGORIES,
      errorPolicy: 'all',
      fetchPolicy: 'cache-first',
    })

    if (error) {
      console.error('Apollo Client error:', error)
    }

    return {
      categories: (data as any)?.categories?.nodes || [],
      error
    }
  } catch (error) {
    console.error('Error fetching categories:', error)
    return {
      categories: [],
      error
    }
  }
}

// Fetch posts by category
export async function fetchPostsByCategory(categorySlug: string, first: number = 10, after?: string) {
  try {
    const { data, error } = await client.query({
      query: GET_POSTS_BY_CATEGORY,
      variables: { categorySlug, first, after },
      errorPolicy: 'all',
      fetchPolicy: 'cache-first',
    })

    if (error) {
      console.error('Apollo Client error:', error)
    }

    return {
      posts: (data as any)?.posts?.nodes || [],
      pageInfo: (data as any)?.posts?.pageInfo || {},
      error
    }
  } catch (error) {
    console.error('Error fetching posts by category:', error)
    return {
      posts: [],
      pageInfo: {},
      error
    }
  }
}

// Fetch site SEO settings
export async function fetchSiteSEO() {
  try {
    const { data, error } = await client.query({
      query: GET_SITE_SEO,
      errorPolicy: 'all',
      fetchPolicy: 'cache-first',
    })

    if (error) {
      console.error('Apollo Client error:', error)
    }

    return {
      seo: (data as any) || null,
      error
    }
  } catch (error) {
    console.error('Error fetching site SEO:', error)
    return {
      seo: null,
      error
    }
  }
}

// Fetch menu items (if needed)
export async function fetchMenuItems(first: number = 50, after?: string) {
  try {
    const { data, error } = await client.query({
      query: GET_MENU_ITEMS,
      variables: { first, after },
      errorPolicy: 'all',
      fetchPolicy: 'cache-first',
    })

    if (error) {
      console.error('Apollo Client error:', error)
    }

    return {
      menuItems: (data as any)?.posts?.nodes || [],
      pageInfo: (data as any)?.posts?.pageInfo || {},
      error
    }
  } catch (error) {
    console.error('Error fetching menu items:', error)
    return {
      menuItems: [],
      pageInfo: {},
      error
    }
  }
}

// Helper function to get category by slug
export async function fetchCategoryBySlug(slug: string) {
  const { categories, error } = await fetchCategories()
  
  if (error) {
    return { category: null, error }
  }

  const category = categories.find((cat: WPCategory) => cat.slug === slug)
  
  return {
    category: category || null,
    error: category ? null : new Error(`Category with slug "${slug}" not found`)
  }
}
