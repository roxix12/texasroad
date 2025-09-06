'use client'

import Link from 'next/link'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

interface HomepageMenuSectionProps {
  className?: string
}

export function HomepageMenuSection({ className = '' }: HomepageMenuSectionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // Schema markup for Article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Texas Roadhouse Menu – Latest Prices, Nutritional Info & More",
    "description": "Complete guide to Texas Roadhouse menu with latest pricing, full menu categories including Hand-Cut Steaks, Fall-Off-The-Bone Ribs, Appetizers, Sides, and Desserts. Updated daily with nutritional and allergen details.",
    "author": {
      "@type": "Organization",
      "name": "Texas Roadhouse Menu Guide"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Texas Roadhouse Menu Guide",
      "logo": {
        "@type": "ImageObject",
        "url": "https://texasroadhouse-menus.us/Our Own Logo.png"
      }
    },
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://texasroadhouse-menus.us"
    }
  }

  // Schema markup for BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://texasroadhouse-menus.us"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Texas Roadhouse Menu",
        "item": "https://texasroadhouse-menus.us/menus-prices"
      }
    ]
  }

  return (
    <section className={`py-16 bg-white ${className}`}>
      {/* JSON-LD Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <article className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <header className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-6 leading-tight">
              Texas Roadhouse Menu – Latest Prices, Nutritional Info & More
            </h1>
            <div className="w-24 h-1 bg-texas-yellow mx-auto rounded-full mb-6"></div>
          </header>

          {/* Introduction Content */}
          <div className="prose prose-lg max-w-none text-stone-700 leading-relaxed space-y-6">
            <p className="text-xl text-stone-800 font-medium">
              Welcome to your complete guide to the <strong>Texas Roadhouse menu</strong>! Here you'll find the latest pricing information, full menu categories, comprehensive nutritional details, and allergen information for every item on the menu.
            </p>

            <p>
              Our extensive <strong>Texas Roadhouse menu</strong> database is updated daily to ensure you have access to the most current prices and menu offerings. Whether you're planning your next visit or just curious about what's available, we've got you covered with detailed information on over 74 menu items.
            </p>

            {/* Menu Categories Section */}
            <div className="bg-stone-50 rounded-xl p-8 my-8">
              <h2 className="text-2xl font-bold text-stone-900 mb-6 text-center">
                Complete Menu Categories
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-texas-yellow rounded-full mr-3"></span>
                    <span className="font-semibold text-stone-800">Hand-Cut Steaks</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-texas-yellow rounded-full mr-3"></span>
                    <span className="font-semibold text-stone-800">Fall-Off-The-Bone Ribs</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-texas-yellow rounded-full mr-3"></span>
                    <span className="font-semibold text-stone-800">Appetizers & Starters</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-texas-yellow rounded-full mr-3"></span>
                    <span className="font-semibold text-stone-800">Sides & Salads</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-texas-yellow rounded-full mr-3"></span>
                    <span className="font-semibold text-stone-800">Desserts & Treats</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-texas-yellow rounded-full mr-3"></span>
                    <span className="font-semibold text-stone-800">Beverages & Margaritas</span>
                  </div>
                </div>
              </div>
            </div>

            <p>
              Each menu item includes detailed pricing, calorie counts, ingredient lists, and allergen information to help you make informed dining decisions. From our famous <strong>Cactus Blossom appetizer</strong> to our legendary <strong>hand-cut steaks</strong>, every dish is carefully documented with the latest information.
            </p>

            {/* Internal Links Section */}
            <div className="bg-texas-yellow/10 border border-texas-yellow/20 rounded-xl p-6 my-8">
              <h3 className="text-xl font-bold text-stone-900 mb-4">Quick Navigation</h3>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/menus-prices" 
                  className="inline-flex items-center bg-texas-yellow text-texas-black px-4 py-2 rounded-lg font-semibold hover:bg-texas-yellow/90 transition-colors"
                >
                  Jump to our full menu →
                </Link>
                <Link 
                  href="/coupons" 
                  className="inline-flex items-center bg-texas-green text-white px-4 py-2 rounded-lg font-semibold hover:bg-texas-green/90 transition-colors"
                >
                  See coupons page for deals →
                </Link>
                <Link 
                  href="/gift-cards" 
                  className="inline-flex items-center bg-texas-red text-white px-4 py-2 rounded-lg font-semibold hover:bg-texas-red/90 transition-colors"
                >
                  Check gift cards here →
                </Link>
              </div>
            </div>

            <p>
              Our <strong>Texas Roadhouse menu</strong> prices are competitive and offer excellent value for the quality and portion sizes you receive. Popular items like the <strong>Dallas Filet ($26.99)</strong>, <strong>Ft. Worth Ribeye ($24.99)</strong>, and <strong>Full Rack of Ribs ($21.99)</strong> represent some of the best steakhouse values available.
            </p>

            {/* FAQ Section */}
            <div className="bg-stone-50 rounded-xl p-8 my-8">
              <h3 className="text-2xl font-bold text-stone-900 mb-6">Frequently Asked Questions</h3>
              
              <div className="space-y-4">
                <div className="bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-stone-50 transition-colors"
                  >
                    <span className="font-semibold text-stone-900">
                      Do you update menu prices regularly?
                    </span>
                    {openFaq === 0 ? (
                      <ChevronUp className="h-5 w-5 text-stone-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-stone-500" />
                    )}
                  </button>
                  {openFaq === 0 && (
                    <div className="px-6 pb-4 border-t border-stone-100">
                      <p className="text-stone-600 pt-4">
                        Yes! We update our Texas Roadhouse menu prices daily to ensure you have the most current and accurate pricing information. Our team monitors multiple locations across the country to verify prices and menu changes, so you can plan your visit with confidence knowing you have the latest information.
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-stone-50 transition-colors"
                  >
                    <span className="font-semibold text-stone-900">
                      Are nutritional details available for all menu items?
                    </span>
                    {openFaq === 1 ? (
                      <ChevronUp className="h-5 w-5 text-stone-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-stone-500" />
                    )}
                  </button>
                  {openFaq === 1 && (
                    <div className="px-6 pb-4 border-t border-stone-100">
                      <p className="text-stone-600 pt-4">
                        Absolutely! Every item in our Texas Roadhouse menu guide includes comprehensive nutritional information including calories, allergen details, and ingredient lists. This helps you make informed choices whether you're counting calories, managing dietary restrictions, or simply want to know what's in your meal.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <p>
              Whether you're a first-time visitor or a longtime fan, our comprehensive <strong>Texas Roadhouse menu</strong> guide makes it easy to explore all your options, compare prices, and discover new favorites. From hearty appetizers to indulgent desserts, we've documented every detail to enhance your dining experience.
            </p>

            <div className="text-center mt-12">
              <Link 
                href="/menus-prices"
                className="inline-flex items-center bg-texas-yellow text-texas-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-texas-yellow/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Explore Full Menu with Prices →
              </Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
