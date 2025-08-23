import { ReactNode } from 'react'
import { YoastSEOHead } from './YoastSEOHead'
import { WPSEO, YoastSiteSEO, GeneralSettings } from '@/lib/types'

interface YoastSEOLayoutProps {
  children: ReactNode
  siteSEO?: YoastSiteSEO | null
  generalSettings?: GeneralSettings | null
  pageSEO?: WPSEO | null
  fallbacks?: {
    title?: string
    description?: string
    favicon?: string
    schema?: string
  }
}

/**
 * Layout component that applies site-wide Yoast SEO settings
 * Use this as a wrapper for pages that need full Yoast integration
 */
export function YoastSEOLayout({ 
  children, 
  siteSEO, 
  generalSettings, 
  pageSEO,
  fallbacks = {}
}: YoastSEOLayoutProps) {
  // Generate fallback values from WordPress general settings and user fallbacks
  const finalFallbacks = {
    title: fallbacks.title || generalSettings?.title || 'Texas Roadhouse Menu',
    description: fallbacks.description || generalSettings?.description || 'Texas Roadhouse Menu with Prices',
    favicon: fallbacks.favicon || '/favicon.ico',
    schema: fallbacks.schema,
  }

  return (
    <>
      {/* Site-wide and Page-specific Yoast SEO Integration */}
      <YoastSEOHead
        seoData={pageSEO}
        siteSEO={siteSEO}
        fallbackTitle={finalFallbacks.title}
        fallbackDescription={finalFallbacks.description}
        fallbackFavicon={finalFallbacks.favicon}
        fallbackSchema={finalFallbacks.schema}
      />
      
      {children}
    </>
  )
}

/**
 * Hook to get site SEO settings for use in components
 */
export async function useSiteSEO(): Promise<{
  siteSEO: YoastSiteSEO | null
  generalSettings: GeneralSettings | null
}> {
  try {
    const { getSiteSEOSettings } = await import('@/lib/data')
    const response = await getSiteSEOSettings()
    
    return {
      siteSEO: response?.seo || null,
      generalSettings: response?.generalSettings || null,
    }
  } catch (error) {
    console.error('Error fetching site SEO settings:', error)
    return {
      siteSEO: null,
      generalSettings: null,
    }
  }
}
