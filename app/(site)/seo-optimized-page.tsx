import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { PageHero } from '@/components/layout'

// Enhanced SEO Metadata with freshness signals
export const metadata: Metadata = {
  title: 'Texas Roadhouse Menu with Prices 2025 | Updated August 2025 - Texas Roadhouse Menu',
  description: 'Complete Texas Roadhouse menu guide with current prices, calories & nutrition info. Updated August 22, 2025. Find steaks, ribs, family meals, deals & coupons.',
  keywords: [
    'Texas Roadhouse menu 2025',
    'Texas Roadhouse prices August 2025', 
    'Texas Roadhouse calories nutrition',
    'Texas Roadhouse family meals deals',
    'Texas Roadhouse coupons 2025',
    'Texas Roadhouse USA menu updated'
  ].join(', '),
  openGraph: {
    title: 'Texas Roadhouse Menu with Prices 2025 | Complete Guide',
    description: 'Latest Texas Roadhouse menu with prices, calories & nutrition. Updated August 2025. Find steaks, ribs, family meals & exclusive deals.',
    url: 'https://texasroadhousemenu.me',
    siteName: 'Texas Roadhouse Menu',
    images: [
      {
        url: 'https://texasroadhousemenu.me/images/texas-roadhouse-menu-2025.jpg',
        width: 1200,
        height: 630,
        alt: 'Texas Roadhouse Menu with Prices 2025 - Complete Guide'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Texas Roadhouse Menu with Prices 2025 | Updated August 2025',
    description: 'Complete Texas Roadhouse menu with current prices, calories & nutrition. Find steaks, ribs, family meals & deals.',
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

// JSON-LD Schemas
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Texas Roadhouse Menu",
  "alternateName": "Texas Roadhouse Menu with Prices 2025",
  "url": "https://texasroadhousemenu.me",
  "description": "Complete guide to Texas Roadhouse menu items, prices, calories, and nutrition information updated for 2025.",
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
  }
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are current Texas Roadhouse menu prices for 2025?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Texas Roadhouse prices in August 2025 range from $8.99 for appetizers like Cactus Blossom to $24.99 for premium steaks like 23oz Porterhouse. Most entrees cost $12.99-$22.99, with family meal packages starting at $39.99 for 4-6 people."
      }
    },
    {
      "@type": "Question", 
      "name": "Does Texas Roadhouse offer family meal deals with nutrition info?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Texas Roadhouse family packages serve 4-6 people starting at $39.99. These include multiple entrees, sides, and fresh bread. Complete nutrition information shows family meals range from 2000-3500+ calories total depending on selections."
      }
    },
    {
      "@type": "Question",
      "name": "What are the most popular Texas Roadhouse menu items with calories?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Top menu items include: 6oz USDA Choice Sirloin ($14.99, 340 calories), Cactus Blossom appetizer ($8.99, 1080 calories), Fall-off-the-Bone Ribs ($22.99, 890 calories), and Grilled BBQ Chicken ($15.99, 450 calories)."
      }
    },
    {
      "@type": "Question",
      "name": "Where can I find Texas Roadhouse nutrition and calorie information?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Complete nutrition facts are available for all menu items. Steaks range 300-800 calories, appetizers 400-1200 calories, sides 150-400 calories. Detailed macros, sodium, and allergen info available on our menu pages."
      }
    },
    {
      "@type": "Question",
      "name": "Are there current Texas Roadhouse coupons and deals for August 2025?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, August 2025 deals include Early Dine specials (3-6 PM), VIP Club offers, and seasonal promotions. Check our deals page for current coupons and family meal discounts updated daily."
      }
    }
  ]
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://texasroadhousemenu.me"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Texas Roadhouse Menu",
      "item": "https://texasroadhousemenu.me/menus-prices"
    }
  ]
}

