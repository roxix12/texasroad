// Yoast SEO integration for WordPress GraphQL
import { replaceYoastUrls, sanitizeYoastSEO, sanitizeSchemaData } from './url-sanitization'

export interface YoastSEO {
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
    fullHead
  }
`

// Convert Yoast SEO data to Next.js metadata
export function convertYoastToMetadata(yoastSEO: YoastSEO | null | undefined, fallbackTitle: string, fallbackDescription: string) {
  // Safe null check - if no Yoast SEO data, return fallback metadata
  if (!yoastSEO) {
    return {
      title: fallbackTitle,
      description: fallbackDescription,
      alternates: {
        canonical: undefined,
      },
      openGraph: {
        title: fallbackTitle,
        description: fallbackDescription,
        images: undefined,
      },
      twitter: {
        title: fallbackTitle,
        description: fallbackDescription,
        images: undefined,
      },
    }
  }

  try {
    return {
      title: yoastSEO.title || fallbackTitle,
      description: yoastSEO.metaDesc || fallbackDescription,
      keywords: yoastSEO.metaKeywords?.split(',').map(k => k.trim()).filter(Boolean) || undefined,
      robots: {
        index: yoastSEO.metaRobotsNoindex !== 'noindex',
        follow: yoastSEO.metaRobotsNofollow !== 'nofollow',
      },
      alternates: {
        canonical: yoastSEO.canonical || undefined,
      },
      openGraph: {
        title: yoastSEO.opengraphTitle || yoastSEO.title || fallbackTitle,
        description: yoastSEO.opengraphDescription || yoastSEO.metaDesc || fallbackDescription,
        images: yoastSEO.opengraphImage && yoastSEO.opengraphImage.sourceUrl ? [
          {
            url: yoastSEO.opengraphImage.sourceUrl,
            alt: yoastSEO.opengraphImage.altText || '',
          }
        ] : undefined,
      },
      twitter: {
        title: yoastSEO.twitterTitle || yoastSEO.opengraphTitle || yoastSEO.title || fallbackTitle,
        description: yoastSEO.twitterDescription || yoastSEO.opengraphDescription || yoastSEO.metaDesc || fallbackDescription,
        images: yoastSEO.twitterImage && yoastSEO.twitterImage.sourceUrl ? [yoastSEO.twitterImage.sourceUrl] : undefined,
      },
    }
  } catch (error) {
    console.error('Error converting Yoast SEO metadata:', error)
    // Return fallback metadata on error
    return {
      title: fallbackTitle,
      description: fallbackDescription,
      alternates: {
        canonical: undefined,
      },
      openGraph: {
        title: fallbackTitle,
        description: fallbackDescription,
        images: undefined,
      },
      twitter: {
        title: fallbackTitle,
        description: fallbackDescription,
        images: undefined,
      },
    }
  }
}

// Extract and inject Yoast schema if available
export function injectYoastSchema(yoastSEO: YoastSEO | null | undefined): string | null {
  if (!yoastSEO || !yoastSEO.schema?.raw) {
    return null
  }

  try {
    // Validate JSON
    JSON.parse(yoastSEO.schema.raw)
    return yoastSEO.schema.raw
  } catch (error) {
    console.error('Invalid Yoast schema JSON:', error)
    return null
  }
}

// Extract and sanitize Yoast fullHead data
export function extractYoastFullHead(yoastSEO: YoastSEO | null | undefined): {
  schemaData: string | null
  metaTags: string | null
} {
  if (!yoastSEO || !yoastSEO.fullHead) {
    return { schemaData: null, metaTags: null }
  }

  try {
    const fullHead = yoastSEO.fullHead
    
    // Extract JSON-LD schema data
    const schemaMatches = fullHead.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/gi)
    const schemaData = schemaMatches ? schemaMatches.map(match => {
      const content = match.replace(/<script[^>]*>/gi, '').replace(/<\/script>/gi, '')
      try {
        // Validate JSON
        JSON.parse(content)
        return content
      } catch (error) {
        console.error('Invalid JSON-LD in fullHead:', error)
        return null
      }
    }).filter(Boolean).join('') : null

    // Extract meta tags (excluding JSON-LD scripts)
    const metaTagsWithoutSchema = fullHead.replace(/<script[^>]*type=["']application\/ld\+json["'][^>]*>.*?<\/script>/gi, '')
    const metaTags = metaTagsWithoutSchema.trim() || null

    return { schemaData, metaTags }
  } catch (error) {
    console.error('Error parsing Yoast fullHead:', error)
    return { schemaData: null, metaTags: null }
  }
}

// Clean and sanitize HTML content for safe injection
export function sanitizeYoastHTML(html: string): string {
  if (!html) return html
  
  // First replace WordPress URLs with frontend URLs
  let sanitized = replaceYoastUrls(html)
  
  // Basic sanitization - remove potentially dangerous scripts/attributes
  sanitized = sanitized
    .replace(/on\w+="[^"]*"/gi, '') // Remove inline event handlers
    .replace(/javascript:/gi, '') // Remove javascript: URLs
    .replace(/<script(?![^>]*type=["']application\/ld\+json["'])[^>]*>.*?<\/script>/gi, '') // Remove non-JSON-LD scripts
    .trim()
  
  return sanitized
}

// Extract favicon URL from Yoast fullHead or site settings
export function extractYoastFavicon(yoastSEO?: YoastSEO | null, siteSEO?: import('./types').YoastSiteSEO | null): string | null {
  // Try to extract favicon from fullHead first
  if (yoastSEO?.fullHead) {
    try {
      const faviconMatches = yoastSEO.fullHead.match(/<link[^>]*rel=["'](?:icon|shortcut icon)["'][^>]*href=["']([^"']+)["'][^>]*>/gi)
      if (faviconMatches && faviconMatches.length > 0) {
        const hrefMatch = faviconMatches[0].match(/href=["']([^"']+)["']/)
        if (hrefMatch && hrefMatch[1]) {
          return hrefMatch[1]
        }
      }
    } catch (error) {
      console.error('Error extracting favicon from fullHead:', error)
    }
  }

  // Try to get favicon from site schema/logo
  if (siteSEO?.schema?.companyLogo?.sourceUrl) {
    return siteSEO.schema.companyLogo.sourceUrl
  }

  // Try OpenGraph default image
  if (siteSEO?.openGraph?.defaultImage?.sourceUrl) {
    return siteSEO.openGraph.defaultImage.sourceUrl
  }

  return null
}

// Process and combine Yoast SEO data for head injection
export function processYoastSEOHead(
  yoastSEO?: YoastSEO | null, 
  siteSEO?: import('./types').YoastSiteSEO | null,
  fallbackTitle?: string,
  fallbackDescription?: string
): {
  title: string | null
  metaTags: string | null
  schemaData: string | null
  favicon: string | null
  webmasterTags: string | null
} {
  const result = {
    title: null as string | null,
    metaTags: null as string | null,
    schemaData: null as string | null,
    favicon: null as string | null,
    webmasterTags: null as string | null,
  }

  try {
    // Extract title
    result.title = yoastSEO?.title || fallbackTitle || null

    // Extract fullHead data
    if (yoastSEO?.fullHead) {
      const extracted = extractYoastFullHead(yoastSEO)
      result.metaTags = extracted.metaTags
      // Sanitize schema data to replace WordPress URLs with frontend URLs
      result.schemaData = extracted.schemaData ? sanitizeSchemaData(extracted.schemaData) : null
    }

    // Extract favicon
    result.favicon = extractYoastFavicon(yoastSEO, siteSEO)

    // Create webmaster verification tags
    if (siteSEO?.webmaster) {
      const webmasterTags: string[] = []
      
      if (siteSEO.webmaster.googleVerify) {
        webmasterTags.push(`<meta name="google-site-verification" content="${siteSEO.webmaster.googleVerify}" />`)
      }
      if (siteSEO.webmaster.msVerify) {
        webmasterTags.push(`<meta name="msvalidate.01" content="${siteSEO.webmaster.msVerify}" />`)
      }
      if (siteSEO.webmaster.yandexVerify) {
        webmasterTags.push(`<meta name="yandex-verification" content="${siteSEO.webmaster.yandexVerify}" />`)
      }
      if (siteSEO.webmaster.baiduVerify) {
        webmasterTags.push(`<meta name="baidu-site-verification" content="${siteSEO.webmaster.baiduVerify}" />`)
      }

      result.webmasterTags = webmasterTags.length > 0 ? webmasterTags.join('\n') : null
    }

    return result
  } catch (error) {
    console.error('Error processing Yoast SEO head data:', error)
    return result
  }
}
