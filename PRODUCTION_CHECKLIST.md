# Production Deployment Checklist

## 🚀 Pre-Deployment Verification

### Code Quality & Configuration
- [ ] **Build Success**: `npm run build` completes without errors
- [ ] **TypeScript**: No type errors in build process
- [ ] **Linting**: `npm run lint` passes clean
- [ ] **Environment**: All required env vars documented in `.env.example`

### SEO & Metadata 
- [ ] **Sitemap**: `/sitemap.xml` generates correctly
- [ ] **Robots**: `/robots.txt` accessible
- [ ] **Meta Tags**: Pages have proper title, description, Open Graph
- [ ] **Schema**: JSON-LD structured data present
- [ ] **Yoast SEO**: WordPress SEO data imports correctly

### Core Functionality
- [ ] **Homepage**: Loads with Texas Roadhouse branding
- [ ] **Navigation**: All menu links work
- [ ] **WordPress Blog**: Posts load from GraphQL
- [ ] **Menu Pages**: Categories and items display
- [ ] **Responsive**: Mobile/tablet layouts work
- [ ] **Performance**: Lighthouse scores > 90

## 🔌 API Integration Tests

### WordPress GraphQL
- [ ] **Connection**: GraphQL endpoint responds
- [ ] **Posts**: Blog posts fetch and display
- [ ] **Categories**: Post categories work
- [ ] **Images**: Featured images load correctly
- [ ] **SEO Data**: Yoast metadata imports

### Google Indexing API
- [ ] **Authentication**: Service account credentials valid
- [ ] **Endpoint**: `/api/reindex` returns success
- [ ] **URL Submission**: URLs submitted to Google successfully
- [ ] **Error Handling**: Graceful failure when API unavailable

### Gemini AI Coupons
- [ ] **API Key**: Gemini key valid and working
- [ ] **Generation**: `/api/update-coupons` creates new coupons
- [ ] **Storage**: Coupons save to JSON file correctly
- [ ] **Display**: Homepage shows current coupons
- [ ] **Fallback**: Shows backup coupons when API fails

### Scheduled Jobs
- [ ] **Cron Config**: `vercel.json` has correct schedule
- [ ] **Function Timeout**: 30-second limit configured
- [ ] **Daily Execution**: Coupons update at 8 AM EST (1 PM UTC)

## 🌐 Production Environment

### Vercel Configuration
- [ ] **Framework**: Next.js auto-detected
- [ ] **Build Command**: `npm run build` 
- [ ] **Output Directory**: `.next` (default)
- [ ] **Node Version**: 18.x or higher
- [ ] **Function Regions**: Auto (or specify if needed)

### Environment Variables (Production)
- [ ] `NEXT_PUBLIC_WORDPRESS_API_URL` = `https://texasroadhousemenu.me/graphql`
- [ ] `NEXT_PUBLIC_SITE_NAME` = `Texas Roadhouse Menu`
- [ ] `NEXT_PUBLIC_SITE_URL` = `https://yourdomain.com`
- [ ] `GEMINI_API_KEY` = Valid Gemini API key
- [ ] `GOOGLE_CLIENT_EMAIL` = Service account email
- [ ] `GOOGLE_PRIVATE_KEY` = Private key (with proper newlines)

### Security & Performance
- [ ] **HTTPS**: SSL certificate auto-provisioned
- [ ] **Headers**: Security headers configured
- [ ] **Caching**: Static assets cached properly
- [ ] **CDN**: Vercel Edge Network active
- [ ] **Compression**: Gzip/Brotli enabled

## 🎯 Post-Deployment Testing

### Website Functionality
1. **Homepage** (`/`)
   - [ ] Hero section loads
   - [ ] Coupons section displays
   - [ ] Navigation works
   - [ ] Footer links active

2. **Blog Section** (`/posts`)
   - [ ] Post list loads from WordPress
   - [ ] Individual posts open (`/posts/[slug]`)
   - [ ] Images display correctly
   - [ ] SEO metadata present

3. **Menu Section** (`/menus`)
   - [ ] Categories display
   - [ ] Menu items load
   - [ ] Filtering works
   - [ ] Individual menu pages accessible

4. **Other Pages**
   - [ ] About page (`/about`)
   - [ ] Contact page (`/contact`)
   - [ ] Legal page (`/legal`)
   - [ ] 404 page styling

### API Endpoints Testing
1. **Reindex API** (`/api/reindex`)
   ```bash
   curl -X GET https://yourdomain.com/api/reindex
   # Expected: {"success": true, "message": "..."}
   ```

2. **Update Coupons** (`/api/update-coupons`)
   ```bash
   curl -X GET https://yourdomain.com/api/update-coupons?force=true
   # Expected: {"success": true, "updated": true}
   ```

3. **RSS Feed** (`/api/rss`)
   ```bash
   curl -X GET https://yourdomain.com/api/rss
   # Expected: Valid XML RSS feed
   ```

### SEO Verification
- [ ] **Google Search Console**: Submit sitemap
- [ ] **Meta Tags**: Verify with Facebook Debugger
- [ ] **Schema**: Test with Google Rich Results
- [ ] **Performance**: Check with PageSpeed Insights
- [ ] **Accessibility**: Verify WCAG compliance

### Monitoring Setup
- [ ] **Vercel Analytics**: Enabled for traffic insights
- [ ] **Error Tracking**: Vercel Functions logs
- [ ] **Uptime Monitoring**: Consider external service
- [ ] **Performance**: Lighthouse CI (optional)

## 🔧 Troubleshooting Guide

### Build Issues
**Error**: `Module not found`
- Check all imports use correct paths
- Verify node_modules installed correctly

**Error**: `Environment variable not found`
- Confirm all env vars set in Vercel Dashboard
- Check spelling and case sensitivity

### Runtime Issues
**Error**: `GraphQL endpoint unreachable`
- Verify WordPress site is online
- Check GraphQL endpoint URL is correct

**Error**: `Google API authentication failed`
- Verify service account permissions
- Check private key formatting (newlines)

**Error**: `Gemini API quota exceeded`
- Check API usage in Google Cloud Console
- Implement fallback coupon system

### Domain Issues
**Problem**: Domain not resolving
- Check DNS records with domain provider
- Wait for DNS propagation (up to 48 hours)

**Problem**: SSL not working
- Verify domain ownership in Vercel
- Wait for automatic certificate provisioning

## 📊 Success Metrics

### Technical Metrics
- **Build Time**: < 2 minutes
- **Page Load**: < 3 seconds (homepage)
- **API Response**: < 500ms (GraphQL/APIs)
- **Uptime**: > 99.9%

### SEO Metrics
- **Lighthouse Performance**: > 90
- **Core Web Vitals**: All "Good"
- **Mobile Friendliness**: Pass
- **Schema Validation**: No errors

### Business Metrics
- **Page Views**: Track via Vercel Analytics
- **Bounce Rate**: Monitor user engagement
- **API Usage**: Google/Gemini quota consumption
- **Search Visibility**: Google Search Console

---

## 🎉 Deployment Complete!

When all items are checked ✅, your Texas Roadhouse Menu website is successfully deployed and ready for production traffic!

**Next Steps:**
1. Submit sitemap to Google Search Console
2. Set up monitoring and alerts
3. Plan regular content updates
4. Monitor performance and user feedback
