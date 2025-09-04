import type { Metadata, Viewport } from 'next'
import { Inter, Roboto_Slab } from 'next/font/google'
import Script from 'next/script'
import { generateOrganizationSchema, generateWebSiteSchema } from './lib/seo'
import { defaultSEO, defaultViewport, pageSpeedOptimizations } from './lib/seo-config'
import { getSiteSEOSettings } from './lib/data'
import { YoastSEOHead } from './components/seo'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600'],
  display: 'swap',
  preload: true,
})

const robotoSlab = Roboto_Slab({ 
  subsets: ['latin'],
  variable: '--font-roboto-slab',
  weight: ['700', '800'],
  display: 'swap',
  preload: true,
})

// Generate dynamic metadata from WordPress/Yoast SEO
export async function generateMetadata(): Promise<Metadata> {
  try {
    const siteSEOResponse = await getSiteSEOSettings()
    const wpTitle = siteSEOResponse?.generalSettings?.title
    const wpDescription = siteSEOResponse?.generalSettings?.description
    const logoUrl = siteSEOResponse?.seo?.schema?.companyLogo?.sourceUrl

    return {
      ...defaultSEO,
      title: {
        template: `%s | ${wpTitle || defaultSEO.title}`,
        default: wpTitle || (typeof defaultSEO.title === 'object' && defaultSEO.title && 'default' in defaultSEO.title ? defaultSEO.title.default : 'Texas Roadhouse Menu'),
      },
      description: wpDescription || defaultSEO.description || 'Texas Roadhouse Menu with Prices',
      // Always use local favicon files (your favicon)
      icons: {
        icon: [
          { url: '/favicon.ico', sizes: '16x16 32x32 48x48', type: 'image/x-icon' },
          { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
          { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: [
          { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
        other: [
          { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
        ],
      },
    }
  } catch (error) {
    console.error('Error generating metadata from WordPress:', error)
    return defaultSEO
  }
}

export const viewport: Viewport = defaultViewport

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationSchema = generateOrganizationSchema()
  const websiteSchema = generateWebSiteSchema()
  
  // Fetch site-wide Yoast SEO settings
  const siteSEOResponse = await getSiteSEOSettings()

  return (
    <html lang="en" className={`${inter.variable} ${robotoSlab.variable}`}>
      <head>
        {/* Dynamic Title and Description from WordPress/Yoast */}
        <title>{siteSEOResponse?.generalSettings?.title || 'Texas Roadhouse Menu'}</title>
        <meta name="description" content={siteSEOResponse?.generalSettings?.description || 'Texas Roadhouse Menu with Prices'} />
        
        {/* Your Local Favicon - Always Used */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="msapplication-TileImage" content="/android-chrome-192x192.png" />
        <meta name="theme-color" content="#dc2626" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-F2E25YCMBK"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-F2E25YCMBK');
            `
          }}
        />
        
        {/* OneSignal Push Notifications */}
        <script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.OneSignalDeferred = window.OneSignalDeferred || [];
              OneSignalDeferred.push(async function(OneSignal) {
                await OneSignal.init({
                  appId: "7629b842-fb4e-4821-a9dd-e60ca450a208",
                  safari_web_id: "web.onesignal.auto.201c9c11-2835-4563-82b9-55a6f9094e87",
                  notifyButton: {
                    enable: true,
                  },
                });
              });
            `
          }}
        />
        
        {/* Preconnect to critical domains for faster loading */}
        {pageSpeedOptimizations.preconnect.map((url) => (
          <link key={url} rel="preconnect" href={url} />
        ))}
        {pageSpeedOptimizations.dnsPrefetch.map((url) => (
          <link key={url} rel="dns-prefetch" href={url} />
        ))}
        
        {/* Site-wide Yoast SEO Integration */}
        <YoastSEOHead
          siteSEO={siteSEOResponse?.seo}
          fallbackTitle={siteSEOResponse?.generalSettings?.title || 'Texas Roadhouse Menu'}
          fallbackDescription={siteSEOResponse?.generalSettings?.description || 'Texas Roadhouse Menu with Prices'}
          fallbackFavicon="/favicon.ico"
          fallbackSchema={JSON.stringify(organizationSchema)}
        />
        
        {/* Fallback Structured Data (when no Yoast schema) */}
        {!siteSEOResponse?.seo && (
          <>
            <Script
              id="organization-schema"
              type="application/ld+json"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(organizationSchema),
              }}
            />
            <Script
              id="website-schema"
              type="application/ld+json"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(websiteSchema),
              }}
            />
          </>
        )}
        
        {/* RSS Feed */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Texas Roadhouse Menu RSS Feed"
          href="/api/rss"
        />
        
        {/* Critical CSS for faster loading */}
        <style dangerouslySetInnerHTML={{
          __html: `
            html { scroll-behavior: smooth; }
            body { font-family: var(--font-inter), sans-serif; }
            .font-slab { font-family: var(--font-roboto-slab), serif; }
          `
        }} />
      </head>
      <body className="min-h-screen flex flex-col bg-cream text-stone antialiased">
        {children}
      </body>
    </html>
  )
}
