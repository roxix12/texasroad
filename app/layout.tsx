import type { Metadata, Viewport } from 'next'
import { Inter, Roboto_Slab } from 'next/font/google'
import Script from 'next/script'
import { generateOrganizationSchema, generateWebSiteSchema } from './lib/seo'
import { defaultSEO, defaultViewport, pageSpeedOptimizations } from './lib/seo-config'
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

export const metadata: Metadata = defaultSEO
export const viewport: Viewport = defaultViewport

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationSchema = generateOrganizationSchema()
  const websiteSchema = generateWebSiteSchema()

  return (
    <html lang="en" className={`${inter.variable} ${robotoSlab.variable}`}>
      <head>
        {/* Preconnect to critical domains for faster loading */}
        {pageSpeedOptimizations.preconnect.map((url) => (
          <link key={url} rel="preconnect" href={url} />
        ))}
        {pageSpeedOptimizations.dnsPrefetch.map((url) => (
          <link key={url} rel="dns-prefetch" href={url} />
        ))}
        
        {/* Structured Data - Optimized for Core Web Vitals */}
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
