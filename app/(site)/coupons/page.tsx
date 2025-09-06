import { Metadata } from 'next'
import { generatePageSEO } from '@/lib/seo-config'
import { PageHero } from '@/components/layout'
import { CouponsSEOSection } from '@/components/seo/coupons-seo-section'
import { Star, Clock, CheckCircle, Tag, Users, Award } from 'lucide-react'
// Static coupon data to avoid import issues
const couponsData = {
  coupons: [
    {
      code: "AUGUST25",
      title: "August Savings Special",
      description: "Get 25% off your entire order this August",
      discount: "25% OFF",
      expiryDate: "August 31, 2025",
      terms: "Valid on orders $30+. Cannot combine with other offers.",
      verified: "Verified August 2025"
    },
    {
      code: "VIPCLUB",
      title: "VIP Member Exclusive",
      description: "Join VIP Club and get 15% off your first visit",
      discount: "15% OFF",
      expiryDate: "Ongoing",
      terms: "New VIP members only. Valid on first visit.",
      verified: "Verified August 2025"
    },
    {
      code: "MILITARY",
      title: "Military & Veteran Discount",
      description: "Special pricing for active and retired military",
      discount: "20% OFF",
      expiryDate: "Always Available",
      terms: "Valid ID required. Cannot combine with other offers.",
      verified: "Verified August 2025"
    },
    {
      code: "FAMILY25",
      title: "Family Meal Bundle",
      description: "Save on family-sized portions and combos",
      discount: "30% OFF",
      expiryDate: "August 31, 2025",
      terms: "Valid on family meal packages only.",
      verified: "Verified August 2025"
    },
    {
      code: "WELCOME10",
      title: "New Customer Welcome",
      description: "10% off for first-time customers",
      discount: "10% OFF",
      expiryDate: "August 31, 2025",
      terms: "First-time customers only. Valid ID may be required.",
      verified: "Verified August 2025"
    }
  ]
}

export const revalidate = 3600 // ISR for SEO

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    title: "Texas Roadhouse Coupons & Deals 2025 - Save Big on Steaks & More",
    description: "Get the latest Texas Roadhouse coupons and deals for 2025. Save on steaks, ribs, appetizers, and family meals. Verified discounts up to 30% off.",
    path: "/coupons",
    keywords: [
      "Texas Roadhouse coupons 2025", "Texas Roadhouse deals", "steakhouse discounts",
      "restaurant coupons USA", "steak coupons", "ribs deals", "family meal discounts"
    ]
  })
}

