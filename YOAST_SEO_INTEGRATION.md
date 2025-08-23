# 🎯 Yoast SEO Plugin Integration with Next.js

## Overview
This document outlines the complete integration of Yoast SEO plugin data from WordPress via WPGraphQL into your Next.js App Router project. The integration maintains all existing functionality while providing comprehensive SEO capabilities.

## ✅ Complete Integration Features

### 1. **GraphQL Queries Enhanced**
- ✅ **Posts Query**: Includes full Yoast SEO fields
- ✅ **Individual Post Query**: Complete SEO metadata
- ✅ **Page Queries**: New page-specific GraphQL queries
- ✅ **fullHead Field**: Complete Yoast head injection support

### 2. **Metadata Generation**
- ✅ **Dynamic generateMetadata()**: Uses Yoast data with fallbacks
- ✅ **Blog Posts**: Full Yoast SEO integration
- ✅ **Static Pages**: WordPress page integration (optional)
- ✅ **Homepage**: Can use WordPress homepage data

### 3. **Schema & JSON-LD**
- ✅ **Yoast Schema**: Automatic injection from `schema.raw`
- ✅ **fullHead Processing**: Extracts and injects schema safely
- ✅ **Fallback Support**: Uses default schemas when Yoast unavailable
- ✅ **Sanitization**: Safe HTML injection with security measures

## 🔧 Technical Implementation

### GraphQL Fields Added
```graphql
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
  fullHead  # ← NEW: Complete head injection
}
```

### Core Files Updated

#### **1. GraphQL Queries (`app/lib/wp.ts`)**
```typescript
// Added fullHead field to existing queries:
// - POSTS_QUERY
// - POST_BY_SLUG_QUERY
```

#### **2. TypeScript Types (`app/lib/types.ts`)**
```typescript
export interface WPSEO {
  // ... existing fields
  fullHead?: string  // ← NEW
}
```

#### **3. Yoast SEO Library (`app/lib/yoast-seo.ts`)**
```typescript
// NEW Functions:
export function extractYoastFullHead(yoastSEO: WPSEO): {
  schemaData: string | null
  metaTags: string | null
}

export function sanitizeYoastHTML(html: string): string
```

#### **4. Page Queries (`app/lib/page-queries.ts`)** - NEW FILE
```typescript
// WordPress page integration for static pages
export async function getPageBySlug(slug: string): Promise<WordPressPage | null>
export async function getPageSEOData(slug: string, fallbackTitle: string, fallbackDescription: string)
```

#### **5. SEO Components (`app/components/seo/`)** - NEW
```typescript
// Reusable components for Yoast head injection
export function YoastSEOHead({ seoData }: { seoData: WPSEO })
export function ConditionalYoastSEOHead({ seoData }: { seoData?: WPSEO | null })
```

### Pages Enhanced

#### **Blog Posts (`app/(site)/posts/[slug]/page.tsx`)**
```typescript
// Enhanced generateMetadata with Yoast SEO
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(slug)
  
  if (post?.seo) {
    const metadata = convertYoastToMetadata(post.seo, fallbackTitle, fallbackDescription)
    // Enhanced with article-specific OpenGraph data
    return metadata
  }
  
  // Comprehensive fallback metadata
  return fallbackMetadata
}

// Component with Yoast head injection
export default async function PostPage({ params }: PostPageProps) {
  // ...
  return (
    <>
      <ConditionalYoastSEOHead seoData={post.seo} />
      {/* Rest of page content */}
    </>
  )
}
```

#### **Homepage (`app/(site)/page.tsx`)**
```typescript
// Optional WordPress homepage integration
export async function generateMetadata(): Promise<Metadata> {
  const homePageSEO = await getPageSEOData(COMMON_PAGE_SLUGS.HOME, fallbackTitle, fallbackDescription)
  
  if (homePageSEO.hasYoastSEO) {
    return convertYoastToMetadata(homePageSEO.seoData, homePageSEO.title, homePageSEO.description)
  }
  
  return staticMetadata
}
```

