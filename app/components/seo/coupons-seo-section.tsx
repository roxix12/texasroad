'use client'

import Link from 'next/link'
import { ChevronDown, ChevronUp, CheckCircle, Clock, Tag, Shield } from 'lucide-react'
import { useState } from 'react'

interface CouponsSEOSectionProps {
  className?: string
}

export function CouponsSEOSection({ className = '' }: CouponsSEOSectionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // FAQPage Schema Markup
  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How often are coupon codes updated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our Texas Roadhouse coupon codes are updated daily to ensure you have access to the most current and valid offers. We continuously monitor for new promotions, verify existing codes, and remove expired deals to maintain the highest accuracy. Our team checks with multiple Texas Roadhouse locations across the country to confirm coupon validity before publishing."
        }
      },
      {
        "@type": "Question", 
        "name": "Are Texas Roadhouse coupons valid at all locations?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most Texas Roadhouse coupons are valid at participating locations nationwide, but some offers may be location-specific. We recommend checking with your local Texas Roadhouse restaurant to confirm coupon acceptance before visiting. Our verified coupons indicate which offers have been tested across multiple locations."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use multiple Texas Roadhouse coupons on one order?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Generally, Texas Roadhouse allows only one coupon per order unless specifically stated otherwise. Some promotional offers may be combined with certain deals, but this varies by location and promotion type. Always check the terms and conditions on each coupon for specific combination rules."
        }
      }
    ]
  }

  return (
    <section className={`py-16 bg-white ${className}`}>
      {/* JSON-LD Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <article className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <header className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-6 leading-tight">
              Texas Roadhouse Coupons & Promo Codes 2025 – Save Now
            </h1>
            <div className="w-24 h-1 bg-texas-yellow mx-auto rounded-full mb-6"></div>
          </header>

          {/* Introduction Content */}
          <div className="prose prose-lg max-w-none text-stone-700 leading-relaxed space-y-6 mb-12">
            <p className="text-xl text-stone-800 font-medium">
              Discover exclusive <strong>Texas Roadhouse coupons</strong> and special offers that help you save on legendary steaks, fall-off-the-bone ribs, and family favorites. Our live tracking system ensures you always have access to the most current and verified promotional deals.
            </p>

            <p>
              Just like leading coupon platforms, we provide real-time updates on <strong>Texas Roadhouse coupons</strong>, exclusive promo codes, and limited-time offers. Our dedicated team monitors deals across all participating locations to bring you verified savings opportunities that actually work when you need them most.
            </p>

            <p>
              From percentage discounts on your entire order to special pricing on popular menu items, our <strong>Texas Roadhouse coupons</strong> collection features deals for every dining occasion – whether you're planning a family dinner, date night, or celebration with friends.
            </p>
          </div>

          {/* Feature Bullet List */}
          <div className="bg-stone-50 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-stone-900 mb-8 text-center">
              Why Choose Our Texas Roadhouse Coupons
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-texas-green mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-stone-800">Most Recent Coupon Updates</span>
                    <p className="text-stone-600 text-sm mt-1">Daily verification and updates ensure fresh, working deals</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="w-6 h-6 text-texas-green mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-stone-800">Coupon Validity Guaranteed</span>
                    <p className="text-stone-600 text-sm mt-1">All codes tested at multiple locations before publishing</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Tag className="w-6 h-6 text-texas-green mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-stone-800">Easy Checkout Process</span>
                    <p className="text-stone-600 text-sm mt-1">Simple instructions for using codes during your visit</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-texas-green mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-stone-800">Real-Time Deal Tracking</span>
                    <p className="text-stone-600 text-sm mt-1">Live monitoring system like major coupon platforms</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-texas-green mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-stone-800">Exclusive Promo Codes</span>
                    <p className="text-stone-600 text-sm mt-1">Special offers you won't find anywhere else</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="w-6 h-6 text-texas-green mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-stone-800">No Hidden Terms</span>
                    <p className="text-stone-600 text-sm mt-1">Clear conditions and expiration dates for every deal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Internal Links Section */}
          <div className="bg-texas-yellow/10 border border-texas-yellow/20 rounded-xl p-6 mb-12">
            <h3 className="text-xl font-bold text-stone-900 mb-4">Explore More Ways to Save</h3>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/" 
                className="inline-flex items-center bg-texas-yellow text-texas-black px-4 py-2 rounded-lg font-semibold hover:bg-texas-yellow/90 transition-colors"
              >
                ← Back to Homepage
              </Link>
              <Link 
                href="/gift-cards" 
                className="inline-flex items-center bg-texas-green text-white px-4 py-2 rounded-lg font-semibold hover:bg-texas-green/90 transition-colors"
              >
                Gift Cards & Special Offers →
              </Link>
              <Link 
                href="/menus-prices" 
                className="inline-flex items-center bg-texas-red text-white px-4 py-2 rounded-lg font-semibold hover:bg-texas-red/90 transition-colors"
              >
                View Full Menu & Prices →
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-stone-50 rounded-xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-stone-900 mb-6">Frequently Asked Questions</h3>
            
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-stone-50 transition-colors"
                >
                  <span className="font-semibold text-stone-900">
                    How often are coupon codes updated?
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
                      Our <strong>Texas Roadhouse coupon codes</strong> are updated daily to ensure you have access to the most current and valid offers. We continuously monitor for new promotions, verify existing codes, and remove expired deals to maintain the highest accuracy. Our team checks with multiple Texas Roadhouse locations across the country to confirm coupon validity before publishing.
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
                    Are Texas Roadhouse coupons valid at all locations?
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
                      Most <strong>Texas Roadhouse coupons</strong> are valid at participating locations nationwide, but some offers may be location-specific. We recommend checking with your local Texas Roadhouse restaurant to confirm coupon acceptance before visiting. Our verified coupons indicate which offers have been tested across multiple locations.
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-stone-50 transition-colors"
                >
                  <span className="font-semibold text-stone-900">
                    Can I use multiple Texas Roadhouse coupons on one order?
                  </span>
                  {openFaq === 2 ? (
                    <ChevronUp className="h-5 w-5 text-stone-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-stone-500" />
                  )}
                </button>
                {openFaq === 2 && (
                  <div className="px-6 pb-4 border-t border-stone-100">
                    <p className="text-stone-600 pt-4">
                      Generally, Texas Roadhouse allows only one coupon per order unless specifically stated otherwise. Some promotional offers may be combined with certain deals, but this varies by location and promotion type. Always check the terms and conditions on each coupon for specific combination rules.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Closing Content */}
          <div className="text-center">
            <p className="text-lg text-stone-700 mb-8">
              Start saving today with our verified <strong>Texas Roadhouse coupons</strong> and enjoy your favorite steakhouse meals for less. Check back regularly for the latest deals and exclusive promotional offers!
            </p>
            
            <Link 
              href="/menus-prices"
              className="inline-flex items-center bg-texas-yellow text-texas-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-texas-yellow/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Browse Menu & Use Your Coupons →
            </Link>
          </div>
        </article>
      </div>
    </section>
  )
}
