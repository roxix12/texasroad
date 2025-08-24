/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'texasroadhousemenu.me',
      },
      {
        protocol: 'https',
        hostname: 'texasroadhouse-menus.us',
      },
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  typedRoutes: true,
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Performance optimizations
  poweredByHeader: false,
  reactStrictMode: true,

  // 🚀 REDIRECTS ADDED HERE
  async redirects() {
    return [
      {
        source: '/old-post-slug',
        destination: '/new-post-slug',
        permanent: true, // 301 Redirect
      },
      {
        source: '/old-category/:path*',
        destination: '/new-category/:path*',
        permanent: true,
      },
      {
        source: '/blog/:slug*',  // Example: old WordPress blog URLs
        destination: '/posts/:slug*', // New Next.js posts route
        permanent: true,
      },
      // 🆕 NEW: Redirect /posts/ to root for clean URLs (only for individual posts)
      // Note: Keeping both routes active for now to avoid conflicts
      // {
      //   source: '/posts/:slug',
      //   destination: '/:slug',
      //   permanent: true, // 301 Redirect for SEO
      // },
      
      // 🆕 CATEGORY URL HANDLING - CHOOSE ONE OPTION:
      
      // OPTION A: Keep category pages (SEO-friendly, shows WordPress category content)
      // Comment out the redirect below to enable category pages
      
      // OPTION B: Redirect category URLs to menu page (cleaner URL structure)
      // Uncomment the redirect below to redirect all category URLs to /menus-prices
      // {
      //   source: '/category/:slug*',
      //   destination: '/menus-prices',
      //   permanent: true, // 301 Redirect for SEO
      // },
    ]
  },
}

module.exports = nextConfig
