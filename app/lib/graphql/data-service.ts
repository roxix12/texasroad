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

// Fetch all posts for sitemap and blog listing
export async function fetchAllPosts() {
  try {
    console.log('🔍 Fetching all posts for blog listing...')
    
    const { data, error } = await client.query({
      query: GET_POSTS,
      variables: { first: 100 }, // Get up to 100 posts
      errorPolicy: 'all',
      fetchPolicy: 'cache-first',
      context: {
        fetchOptions: {
          timeout: 10000,
          next: { revalidate: 3600 } // Cache for 1 hour
        }
      }
    })

    if (error) {
      console.error('❌ Apollo Client error:', error)
      if (error.networkError) {
        console.error('❌ Network error details:', error.networkError)
      }
      return []
    }

    // Safe data extraction with null checks
    const posts = (data as any)?.posts?.nodes || []
    const safePosts = Array.isArray(posts) ? posts : []

    console.log(`✅ Fetched ${safePosts.length} posts successfully`)
    return safePosts
  } catch (error) {
    console.error('❌ Error fetching all posts:', error)
    return []
  }
}

// Fetch multiple posts with pagination
export async function fetchPosts(first: number = 10, after?: string) {
  try {
    // Ensure parameters are valid
    if (!first || first < 1) first = 10
    if (after && typeof after !== 'string') after = undefined

    const { data, error } = await client.query({
      query: GET_POSTS,
      variables: { first, after },
      errorPolicy: 'all',
      fetchPolicy: 'cache-first',
      context: {
        fetchOptions: {
          next: { revalidate: 300 } // Cache for 5 minutes
        }
      }
    })

    if (error) {
      console.error('Apollo Client error:', error)
    }

    // Safe data extraction with null checks
    const posts = (data as any)?.posts?.nodes || []
    const pageInfo = (data as any)?.posts?.pageInfo || {}

    // Ensure posts is an array
    const safePosts = Array.isArray(posts) ? posts : []

    return {
      posts: safePosts,
      pageInfo,
      error
    }
  } catch (error) {
    console.error('Error fetching posts:', error)
    return {
      posts: [],
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: null,
        endCursor: null
      },
      error
    }
  }
}

// Fetch a single post by slug
export async function fetchPostBySlug(slug: string) {
  try {
    // Validate slug parameter
    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
      throw new Error('Invalid slug provided')
    }

    console.log('🔍 Fetching post by slug:', slug)
    console.log('📡 WordPress API URL:', process.env.NEXT_PUBLIC_WORDPRESS_API_URL)

    const { data, error } = await client.query({
      query: GET_POST_BY_SLUG,
      variables: { slug: slug.trim() },
      errorPolicy: 'all',
      fetchPolicy: 'cache-first',
      context: {
        fetchOptions: {
          timeout: 10000, // 10 second timeout
        }
      }
    })

    if (error) {
      console.error('❌ Apollo Client error:', error)
      // Check if it's a network error
      if (error.networkError) {
        console.error('🌐 Network Error Details:', {
          message: error.networkError.message,
          name: error.networkError.name,
          stack: error.networkError.stack
        })
      }
    }

    // Safe post extraction
    const post = (data as any)?.post || null

    if (post) {
      console.log('✅ Post fetched successfully:', {
        title: post.title,
        slug: post.slug,
        hasFeaturedImage: !!post.featuredImage?.node?.sourceUrl
      })
    } else {
      console.warn('⚠️ No post found for slug:', slug)
    }

    return {
      post,
      error
    }
  } catch (error) {
    console.error('💥 Critical error fetching post by slug:', error)
    
    // Provide more detailed error information
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        name: error.name,
        stack: error.stack
      })
    }
    
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

    const categories = (data as any)?.categories?.nodes || []
    const safeCategories = Array.isArray(categories) ? categories : []

    return {
      categories: safeCategories,
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
  try {
    // Validate slug parameter
    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
      throw new Error('Invalid category slug provided')
    }

    const { categories, error } = await fetchCategories()
    
    if (error) {
      return { category: null, error }
    }

    // Ensure categories is an array before using find
    const safeCategories = Array.isArray(categories) ? categories : []
    const category = safeCategories.find((cat: WPCategory) => cat?.slug === slug.trim())
    
    return {
      category: category || null,
      error: category ? null : new Error(`Category with slug "${slug}" not found`)
    }
  } catch (error) {
    console.error('Error fetching category by slug:', error)
    return {
      category: null,
      error
    }
  }
}
