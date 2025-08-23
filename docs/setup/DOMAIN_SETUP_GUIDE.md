# Domain Setup Guide

## Overview
This guide helps you connect your purchased domain to your Texas Roadhouse Menu website hosted on Vercel.

## Step 1: Vercel Domain Configuration

### 1.1 Access Domain Settings
1. Go to **Vercel Dashboard**: https://vercel.com/dashboard
2. Select your **Texas Roadhouse Menu** project
3. Click **Settings** tab
4. Click **Domains** in the sidebar

### 1.2 Add Your Domain
1. Click **Add Domain**
2. Enter your domain:
   - For `yourdomain.com` → enter `yourdomain.com`
   - For `www.yourdomain.com` → enter `www.yourdomain.com`
   - **Recommended**: Add both versions

### 1.3 Domain Verification
Vercel will show you DNS records to add. Keep this tab open!

## Step 2: DNS Configuration (With Your Domain Provider)

### Option A: CNAME Record (Recommended)
Add these records in your domain provider's DNS management:

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600 (or Auto)
```

```
Type: CNAME  
Name: @
Value: cname.vercel-dns.com
TTL: 3600 (or Auto)
```

### Option B: A Record (Alternative)
If CNAME doesn't work, use A records:

```
Type: A
Name: @
Value: 76.76.19.61
TTL: 3600
```

```
Type: A
Name: www  
Value: 76.76.19.61
TTL: 3600
```

### Popular Domain Providers:

#### GoDaddy
1. Login to GoDaddy account
2. Go to **My Products** → **DNS**
3. Click **Manage** next to your domain
4. Add records as shown above

#### Namecheap
1. Login to Namecheap account
2. Go to **Domain List** → **Manage**
3. Click **Advanced DNS** tab
4. Add records as shown above

#### Cloudflare
1. Login to Cloudflare account
2. Select your domain
3. Go to **DNS** → **Records**
4. Add records as shown above

## Step 3: Update Environment Variables

### 3.1 Update Site URL
In Vercel Dashboard → Project Settings → Environment Variables:

1. Find `NEXT_PUBLIC_SITE_URL`
2. Update value to: `https://yourdomain.com`
3. Apply to: **Production**, **Preview**, **Development**
4. Click **Save**

### 3.2 Redeploy
1. Go to **Deployments** tab
2. Click **Redeploy** on latest deployment
3. Wait for build completion

## Step 4: SSL Certificate

### Automatic SSL (Vercel)
- Vercel automatically provisions SSL certificates
- HTTPS will be enabled within 24 hours
- No action required on your part

### Force HTTPS Redirect
Vercel automatically redirects HTTP → HTTPS for custom domains.

## Step 5: Verification & Testing

### DNS Propagation Check
Use online tools to verify DNS:
- https://dnschecker.org/
- https://whatsmydns.net/

Enter your domain and check if it resolves to Vercel's servers.

### Website Testing
1. **Homepage**: `https://yourdomain.com`
   - ✅ Loads Texas Roadhouse branding
   - ✅ Coupons section displays
   - ✅ Navigation works

2. **Blog**: `https://yourdomain.com/posts`
   - ✅ WordPress posts load
   - ✅ Individual post pages work

3. **Menu**: `https://yourdomain.com/menus`
   - ✅ Menu categories display
   - ✅ Menu items load correctly

4. **APIs**: 
   - ✅ `https://yourdomain.com/api/reindex` (Google Indexing)
   - ✅ `https://yourdomain.com/api/update-coupons` (Gemini Coupons)

## Troubleshooting

### Common Issues

#### "Domain not working after 24 hours"
- Check DNS records are correctly configured
- Verify TTL values (should be 3600 or lower)
- Clear browser cache
- Try incognito/private browsing

#### "SSL Certificate not working"
- Wait up to 24 hours for automatic provisioning
- Check domain is properly verified in Vercel
- Contact Vercel support if issues persist

#### "Website shows old content"
- Clear browser cache
- Try different browser
- Check if deployment completed successfully

### DNS Propagation Time
- **Typical**: 2-6 hours
- **Maximum**: 48 hours
- **Factors**: Domain provider, TTL settings, geographic location

### Support Contacts
- **Vercel Support**: https://vercel.com/help
- **Domain Provider**: Check your registrar's support page
- **DNS Issues**: Use DNS checker tools first

## Final Checklist

✅ Domain added in Vercel Dashboard  
✅ DNS records configured with domain provider  
✅ `NEXT_PUBLIC_SITE_URL` updated in environment variables  
✅ Website redeployed with new settings  
✅ DNS propagation completed  
✅ HTTPS certificate active  
✅ All pages and APIs working  

---

🎉 **Your custom domain is now live!**

Your Texas Roadhouse Menu website is now accessible at your custom domain with full SSL encryption and all features intact.
