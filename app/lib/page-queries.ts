// WordPress Page Queries for Static Pages with Yoast SEO - Updated to use Apollo Client
import { gql } from '@apollo/client'
import { getApolloClient } from './apollo-client'
import { WPSEO } from './types'

export interface WordPressPage {
  id: string
  slug: string
  title: string
  content: string
  excerpt: string
  date: string
  seo?: WPSEO | null
}

export interface PageResponse {
  page: WordPressPage
}

// GraphQL query for a WordPress page by slug
export const GET_PAGE_BY_SLUG = gql`
  query GetPageBySlug($slug: ID!) {
    page(id: $slug, idType: URI) {
      id
      title
      slug
      date
      excerpt
      content
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

// Get a WordPress page by slug using Apollo Client
export async function getPageBySlug(slug: string): Promise<WordPressPage | null> {
  try {
    const client = getApolloClient()
    
    const { data, error } = await client.query({
      query: GET_PAGE_BY_SLUG,
      variables: { slug },
      errorPolicy: 'all',
      fetchPolicy: 'cache-first',
    })

    if (error) {
      console.error('Apollo Client error:', error)
    }

    if (data?.page && data.page.id) {
      return data.page
    }
    
    return null
  } catch (error) {
    console.error(`❌ Error fetching page "${slug}":`, error)
    return null
  }
}

// Common pages that might exist in WordPress
export const COMMON_PAGE_SLUGS = {
  HOME: 'home',
  ABOUT: 'about',
  CONTACT: 'contact',
  LEGAL: 'legal',
  PRIVACY: 'privacy-policy',
  TERMS: 'terms-of-service',
} as const

// Helper function to get page SEO data with fallbacks
export async function getPageSEOData(slug: string, fallbackTitle: string, fallbackDescription: string) {
  try {
    const page = await getPageBySlug(slug)
    
    if (page?.seo && page.seo.title) {
      return {
        hasYoastSEO: true,
        seoData: page.seo,
        title: page.seo.title || page.title || fallbackTitle,
        description: page.seo.metaDesc || page.excerpt || fallbackDescription,
        content: page.content,
      }
    }
    
    return {
      hasYoastSEO: false,
      seoData: null,
      title: fallbackTitle,
      description: fallbackDescription,
      content: page?.content || null,
    }
  } catch (error) {
    console.error(`Error fetching page SEO data for slug "${slug}":`, error)
    return {
      hasYoastSEO: false,
      seoData: null,
      title: fallbackTitle,
      description: fallbackDescription,
      content: null,
    }
  }
}