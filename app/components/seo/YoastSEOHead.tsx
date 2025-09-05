import Script from 'next/script'
import { WPSEO, YoastSiteSEO } from '@/lib/types'
import { processYoastSEOHead, sanitizeYoastHTML } from '@/lib/yoast-seo'

interface YoastSEOHeadProps {
  seoData?: WPSEO | null | undefined
  siteSEO?: YoastSiteSEO | null | undefined
  fallbackSchema?: string
  fallbackTitle?: string
  fallbackDescription?: string
  fallbackFavicon?: string
  excludeFAQSchema?: boolean // New prop to exclude FAQ schema when custom FAQ exists
}

/**
 * Component to inject comprehensive Yoast SEO data into the page head
 * Handles schema injection, meta tags, favicon, and webmaster verification
 */
export function YoastSEOHead({ 
  seoData, 
  siteSEO, 
  fallbackSchema,
  fallbackTitle,
  fallbackDescription,
  fallbackFavicon,
  excludeFAQSchema = false
}: YoastSEOHeadProps) {
  try {
    // Process all Yoast SEO data
    const processed = processYoastSEOHead(seoData, siteSEO, fallbackTitle, fallbackDescription)
    
    // Filter out FAQPage schema if excludeFAQSchema is true to prevent duplicates
    let finalSchema = processed.schemaData || fallbackSchema
    
    if (finalSchema && excludeFAQSchema) {
      try {
        const schemaArray = JSON.parse(finalSchema)
        if (Array.isArray(schemaArray)) {
          // Filter out any FAQPage schemas
          const filteredSchema = schemaArray.filter(item => item['@type'] !== 'FAQPage')
          finalSchema = filteredSchema.length > 0 ? JSON.stringify(filteredSchema) : null
        } else if (schemaArray && schemaArray['@type'] === 'FAQPage') {
          // Single FAQPage schema, remove it entirely
          finalSchema = null
        }
      } catch (e) {
        // If parsing fails, keep original schema but log warning
        console.warn('Failed to parse Yoast schema for FAQ filtering:', e)
      }
    }
    
    const finalFavicon = processed.favicon || fallbackFavicon

    return (
      <>
        {/* Yoast SEO Schema Injection (FAQPage filtered for /menus-prices) */}
        {finalSchema && (
          <Script
            id="yoast-seo-schema"
            type="application/ld+json"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: finalSchema }}
          />
        )}
        
        {/* Yoast Meta Tags from fullHead */}
        {processed.metaTags && (
          <div 
            dangerouslySetInnerHTML={{ 
              __html: sanitizeYoastHTML(processed.metaTags) 
            }} 
          />
        )}

        {/* Webmaster Verification Tags */}
        {processed.webmasterTags && (
          <div 
            dangerouslySetInnerHTML={{ 
              __html: processed.webmasterTags 
            }} 
          />
        )}

        {/* Dynamic Favicon from Yoast */}
        {finalFavicon && (
          <>
            <link rel="icon" type="image/x-icon" href={finalFavicon} />
            <link rel="icon" type="image/png" href={finalFavicon} />
            <link rel="shortcut icon" href={finalFavicon} />
          </>
        )}
      </>
    )
  } catch (error) {
    console.error('Error rendering Yoast SEO head:', error)
    
    // Fallback rendering on error
    return (
      <>
        {fallbackSchema && (
          <Script
            id="fallback-schema-error"
            type="application/ld+json"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: fallbackSchema }}
          />
        )}
        {fallbackFavicon && (
          <link rel="icon" type="image/x-icon" href={fallbackFavicon} />
        )}
      </>
    )
  }
}

interface ConditionalYoastSEOHeadProps {
  seoData?: WPSEO | null | undefined
  siteSEO?: YoastSiteSEO | null | undefined
  fallbackSchema?: string
  fallbackTitle?: string
  fallbackDescription?: string
  fallbackFavicon?: string
  excludeFAQSchema?: boolean
}

/**
 * Conditional wrapper that always renders something useful
 */
export function ConditionalYoastSEOHead(props: ConditionalYoastSEOHeadProps) {
  return <YoastSEOHead {...props} />
}

interface SimpleYoastSEOHeadProps {
  seo?: { fullHead?: string }
}

/**
 * Simple component for basic fullHead injection (as requested in user prompt)
 */
export function SimpleYoastSEOHead({ seo }: SimpleYoastSEOHeadProps) {
  if (!seo?.fullHead) return null
  
  return (
    <div 
      dangerouslySetInnerHTML={{ 
        __html: sanitizeYoastHTML(seo.fullHead) 
      }} 
    />
  )
}
