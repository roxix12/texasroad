// Core WordPress Types
export interface WPNode {
  id: string
  slug: string
  title: string
}

export interface WPFeaturedImage {
  node: {
    sourceUrl: string
    altText: string
  }
}

export interface WPCategory extends WPNode {
  name: string
  count?: number
}

export interface WPSEO {
  title?: string
  metaDesc?: string
  canonical?: string
  metaKeywords?: string
  metaRobotsNoindex?: string
  metaRobotsNofollow?: string
  opengraphTitle?: string
  opengraphDescription?: string
  opengraphImage?: {
    sourceUrl: string
    altText: string
  }
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: {
    sourceUrl: string
    altText: string
  }
  breadcrumbs?: Array<{
    text: string
    url: string
  }>
  schema?: {
    raw: string
  }
}

// Post Types
export interface Post extends WPNode {
  excerpt: string
  content?: string
  date: string
  uri?: string
  featuredImage?: WPFeaturedImage
  categories: {
    nodes: WPCategory[]
  }
  seo?: WPSEO
}

export interface PostsResponse {
  posts: {
    nodes: Post[]
    pageInfo: {
      hasNextPage: boolean
      hasPreviousPage: boolean
      startCursor: string | null
      endCursor: string | null
    }
  }
}

export interface PostResponse {
  post: Post
}

// Menu Types
export interface MenuFields {
  price: number
  description: string
  category: string
  calories?: number
  allergens?: string[]
  isNew?: boolean
  isPopular?: boolean
}

export interface Menu extends WPNode {
  content?: string
  menuFields: MenuFields
  featuredImage?: WPFeaturedImage
}

export interface MenusResponse {
  posts: {
    nodes: Post[]
    pageInfo?: {
      hasNextPage: boolean
      endCursor: string
    }
  }
}

export interface MenuResponse {
  post: Post
}

// Category Types
export interface CategoriesResponse {
  categories: {
    nodes: WPCategory[]
  }
}

// Filter Types
export interface MenuFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  search?: string
}

// Navigation Types
export interface NavItem {
  label: string
  href: string
  external?: boolean
}

// SEO Types
export interface SEOData {
  title: string
  description: string
  canonicalUrl?: string
  ogImage?: string
  noindex?: boolean
}

// API Response Types
export interface APIResponse<T> {
  data?: T
  errors?: Array<{
    message: string
    locations?: Array<{
      line: number
      column: number
    }>
  }>
}

export interface PaginationInfo {
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}