#### **About Page (`app/(site)/about/page.tsx`)**
```typescript
// Example of static page with optional WordPress integration
export async function generateMetadata(): Promise<Metadata> {
  const aboutPageSEO = await getPageSEOData(COMMON_PAGE_SLUGS.ABOUT, 'About Us', 'Description...')
  
  if (aboutPageSEO.hasYoastSEO) {
    return convertYoastToMetadata(aboutPageSEO.seoData, aboutPageSEO.title, aboutPageSEO.description)
  }
  
  return staticMetadata
}
```

## 🎯 SEO Data Flow

### 1. **Blog Posts** (Primary Use Case)
```
WordPress Post (Yoast) → WPGraphQL → Next.js generateMetadata → Page Head
                      ↘ fullHead → YoastSEOHead Component → Schema Injection
```

### 2. **Static Pages** (Optional)
```
WordPress Page (Yoast) → WPGraphQL → Next.js generateMetadata → Page Head
                      ↘ OR fallback to static metadata
```

### 3. **Fallback Strategy**
```
Yoast Data Available? → YES: Use Yoast metadata + schema
                     → NO:  Use static metadata + default schema
```

## 🛡️ Functionality Preserved

### ✅ **All Existing Features Intact**
- WordPress GraphQL blog posts
- Google Indexing API integration  
- Gemini AI coupon generation
- Scheduled cron jobs
- Menu system and data fetching
- Texas Roadhouse branding
- Performance optimizations

### ✅ **SEO Enhancements**
- Yoast SEO title → `<title>` tag
- Yoast meta description → `<meta name="description">`
- Yoast canonical → `<link rel="canonical">`
- Yoast OpenGraph → `<meta property="og:*">`
- Yoast Twitter Cards → `<meta name="twitter:*">`
- Yoast Schema → `<script type="application/ld+json">`

## 🔍 Usage Examples

### For Blog Posts
```typescript
// Automatic - no changes needed to existing posts
// Yoast SEO data from WordPress is automatically used
// Falls back to excerpt and title if Yoast not available
```

### For Adding New Static Pages
```typescript
// 1. Create page in WordPress with Yoast SEO
// 2. Add slug to COMMON_PAGE_SLUGS in page-queries.ts
// 3. Use generateMetadata pattern from about/page.tsx
// 4. Add <ConditionalYoastSEOHead> to component
```

### For Custom Schema
```typescript
// In any page component:
<ConditionalYoastSEOHead 
  seoData={yoastData} 
  fallbackSchema={JSON.stringify(customSchema)}
/>
```

## 🧪 Testing & Validation

### Build Test Results
```bash
npm run build
# ✅ Build successful
# ✅ All pages generate correctly  
# ✅ Static generation working
# ✅ No TypeScript errors
```

### What to Test
1. **Blog posts with Yoast SEO** → Check meta tags and schema
2. **Blog posts without Yoast** → Verify fallbacks work
3. **Homepage** → Test optional WordPress integration  
4. **Static pages** → Confirm static metadata works
5. **Schema validation** → Use Google Rich Results Test

### Validation Tools
- **Google Rich Results Test**: Test schema markup
- **Facebook Debugger**: Validate OpenGraph tags
- **Twitter Card Validator**: Check Twitter meta tags
- **View Page Source**: Inspect generated HTML

## 🚀 Deployment Notes

### Environment Variables Required
```bash
# Existing (already configured)
NEXT_PUBLIC_WORDPRESS_API_URL=https://texasroadhousemenu.me/graphql
NEXT_PUBLIC_SITE_NAME=Texas Roadhouse Menu
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### WordPress Configuration
1. **Yoast SEO Plugin**: Must be installed and activated
2. **WPGraphQL Plugin**: Must support Yoast SEO fields
3. **Content**: Configure Yoast SEO for posts/pages you want optimized

### Performance Impact
- **Minimal**: Uses existing GraphQL queries
- **Caching**: Respects ISR revalidation timings (1 hour)
- **Fallback**: Graceful degradation when Yoast unavailable

## 📋 Summary

✅ **Complete Yoast SEO Integration** - All fields supported  
✅ **Robust Fallback System** - Works without Yoast  
✅ **Performance Optimized** - Uses ISR caching  
✅ **Security Focused** - Sanitizes injected HTML  
✅ **Type Safe** - Full TypeScript support  
✅ **Build Verified** - All tests passing  
✅ **Functionality Preserved** - No existing features broken  

Your Next.js application now has comprehensive Yoast SEO integration while maintaining all existing functionality! 🎉
