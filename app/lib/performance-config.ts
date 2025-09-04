// Performance optimization configuration
export const PERFORMANCE_CONFIG = {
  // Caching durations (in seconds)
  CACHE_DURATIONS: {
    HOMEPAGE: 300,        // 5 minutes
    MENU_PAGES: 1800,     // 30 minutes
    BLOG_POSTS: 600,      // 10 minutes
    STATIC_PAGES: 3600,   // 1 hour
    API_CALLS: 300,       // 5 minutes
  },
  
  // Image optimization
  IMAGE_OPTIMIZATION: {
    QUALITY: 80,          // Default quality
    PRIORITY_QUALITY: 85, // For above-fold images
    LAZY_LOADING: true,
    BLUR_PLACEHOLDER: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIA/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAABBQEBAQEBAQAAAAAAAAAEAQIDBQAGByERCRIi/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAhEQACAQIEBwAAAAAAAAAAAAABAgMABAUGEiEiFDFRkaGx/9oADAMBAAIRAx0PAPwCdABGzRhhtgwdN",
  },
  
  // API optimization
  API_OPTIMIZATION: {
    MAX_POSTS_HOME: 3,     // Reduce posts on homepage
    MAX_MENUS_HOME: 0,     // No menus on homepage for performance
    MAX_COUPONS_HOME: 6,   // Limited coupons
    TIMEOUT: 10000,        // 10 second timeout
  },
  
  // Bundle optimization
  BUNDLE_OPTIMIZATION: {
    ENABLE_CODE_SPLITTING: true,
    ENABLE_TREE_SHAKING: true,
    MINIMIZE_CSS: true,
    COMPRESS_JS: true,
  },
  
  // Loading optimization
  LOADING_OPTIMIZATION: {
    SKELETON_ITEMS: 3,     // Reduce skeleton items
    LAZY_COMPONENTS: true,
    PRELOAD_CRITICAL: true,
  }
}

// Fast image props for common use cases
export const getFastImageProps = (isAboveFold = false) => ({
  quality: isAboveFold ? PERFORMANCE_CONFIG.IMAGE_OPTIMIZATION.PRIORITY_QUALITY : PERFORMANCE_CONFIG.IMAGE_OPTIMIZATION.QUALITY,
  loading: isAboveFold ? "eager" as const : "lazy" as const,
  placeholder: "blur" as const,
  blurDataURL: PERFORMANCE_CONFIG.IMAGE_OPTIMIZATION.BLUR_PLACEHOLDER,
})

// Cache headers for API routes
export const getCacheHeaders = (duration: number) => ({
  'Cache-Control': `public, s-maxage=${duration}, stale-while-revalidate=${duration * 2}`,
  'CDN-Cache-Control': `public, s-maxage=${duration}`,
  'Vercel-CDN-Cache-Control': `public, s-maxage=${duration}`,
})

// Performance monitoring
export const logPerformance = (label: string, startTime: number) => {
  const endTime = Date.now()
  const duration = endTime - startTime
  
  if (duration > 1000) {
    console.warn(`⚠️ Slow operation: ${label} took ${duration}ms`)
  } else if (duration > 500) {
    console.log(`⏱️ ${label} took ${duration}ms`)
  }
  
  return duration
}

export default PERFORMANCE_CONFIG
