import { DOMAIN_CONFIG } from './config'

/**
 * Replace WordPress domain URLs with frontend domain URLs in Yoast SEO data
 * This ensures all canonical URLs, OpenGraph URLs, Twitter URLs, and schema.org
 * data point to the frontend domain instead of the WordPress backend domain
 */
export function replaceYoastUrls(html: string): string {
  if (!html) return html
  
  // Replace WordPress domain with frontend domain
  return html.replace(
    new RegExp(DOMAIN_CONFIG.WORDPRESS_URL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
    DOMAIN_CONFIG.FRONTEND_URL
  )
}

/**
 * Sanitize Yoast SEO object by replacing WordPress URLs with frontend URLs
 */
export function sanitizeYoastSEO(seoData: any): any {
  if (!seoData || typeof seoData !== 'object') return seoData
  
  // Handle arrays
  if (Array.isArray(seoData)) {
    return seoData.map(item => sanitizeYoastSEO(item))
  }
  
  const sanitized = { ...seoData }
  
  // Fields that commonly contain URLs that need to be replaced
  const urlFields = [
    'canonical',
    'opengraphUrl',
    'twitterUrl',
    'url'
  ]
  
  // Replace URLs in string fields
  for (const [key, value] of Object.entries(sanitized)) {
    if (typeof value === 'string') {
      if (urlFields.includes(key) || value.includes(DOMAIN_CONFIG.WORDPRESS_URL)) {
        sanitized[key] = replaceYoastUrls(value)
      }
    } else if (typeof value === 'object' && value !== null) {
      // Recursively sanitize nested objects
      sanitized[key] = sanitizeYoastSEO(value)
    }
  }
  
  return sanitized
}

/**
 * Sanitize JSON-LD schema data by replacing WordPress URLs with frontend URLs
 */
export function sanitizeSchemaData(schemaJson: string): string {
  if (!schemaJson) return schemaJson
  
  try {
    // Parse JSON, sanitize, and stringify back
    const schema = JSON.parse(schemaJson)
    const sanitized = sanitizeYoastSEO(schema)
    return JSON.stringify(sanitized)
  } catch (error) {
    // If JSON parsing fails, fall back to string replacement
    console.warn('Failed to parse schema JSON, falling back to string replacement:', error)
    return replaceYoastUrls(schemaJson)
  }
}

/**
 * Generate frontend URL for a given path
 */
export function getFrontendUrl(path: string = ''): string {
  const baseUrl = DOMAIN_CONFIG.FRONTEND_URL.replace(/\/$/, '')
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${baseUrl}${cleanPath}`
}

/**
 * Extract path from a WordPress URL and convert to frontend URL
 */
export function convertWordPressUrlToFrontend(wpUrl: string): string {
  if (!wpUrl || !wpUrl.includes(DOMAIN_CONFIG.WORDPRESS_URL)) {
    return wpUrl
  }
  
  try {
    const url = new URL(wpUrl)
    return getFrontendUrl(url.pathname + url.search + url.hash)
  } catch (error) {
    // If URL parsing fails, use string replacement
    return replaceYoastUrls(wpUrl)
  }
}
