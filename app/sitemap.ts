import { MetadataRoute } from 'next'
import { menuData } from './data/complete-menu-74'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://texasroadhouse-menus.us'
  
  // ONLY REAL PAGES - No 404 errors for Google!
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/menus-prices`,
      lastModified: new Date(),
      changeFrequency: 'daily', 
      priority: 0.95,
    },
    {
      url: `${siteUrl}/coupons`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/gift-cards`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/posts`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${siteUrl}/cookies-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // MENU CATEGORY ANCHORS - Using # for existing menu page sections
  const menuCategoryUrls: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/menus-prices#appetizers`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${siteUrl}/menus-prices#steaks`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${siteUrl}/menus-prices#ribs`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${siteUrl}/menus-prices#chicken`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${siteUrl}/menus-prices#burgers`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/menus-prices#salads`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/menus-prices#sides`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/menus-prices#desserts`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/menus-prices#kids-menu`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/menus-prices#beverages`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    },
    {
      url: `${siteUrl}/menus-prices#family-packs`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${siteUrl}/menus-prices#combos`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  // INDIVIDUAL MENU ITEM ANCHORS - Direct links to specific items
  const popularMenuItems = [
    'cactus-blossom',
    'sirloin-6oz', 
    'baby-back-ribs',
    'grilled-bbq-chicken',
    'country-fried-chicken',
    'legendary-margarita',
    'fresh-baked-bread',
    'loaded-sweet-potato',
    'caesar-salad',
    'chocolate-cake'
  ]

  const menuItemUrls: MetadataRoute.Sitemap = popularMenuItems.map((slug) => ({
    url: `${siteUrl}/menus-prices#${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }))

  // BLOG POST PLACEHOLDERS - Ready for when you publish new blogs
  // Add your actual blog post slugs here when you create them
  const blogUrls: MetadataRoute.Sitemap = [
    // Example: When you create blogs, add them like this:
    // {
    //   url: `${siteUrl}/posts/texas-roadhouse-secret-recipes`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly' as const,
    //   priority: 0.6,
    // },
    // {
    //   url: `${siteUrl}/posts/best-texas-roadhouse-deals-2025`,
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly' as const,
    //   priority: 0.65,
    // },
  ]

  const allUrls = [
    ...staticUrls,
    ...menuCategoryUrls,
    ...menuItemUrls,
    ...blogUrls
  ]

  console.log(`🎯 CLEAN SITEMAP: ${allUrls.length} REAL URLs (no 404s!)`)
  console.log(`📊 Breakdown: ${staticUrls.length} pages + ${menuCategoryUrls.length} categories + ${menuItemUrls.length} popular items + ${blogUrls.length} blogs`)
  
  return allUrls
}