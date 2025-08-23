// WordPress Configuration
export const WORDPRESS_CONFIG = {
  API_URL: process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://texasroadhousemenu.me/graphql',
  SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME || 'Texas Roadhouse Menu',
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
}
