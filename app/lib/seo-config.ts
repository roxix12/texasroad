import { Metadata } from 'next'

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Texas Roadhouse Menu'
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3001'

export const defaultSEO: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: `%s | ${siteName}`,
    default: `${siteName} - Independent Menu Guide & Prices`,
  },
  description: 'Complete guide to Texas Roadhouse menu items, prices, and nutritional information. Independent informational website with latest menu updates.',
  keywords: [
    'Texas Roadhouse menu',
    'restaurant menu prices',
    'steakhouse menu',
    'menu nutrition information',
    'restaurant prices',
    'Texas Roadhouse prices',
    'steaks menu',
    'ribs menu',
    'appetizers menu',
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': [
        { url: '/api/rss', title: `${siteName} RSS Feed` },
      ],
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName,
    title: `${siteName} - Independent Menu Guide`,
    description: 'Complete guide to Texas Roadhouse menu items, prices, and nutritional information',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: siteName,
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} - Independent Menu Guide`,
    description: 'Complete guide to Texas Roadhouse menu items, prices, and nutritional information',
    images: ['/og-image.jpg'],
    creator: '@texasroadhousemenu',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
}

export function generatePageSEO({
  title,
  description,
  path,
  keywords = [],
  noIndex = false,
  lastModified,
}: {
  title: string
  description: string
  path: string
  keywords?: string[]
  noIndex?: boolean
  lastModified?: string
}): Metadata {
  const fullUrl = `${siteUrl}${path}`
  
  return {
    title,
    description,
    keywords: [...(defaultSEO.keywords as string[]), ...keywords],
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url: fullUrl,
      type: 'website',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      title: `${title} | ${siteName}`,
      description,
    },
    robots: {
      index: !noIndex,
      follow: true,
      googleBot: {
        index: !noIndex,
        follow: true,
      },
    },
    ...(lastModified && { 
      other: { 
        'last-modified': lastModified 
      } 
    }),
  }
}

export function generateMenuItemSEO(menuItem: {
  title: string
  description: string
  price: number
  category: string
  slug: string
}): Metadata {
  const title = `${menuItem.title} - $${menuItem.price.toFixed(2)} | ${siteName}`
  const description = `${menuItem.description} Price: $${menuItem.price.toFixed(2)}. Category: ${menuItem.category}. View complete menu details and nutrition info.`
  
  return generatePageSEO({
    title,
    description,
    path: `/menus/${menuItem.slug}`,
    keywords: [
      menuItem.title.toLowerCase(),
      menuItem.category.toLowerCase(),
      'menu item',
      'price',
      'nutrition',
      'restaurant',
    ],
  })
}

export function generateArticleSEO(article: {
  title: string
  excerpt: string
  slug: string
  date: string
  categories: string[]
}): Metadata {
  return generatePageSEO({
    title: article.title,
    description: article.excerpt,
    path: `/posts/${article.slug}`,
    keywords: [
      ...article.categories.map(cat => cat.toLowerCase()),
      'blog',
      'article',
      'menu news',
      'restaurant news',
    ],
    lastModified: article.date,
  })
}

export const defaultViewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export const pageSpeedOptimizations = {
  // Critical resource hints
  preconnect: [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ],
  // DNS prefetch for external domains
  dnsPrefetch: [
    'https://www.texasroadhouse.com',
  ],
}
