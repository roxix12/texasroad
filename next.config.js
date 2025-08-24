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
        hostname: 'admin.texasroadhouse-menus.us',
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

  // Clean redirects - only essential ones remain
  async redirects() {
    return [
      // Add specific redirects here only when needed
      // No legacy redirects - clean slate
    ]
  },
}

module.exports = nextConfig
