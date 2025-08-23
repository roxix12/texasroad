import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui'

// SEO Metadata
export const metadata: Metadata = {
  title: 'Texas Roadhouse Menu with Prices 2025 | Updated August 2025 - Texas Roadhouse Menu',
  description: 'Discover the complete Texas Roadhouse menu with prices, calories, and nutrition info. Updated August 2025 with family meals, steaks, ribs, appetizers, and desserts. Find deals and coupons.',
  keywords: 'Texas Roadhouse menu, prices 2025, calories, nutrition, family meals, steaks, ribs, appetizers, deals, coupons, updated August 2025',
  openGraph: {
    title: 'Texas Roadhouse Menu with Prices 2025 | Texas Roadhouse Menu',
    description: 'Complete Texas Roadhouse menu with current prices, calories & nutrition. Updated August 2025. Find steaks, ribs, family meals & deals.',
    url: 'https://texasroadhousemenu.me',
    siteName: 'Texas Roadhouse Menu',
    images: [
      {
        url: 'https://texasroadhousemenu.me/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Texas Roadhouse Menu with Prices 2025'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Texas Roadhouse Menu with Prices 2025 | Updated August 2025',
    description: 'Complete Texas Roadhouse menu with current prices, calories & nutrition. Find steaks, ribs, family meals & deals.',
    images: ['https://texasroadhousemenu.me/og-image.jpg'],
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
}

// JSON-LD Schema for FAQs
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are Texas Roadhouse prices for 2025?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Texas Roadhouse prices in 2025 range from $8.99 for appetizers to $24.99 for premium steaks. Entrees typically cost $12.99-$22.99, with family meals starting at $39.99. Prices may vary by location."
      }
    },
    {
      "@type": "Question", 
      "name": "Does Texas Roadhouse have a family meal deal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Texas Roadhouse offers family meal packages starting at $39.99 that serve 4-6 people. These include entrees, sides, and fresh-baked bread with cinnamon butter."
      }
    },
    {
      "@type": "Question",
      "name": "What are the most popular Texas Roadhouse menu items?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Top menu items include the 6oz Sirloin ($14.99), Cactus Blossom appetizer ($8.99), Fall-off-the-Bone Ribs ($19.99), and Grilled BBQ Chicken ($15.99)."
      }
    },
    {
      "@type": "Question",
      "name": "Are Texas Roadhouse menu calories listed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, calorie information is available for all menu items. Steaks range from 300-800 calories, appetizers 400-1200 calories, and sides 150-400 calories."
      }
    }
  ]
}

// Organization Schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Texas Roadhouse Menu",
  "url": "https://texasroadhousemenu.me",
  "logo": "https://texasroadhousemenu.me/logo.png",
  "description": "Your complete guide to Texas Roadhouse menu items, prices, calories, and nutrition information.",
  "sameAs": [
    "https://www.facebook.com/texasroadhousemenu",
    "https://www.twitter.com/txroadhousemenu"
  ]
}

