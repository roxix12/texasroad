# 🗺️ Automatic XML Sitemap Updates Setup

## ✅ Dynamic Sitemap Implementation Complete

Your Next.js project now has **automatic XML sitemap updates** that fetch content from WordPress and regenerate whenever content changes.

## 🔧 How It Works

### 1. **Dynamic Sitemap Generation** (`app/sitemap.ts`)
- **Fetches from WordPress**: Uses GraphQL to get all posts, pages, categories, and menus
- **Auto-updates**: Revalidates every hour (3600 seconds)
- **Comprehensive**: Includes all content types with proper SEO attributes
- **Fallback**: Returns static pages if WordPress is unavailable

### 2. **Manual Revalidation API** (`app/api/revalidate-sitemap/route.ts`)
- **Webhook endpoint**: For WordPress to trigger updates immediately
- **Security**: Optional token-based authentication
- **Cache invalidation**: Clears relevant Next.js cache tags

## 📋 Features Included

### ✅ **Content Types in Sitemap:**
- **Static pages**: Home, Menus, Posts, About, Contact, Legal
- **Blog posts**: All published WordPress posts
- **WordPress pages**: Any additional pages from WordPress
- **Categories**: All post categories with content
- **Menu items**: Restaurant menu items
- **Proper SEO**: Priorities, change frequencies, last modified dates

### ✅ **Performance Optimizations:**
- **Caching**: 1-hour cache for sitemap data
- **Revalidation tags**: Granular cache invalidation
- **Error handling**: Graceful fallbacks if WordPress is down
- **Logging**: Detailed console output for debugging

## 🚀 Setup Instructions

### 1. **Environment Variables** (Optional Security)
Add to your `.env.local`:
```bash
# Optional: Token for webhook security
REVALIDATION_TOKEN=your-secret-token-here
```

### 2. **WordPress Webhook Setup** (Recommended)
To trigger immediate sitemap updates when content changes:

#### Option A: Using a Plugin (Recommended)
Install the **WP Webhooks** plugin in WordPress:

1. Install "WP Webhooks" plugin
2. Go to **WP Webhooks → Send Data**
3. Add new webhook:
   - **Webhook URL**: `https://texasroadhouse-menus.us/api/revalidate-sitemap`
   - **Trigger**: `post_updated`, `post_published`, `post_deleted`
   - **Headers**: `Authorization: Bearer your-secret-token-here` (if using token)

#### Option B: Custom WordPress Code
Add to your WordPress theme's `functions.php`:

```php
// Trigger Next.js sitemap revalidation when content changes
function trigger_nextjs_sitemap_revalidation($post_id) {
    $webhook_url = 'https://texasroadhouse-menus.us/api/revalidate-sitemap';
    $token = 'your-secret-token-here'; // Optional
    
    $response = wp_remote_post($webhook_url, array(
        'headers' => array(
            'Authorization' => 'Bearer ' . $token,
            'Content-Type' => 'application/json',
        ),
        'body' => json_encode(array(
            'post_id' => $post_id,
            'timestamp' => current_time('mysql')
        )),
        'timeout' => 30,
    ));
}

// Hook into WordPress events
add_action('publish_post', 'trigger_nextjs_sitemap_revalidation');
add_action('post_updated', 'trigger_nextjs_sitemap_revalidation');
add_action('delete_post', 'trigger_nextjs_sitemap_revalidation');
```

## 🧪 Testing

### Test Dynamic Sitemap
1. **Visit**: `https://texasroadhouse-menus.us/sitemap.xml`
2. **Verify**: All URLs use correct domain
3. **Check**: Recent content appears in sitemap

### Test Manual Revalidation
```bash
# Without authentication
curl -X POST https://texasroadhouse-menus.us/api/revalidate-sitemap

# With authentication (if token is set)
curl -X POST https://texasroadhouse-menus.us/api/revalidate-sitemap \
  -H "Authorization: Bearer your-secret-token-here"
```

### Test WordPress Integration
1. **Create/edit a post** in WordPress
2. **Wait 30 seconds** for webhook
3. **Check sitemap** for new content
4. **Verify** last-modified dates are updated

## 📊 Monitoring

### Build-time Logs
Check your deployment logs for sitemap generation:
```
🗺️ Generating dynamic sitemap from WordPress...
📝 Added 25 blog posts to sitemap
📄 Added 3 WordPress pages to sitemap
🏷️ Added 8 category pages to sitemap
🍽️ Added 45 menu items to sitemap
✅ Generated sitemap with 87 total URLs
```

### Runtime Monitoring
Monitor webhook calls in your application logs:
```
🔄 Sitemap revalidation triggered successfully
```

## 🎯 SEO Benefits

### ✅ **Immediate Updates**
- New content appears in sitemap within minutes
- Search engines discover content faster
- Better indexing of time-sensitive content

### ✅ **Comprehensive Coverage**
- All content types included
- Proper last-modified dates
- Appropriate change frequencies and priorities

### ✅ **Performance Optimized**
- Cached sitemap generation
- Fast response times
- Minimal server load

## 🔧 Advanced Configuration

### Custom Revalidation Frequency
Edit `app/sitemap.ts`:
```typescript
// Change from 3600 (1 hour) to your preferred interval
export const revalidate = 1800 // 30 minutes
```

### Add Custom Content Types
Extend the GraphQL query in `app/sitemap.ts`:
```typescript
const query = `
  query SitemapQuery {
    posts(first: 1000, where: { status: PUBLISH }) { ... }
    pages(first: 1000, where: { status: PUBLISH }) { ... }
    # Add custom post types
    menuItems(first: 1000) { ... }
    testimonials(first: 100) { ... }
  }
`
```

## 📝 Next Steps

1. **Deploy your changes** to production
2. **Set up WordPress webhooks** for real-time updates
3. **Submit sitemap** to Google Search Console: `https://texasroadhouse-menus.us/sitemap.xml`
4. **Monitor indexing** in search console
5. **Test webhook integration** with content updates

---

🎉 **Your sitemap now automatically updates whenever you add or edit content in WordPress!**
