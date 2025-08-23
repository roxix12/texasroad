import { Suspense } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { Hero } from '@/components/layout'
import { CouponSection } from '@/components/coupons'
import { FeaturedPosts } from '@/components/blog'
import { Button } from '@/components/ui'
import { getFeaturedMenus, getPosts } from '@/lib/data'
import { getCouponsWithUpdateCheck } from '@/lib/coupon-storage'
import { getFormattedDate, getISODate, getStructuredDate } from '@/lib/date'
import { getPageSEOData, COMMON_PAGE_SLUGS } from '@/lib/page-queries'
import { convertYoastToMetadata } from '@/lib/yoast-seo'
import { ConditionalYoastSEOHead } from '@/components/seo'

// Enable ISR with 60-second revalidation for real-time WordPress updates
export const revalidate = 60

// Generate metadata with SEO-friendly pagination links
export async function generateMetadata(): Promise<Metadata> {
  try {
    // Try to get Yoast SEO data from WordPress homepage
    const homePageSEO = await getPageSEOData(
      COMMON_PAGE_SLUGS.HOME,
      `Texas Roadhouse Menu with Prices 2025 | Updated ${getFormattedDate()} - Texas Roadhouse Menu`,
      `Complete Texas Roadhouse menu guide with current prices, calories & nutrition info. Updated ${getFormattedDate()}. Find steaks, ribs, family meals, deals & coupons.`
    )
    
    // If Yoast SEO data exists, use it
    if (homePageSEO?.hasYoastSEO && homePageSEO?.seoData) {
      const yoastMetadata = convertYoastToMetadata(
        homePageSEO.seoData,
        homePageSEO.title,
        homePageSEO.description
      )
      if (yoastMetadata) {
        return yoastMetadata
      }
    }
    
    // Fallback to static SEO data
    return {
      title: `Texas Roadhouse Menu with Prices 2025 | Updated ${getFormattedDate()} - Texas Roadhouse Menu`,
      description: `Complete Texas Roadhouse menu guide with current prices, calories & nutrition info. Updated ${getFormattedDate()}. Find steaks, ribs, family meals, deals & coupons.`,
      keywords: [
        'Texas Roadhouse menu 2025',
        `Texas Roadhouse prices ${getFormattedDate()}`, 
        'Texas Roadhouse calories nutrition',
        'Texas Roadhouse family meals deals',
        'Texas Roadhouse coupons 2025',
        'Texas Roadhouse USA menu updated'
      ].join(', '),
      openGraph: {
        title: `Texas Roadhouse Menu with Prices 2025 | Complete Guide - Updated ${getFormattedDate()}`,
        description: `Latest Texas Roadhouse menu with prices, calories & nutrition. Updated ${getFormattedDate()}. Find steaks, ribs, family meals & exclusive deals.`,
        url: 'https://texasroadhousemenu.me',
        siteName: 'Texas Roadhouse Menu',
        images: [
          {
            url: 'https://texasroadhousemenu.me/images/texas-roadhouse-menu-2025.jpg',
            width: 1200,
            height: 630,
            alt: `Texas Roadhouse Menu with Prices 2025 - Complete Guide - Updated ${getFormattedDate()}`
          }
        ],
        locale: 'en_US',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `Texas Roadhouse Menu with Prices 2025 | Updated ${getFormattedDate()}`,
        description: `Complete Texas Roadhouse menu with current prices, calories & nutrition. Updated ${getFormattedDate()}. Find steaks, ribs, family meals & deals.`,
        images: ['https://texasroadhousemenu.me/images/texas-roadhouse-menu-2025.jpg'],
      },
      alternates: {
        canonical: 'https://texasroadhousemenu.me',
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      other: {
        'article:published_time': '2025-08-22T00:00:00Z',
        'article:modified_time': '2025-08-22T12:00:00Z',
      }
    }
  } catch (error) {
    console.error('❌ Error generating metadata:', error)
    // Return basic metadata if there's an error
    return {
      title: 'Texas Roadhouse Menu with Prices 2025',
      description: 'Complete Texas Roadhouse menu guide with current prices, calories & nutrition info.',
    }
  }
}

// JSON-LD Schemas for Rich Snippets
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Texas Roadhouse Menu",
  "alternateName": `Texas Roadhouse Menu with Prices 2025 - Updated ${getFormattedDate()}`,
  "url": "https://texasroadhousemenu.me",
  "description": `Complete guide to Texas Roadhouse menu items, prices, calories, and nutrition information updated for ${getFormattedDate()}.`,
  "dateModified": getISODate(),
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://texasroadhousemenu.me/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Texas Roadhouse Menu",
    "logo": {
      "@type": "ImageObject",
      "url": "https://texasroadhousemenu.me/logo.png"
    }
  },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "description": "Latest Texas Roadhouse coupons and deals"
  }
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Texas Roadhouse Menu",
  "url": "https://texasroadhousemenu.me",
  "logo": "https://texasroadhousemenu.me/logo.png",
  "description": `Your complete guide to Texas Roadhouse menu items, prices, calories, and nutrition information. Updated ${getFormattedDate()}.`,
  "dateModified": getISODate(),
  "sameAs": [
    "https://www.facebook.com/texasroadhousemenu",
    "https://www.twitter.com/txroadhousemenu"
  ]
}

