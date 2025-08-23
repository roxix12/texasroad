import { APIResponse, SiteSEOResponse } from './types'
import { WORDPRESS_CONFIG } from './config'

// Use centralized configuration
const WORDPRESS_API_URL = WORDPRESS_CONFIG.API_URL

export async function wpFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
  options?: {
    revalidate?: number
    tags?: string[]
  }
): Promise<T> {
  // Always use WordPress - no fallback to dummy data
  if (!WORDPRESS_API_URL) {
    throw new Error('WordPress API URL is not configured')
  }

  try {
    const response = await fetch(WORDPRESS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Texas-Roadhouse-Menu-App/1.0'
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      next: {
        revalidate: options?.revalidate ?? 60, // 60 seconds default for real-time updates
        tags: options?.tags,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ WordPress HTTP error response:', errorText)
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText.substring(0, 200)}`)
    }

    const result: APIResponse<T> = await response.json()

    if (result.errors && result.errors.length > 0) {
      console.error('❌ GraphQL errors:', result.errors)
      // Log detailed error info for debugging
      console.error('Query that failed:', query)
      console.error('Variables:', variables)
      throw new Error(
        `GraphQL error: ${result.errors.map((e) => e.message).join(', ')}`
      )
    }

    if (!result.data) {
      console.error('❌ No data returned from GraphQL query')
      throw new Error('No data returned from GraphQL query')
    }

    return result.data
  } catch (error) {
    console.error('❌ WordPress fetch error:', error)
    // For Yoast SEO integration, we need to handle missing fields gracefully
    // Return null data instead of throwing to prevent 500 errors
    if (query.includes('fullHead') || query.includes('seo')) {
      console.error('SEO query failed, returning null data to prevent crash')
      return null as T
    }
    // For other critical queries, still throw
    throw error
  }
}

// GraphQL Queries
export const POSTS_QUERY = `
  query Posts($first: Int!, $after: String, $before: String, $last: Int) {
    posts(first: $first, after: $after, before: $before, last: $last, where: { status: PUBLISH }) {
      nodes {
        id
        slug
        title
        excerpt
        date
        uri
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        seo {
          title
          metaDesc
          canonical
          metaKeywords
          metaRobotsNoindex
          metaRobotsNofollow
          opengraphTitle
          opengraphDescription
          opengraphImage {
            sourceUrl
            altText
          }
          twitterTitle
          twitterDescription
          twitterImage {
            sourceUrl
            altText
          }
          schema {
            raw
          }
          fullHead
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`

export const POST_BY_SLUG_QUERY = `
  query PostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      slug
      date
      excerpt
      content
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      seo {
        title
        metaDesc
        canonical
        metaKeywords
        metaRobotsNoindex
        metaRobotsNofollow
        opengraphTitle
        opengraphDescription
        opengraphImage {
          sourceUrl
          altText
        }
        twitterTitle
        twitterDescription
        twitterImage {
          sourceUrl
          altText
        }
        breadcrumbs {
          text
          url
        }
        schema {
          raw
        }
        fullHead
      }
    }
  }
`

// Query for site-wide Yoast SEO settings with enhanced schema and logo support
export const SITE_SEO_QUERY = `
  query GET_SITE_SEO {
    generalSettings {
      title
      description
      url
    }
    seo {
      schema {
        companyName
        companyLogo {
          sourceUrl
          altText
        }
      }
      webmaster {
        googleVerify
        msVerify
        yandexVerify
      }
    }
  }
`

// Note: This query uses standard WordPress fields to avoid GraphQL errors
// Custom fields are handled gracefully if they exist
export const MENUS_QUERY = `
  query MenuItems($first: Int!, $after: String) {
    posts(first: $first, after: $after, where: { status: PUBLISH, categoryName: "menu-items" }) {
      nodes {
        id
        slug
        title
        excerpt
        content
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        seo {
          title
          metaDesc
          canonical
          opengraphTitle
          opengraphDescription
          opengraphImage {
            sourceUrl
            altText
          }
          schema {
            raw
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

export const MENU_BY_SLUG_QUERY = `
  query MenuItemBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      slug
      title
      content
      excerpt
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      seo {
        title
        metaDesc
        canonical
        metaKeywords
        opengraphTitle
        opengraphDescription
        opengraphImage {
          sourceUrl
          altText
        }
        twitterTitle
        twitterDescription
        breadcrumbs {
          text
          url
        }
        schema {
          raw
        }
      }
    }
  }
`

export const CATEGORIES_QUERY = `
  query Categories {
    categories(where: { hideEmpty: true }) {
      nodes {
        id
        name
        slug
        count
      }
    }
  }
`

export const POSTS_BY_CATEGORY_QUERY = `
  query PostsByCategory($categorySlug: String!, $first: Int, $after: String, $before: String, $last: Int) {
    posts(
      first: $first
      after: $after
      before: $before
      last: $last
      where: { 
        status: PUBLISH
        categoryName: $categorySlug
      }
    ) {
      nodes {
        id
        slug
        title
        excerpt
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`

// Helper function to fetch site-wide SEO settings from WordPress/Yoast
export async function getSiteSEO(): Promise<SiteSEOResponse | null> {
  const query = `
    query GET_SITE_SEO {
      generalSettings {
        title
        description
        url
      }
      seo {
        schema {
          companyName
          companyLogo {
            sourceUrl
            altText
          }
        }
        webmaster {
          googleVerify
          msVerify
          yandexVerify
        }
      }
    }
  `
  try {
    const response = await wpFetch<SiteSEOResponse>(query, {}, {
      revalidate: 60, // 60 seconds for real-time updates
      tags: ['site-seo', 'general-settings']
    })
    return response
  } catch (error) {
    console.error('❌ Error fetching site SEO settings:', error)
    return null
  }
}
