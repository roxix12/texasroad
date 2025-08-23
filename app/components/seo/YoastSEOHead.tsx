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
  fallbackFavicon 
}: YoastSEOHeadProps) {
  try {
    // Process all Yoast SEO data
    const processed = processYoastSEOHead(seoData, siteSEO, fallbackTitle, fallbackDescription)
    
    // Determine final values with fallbacks
    const finalSchema = processed.schemaData || fallbackSchema
    const finalFavicon = processed.favicon || fallbackFavicon

    return (
      <>
        {/* Yoast SEO Schema Injection */}
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