async function FeaturedContent() {
  try {
    const [featuredMenus, latestPosts, couponData] = await Promise.all([
      getFeaturedMenus(6),
      getPosts(3),
      getCouponsWithUpdateCheck(),
    ])

    return (
      <>
        {/* Coupons & Discount Codes Section */}
        <CouponSection 
          dynamicCoupons={couponData.coupons}
          lastUpdated={new Date(couponData.metadata.last_updated).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          })}
        />

        {/* Latest Blog Posts Section */}
        {latestPosts.posts.nodes.length > 0 && (
          <section className="py-16 bg-sand/30">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="font-slab font-slab-extra text-3xl sm:text-4xl text-stone mb-4">
                  Latest Articles
                </h2>
                <p className="text-lg text-stone/70 max-w-2xl mx-auto">
                  Stay updated with the latest menu additions, cooking tips, and restaurant news
                </p>
              </div>
              
              <FeaturedPosts posts={latestPosts.posts.nodes} />
              
              <div className="text-center mt-12">
                <Link href="/posts">
                  <Button variant="outline" size="lg" className="border-texas-yellow text-texas-black hover:bg-texas-yellow hover:text-texas-black">
                    Read More Articles
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-texas-black text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-slab font-slab-extra text-3xl sm:text-4xl mb-4 text-texas-yellow">
              Explore Our Complete Menu
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              From legendary steaks to fresh salads, discover all the flavors that make every meal memorable
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/menus">
                <Button variant="secondary" size="lg" className="bg-texas-green hover:bg-texas-green/90 text-white">
                  Browse Menus
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="border-texas-yellow text-texas-yellow hover:bg-texas-yellow hover:text-texas-black">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </>
    )
  } catch (error) {
    console.error('❌ Error loading featured content:', error)
    
    // Return a fallback UI when WordPress is unavailable
    return (
      <>
        {/* Coupons & Discount Codes Section */}
        <CouponSection 
          dynamicCoupons={[]}
          lastUpdated={new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          })}
        />

        {/* WordPress Connection Issue Message */}
        <section className="py-16 bg-sand/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-slab font-slab-extra text-3xl sm:text-4xl text-stone mb-4">
                Latest Articles
              </h2>
              <p className="text-lg text-stone/70 max-w-2xl mx-auto">
                We're currently experiencing issues connecting to our content system. Please check back later.
              </p>
              <div className="mt-6">
                <Link href="/posts">
                  <Button variant="outline" size="lg">
                    Try Again
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-texas-black text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-slab font-slab-extra text-3xl sm:text-4xl mb-4 text-texas-yellow">
              Explore Our Complete Menu
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              From legendary steaks to fresh salads, discover all the flavors that make every meal memorable
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/menus">
                <Button variant="secondary" size="lg" className="bg-texas-green hover:bg-texas-green/90 text-white">
                  Browse Menus
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="border-texas-yellow text-texas-yellow hover:bg-texas-yellow hover:text-texas-black">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </>
    )
  }
}

function FeaturedContentSkeleton() {
  return (
    <>
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-slab font-slab-extra text-3xl sm:text-4xl text-stone mb-4">
              Coupons & Discount Codes
            </h2>
            <p className="text-lg text-stone/70 max-w-2xl mx-auto">
              Loading exclusive savings and verified coupon codes...
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-sand/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-slab font-slab-extra text-3xl sm:text-4xl text-stone mb-4">
              Latest Articles
            </h2>
            <p className="text-lg text-stone/70 max-w-2xl mx-auto">
              Stay updated with the latest menu additions, cooking tips, and restaurant news
            </p>
          </div>
          
          <FeaturedPosts posts={[]} loading={true} />
        </div>
      </section>
    </>
  )
}

export default async function HomePage() {
  // Get Yoast SEO data for head injection
  let homePageSEO = null
  try {
    homePageSEO = await getPageSEOData(COMMON_PAGE_SLUGS.HOME, '', '')
  } catch (error) {
    console.error('❌ Error fetching homepage SEO data:', error)
    homePageSEO = { hasYoastSEO: false, seoData: null }
  }
  
  return (
    <>
      {/* Yoast SEO Integration */}
      <ConditionalYoastSEOHead 
        seoData={homePageSEO.seoData} 
        fallbackSchema={JSON.stringify(websiteSchema)}
      />
      
      {/* Fallback JSON-LD Schemas for Rich Snippets (when no Yoast) */}
      {!homePageSEO.hasYoastSEO && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          />
        </>
      )}

      {/* Hero Section */}
      <Hero
        title="Texas Roadhouse Menu with Prices 2025"
        subtitle={`Complete menu guide with calories, nutrition & family meal deals • Updated ${getFormattedDate()}`}
        primaryCta={{
          text: "View Full Menu & Prices",
          href: "/menus"
        }}
        secondaryCta={{
          text: "Find Current Deals", 
          href: "/posts"
        }}
      />

             {/* SEO Freshness Indicator */}
       <section className="py-8 bg-texas-yellow">
         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
           <div className="text-center">
                         <div className="inline-flex items-center px-4 py-2 rounded-full bg-texas-red text-white text-sm font-medium mb-4">
              UPDATED {getFormattedDate().toUpperCase()}
            </div>
             <h2 className="text-xl sm:text-2xl font-slab font-bold text-texas-black mb-4">
               Latest Texas Roadhouse USA Menu Information
             </h2>
             <p className="text-texas-black max-w-3xl mx-auto">
               All prices, calories, and nutrition data verified across multiple locations nationwide. 
               Last updated: <time dateTime={getStructuredDate()} className="font-semibold text-texas-red">{getFormattedDate()}</time>
             </p>
           </div>
         </div>
       </section>

      {/* Featured Content */}
      <Suspense fallback={<FeaturedContentSkeleton />}>
        <FeaturedContent />
      </Suspense>
    </>
  )
}
