import { MetadataRoute } from 'next'
import { menuData } from './data/complete-menu-74'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://texasroadhouse-menus.us'
  
  // High-priority core pages for #1 Google ranking
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
  ]

  // SEO-CRITICAL: Individual menu item pages for long-tail keywords
  const menuUrls: MetadataRoute.Sitemap = menuData.map((item) => ({
    url: `${siteUrl}/menus-prices/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8, // High priority for menu items
  }))

  // Category pages for semantic SEO
  const categories = [
    'appetizers', 'steaks', 'ribs', 'chicken', 'burgers', 'salads', 
    'sides', 'desserts', 'kids-menu', 'beverages', 'family-packs', 'combos'
  ]
  
  const categoryUrls: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${siteUrl}/menus-prices/category/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }))

  // Location-based SEO pages (major US cities)
  const locations = [
    'new-york', 'los-angeles', 'chicago', 'houston', 'phoenix', 'philadelphia',
    'san-antonio', 'san-diego', 'dallas', 'san-jose', 'austin', 'jacksonville',
    'fort-worth', 'columbus', 'charlotte', 'san-francisco', 'indianapolis',
    'seattle', 'denver', 'washington-dc', 'boston', 'nashville', 'baltimore',
    'oklahoma-city', 'louisville', 'portland', 'las-vegas', 'milwaukee',
    'albuquerque', 'tucson', 'fresno', 'sacramento', 'mesa', 'kansas-city',
    'atlanta', 'colorado-springs', 'omaha', 'raleigh', 'miami', 'cleveland',
    'tulsa', 'oakland', 'minneapolis', 'wichita', 'arlington', 'bakersfield'
  ]

  const locationUrls: MetadataRoute.Sitemap = locations.map((location) => ({
    url: `${siteUrl}/locations/${location}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Price-focused landing pages for commercial intent
  const pricePages = [
    'steak-prices', 'rib-prices', 'appetizer-prices', 'family-meal-prices',
    'lunch-prices', 'dinner-prices', 'kids-meal-prices', 'dessert-prices'
  ]

  const priceUrls: MetadataRoute.Sitemap = pricePages.map((page) => ({
    url: `${siteUrl}/${page}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  // Legal pages (required for E-A-T)
  const legalUrls: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${siteUrl}/cookies-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  const allUrls = [
    ...staticUrls,
    ...menuUrls,
    ...categoryUrls,
    ...locationUrls,
    ...priceUrls,
    ...legalUrls
  ]

  console.log(`🚀 SEO OPTIMIZED SITEMAP: ${allUrls.length} URLs for #1 Google ranking`)
  console.log(`📊 Breakdown: ${staticUrls.length} core + ${menuUrls.length} menu + ${categoryUrls.length} categories + ${locationUrls.length} locations + ${priceUrls.length} price pages`)
  
  return allUrls
}