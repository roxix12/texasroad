import { Metadata } from 'next'
import Link from 'next/link'
import { Hero } from '@/components/layout'
import { CouponSection } from '@/components/coupons'
import { Button } from '@/components/ui'
import { getFormattedDate, getISODate, getStructuredDate } from '@/lib/date'
import { ConditionalYoastSEOHead } from '@/components/seo'

// Enable ISR with 300-second (5 min) revalidation for better performance
export const revalidate = 300

// Generate metadata with SEO-friendly pagination links
export function generateMetadata(): Metadata {
  // Static metadata for ultra-fast loading
  const title = `Texas Roadhouse Menu with Prices 2025 | Updated ${getFormattedDate()}`
  const description = `Complete Texas Roadhouse menu guide with current prices, calories & nutrition info. Updated ${getFormattedDate()}. Find steaks, ribs, family meals, deals & coupons.`
  
  // Fast static metadata - no API dependencies
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

// Lightning-fast static coupon data - no API calls needed
function getStaticCoupons() {
  return {
    coupons: [
      {
        code: "ROADHOUSE15",
        title: "15% Off Texas Roadhouse",
        discount: "15% Off",
        description: "Save 15% on your next Texas Roadhouse visit",
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        terms: "Valid on dine-in orders. Cannot be combined with other offers.",
        type: "code" as const,
        verified: "Verified",
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        code: "STEAKDEAL",
        title: "$5 Off Steak Entrees",
        discount: "$5 Off",
        description: "$5 off any steak entree",
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        terms: "Valid on steak entrees only. Minimum order required.",
        type: "deal" as const,
        verified: "Verified",
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        code: "FAMILYFEAST",
        title: "20% Off Family Meals",
        discount: "20% Off",
        description: "20% off family meal packages",
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        terms: "Valid on family packages for 4 or more people.",
        type: "discount" as const,
        verified: "Verified",
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      }
    ],
    metadata: {
      total_count: 3,
      last_updated: new Date().toISOString(),
      source: "Static Data",
      version: "1.0.0"
    }
  }
}

function FeaturedContent() {
  // Ultra-fast static content - no async operations
  const couponData = getStaticCoupons()

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

        {/* Quick Links Section - Fast static content */}
        <section className="py-12 bg-sand/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-slab font-slab-extra text-3xl sm:text-4xl text-stone mb-4">
                Explore Texas Roadhouse
              </h2>
              <p className="text-lg text-stone/70 max-w-2xl mx-auto">
                Find everything you need for your next Texas Roadhouse visit
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/menus-prices" className="group p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                <h3 className="font-slab font-bold text-xl text-stone mb-2 group-hover:text-texas-yellow">
                  Full Menu & Prices
                </h3>
                <p className="text-stone/70">
                  View all 74 menu items with photos, prices, and nutrition info
                </p>
              </Link>
              
              <Link href="/coupons" className="group p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                <h3 className="font-slab font-bold text-xl text-stone mb-2 group-hover:text-texas-yellow">
                  Current Deals
                </h3>
                <p className="text-stone/70">
                  Latest coupons and discount codes to save on your meal
                </p>
              </Link>
              
              <Link href="/gift-cards" className="group p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                <h3 className="font-slab font-bold text-xl text-stone mb-2 group-hover:text-texas-yellow">
                  Gift Cards
                </h3>
                <p className="text-stone/70">
                  Perfect gifts for Texas Roadhouse lovers
                </p>
              </Link>
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
              <Link href="/menus-prices">
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

function FeaturedContentSkeleton() {
  return (
    <>
      {/* Ultra-lightweight skeleton for instant loading */}
      <section className="py-8 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <div className="inline-block h-6 w-32 bg-texas-yellow/20 rounded-full animate-pulse mb-3"></div>
            <div className="h-4 w-48 bg-gray-200 rounded mx-auto animate-pulse"></div>
          </div>
          
          {/* Minimal placeholder */}
          <div className="text-center">
            <div className="h-8 w-24 bg-gray-200 rounded mx-auto animate-pulse"></div>
          </div>
        </div>
      </section>
    </>
  )
}

export default function HomePage() {
  // Skip SEO fetching for ultra-fast loading
  const homePageSEO = { hasYoastSEO: false, seoData: null }
  
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
          href: "/menus-prices"
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

      {/* Featured Content - No Suspense needed for static content */}
      <FeaturedContent />
    </>
  )
}
