'use client'

import Link from 'next/link'
import { ChevronDown, ChevronUp, Gift, CreditCard, Star, ExternalLink, Smartphone, MapPin } from 'lucide-react'
import { useState } from 'react'

interface GiftCardsSEOSectionProps {
  className?: string
}

export function GiftCardsSEOSection({ className = '' }: GiftCardsSEOSectionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <section className={`py-16 bg-white ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <article className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <header className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-6 leading-tight">
              Texas Roadhouse Gift Cards – Discounts, Deals & Info
            </h1>
            <div className="w-24 h-1 bg-texas-yellow mx-auto rounded-full mb-6"></div>
          </header>

          {/* Introduction Content */}
          <div className="prose prose-lg max-w-none text-stone-700 leading-relaxed space-y-6 mb-12">
            <p className="text-xl text-stone-800 font-medium">
              <strong>Texas Roadhouse gift cards</strong> are the perfect gift for food lovers who crave legendary steaks, fall-off-the-bone ribs, and our famous warm bread with cinnamon butter. Available in both digital and physical formats, our gift cards offer convenience and flexibility for any occasion.
            </p>

            <p>
              Get exclusive bonus eGift deals when you purchase <strong>Texas Roadhouse gift cards</strong> online! Our special promotions include bonus cards, bulk discounts for businesses, and seasonal offers that make your gift even more valuable. Whether you're shopping for birthdays, holidays, employee recognition, or just because, our gift cards deliver unforgettable dining experiences.
            </p>
          </div>

          {/* Where to Buy Section */}
          <div className="bg-stone-50 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-stone-900 mb-8 text-center">
              Where to Buy Texas Roadhouse Gift Cards
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-stone-800 flex items-center">
                  <Smartphone className="w-5 h-5 text-texas-yellow mr-2" />
                  Online & Digital Options
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Star className="w-4 h-4 text-texas-yellow mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold">Official Texas Roadhouse Website</span>
                      <p className="text-stone-600 text-sm">Instant eGift cards delivered via email</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Star className="w-4 h-4 text-texas-yellow mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold">CashStar Platform</span>
                      <p className="text-stone-600 text-sm">Personalized cards with custom messages</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Star className="w-4 h-4 text-texas-yellow mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold">Mobile App</span>
                      <p className="text-stone-600 text-sm">Purchase and manage cards on-the-go</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-stone-800 flex items-center">
                  <MapPin className="w-5 h-5 text-texas-yellow mr-2" />
                  Physical Locations
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Star className="w-4 h-4 text-texas-yellow mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold">Any Texas Roadhouse Restaurant</span>
                      <p className="text-stone-600 text-sm">Available at all participating locations</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Star className="w-4 h-4 text-texas-yellow mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold">Partner Retailers</span>
                      <p className="text-stone-600 text-sm">Select grocery stores and retail partners</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Star className="w-4 h-4 text-texas-yellow mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold">Corporate Sales</span>
                      <p className="text-stone-600 text-sm">Bulk orders with company branding</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="text-center mt-8">
              <a 
                href="https://texasroadhouse.cashstar.com/store/recipient"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-texas-yellow text-texas-black px-6 py-3 rounded-lg font-semibold hover:bg-texas-yellow/90 transition-colors"
              >
                Buy Gift Cards Online <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>

          {/* Current Promotions Section */}
          <div className="bg-texas-yellow/10 border border-texas-yellow/20 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-stone-900 mb-8 text-center">
              Current Promotions & Bonus Deals
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-texas-yellow/20">
                <div className="flex items-center mb-4">
                  <Gift className="w-6 h-6 text-texas-yellow mr-3" />
                  <h3 className="text-lg font-bold text-stone-800">Bonus eGift Special</h3>
                </div>
                <p className="text-stone-700 mb-4">
                  <strong>Get a $5 bonus eGift card</strong> when you purchase $30 or more in gift cards online. Perfect for treating yourself while giving to others!
                </p>
                <div className="text-sm text-stone-600 bg-stone-50 p-3 rounded">
                  <strong>Terms:</strong> Bonus cards delivered within 48 hours. Valid on future purchases.
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-texas-yellow/20">
                <div className="flex items-center mb-4">
                  <CreditCard className="w-6 h-6 text-texas-yellow mr-3" />
                  <h3 className="text-lg font-bold text-stone-800">Corporate Bulk Discount</h3>
                </div>
                <p className="text-stone-700 mb-4">
                  <strong>Save 10% on orders of $1,000+</strong> with custom corporate branding. Perfect for employee appreciation, client gifts, and business rewards.
                </p>
                <div className="text-sm text-stone-600 bg-stone-50 p-3 rounded">
                  <strong>Benefits:</strong> Custom logos, bulk shipping, dedicated support.
                </div>
              </div>
            </div>
          </div>

          {/* Why Gift Cards Make a Great Gift Section */}
          <div className="bg-stone-50 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-stone-900 mb-8 text-center">
              Why Texas Roadhouse Gift Cards Make a Great Gift
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-texas-yellow/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-texas-yellow" />
                </div>
                <h3 className="font-bold text-stone-800 mb-2">Perfect for Any Occasion</h3>
                <p className="text-stone-600 text-sm">Birthdays, holidays, graduations, or just because – gift cards work for every celebration.</p>
              </div>
              <div className="text-center">
                <div className="bg-texas-yellow/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-texas-yellow" />
                </div>
                <h3 className="font-bold text-stone-800 mb-2">Guaranteed Satisfaction</h3>
                <p className="text-stone-600 text-sm">Everyone loves our legendary steaks, ribs, and famous warm bread with cinnamon butter.</p>
              </div>
              <div className="text-center">
                <div className="bg-texas-yellow/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-texas-yellow" />
                </div>
                <h3 className="font-bold text-stone-800 mb-2">Flexible & Convenient</h3>
                <p className="text-stone-600 text-sm">No expiration dates, works at all locations, and can be used for any menu items or beverages.</p>
              </div>
            </div>
          </div>

          {/* Internal Links Section */}
          <div className="bg-texas-green/10 border border-texas-green/20 rounded-xl p-6 mb-12">
            <h3 className="text-xl font-bold text-stone-900 mb-4">Explore More Ways to Save</h3>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/" 
                className="inline-flex items-center bg-texas-yellow text-texas-black px-4 py-2 rounded-lg font-semibold hover:bg-texas-yellow/90 transition-colors"
              >
                ← Back to Homepage
              </Link>
              <Link 
                href="/coupons" 
                className="inline-flex items-center bg-texas-green text-white px-4 py-2 rounded-lg font-semibold hover:bg-texas-green/90 transition-colors"
              >
                View Current Coupons & Deals →
              </Link>
              <Link 
                href="/menus-prices" 
                className="inline-flex items-center bg-texas-red text-white px-4 py-2 rounded-lg font-semibold hover:bg-texas-red/90 transition-colors"
              >
                Browse Full Menu →
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
                    Can I use a gift card to pay for menu items in person?
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
                      Absolutely! <strong>Texas Roadhouse gift cards</strong> can be used to pay for any menu items, beverages, and even tips at all participating restaurant locations. Simply present your physical gift card or show your eGift card on your mobile device to your server when paying your bill.
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
                    Do Texas Roadhouse gift cards expire?
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
                      No! <strong>Texas Roadhouse gift cards</strong> never expire and have no maintenance fees. This makes them a perfect gift since the recipient can use them whenever they want without worrying about losing value over time.
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
                    Can I check my gift card balance online?
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
                      Yes! You can easily check your <strong>Texas Roadhouse gift card</strong> balance online by entering your card number and PIN on our website, calling our customer service line at 1-800-TXROADS, or asking your server at any restaurant location.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Closing Content */}
          <div className="text-center">
            <p className="text-lg text-stone-700 mb-8">
              Give the gift of legendary dining with <strong>Texas Roadhouse gift cards</strong>. Perfect for food lovers, convenient for any occasion, and guaranteed to create memorable experiences with every visit.
            </p>
            
            <a 
              href="https://texasroadhouse.cashstar.com/store/recipient"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-texas-yellow text-texas-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-texas-yellow/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Purchase Gift Cards Now <ExternalLink className="w-5 h-5 ml-2" />
            </a>
          </div>
        </article>
      </div>
    </section>
  )
}