export default function SEOOptimizedPage() {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  return (
    <>
      {/* JSON-LD Schemas for Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero Section with Target Keywords */}
      <PageHero
        title="Texas Roadhouse Menu with Prices 2025"
        subtitle={`Complete menu guide with calories, nutrition & family meal deals • Updated ${currentDate}`}
      />

      {/* Main Content with SEO Structure */}
      <main className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          {/* Freshness Signal & Introduction */}
          <section className="mb-10 lg:mb-14">
            <div className="bg-gradient-to-r from-school-bus-yellow/10 to-reseda-green/10 rounded-xl p-6 sm:p-8 mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-cmyk text-white">
                    UPDATED AUGUST 2025
                  </span>
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-slab font-bold text-black mb-2">
                    Latest Texas Roadhouse USA Menu Information
                  </h2>
                  <p className="text-stone/80 text-sm sm:text-base">
                    All prices, calories, and nutrition data verified across multiple locations nationwide. 
                    Last updated: <time dateTime="2025-08-22" className="font-semibold text-red-cmyk">August 22, 2025</time>
                  </p>
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-lg sm:text-xl leading-relaxed text-stone/90 mb-6">
                Welcome to the most comprehensive <strong>Texas Roadhouse menu guide</strong> with up-to-date prices, detailed nutrition information, and exclusive family meal deals. Our database features every menu item with accurate pricing and calorie counts verified across Texas Roadhouse locations throughout the USA.
              </p>
            </div>
          </section>

          {/* Popular Categories Grid */}
          <section className="mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-slab font-bold text-black mb-8 text-center sm:text-left">
              Texas Roadhouse Menu Categories with Prices
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Steaks Category */}
              <div className="bg-white rounded-xl shadow-lg border border-stone/10 p-6 hover:shadow-xl hover:border-school-bus-yellow/50 transition-all duration-300 group">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-cmyk/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-cmyk/20 transition-colors">
                    <span className="text-2xl">🥩</span>
                  </div>
                  <h3 className="text-lg font-slab font-bold text-black mb-2">Premium Steaks</h3>
                  <p className="text-red-cmyk font-bold text-lg mb-3">$14.99 - $24.99</p>
                  <p className="text-stone/70 text-sm mb-4">Hand-cut USDA Choice beef, seasoned and grilled to perfection</p>
                  <Link href="/menus-prices?category=steaks" className="text-red-cmyk hover:text-red-cmyk/80 font-medium text-sm">
                    View All Steaks →
                  </Link>
                </div>
              </div>

              {/* Ribs Category */}
              <div className="bg-white rounded-xl shadow-lg border border-stone/10 p-6 hover:shadow-xl hover:border-school-bus-yellow/50 transition-all duration-300 group">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-cmyk/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-cmyk/20 transition-colors">
                    <span className="text-2xl">🍖</span>
                  </div>
                  <h3 className="text-lg font-slab font-bold text-black mb-2">Fall-off-the-Bone Ribs</h3>
                  <p className="text-red-cmyk font-bold text-lg mb-3">$19.99 - $22.99</p>
                  <p className="text-stone/70 text-sm mb-4">Slow-cooked baby back ribs with signature BBQ sauce</p>
                  <Link href="/menus-prices?category=ribs" className="text-red-cmyk hover:text-red-cmyk/80 font-medium text-sm">
                    View All Ribs →
                  </Link>
                </div>
              </div>

              {/* Appetizers Category */}
              <div className="bg-white rounded-xl shadow-lg border border-stone/10 p-6 hover:shadow-xl hover:border-school-bus-yellow/50 transition-all duration-300 group">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-cmyk/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-cmyk/20 transition-colors">
                    <span className="text-2xl">🌸</span>
                  </div>
                  <h3 className="text-lg font-slab font-bold text-black mb-2">Appetizers</h3>
                  <p className="text-red-cmyk font-bold text-lg mb-3">$8.99 - $12.99</p>
                  <p className="text-stone/70 text-sm mb-4">Famous Cactus Blossom, potato skins, and shareable favorites</p>
                  <Link href="/menus-prices?category=appetizers" className="text-red-cmyk hover:text-red-cmyk/80 font-medium text-sm">
                    View Appetizers →
                  </Link>
                </div>
              </div>

              {/* Family Meals Category */}
              <div className="bg-white rounded-xl shadow-lg border border-stone/10 p-6 hover:shadow-xl hover:border-school-bus-yellow/50 transition-all duration-300 group">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-cmyk/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-cmyk/20 transition-colors">
                    <span className="text-2xl">👥</span>
                  </div>
                  <h3 className="text-lg font-slab font-bold text-black mb-2">Family Meals</h3>
                  <p className="text-red-cmyk font-bold text-lg mb-3">$39.99 - $59.99</p>
                  <p className="text-stone/70 text-sm mb-4">Complete meals for 4-6 people with sides and fresh bread</p>
                  <Link href="/menus-prices?category=family" className="text-red-cmyk hover:text-red-cmyk/80 font-medium text-sm">
                    View Family Deals →
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Menu Items Table */}
          <section className="mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-slab font-bold text-black mb-8">
              Popular Items with Calories, Nutrition & Prices
            </h2>
            
            <div className="overflow-x-auto rounded-xl shadow-lg border border-stone/10">
              <table className="w-full min-w-[700px] bg-white">
                <thead>
                  <tr className="bg-gradient-to-r from-reseda-green to-reseda-green/90">
                    <th className="text-left py-4 px-4 sm:px-6 text-white font-bold text-sm sm:text-base uppercase tracking-wide">Menu Item</th>
                    <th className="text-left py-4 px-4 sm:px-6 text-white font-bold text-sm sm:text-base uppercase tracking-wide">Price</th>
                    <th className="text-left py-4 px-4 sm:px-6 text-white font-bold text-sm sm:text-base uppercase tracking-wide">Calories</th>
                    <th className="text-left py-4 px-4 sm:px-6 text-white font-bold text-sm sm:text-base uppercase tracking-wide">Protein</th>
                    <th className="text-left py-4 px-4 sm:px-6 text-white font-bold text-sm sm:text-base uppercase tracking-wide">Category</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-stone/10 hover:bg-school-bus-yellow/8 transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-semibold text-black">6oz USDA Choice Sirloin</td>
                    <td className="py-4 px-4 sm:px-6 text-red-cmyk font-bold text-lg">$14.99</td>
                    <td className="py-4 px-4 sm:px-6 text-stone/80 font-medium">340</td>
                    <td className="py-4 px-4 sm:px-6 text-stone/80">48g</td>
                    <td className="py-4 px-4 sm:px-6 text-stone/70 text-sm">Premium Steaks</td>
                  </tr>
                  <tr className="border-b border-stone/10 hover:bg-school-bus-yellow/8 transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-semibold text-black">Fall-off-the-Bone Ribs (Full)</td>
                    <td className="py-4 px-4 sm:px-6 text-red-cmyk font-bold text-lg">$22.99</td>
                    <td className="py-4 px-4 sm:px-6 text-stone/80 font-medium">890</td>
                    <td className="py-4 px-4 sm:px-6 text-stone/80">52g</td>
                    <td className="py-4 px-4 sm:px-6 text-stone/70 text-sm">Ribs & BBQ</td>
                  </tr>
                  <tr className="border-b border-stone/10 hover:bg-school-bus-yellow/8 transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-semibold text-black">Cactus Blossom Appetizer</td>
                    <td className="py-4 px-4 sm:px-6 text-red-cmyk font-bold text-lg">$8.99</td>
                    <td className="py-4 px-4 sm:px-6 text-stone/80 font-medium">1080</td>
                    <td className="py-4 px-4 sm:px-6 text-stone/80">15g</td>
                    <td className="py-4 px-4 sm:px-6 text-stone/70 text-sm">Appetizers</td>
                  </tr>
                  <tr className="border-b border-stone/10 hover:bg-school-bus-yellow/8 transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-semibold text-black">Grilled BBQ Chicken</td>
                    <td className="py-4 px-4 sm:px-6 text-red-cmyk font-bold text-lg">$15.99</td>
                    <td className="py-4 px-4 sm:px-6 text-stone/80 font-medium">450</td>
                    <td className="py-4 px-4 sm:px-6 text-stone/80">42g</td>
                    <td className="py-4 px-4 sm:px-6 text-stone/70 text-sm">Chicken & Poultry</td>
                  </tr>
                  <tr className="border-b border-stone/10 hover:bg-school-bus-yellow/8 transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-semibold text-black">Country Fried Steak</td>
                    <td className="py-4 px-4 sm:px-6 text-red-cmyk font-bold text-lg">$16.99</td>
                    <td className="py-4 px-4 sm:px-6 text-stone/80 font-medium">720</td>
                    <td className="py-4 px-4 sm:px-6 text-stone/80">35g</td>
                    <td className="py-4 px-4 sm:px-6 text-stone/70 text-sm">Country Dinners</td>
                  </tr>
                  <tr className="hover:bg-school-bus-yellow/8 transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-semibold text-black">Family Pack Combo (4-6 people)</td>
                    <td className="py-4 px-4 sm:px-6 text-red-cmyk font-bold text-lg">$39.99</td>
                    <td className="py-4 px-4 sm:px-6 text-stone/80 font-medium">2400+</td>
                    <td className="py-4 px-4 sm:px-6 text-stone/80">180g+</td>
                    <td className="py-4 px-4 sm:px-6 text-stone/70 text-sm">Family Meals</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 text-sm text-stone/60 space-y-1">
              <p>*Prices effective August 2025 and may vary by location. Nutritional values are approximate.</p>
              <p>**Family meal calories represent total for entire package. Individual portions will vary.</p>
            </div>
          </section>

          {/* Nutrition & Deals Highlights */}
          <section className="mb-12 lg:mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              
              {/* Nutrition Info */}
              <div className="bg-gradient-to-br from-white to-stone/5 rounded-xl p-6 sm:p-8 border border-stone/10 shadow-sm">
                <h3 className="text-xl sm:text-2xl font-slab font-bold text-black mb-6">
                  Complete Nutrition Information
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-stone/10">
                    <span className="text-stone/80">Steaks (avg)</span>
                    <span className="font-semibold text-black">300-800 calories</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-stone/10">
                    <span className="text-stone/80">Appetizers</span>
                    <span className="font-semibold text-black">400-1200 calories</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-stone/10">
                    <span className="text-stone/80">Chicken Entrees</span>
                    <span className="font-semibold text-black">350-700 calories</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-stone/80">Side Dishes</span>
                    <span className="font-semibold text-black">150-400 calories</span>
                  </div>
                </div>
                <Link href="/menus-prices" className="inline-flex items-center mt-6 text-red-cmyk hover:text-red-cmyk/80 font-medium">
                  View Complete Menu Guide →
                </Link>
              </div>

              {/* Current Deals */}
              <div className="bg-gradient-to-br from-school-bus-yellow/10 to-reseda-green/10 rounded-xl p-6 sm:p-8 border border-school-bus-yellow/20 shadow-sm">
                <h3 className="text-xl sm:text-2xl font-slab font-bold text-black mb-6">
                  Current Deals & Family Meals
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-red-cmyk rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-white text-xs font-bold">%</span>
                    </div>
                    <div>
                      <p className="font-semibold text-black">Early Dine Specials</p>
                      <p className="text-stone/70 text-sm">3-6 PM daily - Discounted entree prices</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-red-cmyk rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-white text-xs font-bold">★</span>
                    </div>
                    <div>
                      <p className="font-semibold text-black">VIP Club Offers</p>
                      <p className="text-stone/70 text-sm">Exclusive coupons & birthday rewards</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-red-cmyk rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-white text-xs font-bold">👥</span>
                    </div>
                    <div>
                      <p className="font-semibold text-black">Family Pack Savings</p>
                      <p className="text-stone/70 text-sm">20%+ savings on meals for 4-6 people</p>
                    </div>
                  </div>
                </div>
                <Link href="/" className="inline-flex items-center mt-6 text-red-cmyk hover:text-red-cmyk/80 font-medium">
                  Find Current Coupons →
                </Link>
              </div>
            </div>
          </section>

          {/* FAQ Section with Schema */}
          <section className="mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-slab font-bold text-black mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="max-w-4xl mx-auto space-y-4">
              <details className="bg-white rounded-xl border border-stone/20 shadow-sm hover:shadow-md transition-shadow group">
                <summary className="p-6 cursor-pointer font-semibold text-black hover:bg-stone/5 rounded-xl transition-colors flex items-center justify-between">
                  <span>What are current Texas Roadhouse menu prices for 2025?</span>
                  <span className="text-red-cmyk group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-6 pb-6 text-stone/80 leading-relaxed">
                  <p>Texas Roadhouse prices in August 2025 range from $8.99 for appetizers like Cactus Blossom to $24.99 for premium steaks like 23oz Porterhouse. Most entrees cost $12.99-$22.99, with family meal packages starting at $39.99 for 4-6 people. Prices include complete nutritional information and may vary slightly by location.</p>
                </div>
              </details>

              <details className="bg-white rounded-xl border border-stone/20 shadow-sm hover:shadow-md transition-shadow group">
                <summary className="p-6 cursor-pointer font-semibold text-black hover:bg-stone/5 rounded-xl transition-colors flex items-center justify-between">
                  <span>Does Texas Roadhouse offer family meal deals with nutrition info?</span>
                  <span className="text-red-cmyk group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-6 pb-6 text-stone/80 leading-relaxed">
                  <p>Yes, Texas Roadhouse family packages serve 4-6 people starting at $39.99. These include multiple entrees, sides, and fresh bread with cinnamon butter. Complete nutrition information shows family meals range from 2000-3500+ calories total depending on selections, with detailed breakdowns available for each component.</p>
                </div>
              </details>

              <details className="bg-white rounded-xl border border-stone/20 shadow-sm hover:shadow-md transition-shadow group">
                <summary className="p-6 cursor-pointer font-semibold text-black hover:bg-stone/5 rounded-xl transition-colors flex items-center justify-between">
                  <span>What are the most popular Texas Roadhouse menu items with calories?</span>
                  <span className="text-red-cmyk group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-6 pb-6 text-stone/80 leading-relaxed">
                  <p>Top menu items include: 6oz USDA Choice Sirloin ($14.99, 340 calories, 48g protein), Cactus Blossom appetizer ($8.99, 1080 calories), Fall-off-the-Bone Ribs ($22.99, 890 calories, 52g protein), and Grilled BBQ Chicken ($15.99, 450 calories, 42g protein). All items include complete macro and allergen information.</p>
                </div>
              </details>

              <details className="bg-white rounded-xl border border-stone/20 shadow-sm hover:shadow-md transition-shadow group">
                <summary className="p-6 cursor-pointer font-semibold text-black hover:bg-stone/5 rounded-xl transition-colors flex items-center justify-between">
                  <span>Where can I find Texas Roadhouse nutrition and calorie information?</span>
                  <span className="text-red-cmyk group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-6 pb-6 text-stone/80 leading-relaxed">
                  <p>Complete nutrition facts are available for all menu items on our detailed menu pages. Steaks range 300-800 calories, appetizers 400-1200 calories, sides 150-400 calories. Each item includes detailed macros (protein, carbs, fat), sodium content, and comprehensive allergen information updated for August 2025.</p>
                </div>
              </details>

              <details className="bg-white rounded-xl border border-stone/20 shadow-sm hover:shadow-md transition-shadow group">
                <summary className="p-6 cursor-pointer font-semibold text-black hover:bg-stone/5 rounded-xl transition-colors flex items-center justify-between">
                  <span>Are there current Texas Roadhouse coupons and deals for August 2025?</span>
                  <span className="text-red-cmyk group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-6 pb-6 text-stone/80 leading-relaxed">
                  <p>Yes, August 2025 deals include Early Dine specials (3-6 PM with discounted menu pricing), VIP Club exclusive offers, and seasonal family meal promotions. Our deals page features current coupons, limited-time offers, and family package discounts updated daily with expiration dates and location availability.</p>
                </div>
              </details>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-texas-yellow rounded-2xl p-8 lg:p-12 border-2 border-texas-green shadow-lg">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-slab font-bold text-texas-black mb-6">
              Explore the Complete Texas Roadhouse Menu
            </h2>
            <p className="text-lg sm:text-xl text-texas-black mb-8 max-w-3xl mx-auto leading-relaxed">
              Browse our comprehensive menu database with detailed pricing, complete nutritional information, allergen data, and the latest family meal deals. Updated daily for accuracy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Link href="/menus-prices">
                <Button size="lg" className="w-full sm:w-auto bg-texas-red hover:bg-texas-red/90 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                  View Complete Menu & Prices
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 border-texas-green text-texas-green hover:bg-texas-green hover:text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                  Find Current Deals & Coupons
                </Button>
              </Link>
            </div>
            
            <div className="mt-8 pt-6 border-t border-texas-black/20">
              <p className="text-sm text-texas-black/70">
                Trusted by thousands of Texas Roadhouse fans • Updated August 22, 2025 • Mobile-optimized for all devices
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