export default function CouponsPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <PageHero
        title="Texas Roadhouse Coupons & Deals 2025"
        subtitle="Save big on legendary steaks, fall-off-the-bone ribs, and family favorites with our verified coupons and exclusive deals."
      />

      {/* SEO-Optimized Coupons Content Section */}
      <CouponsSEOSection />

      {/* Feature badges */}
      <section className="py-8 bg-white border-b border-stone-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 bg-texas-yellow/10 rounded-full px-4 py-2 border border-texas-yellow/20">
              <Tag className="h-5 w-5 text-texas-yellow" />
              <span className="text-stone-700 font-medium">Verified Coupons</span>
            </div>
            <div className="flex items-center gap-2 bg-green-100 rounded-full px-4 py-2 border border-green-200">
              <Clock className="h-5 w-5 text-green-600" />
              <span className="text-stone-700 font-medium">Updated Daily</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-100 rounded-full px-4 py-2 border border-blue-200">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-stone-700 font-medium">Family Savings</span>
            </div>
            <div className="flex items-center gap-2 bg-purple-100 rounded-full px-4 py-2 border border-purple-200">
              <Award className="h-5 w-5 text-purple-600" />
              <span className="text-stone-700 font-medium">Exclusive Deals</span>
            </div>
          </div>
        </div>
      </section>

      {/* Coupons Grid */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">
              Latest Coupons & Deals
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Save big on your next Texas Roadhouse visit with these verified coupons and exclusive deals. 
              New offers added regularly!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {couponsData.coupons.map((coupon, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg border border-stone-200 overflow-hidden hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-r from-texas-yellow to-texas-red p-6 text-center">
                  <div className="text-3xl font-bold text-white mb-2">{coupon.discount}</div>
                  <div className="text-white/90 font-medium">{coupon.title}</div>
                </div>
                
                <div className="p-6">
                  <p className="text-stone-600 mb-4">{coupon.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-stone-500">
                      <Tag className="h-4 w-4" />
                      <span>Code: <span className="font-mono font-bold text-texas-red">{coupon.code}</span></span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-stone-500">
                      <Clock className="h-4 w-4" />
                      <span>Expires: {coupon.expiryDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-stone-500">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{coupon.verified}</span>
                    </div>
                  </div>

                  <div className="bg-stone-50 p-3 rounded-lg">
                    <p className="text-xs text-stone-600 font-medium">Terms & Conditions:</p>
                    <p className="text-xs text-stone-500">{coupon.terms}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* How to Use Section */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-stone-900 mb-6">How to Use Your Coupons</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-texas-yellow/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Tag className="h-8 w-8 text-texas-yellow" />
                </div>
                <h4 className="font-semibold text-stone-900 mb-2">1. Choose Your Coupon</h4>
                <p className="text-stone-600 text-sm">Browse our selection of verified coupons and deals</p>
              </div>
              <div className="text-center">
                <div className="bg-texas-yellow/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-texas-yellow" />
                </div>
                <h4 className="font-semibold text-stone-900 mb-2">2. Visit Texas Roadhouse</h4>
                <p className="text-stone-600 text-sm">Present your coupon code or deal when ordering</p>
              </div>
              <div className="text-center">
                <div className="bg-texas-yellow/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-texas-yellow" />
                </div>
                <h4 className="font-semibold text-stone-900 mb-2">3. Save & Enjoy</h4>
                <p className="text-stone-600 text-sm">Enjoy your discounted meal and save money!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-[#110302] text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/" className="hover:text-texas-yellow transition-colors">Home</a></li>
                <li><a href="/menus-prices" className="hover:text-texas-yellow transition-colors">Menu & Prices</a></li>
                <li><a href="/about" className="hover:text-texas-yellow transition-colors">About Texas Roadhouse</a></li>
                <li><a href="/contact" className="hover:text-texas-yellow transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Popular Categories</h4>
              <ul className="space-y-2">
                <li><a href="/menus-prices" className="hover:text-texas-yellow transition-colors">Hand-Cut Steaks</a></li>
                <li><a href="/menus-prices" className="hover:text-texas-yellow transition-colors">Fall-Off-The-Bone Ribs</a></li>
                <li><a href="/menus-prices" className="hover:text-texas-yellow transition-colors">Starters & Appetizers</a></li>
                <li><a href="/menus-prices" className="hover:text-texas-yellow transition-colors">Kids & Ranger Meals</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Customer Service</h4>
              <ul className="space-y-2">
                <li><a href="/contact" className="hover:text-texas-yellow transition-colors">Contact Support</a></li>
                <li><a href="/about" className="hover:text-texas-yellow transition-colors">About Us</a></li>
                <li><a href="/legal" className="hover:text-texas-yellow transition-colors">Terms & Conditions</a></li>
                <li><a href="/legal" className="hover:text-texas-yellow transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Stay Updated</h4>
              <p className="text-stone-300 text-sm mb-4">
                Get the latest coupons and deals delivered to your inbox
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 rounded-lg bg-stone-800 text-white placeholder-stone-400 focus:ring-2 focus:ring-texas-yellow focus:outline-none"
                />
                <button className="bg-texas-yellow text-texas-black px-4 py-2 rounded-lg font-semibold hover:bg-texas-yellow/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-stone-800 mt-8 pt-8 text-center">
            <p className="text-stone-400 text-sm">
              © 2025 Texas Roadhouse Menu & Prices. All rights reserved. 
              Coupons and deals are subject to availability and terms. 
              Prices and offers may vary by location.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
