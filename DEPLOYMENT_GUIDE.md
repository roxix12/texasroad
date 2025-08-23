# Texas Roadhouse Menu - Deployment Guide

## Project Overview
This Next.js application includes:
- ✅ SEO optimization with Yoast metadata
- ✅ WordPress GraphQL blog integration  
- ✅ Google Indexing API for automatic URL submission
- ✅ Gemini AI for dynamic coupon generation
- ✅ Scheduled cron jobs for daily updates
- ✅ Responsive design with Texas Roadhouse branding

## 🚀 Deployment Steps

### Step 1: GitHub Setup

1. **Install Git** (if not already installed):
   - Download from: https://git-scm.com/downloads
   - Follow installation wizard

2. **Initialize Git Repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Texas Roadhouse Menu site"
   ```

3. **Connect to GitHub**:
   ```bash
   git remote add origin https://github.com/roxi12/Texasroadhouse.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Vercel Deployment

1. **Go to Vercel**: https://vercel.com
2. **Import Project**: 
   - Click "New Project"
   - Connect GitHub and select `roxi12/Texasroadhouse`
   - Framework: **Next.js** (auto-detected)
   - Root Directory: `./`

3. **Environment Variables** (CRITICAL):
   Add these in Vercel Dashboard → Project Settings → Environment Variables:

   ```
   NEXT_PUBLIC_WORDPRESS_API_URL=https://texasroadhousemenu.me/graphql
   NEXT_PUBLIC_SITE_NAME=Texas Roadhouse Menu
   NEXT_PUBLIC_SITE_URL=https://your-final-domain.com
   GEMINI_API_KEY=your_actual_gemini_key
   GOOGLE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
   your_actual_private_key_content_here
   -----END PRIVATE KEY-----"
   ```

   **⚠️ Important Notes:**
   - Set all as "Production", "Preview", and "Development"
   - For `GOOGLE_PRIVATE_KEY`: Keep quotes and newlines as shown
   - For `NEXT_PUBLIC_SITE_URL`: Update with your final domain

4. **Deploy**: Click "Deploy" and wait for build completion

### Step 3: Domain Setup

1. **In Vercel Dashboard**:
   - Go to Project Settings → Domains
   - Click "Add Domain"
   - Enter your purchased domain (e.g., `yourdomain.com`)

2. **DNS Configuration** (with your domain provider):
   ```
   Type: CNAME
   Name: www (or @)
   Value: cname.vercel-dns.com
   ```
   
   **Alternative (A Record)**:
   ```
   Type: A
   Name: @ 
   Value: 76.76.19.61
   ```

3. **SSL Certificate**: Vercel automatically provisions HTTPS

### Step 4: Final Verification

✅ **Homepage Loads**: Check main page with coupons section
✅ **Blog Posts**: Verify `/posts` loads from WordPress GraphQL  
✅ **Menu Pages**: Test `/menus` functionality
✅ **Google Indexing**: Test `/api/reindex` endpoint
✅ **Cron Jobs**: Verify in Vercel Functions tab
✅ **SEO**: Check meta tags and `/sitemap.xml`

## 🔧 Build Configuration

The project includes optimized build settings:

**next.config.js**: 
- Image optimization for remote sources
- TypeScript strict mode
- Typed routes enabled

**vercel.json**:
- Cron job: Daily at 8 AM EST (1 PM UTC)
- Function timeouts: 30 seconds for API routes
- Proper function mapping

## 🌐 Environment Variables Reference

| Variable | Purpose | Example |
|----------|---------|---------|
| `NEXT_PUBLIC_WORDPRESS_API_URL` | WordPress GraphQL endpoint | `https://texasroadhousemenu.me/graphql` |
| `NEXT_PUBLIC_SITE_NAME` | Site title for SEO | `Texas Roadhouse Menu` |
| `NEXT_PUBLIC_SITE_URL` | Production domain | `https://yourdomain.com` |
| `GEMINI_API_KEY` | AI coupon generation | `AI...` |
| `GOOGLE_CLIENT_EMAIL` | Service account email | `account@project.iam.gserviceaccount.com` |
| `GOOGLE_PRIVATE_KEY` | Service account private key | `-----BEGIN PRIVATE KEY-----...` |

## 🛠️ Troubleshooting

**Build Failures**:
- Check environment variables are set correctly
- Verify Node.js version compatibility (18+)
- Review build logs for specific errors

**API Issues**:
- Test WordPress GraphQL endpoint independently
- Verify Google service account permissions
- Check Gemini API key validity

**Domain Issues**:
- DNS propagation can take up to 48 hours
- Use DNS checker tools to verify records
- Try clearing browser cache

## 📞 Support

- **WordPress Issues**: Check GraphQL endpoint health
- **Google APIs**: Verify service account setup in Google Cloud Console
- **Vercel Issues**: Check Vercel status page and logs
- **Domain Issues**: Contact domain provider support

---

🎉 **Your Texas Roadhouse Menu site is now ready for production!**