export default function SEOHomepage() {
  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-texas-yellow text-texas-black py-8 sm:py-12 lg:py-16 border-b-4 border-texas-red">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-slab font-bold mb-4 sm:mb-6 leading-tight">
              Texas Roadhouse Menu with Prices 2025
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 text-texas-black/80 font-medium">
              Complete menu guide with calories, nutrition & deals • Updated August 22, 2025
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/menus-prices">
                <Button size="lg" className="w-full sm:w-auto bg-texas-red hover:bg-texas-red/90 text-white px-8 py-4 text-lg font-semibold">
                  View Full Menu & Prices
                </Button>
              </Link>
              <Link href="/posts">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 border-texas-green text-texas-green hover:bg-texas-green hover:text-white px-8 py-4 text-lg font-semibold">
                  Latest Deals & Coupons
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          
          {/* Introduction */}
          <section className="mb-12 lg:mb-16">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg sm:text-xl leading-relaxed text-stone/80 mb-6">
                Welcome to <strong>Texas Roadhouse Menu</strong> – your ultimate guide to the most up-to-date menu items, prices, and nutritional information. Our comprehensive database is updated regularly to ensure you have access to the latest offerings and pricing from all Texas Roadhouse locations across the USA.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-stone/70 mb-8">
                Last updated: <time dateTime="2025-08-22" className="font-semibold text-red-cmyk">August 22, 2025</time>
              </p>
            </div>
          </section>

          {/* Popular Menu Categories */}
          <section className="mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-slab font-bold text-black mb-6 sm:mb-8">
              Texas Roadhouse USA Menu Categories
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Steaks */}
              <div className="bg-white rounded-xl shadow-lg border border-stone/10 p-6 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-slab font-bold text-black mb-3">Premium Steaks</h3>
                <p className="text-stone/70 text-sm mb-4">Hand-cut, seasoned, and grilled to perfection</p>
                <div className="text-red-cmyk font-semibold mb-4">$14.99 - $24.99</div>
                <ul className="text-sm text-stone/80 space-y-1">
                  <li>• 6oz USDA Choice Sirloin</li>
                  <li>• 12oz Ribeye</li>
                  <li>• 23oz Porterhouse</li>
                  <li>• Filet Medallions</li>
                </ul>
              </div>

              {/* Ribs */}
              <div className="bg-white rounded-xl shadow-lg border border-stone/10 p-6 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-slab font-bold text-black mb-3">Fall-off-the-Bone Ribs</h3>
                <p className="text-stone/70 text-sm mb-4">Slow-cooked with signature seasoning</p>
                <div className="text-red-cmyk font-semibold mb-4">$19.99 - $22.99</div>
                <ul className="text-sm text-stone/80 space-y-1">
                  <li>• Full Rack Baby Back Ribs</li>
                  <li>• Half Rack Combo</li>
                  <li>• Ribs & Chicken Combo</li>
                  <li>• BBQ Sauce Options</li>
                </ul>
              </div>

              {/* Family Meals */}
              <div className="bg-white rounded-xl shadow-lg border border-stone/10 p-6 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-slab font-bold text-black mb-3">Family Meal Deals</h3>
                <p className="text-stone/70 text-sm mb-4">Perfect for sharing with 4-6 people</p>
                <div className="text-red-cmyk font-semibold mb-4">$39.99 - $59.99</div>
                <ul className="text-sm text-stone/80 space-y-1">
                  <li>• Family Pack Chicken</li>
                  <li>• Steak & Ribs Combo</li>
                  <li>• Country Dinner Pack</li>
                  <li>• Includes sides & bread</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Menu Highlights Table */}
          <section className="mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-slab font-bold text-black mb-6 sm:mb-8">
              Popular Menu Items with Calories & Nutrition
            </h2>
            
            <div className="overflow-x-auto rounded-xl border border-stone/20 shadow-lg">
              <table className="w-full min-w-[600px] bg-white">
                <thead>
                  <tr className="bg-gradient-to-r from-reseda-green to-reseda-green/90">
                    <th className="text-left py-4 px-4 sm:px-6 text-white font-bold text-sm sm:text-base">Menu Item</th>
                    <th className="text-left py-4 px-4 sm:px-6 text-white font-bold text-sm sm:text-base">Price</th>
                    <th className="text-left py-4 px-4 sm:px-6 text-white font-bold text-sm sm:text-base">Calories</th>
                    <th className="text-left py-4 px-4 sm:px-6 text-white font-bold text-sm sm:text-base">Category</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-stone/10 hover:bg-school-bus-yellow/5">
                    <td className="py-4 px-4 sm:px-6 font-medium text-black">6oz USDA Choice Sirloin</td>
                    <td className="py-4 px-4 sm:px-6 text-red-cmyk font-semibold">$14.99</td>
                    <td className="py-4 px-4 sm:px-6 text-stone/80">340</td>
                    <td className="py-4 px-4 sm:px-6 text-stone/70 text-sm">Steaks</td>
                  </tr>
                  <tr className="border-b border-stone/10 hover:bg-school-bus-yellow/5">
                    <td className="py-4 px-4 sm:px-6 font-medium text-black">Fall-off-the-Bone Ribs (Full)</td>
                    <td className="py-4 px-4 sm:px-6 text-red-cmyk font-semibold">$22.99</td>
                    <td className="py-4 px-4 sm:px-6 text-stone/80">890</td>
                    <td className="py-4 px-4 sm:px-6 text-stone/70 text-sm">Ribs</td>
                  </tr>
                  <tr className="border-b border-stone/10 hover:bg-school-bus-yellow/5">
                    <td className="py-4 px-4 sm:px-6 font-medium text-black">Cactus Blossom</td>
                    <td className="py-4 px-4 sm:px-6 text-red-cmyk font-semibold">$8.99</td>
                    <td className="py-4 px-4 sm:px-6 text-stone/80">1080</td>
                    <td className="py-4 px-4 sm:px-6 text-stone/70 text-sm">Appetizers</td>
                  </tr>
                  <tr className="border-b border-stone/10 hover:bg-school-bus-yellow/5">
                    <td className="py-4 px-4 sm:px-6 font-medium text-black">Grilled BBQ Chicken</td>
                    <td className="py-4 px-4 sm:px-6 text-red-cmyk font-semibold">$15.99</td>
                    <td className="py-4 px-4 sm:px-6 text-stone/80">450</td>
                    <td className="py-4 px-4 sm:px-6 text-stone/70 text-sm">Chicken</td>
                  </tr>
                  <tr className="border-b border-stone/10 hover:bg-school-bus-yellow/5">
                    <td className="py-4 px-4 sm:px-6 font-medium text-black">Family Pack (4-6 people)</td>
                    <td className="py-4 px-4 sm:px-6 text-red-cmyk font-semibold">$39.99</td>
                    <td className="py-4 px-4 sm:px-6 text-stone/80">2200+</td>
                    <td className="py-4 px-4 sm:px-6 text-stone/70 text-sm">Family Meals</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <p className="text-sm text-stone/60 mt-4 italic">
              *Prices and availability may vary by location. Nutritional information is approximate and based on standard preparations.
            </p>
          </section>

          {/* Key Features */}
          <section className="mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-slab font-bold text-black mb-6 sm:mb-8">
              Why Choose Texas Roadhouse Menu?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-school-bus-yellow rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-slab font-bold text-black text-lg mb-2">Updated August 2025 Prices</h3>
                    <p className="text-stone/70">Current menu prices verified across multiple locations nationwide.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-school-bus-yellow rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-slab font-bold text-black text-lg mb-2">Complete Nutrition Info</h3>
                    <p className="text-stone/70">Calories, macros, and allergen information for every menu item.</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-school-bus-yellow rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-slab font-bold text-black text-lg mb-2">Latest Deals & Coupons</h3>
                    <p className="text-stone/70">Find current promotions, happy hour specials, and family meal deals.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-school-bus-yellow rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-slab font-bold text-black text-lg mb-2">Mobile-Friendly Design</h3>
                    <p className="text-stone/70">Easy browsing on any device with fast loading times.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-slab font-bold text-black mb-6 sm:mb-8">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              <details className="bg-white rounded-lg border border-stone/20 shadow-sm">
                <summary className="p-6 cursor-pointer font-semibold text-black hover:bg-stone/5 rounded-lg transition-colors">
                  What are Texas Roadhouse prices for 2025?
                </summary>
                <div className="px-6 pb-6 text-stone/80">
                  <p>Texas Roadhouse prices in 2025 range from $8.99 for appetizers to $24.99 for premium steaks. Entrees typically cost $12.99-$22.99, with family meals starting at $39.99. Prices may vary by location.</p>
                </div>
              </details>

              <details className="bg-white rounded-lg border border-stone/20 shadow-sm">
                <summary className="p-6 cursor-pointer font-semibold text-black hover:bg-stone/5 rounded-lg transition-colors">
                  Does Texas Roadhouse have a family meal deal?
                </summary>
                <div className="px-6 pb-6 text-stone/80">
                  <p>Yes, Texas Roadhouse offers family meal packages starting at $39.99 that serve 4-6 people. These include entrees, sides, and fresh-baked bread with cinnamon butter.</p>
                </div>
              </details>

              <details className="bg-white rounded-lg border border-stone/20 shadow-sm">
                <summary className="p-6 cursor-pointer font-semibold text-black hover:bg-stone/5 rounded-lg transition-colors">
                  What are the most popular Texas Roadhouse menu items?
                </summary>
                <div className="px-6 pb-6 text-stone/80">
                  <p>Top menu items include the 6oz Sirloin ($14.99), Cactus Blossom appetizer ($8.99), Fall-off-the-Bone Ribs ($19.99), and Grilled BBQ Chicken ($15.99).</p>
                </div>
              </details>

              <details className="bg-white rounded-lg border border-stone/20 shadow-sm">
                <summary className="p-6 cursor-pointer font-semibold text-black hover:bg-stone/5 rounded-lg transition-colors">
                  Are Texas Roadhouse menu calories listed?
                </summary>
                <div className="px-6 pb-6 text-stone/80">
                  <p>Yes, calorie information is available for all menu items. Steaks range from 300-800 calories, appetizers 400-1200 calories, and sides 150-400 calories.</p>
                </div>
              </details>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center bg-texas-black rounded-2xl p-8 lg:p-12 border-2 border-texas-red">
            <h2 className="text-2xl sm:text-3xl font-slab font-bold text-white mb-4">
              Ready to Explore the Full Menu?
            </h2>
            <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
              Browse our complete menu database with detailed pricing, nutritional information, and the latest deals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/menus-prices">
                <Button size="lg" className="w-full sm:w-auto bg-texas-red hover:bg-texas-red/90 text-white px-8 py-4 text-lg font-semibold">
                  View Complete Menu
                </Button>
              </Link>
              <Link href="/posts">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 border-texas-yellow text-texas-yellow hover:bg-texas-yellow hover:text-texas-black px-8 py-4 text-lg font-semibold">
                  Find Current Deals
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
