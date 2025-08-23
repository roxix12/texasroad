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
  title?: string | null
  metaDesc?: string | null
  canonical?: string | null
  metaKeywords?: string | null
  metaRobotsNoindex?: string | null
  metaRobotsNofollow?: string | null
  opengraphTitle?: string | null
  opengraphDescription?: string | null
  opengraphImage?: {
    sourceUrl: string
    altText: string
  } | null
  twitterTitle?: string | null
  twitterDescription?: string | null
  twitterImage?: {
    sourceUrl: string
    altText: string
  } | null
  breadcrumbs?: Array<{
    text: string
    url: string
  }> | null
  schema?: {
    raw: string
  } | null
  fullHead?: string | null
}

// Site-wide Yoast SEO settings
export interface YoastSiteSEO {
  webmaster?: {
    googleVerify?: string
    msVerify?: string
    yandexVerify?: string
    baiduVerify?: string
  }
  schema?: {
    companyName?: string
    companyLogo?: {
      sourceUrl: string
      altText: string
    }
    siteName?: string
    siteUrl?: string
    wordpressSiteName?: string
  }
  social?: {
    facebook?: {
      url?: string
      defaultImage?: {
        sourceUrl: string
      }
    }
    twitter?: {
      username?: string
      cardType?: string
    }
    instagram?: {
      url?: string
    }
    linkedIn?: {
      url?: string
    }
    youTube?: {
      url?: string
    }
  }
  openGraph?: {
    frontPage?: {
      title?: string
      description?: string
      image?: {
        sourceUrl: string
      }
    }
    defaultImage?: {
      sourceUrl: string
    }
  }
  contentTypes?: {
    post?: {
      title?: string
      metaDesc?: string
    }
    page?: {
      title?: string
      metaDesc?: string
    }
  }
  breadcrumbs?: {
    enabled?: boolean
    separator?: string
    searchPrefix?: string
    prefix?: string
    homeText?: string
    showBlogPage?: boolean
  }
}

export interface GeneralSettings {
  title?: string
  description?: string
  url?: string
}

export interface SiteSEOResponse {
  seo?: YoastSiteSEO
  generalSettings?: GeneralSettings
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
  seo?: WPSEO | null
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
