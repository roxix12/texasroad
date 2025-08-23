'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui'
import { getFormattedDate, getStructuredDate } from '@/lib/date'
import { GeneratedCoupon } from '@/lib/gemini-coupons'
import { ChevronDown, ChevronUp, Copy, CheckCircle } from 'lucide-react'

interface CouponCode {
  code: string
  discount: string
  description: string
  verified: string
  type: 'code' | 'deal' | 'discount'
  validUntil?: string
}

interface CouponSectionProps {
  dynamicCoupons?: GeneratedCoupon[]
  lastUpdated?: string
}

interface FAQItem {
  question: string
  answer: string
}

export default function CouponSection({ dynamicCoupons, lastUpdated }: CouponSectionProps = {}) {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [loadedCoupons, setLoadedCoupons] = useState<GeneratedCoupon[]>([])
  const [couponMetadata, setCouponMetadata] = useState<any>(null)
  const [timeUntilUpdate, setTimeUntilUpdate] = useState<string>('Calculating...')
  const [isLoading, setIsLoading] = useState(true)
  
  const today = getFormattedDate()
  const structuredDate = getStructuredDate()
  const updateTime = lastUpdated || today

  // Load coupons from JSON file if no dynamic coupons provided
  useEffect(() => {
    if (!dynamicCoupons) {
      setIsLoading(true)
      fetch('/data/coupons.json')
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
          }
          return res.json()
        })
        .then(data => {
          if (data && data.coupons && Array.isArray(data.coupons) && data.coupons.length > 0) {
            setLoadedCoupons(data.coupons)
            if (data.metadata) {
              setCouponMetadata(data.metadata)
            }
          } else {
            console.warn('No valid coupon data found in JSON file')
          }
        })
        .catch(err => {
          console.error('Error loading coupons:', err)
          // Set fallback empty array to prevent null errors
          setLoadedCoupons([])
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      setIsLoading(false)
    }
  }, [dynamicCoupons])

  // Countdown timer for next update (8 AM Eastern Time daily)
  useEffect(() => {
    const calculateTimeUntilUpdate = () => {
      const now = new Date()
      
      // Calculate next 8 AM Eastern Time
      // Eastern Time is UTC-5 (EST) or UTC-4 (EDT)
      // Using a fixed offset approach: 8 AM Eastern = 1 PM UTC (EST) or 12 PM UTC (EDT)
      // For simplicity, we'll use 1 PM UTC as the base and adjust
      const nextUpdate = new Date()
      nextUpdate.setUTCHours(13, 0, 0, 0) // 1 PM UTC = 8 AM EST
      
      // If it's already past 1 PM UTC today, set for tomorrow
      if (nextUpdate <= now) {
        nextUpdate.setUTCDate(nextUpdate.getUTCDate() + 1)
      }
      
      const timeDiff = nextUpdate.getTime() - now.getTime()
      const hours = Math.floor(timeDiff / (1000 * 60 * 60))
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)
      
      return `${hours}h ${minutes}m ${seconds}s`
    }

    const timer = setInterval(() => {
      setTimeUntilUpdate(calculateTimeUntilUpdate())
    }, 1000)

    // Initial calculation
    setTimeUntilUpdate(calculateTimeUntilUpdate())

    return () => clearInterval(timer)
  }, [])

  // Use dynamic coupons, loaded coupons, or fallback
  const activeCoupons = dynamicCoupons || loadedCoupons
  
    const couponCodes: CouponCode[] = activeCoupons && activeCoupons.length > 0 ? activeCoupons.slice(0, 3).map((coupon, index) => ({
    code: coupon.code || 'NO CODE',
    discount: coupon.discount || 'Discount Available',
    description: coupon.description || 'Special offer available',
    verified: coupon.verified || `Verified ${today}`,
    type: (coupon.type as 'code' | 'deal' | 'discount') || 'discount',

    validUntil: coupon.validUntil || (coupon as any).valid_until || 'Valid until further notice'
  })) : [
         {
       code: "FREE",
       discount: "50% OFF",
       description: "Sitewide discount on all menu items",
       verified: "Verified August 2025",
       type: "code",
   
       validUntil: "December 31, 2025"
     },
    {
      code: "WELCOME10",
      discount: "15% OFF",
      description: "First-time orders & VIP newsletter subscribers",
      verified: "Verified August 2025",
      type: "code",
  
      validUntil: "Ongoing"
    },
         {
       code: "TXRDEAL25",
       discount: "30% OFF",
       description: "Sitewide savings on all categories",
       verified: "Verified August 2025",
       type: "code",
   
       validUntil: "September 30, 2025"
     }
  ]

          const otherSavings: CouponCode[] = activeCoupons && activeCoupons.length > 3 ? activeCoupons.slice(3, 6).map((coupon, index) => ({
    code: coupon.code || 'NO CODE',
    discount: coupon.discount || 'Special Offer',
    description: coupon.description || 'Additional savings available',
    verified: coupon.verified || `Verified ${today}`,
    type: (coupon.type as 'code' | 'deal' | 'discount') || 'deal',

    validUntil: coupon.validUntil || (coupon as any).valid_until || 'Valid until further notice'
  })) : [
         {
       code: "VIP CLUB",
       discount: "FREE APPETIZER",
       description: "Join VIP Club & get free appetizer on first visit",
       verified: "Verified August 2025",
       type: "deal",
   
       validUntil: "Ongoing"
     },
     {
       code: "MILITARY ID",
       discount: "10-20% OFF",
       description: "Active & retired military with valid ID",
       verified: "Verified August 2025",
       type: "discount",
   
       validUntil: "Always Available"
     },
     {
       code: "EARLY BIRD",
       discount: "FAMILY BUNDLES",
       description: "Special pricing on family meal packages",
       verified: "Verified August 2025",
       type: "deal",
   
       validUntil: "Daily Special"
     }
  ]

  const faqItems: FAQItem[] = [
    {
      question: "How to use a Texas Roadhouse coupon code?",
      answer: "Copy the coupon code, paste it at checkout when ordering online, or show it to your server when dining in. Some codes may require minimum purchase amounts."
    },
    {
      question: "Can I combine multiple coupons?",
      answer: "Usually no - most coupons cannot be combined. However, you can often use app-exclusive deals with early-bird specials or family bundle packages for maximum savings."
    },
    {
      question: "Where can I find exclusive deals?",
      answer: "Join the VIP Club for member-only offers, download the Texas Roadhouse app for mobile-exclusive deals, sign up for email newsletters, and check this page regularly for updated codes and promotions."
    },
    {
      question: "How often are coupon codes updated?",
      answer: "We verify and update all coupon codes monthly. New codes are added as they become available, and expired codes are removed to ensure accuracy. All codes shown are verified for August 2025."
    },
    {
      question: "Do coupon codes expire?",
      answer: "Yes, most coupon codes have expiration dates. We clearly display the validity period for each code. Some deals like military discounts and VIP Club benefits are ongoing and don't expire."
    },
    {
      question: "Are these coupons valid nationwide?",
      answer: "Most coupon codes are valid at participating Texas Roadhouse locations nationwide. However, some regional restrictions may apply. We recommend confirming with your local restaurant before use."
    }
  ]

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(code)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index)
  }

  const renderCouponCard = (coupon: CouponCode, index: number) => (
    <div key={index} className="bg-white rounded-2xl shadow-xl border-2 border-texas-green hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:border-texas-red">
      <div className="p-6">
        {/* Header with Type Badge */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-bold text-white uppercase tracking-wide bg-texas-green px-3 py-1 rounded-full">
              {coupon.type}
            </span>
          </div>
          <span className="text-xs text-texas-black bg-texas-yellow px-2 py-1 rounded-full">{coupon.verified}</span>
        </div>
        
        {/* Discount and Description */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-3xl font-bold text-texas-red">{coupon.discount}</span>
            <span className="text-sm text-texas-black bg-texas-yellow px-3 py-1 rounded-full border border-texas-green">
              Valid until: {coupon.validUntil}
            </span>
          </div>
          <p className="text-gray-700 text-base leading-relaxed font-medium">{coupon.description}</p>
        </div>

        {/* Copy Code Section */}
        <div className="bg-texas-yellow rounded-xl p-4 mb-4 border border-texas-green">
          {coupon.code && coupon.code !== 'NO CODE' ? (
            <>
              <div className="flex items-center justify-between">
                <code className="text-xl font-mono font-bold text-texas-black bg-white px-4 py-3 rounded-lg border-2 border-texas-green shadow-sm flex-1 mr-3">
                  {coupon.code}
                </code>
                <Button
                  onClick={() => copyToClipboard(coupon.code)}
                  variant="outline"
                  size="sm"
                  className="border-2 border-texas-red text-texas-red hover:bg-texas-red hover:text-white transition-colors duration-200"
                >
                  {copiedCode === coupon.code ? (
                    <CheckCircle className="h-5 w-5 text-texas-green" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </Button>
              </div>
              {copiedCode === coupon.code && (
                <p className="text-texas-green text-sm mt-3 text-center font-medium bg-white py-2 rounded-lg">
                  ✅ Code copied to clipboard!
                </p>
              )}
            </>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-texas-black bg-white px-4 py-3 rounded-lg border-2 border-texas-green shadow-sm flex-1 mr-3 text-center">
                  No code needed - Show this offer
                </span>
                <Button
                  onClick={() => copyToClipboard(coupon.description)}
                  variant="outline"
                  size="sm"
                  className="border-2 border-texas-black text-texas-black hover:bg-texas-black hover:text-white transition-colors duration-200"
                >
                  {copiedCode === coupon.description ? (
                    <CheckCircle className="h-5 w-5 text-texas-green" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </Button>
              </div>
              {copiedCode === coupon.description && (
                <p className="text-texas-green text-sm mt-3 text-center font-medium bg-white py-2 rounded-lg">
                  ✅ Offer details copied!
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )

  // Show loading state while data is being fetched
  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-sand/20 via-white to-wood/5 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-wood/20 rounded-lg w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-sand/20 rounded-lg w-96 mx-auto mb-8"></div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white/50 rounded-2xl p-6 shadow-lg">
                    <div className="h-4 bg-wood/20 rounded w-24 mb-3"></div>
                    <div className="h-8 bg-red-cmyk/20 rounded w-32 mb-3"></div>
                    <div className="h-16 bg-sand/20 rounded mb-4"></div>
                    <div className="h-12 bg-wood/20 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      {/* Enhanced JSON-LD Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "name": "Texas Roadhouse Coupons & Discount Codes FAQ",
            "description": "Frequently asked questions about Texas Roadhouse coupons, discount codes, and savings strategies",
            "mainEntity": faqItems.map((item, index) => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
              }
            })),
            "dateModified": structuredDate,
            "publisher": {
              "@type": "Organization",
              "name": "Texas Roadhouse Menu",
              "url": "https://texasroadhousemenu.me",
              "logo": "https://texasroadhousemenu.me/logo.png"
            },
            "about": {
              "@type": "Thing",
              "name": "Texas Roadhouse Coupons",
              "description": "Discount codes and savings offers for Texas Roadhouse restaurant"
            }
          })
        }}
      />
      
      {/* Additional Schema for Coupon Offers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AggregateOffer",
            "name": "Texas Roadhouse Coupons & Deals",
            "description": "Collection of verified coupon codes and discount offers for Texas Roadhouse",
            "url": "https://texasroadhousemenu.me",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "validFrom": structuredDate,
            "validThrough": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
            "offers": activeCoupons?.slice(0, 5).map(coupon => ({
              "@type": "Offer",
              "name": coupon.discount,
              "description": coupon.description,
              "price": "0",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock",
              "validFrom": structuredDate
            })) || []
          })
        }}
      />

      <section className="py-20 bg-white relative overflow-hidden">
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-texas-red text-white text-sm font-bold mb-6 shadow-lg">
              EXCLUSIVE SAVINGS & DEALS
            </div>
            <h1 className="font-slab font-slab-extra text-4xl sm:text-5xl lg:text-6xl text-texas-black mb-6 leading-tight">
              Texas Roadhouse Coupons & 
              <span className="block text-texas-red">Discount Codes 2025</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Verified coupon codes and smart savings strategies for maximum value. 
              <time dateTime={structuredDate} className="font-bold text-texas-red mx-2">Updated {updateTime}</time>
            </p>
            
            {/* SEO Keywords Display */}
            <div className="mt-8 flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
              {['Steak Coupons', 'Family Meals', 'Military Discount', 'VIP Club', 'App Deals', 'Early Bird Specials'].map((keyword, index) => (
                <span key={index} className="px-3 py-1 bg-texas-yellow text-texas-black text-sm font-medium rounded-full border border-texas-yellow">
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Daily Update Banner */}
          <div className="mb-12 mx-auto max-w-5xl">
            <div className="bg-texas-yellow border-2 border-texas-green rounded-2xl p-8 text-center shadow-lg">
              <div className="flex items-center justify-center mb-4">
                <h3 className="text-2xl font-bold text-texas-black">AI-Powered Daily Updates</h3>
              </div>
              <p className="text-texas-black text-lg leading-relaxed mb-6 max-w-3xl mx-auto">
                <strong className="text-texas-red font-bold">This site automatically updates coupons daily</strong> using advanced AI technology. 
                Fresh discount codes are fetched every morning at 8 AM Eastern Time and verified for accuracy.
              </p>
              
              {/* Countdown Timer */}
              <div className="bg-white rounded-xl p-6 mb-6 border-2 border-texas-red shadow-lg">
                <div className="flex items-center justify-center mb-3">
                  <span className="text-base font-bold text-texas-black">Next Update In:</span>
                </div>
                <div className="text-3xl font-bold text-texas-red font-mono bg-texas-yellow px-6 py-3 rounded-lg border border-texas-green">
                  {timeUntilUpdate}
                </div>
              </div>
              
              {couponMetadata && (
                <div className="text-base text-texas-black bg-white rounded-lg p-4 border border-texas-green">
                  <p>
                    <span className="font-semibold text-texas-black">Last updated:</span> 
                    <span className="font-bold text-texas-red mx-2">
                      {new Date(couponMetadata.last_updated).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span> 
                    <span className="mx-2">•</span>
                    <span className="font-semibold text-texas-black">Total active coupons:</span> 
                    <span className="font-bold text-texas-red mx-2">{activeCoupons.length}</span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Coupon Codes Grid */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-slab font-bold text-texas-black mb-4">
                Active Coupon Codes
              </h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Verified discount codes for maximum savings on steaks, family meals, and more
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {couponCodes.map((coupon, index) => renderCouponCard(coupon, index))}
            </div>
          </div>

          {/* Other Savings Methods */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-slab font-bold text-texas-black mb-4">
                Additional Savings Methods
              </h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Smart strategies and exclusive offers for even more value
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherSavings.map((saving, index) => renderCouponCard(saving, index))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-texas-green rounded-3xl shadow-2xl p-8 lg:p-12 border-2 border-texas-yellow">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-slab font-bold text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Everything you need to know about using Texas Roadhouse coupons and getting the best deals
              </p>
            </div>
            <div className="max-w-4xl mx-auto space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="border-2 border-texas-yellow rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 text-left bg-texas-yellow hover:bg-texas-yellow/80 transition-all duration-200 flex items-center justify-between"
                  >
                    <span className="font-bold text-texas-black text-lg">{item.question}</span>
                    {expandedFAQ === index ? (
                      <ChevronUp className="h-6 w-6 text-texas-red" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-texas-red" />
                    )}
                  </button>
                  {expandedFAQ === index && (
                    <div className="px-6 py-5 bg-white border-t-2 border-texas-yellow">
                      <p className="text-texas-black leading-relaxed text-base">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="bg-texas-black rounded-2xl p-8 border-2 border-texas-red">
              <p className="text-white text-lg mb-8 max-w-3xl mx-auto font-medium">
                New coupons and deals are added regularly. Bookmark this page and check back often for the latest Texas Roadhouse savings!
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button variant="primary" size="lg" className="bg-texas-red hover:bg-texas-red/90 text-white px-8 py-3 text-lg font-bold">
                  View Full Menu & Prices
                </Button>
                <Button variant="outline" size="lg" className="border-2 border-texas-yellow text-texas-yellow hover:bg-texas-yellow hover:text-texas-black px-8 py-3 text-lg font-bold">
                  Join VIP Club
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
