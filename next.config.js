/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'texasroadhouse-menus.us',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'admin.texasroadhouse-menus.us',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'], // ✅ Modern formats for better performance
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days cache
    dangerouslyAllowSVG: false, // Security: disable SVG for remote images
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false, // Enable Next.js image optimization
  },

  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  experimental: {
    optimizePackageImports: ['lucide-react'],
    scrollRestoration: true,
  },

  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          framework: {
            chunks: 'all',
            name: 'framework',
            test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            enforce: true,
          },
          lib: {
            test: /[\\/]node_modules[\\/]/,
            name: 'lib',
            priority: 30,
            chunks: 'all',
          },
        },
      }
    }
    return config
  },

  // Headers for caching and security
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
        ],
      },
    ]
  },

  async redirects() {
    return [
      // add custom redirects if needed
    ]
  },
}

module.exports = nextConfig
