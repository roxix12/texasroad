# 🚀 Quick Deploy Reference

## Essential Commands

### Git Setup (One-time)
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/roxi12/Texasroadhouse.git
git push -u origin main
```

### Vercel Environment Variables
```
NEXT_PUBLIC_WORDPRESS_API_URL=https://texasroadhousemenu.me/graphql
NEXT_PUBLIC_SITE_NAME=Texas Roadhouse Menu  
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
GEMINI_API_KEY=your_gemini_key
GOOGLE_CLIENT_EMAIL=service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----..."
```

### DNS Records (Domain Provider)
```
Type: CNAME | Name: www | Value: cname.vercel-dns.com
Type: CNAME | Name: @   | Value: cname.vercel-dns.com
```

### Test URLs After Deployment
- Homepage: `https://yourdomain.com`
- Blog: `https://yourdomain.com/posts`
- Menu: `https://yourdomain.com/menus`
- API Test: `https://yourdomain.com/api/reindex`
- Sitemap: `https://yourdomain.com/sitemap.xml`

## Critical Files Created
✅ `.gitignore` - Protects sensitive files  
✅ `DEPLOYMENT_GUIDE.md` - Complete instructions  
✅ `GIT_SETUP_COMMANDS.md` - Git commands  
✅ `DOMAIN_SETUP_GUIDE.md` - Domain connection  
✅ `PRODUCTION_CHECKLIST.md` - Final verification  
✅ `scripts/verify-production.js` - Automated checks  

## Deployment Flow
1. **Git Push** → Triggers Vercel build
2. **Build** → Next.js production build
3. **Deploy** → Vercel Edge Network
4. **Test** → All functionality verified
5. **Domain** → Custom domain connected
6. **SSL** → HTTPS automatically enabled

---

**⚠️ Remember:** All your existing SEO, WordPress GraphQL, Google Indexing API, and Gemini coupon functionality is preserved and will work exactly the same in production!
