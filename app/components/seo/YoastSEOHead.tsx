import Script from 'next/script'
import { WPSEO } from '@/lib/types'
import { extractYoastFullHead, injectYoastSchema, sanitizeYoastHTML } from '@/lib/yoast-seo'

interface YoastSEOHeadProps {
  seoData: WPSEO
  fallbackSchema?: string
}

/**
 * Component to inject Yoast SEO data into the page head
 * Handles schema injection and additional meta tags from Yoast fullHead
 */
export function YoastSEOHead({ seoData, fallbackSchema }: YoastSEOHeadProps) {
  // Extract data from Yoast fullHead
  const yoastHeadData = extractYoastFullHead(seoData)
  
  // Get schema data from various sources
  const schemaFromFullHead = yoastHeadData.schemaData
  const schemaFromField = injectYoastSchema(seoData)
  const finalSchema = schemaFromFullHead || schemaFromField || fallbackSchema

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
      
      {/* Additional Yoast Meta Tags from fullHead */}
      {yoastHeadData.metaTags && (
        <div 
          dangerouslySetInnerHTML={{ 
            __html: sanitizeYoastHTML(yoastHeadData.metaTags) 
          }} 
        />
      )}
    </>
  )
}

interface ConditionalYoastSEOHeadProps {
  seoData?: WPSEO | null
  fallbackSchema?: string
}

/**
 * Conditional wrapper that only renders if Yoast SEO data exists
 */
export function ConditionalYoastSEOHead({ seoData, fallbackSchema }: ConditionalYoastSEOHeadProps) {
  if (!seoData) return null
  
  return <YoastSEOHead seoData={seoData} fallbackSchema={fallbackSchema} />
}
