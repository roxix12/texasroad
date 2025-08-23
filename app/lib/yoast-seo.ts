// Yoast SEO integration for WordPress GraphQL

export interface YoastSEO {
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

// GraphQL fragment for Yoast SEO fields
export const YOAST_SEO_FRAGMENT = `
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
  }
`

// Convert Yoast SEO data to Next.js metadata
export function convertYoastToMetadata(yoastSEO: YoastSEO, fallbackTitle: string, fallbackDescription: string) {
  return {
    title: yoastSEO.title || fallbackTitle,
    description: yoastSEO.metaDesc || fallbackDescription,
    keywords: yoastSEO.metaKeywords?.split(',').map(k => k.trim()),
    robots: {
      index: yoastSEO.metaRobotsNoindex !== 'noindex',
      follow: yoastSEO.metaRobotsNofollow !== 'nofollow',
    },
    alternates: {
      canonical: yoastSEO.canonical,
    },
    openGraph: {
      title: yoastSEO.opengraphTitle || yoastSEO.title || fallbackTitle,
      description: yoastSEO.opengraphDescription || yoastSEO.metaDesc || fallbackDescription,
      images: yoastSEO.opengraphImage ? [
        {
          url: yoastSEO.opengraphImage.sourceUrl,
          alt: yoastSEO.opengraphImage.altText,
        }
      ] : undefined,
    },
    twitter: {
      title: yoastSEO.twitterTitle || yoastSEO.opengraphTitle || yoastSEO.title || fallbackTitle,
      description: yoastSEO.twitterDescription || yoastSEO.opengraphDescription || yoastSEO.metaDesc || fallbackDescription,
      images: yoastSEO.twitterImage ? [yoastSEO.twitterImage.sourceUrl] : undefined,
    },
  }
}

// Extract and inject Yoast schema if available
export function injectYoastSchema(yoastSEO: YoastSEO): string | null {
  if (yoastSEO.schema?.raw) {
    try {
      // Validate JSON
      JSON.parse(yoastSEO.schema.raw)
      return yoastSEO.schema.raw
    } catch (error) {
      console.warn('Invalid Yoast schema JSON:', error)
      return null
    }
  }
  return null
}
