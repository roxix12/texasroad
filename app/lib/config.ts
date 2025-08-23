// WordPress Configuration
export const WORDPRESS_CONFIG = {
  API_URL: process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://texasroadhousemenu.me/graphql',
  SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME || 'Texas Roadhouse Menu',
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://texasroadhouse-menus.us'
}

// Domain configuration for URL sanitization
export const DOMAIN_CONFIG = {
  // Frontend domain (where Next.js is hosted)
  FRONTEND_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://texasroadhouse-menus.us',
  // WordPress backend domain (to be replaced in Yoast data)
  WORDPRESS_URL: 'https://texasroadhousemenu.me'
}
