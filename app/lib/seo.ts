import { getAbsoluteUrl } from './format'

export function generateOrganizationSchema() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Texas Roadhouse Menu'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: siteUrl,
    logo: getAbsoluteUrl('/logo.png'),
    description: 'Independent informational website about Texas Roadhouse menu items, prices, and nutritional information',
    sameAs: [
      'https://www.texasroadhouse.com', // Reference to official site
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      url: getAbsoluteUrl('/contact'),
    },
    disclaimer: 'This website is not affiliated with Texas Roadhouse. All information is provided for reference purposes only.',
  }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateMenuItemSchema(menu: {
  title: string
  menuFields: {
    description: string
    price: number
    category: string
    calories?: number
    allergens?: string[]
  }
  featuredImage?: {
    node: {
      sourceUrl: string
      altText: string
    }
  }
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MenuItem',
    name: menu.title,
    description: menu.menuFields.description,
    menuAddOn: menu.menuFields.category,
    offers: {
      '@type': 'Offer',
      price: menu.menuFields.price,
      priceCurrency: 'USD',
    },
    ...(menu.menuFields.calories && {
      nutrition: {
        '@type': 'NutritionInformation',
        calories: menu.menuFields.calories,
      },
    }),
    ...(menu.featuredImage && {
      image: {
        '@type': 'ImageObject',
        url: menu.featuredImage.node.sourceUrl,
        description: menu.featuredImage.node.altText || menu.title,
      },
    }),
    hasMenuCategory: {
      '@type': 'MenuCategory',
      name: menu.menuFields.category,
    },
  }
}

export function generateArticleSchema(post: {
  title: string
  excerpt?: string
  date: string
  content?: string
  featuredImage?: {
    node: {
      sourceUrl: string
      altText: string
    }
  }
  categories: {
    nodes: Array<{
      name: string
    }>
  }
}) {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Texas Roadhouse Menu'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || '',
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: siteName,
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: getAbsoluteUrl('/logo.png'),
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': siteUrl,
    },
    ...(post.featuredImage && {
      image: {
        '@type': 'ImageObject',
        url: post.featuredImage.node.sourceUrl,
        description: post.featuredImage.node.altText || post.title,
      },
    }),
    articleSection: post.categories.nodes.map(cat => cat.name),
    keywords: post.categories.nodes.map(cat => cat.name).join(', '),
  }
}

export function generateWebSiteSchema() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Texas Roadhouse Menu'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    description: 'Independent informational website about Texas Roadhouse menu items, prices, and nutritional information',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/menus?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      url: siteUrl,
    },
    sameAs: [
      'https://www.texasroadhouse.com',
    ],
  }
}

export function generateRestaurantSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'Texas Roadhouse',
    description: 'American restaurant chain specializing in steaks and American cuisine',
    url: 'https://www.texasroadhouse.com',
    servesCuisine: ['American', 'Steakhouse'],
    hasMenu: 'https://www.texasroadhouse.com/menu',
    // Note: This is referencing the actual restaurant, not our site
    disclaimer: 'Information provided by independent third-party website. Not affiliated with Texas Roadhouse.',
  }
}
