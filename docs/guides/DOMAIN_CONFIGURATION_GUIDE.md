# 🌐 Domain Configuration Guide

## ✅ Complete Domain Separation Setup

Your Next.js frontend is now properly configured to use `https://texasroadhouse-menus.us` while fetching data from your WordPress backend at `https://texasroadhousemenu.me`.

## 🔧 Environment Variables Setup

### Required Environment Variables

Create a `.env.local` file in your project root with:

```bash
# Frontend Domain (where Next.js is hosted)
NEXT_PUBLIC_SITE_URL=https://texasroadhouse-menus.us

# WordPress Backend API
NEXT_PUBLIC_WORDPRESS_API_URL=https://texasroadhousemenu.me/graphql

# Site Configuration
NEXT_PUBLIC_SITE_NAME=Texas Roadhouse Menu

# Optional: Google Analytics (if used)
# NEXT_PUBLIC_GA_ID=your-ga-id

# Optional: Google Site Verification (if used)
# GOOGLE_SITE_VERIFICATION=your-verification-code
```

### Production Deployment

For your production deployment (Vercel, Netlify, etc.), set these environment variables in your hosting platform's dashboard.

## 🔄 What Was Updated

### 1. **Domain Configuration** (`app/lib/config.ts`)
- Updated default site URL to use new frontend domain
- Added domain configuration for URL sanitization

### 2. **URL Sanitization Utility** (`app/lib/url-sanitization.ts`)
- **NEW FILE**: Automatically replaces WordPress URLs with frontend URLs
- Sanitizes Yoast SEO data (canonical URLs, OpenGraph, Twitter, schema)
- Ensures Google never sees the WordPress domain

### 3. **Yoast SEO Integration** (`app/lib/yoast-seo.ts`)
- Updated to use URL sanitization
- All schema data and meta tags now use frontend domain
- WordPress URLs in fullHead content are automatically replaced

### 4. **SEO Configuration** (`app/lib/seo-config.ts`)
- Updated to use centralized configuration
- All metadata now uses correct frontend domain

### 5. **Image Configuration** (`next.config.js`)
- Added explicit domains for WordPress and frontend images
- Optimized image loading for both domains

### 6. **Sitemap** (`app/sitemap.ts`)
- Updated to use frontend domain for all URLs
- Ensures proper SEO with correct canonical URLs

## 🎯 Key Features

### ✅ URL Sanitization
All Yoast SEO data is automatically sanitized:
- **Canonical URLs**: Point to frontend domain
- **OpenGraph og:url**: Uses frontend domain
- **Twitter URLs**: Uses frontend domain
- **Schema.org JSON-LD**: All URLs point to frontend
- **Meta tags**: All references updated

### ✅ Data Fetching
- All GraphQL queries still fetch from WordPress backend
- No data loss or functionality changes
- Proper error handling and fallbacks

### ✅ SEO Optimization
- Google only sees frontend domain URLs
- Canonical URLs prevent duplicate content issues
- Schema.org structured data uses correct domain
- Sitemap uses frontend domain exclusively

## 🧪 Testing

### Build Test
```bash
npm run build
```
✅ **Completed successfully!**

### Manual Verification
1. Check meta tags in browser dev tools
2. Verify canonical URLs point to `texasroadhouse-menus.us`
3. Confirm OpenGraph URLs use frontend domain
4. Validate schema.org JSON-LD uses correct domain

### SEO Tools
- Test with Google Rich Results Test
- Verify sitemap.xml URLs
- Check robots.txt references

## 🚀 Deployment Checklist

- [ ] Set environment variables in production
- [ ] Deploy to `https://texasroadhouse-menus.us`
- [ ] Verify WordPress API connectivity
- [ ] Test Yoast SEO data sanitization
- [ ] Confirm all URLs use frontend domain
- [ ] Submit new sitemap to Google Search Console

## 🔍 URL Sanitization Examples

### Before (WordPress domain):
```html
<link rel="canonical" href="https://texasroadhousemenu.me/menu-item" />
<meta property="og:url" content="https://texasroadhousemenu.me/menu-item" />
```

### After (Frontend domain):
```html
<link rel="canonical" href="https://texasroadhouse-menus.us/menu-item" />
<meta property="og:url" content="https://texasroadhouse-menus.us/menu-item" />
```

## 📝 Additional Notes

- **No SEO Loss**: All URLs properly redirect to new domain
- **Automatic Sanitization**: No manual intervention needed
- **Future-Proof**: All new content automatically uses correct domain
- **WordPress Independence**: Frontend can be moved without affecting WordPress

## 🛠️ Support Functions

### URL Utilities Available:
- `replaceYoastUrls(html)` - Replace WordPress URLs in HTML
- `sanitizeYoastSEO(seoData)` - Sanitize SEO object data
- `sanitizeSchemaData(json)` - Sanitize JSON-LD schema
- `getFrontendUrl(path)` - Generate frontend URLs
- `convertWordPressUrlToFrontend(wpUrl)` - Convert WP URLs

---

🎉 **Your Next.js frontend is now fully configured for the new domain while maintaining WordPress backend connectivity!**
