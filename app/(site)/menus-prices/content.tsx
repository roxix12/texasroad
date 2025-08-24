'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, Filter, Star, Clock, Users, Award, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react'
import { PageHero } from '@/components/layout'
import { generateMenuPageSchema } from '@/lib/seo/menu-schema'

interface MenuItem {
  id: number
  name: string
  price: number
  description: string
  category: string
  calories: number
  isPopular: boolean
}

interface MenusPricesContentProps {
  menuItems: MenuItem[]
}

const categories = [
  'All Items',
  'Starters', 
  'Hand-Cut Steaks', 
  'Ribs', 
  'Combos', 
  'Chicken', 
  'Seafood', 
  'Burgers', 
  'Sides', 
  'Salads', 
  'Desserts', 
  'Kids', 
  'Drinks'
]

const priceRanges = [
  { label: 'All Prices', value: 'all' },
  { label: 'Under $5', value: 'under-5' },
  { label: '$5 - $10', value: '5-10' },
  { label: '$10 - $15', value: '10-15' },
  { label: '$15 - $20', value: '15-20' },
  { label: 'Over $20', value: 'over-20' }
]

export default function MenusPricesContent({ menuItems }: MenusPricesContentProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Items')
  const [selectedPriceRange, setSelectedPriceRange] = useState('all')
  const [sortBy, setSortBy] = useState('popularity')
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  // Advanced filtering and sorting
  const filteredAndSortedItems = useMemo(() => {
    const filtered = menuItems.filter(item => {
      // Search filter
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.category.toLowerCase().includes(searchTerm.toLowerCase())
      
      // Category filter
      const matchesCategory = selectedCategory === 'All Items' || item.category === selectedCategory
      
      // Price range filter
      const matchesPrice = selectedPriceRange === 'all' || 
                          (selectedPriceRange === 'under-5' && item.price < 5) ||
                          (selectedPriceRange === '5-10' && item.price >= 5 && item.price <= 10) ||
                          (selectedPriceRange === '10-15' && item.price > 10 && item.price <= 15) ||
                          (selectedPriceRange === '15-20' && item.price > 15 && item.price <= 20) ||
                          (selectedPriceRange === 'over-20' && item.price > 20)
      
      return matchesSearch && matchesCategory && matchesPrice
    })

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          if (a.isPopular && !b.isPopular) return -1
          if (!a.isPopular && b.isPopular) return 1
          return a.name.localeCompare(b.name)
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'name':
          return a.name.localeCompare(b.name)
        case 'calories':
          return a.calories - b.calories
        default:
          return 0
      }
    })

    return filtered
  }, [menuItems, searchTerm, selectedCategory, selectedPriceRange, sortBy])

  // Group items by category for display
  const groupedItems = useMemo(() => {
    const grouped: { [key: string]: MenuItem[] } = {}
    
    categories.slice(1).forEach(category => { // Skip 'All Items'
      grouped[category] = filteredAndSortedItems.filter(item => item.category === category)
    })
    
    return grouped
  }, [filteredAndSortedItems])

  const faqData = [
    {
      question: "What are the current Texas Roadhouse menu prices for 2025?",
      answer: "Texas Roadhouse menu prices for 2025 range from $2.49 for coffee to $24.99 for premium steaks. Appetizers start at $7.99, steaks range from $10.99-$24.99, ribs are $14.99-$21.99, and kids meals start at $5.99. Prices may vary by location."
    },
    {
      question: "Does Texas Roadhouse offer family meal deals or combos?",
      answer: "Yes! Texas Roadhouse offers Texas Size Combos that pair steaks with ribs, starting at $18.99. These combo meals provide great value by combining two popular menu items at a discounted price compared to ordering separately."
    },
    {
      question: "Are Texas Roadhouse menu prices the same at all locations?",
      answer: "Menu prices may vary slightly by location due to local market conditions, but the prices listed here reflect the standard pricing across most Texas Roadhouse locations in the USA as of 2025."
    },
    {
      question: "What's included with Texas Roadhouse entrees?",
      answer: "Most Texas Roadhouse entrees come with your choice of two sides, plus our famous warm bread with cinnamon butter. Steaks, ribs, and chicken meals all include two sides, making them a complete meal."
    },
    {
      question: "Does Texas Roadhouse have vegetarian options on their menu?",
      answer: "Yes, Texas Roadhouse offers several vegetarian options including salads (House Salad, without meat additions), sides like Mac & Cheese, Green Beans, Mashed Potatoes, and appetizers like Fried Mozzarella and Loaded Sweet Potato."
    }
  ]

  const scrollToCategory = (category: string) => {
    const element = document.getElementById(category.toLowerCase().replace(/\s+/g, '-'))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateMenuPageSchema(menuItems))
        }}
      />
      
      {/* Hero Section using PageHero component like other pages */}
      <PageHero
        title="Texas Roadhouse Menu Prices in USA – Updated 2025"
        subtitle="Explore detailed prices, images & nutrition info for all your favorite Texas Roadhouse menu items. From legendary hand-cut steaks and fall-off-the-bone ribs to fresh salads and decadent desserts - find exactly what you're craving with verified 2025 pricing."
      />

      {/* Feature badges section */}
      <section className="py-8 bg-white border-b border-stone-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 bg-texas-yellow/10 rounded-full px-4 py-2 border border-texas-yellow/20">
              <Star className="h-5 w-5 text-texas-yellow" />
              <span className="text-stone-700 font-medium">Hand-Cut Daily</span>
            </div>
            <div className="flex items-center gap-2 bg-green-100 rounded-full px-4 py-2 border border-green-200">
              <Clock className="h-5 w-5 text-green-600" />
              <span className="text-stone-700 font-medium">Updated Prices</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-100 rounded-full px-4 py-2 border border-blue-200">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-stone-700 font-medium">Family Friendly</span>
            </div>
            <div className="flex items-center gap-2 bg-purple-100 rounded-full px-4 py-2 border border-purple-200">
              <Award className="h-5 w-5 text-purple-600" />
              <span className="text-stone-700 font-medium">Premium Quality</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Link 
              href="/coupons"
              className="group inline-flex items-center bg-texas-yellow text-texas-black px-8 py-4 rounded-lg font-bold hover:bg-texas-yellow/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              View Latest Coupons
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/about"
              className="group inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-texas-yellow transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              style={{backgroundColor: '#110302'}}
            >
              About Texas Roadhouse
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Search & Filters Section */}
      <section className="py-8 bg-white border-b border-stone-200 sticky top-0 z-50 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-400" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-texas-yellow focus:border-transparent text-stone-700 placeholder-stone-400"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-12 pr-8 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-texas-yellow focus:border-transparent bg-white text-stone-700 min-w-[160px]"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="relative">
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-texas-yellow focus:border-transparent bg-white text-stone-700 min-w-[120px]"
              >
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-texas-yellow focus:border-transparent bg-white text-stone-700 min-w-[140px]"
              >
                <option value="popularity">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name A-Z</option>
                <option value="calories">Calories</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="text-sm text-stone-600 font-medium">
              {filteredAndSortedItems.length} items found
            </div>
          </div>
        </div>
      </section>

      {/* Menu Categories Navigation */}
      <section className="py-6 bg-stone-50 border-b border-stone-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.slice(1).map(category => {
              const count = groupedItems[category]?.length || 0
              return (
                <button
                  key={category}
                  onClick={() => scrollToCategory(category)}
                  className="group px-4 py-2 bg-white hover:bg-texas-yellow/10 border border-stone-200 hover:border-texas-yellow/30 rounded-full text-sm font-medium text-stone-700 hover:text-texas-yellow transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  {category} ({count})
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Menu Items Display */}
      <main className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {selectedCategory === 'All Items' ? (
            // Show all categories
            categories.slice(1).map(category => {
              const categoryItems = groupedItems[category] || []
              
              if (categoryItems.length === 0) return null

              return (
                <section key={category} id={category.toLowerCase().replace(/\s+/g, '-')} className="mb-16">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-stone-900 mb-2">{category}</h2>
                    <div className="w-24 h-1 bg-texas-yellow mx-auto rounded-full"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryItems.map(item => (
                      <article key={item.id} className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-stone-100">
                        <div className="relative h-48 bg-gradient-to-br from-texas-yellow/20 to-orange-100 flex items-center justify-center">
                          {/* Placeholder for menu item image */}
                          <div className="text-center p-4">
                            <div className="w-16 h-16 mx-auto mb-2 bg-texas-yellow/30 rounded-full flex items-center justify-center">
                              <Star className="h-8 w-8 text-texas-yellow" />
                            </div>
                            <p className="text-sm text-stone-600 font-medium">{item.name}</p>
                          </div>
                          
                          {item.isPopular && (
                            <div className="absolute top-3 left-3">
                              <span className="bg-texas-yellow text-texas-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                                <Star className="h-3 w-3 fill-current" />
                                Popular
                              </span>
                            </div>
                          )}
                          <div className="absolute bottom-3 right-3">
                            <span className="bg-white/95 backdrop-blur-sm text-texas-yellow font-bold text-lg px-3 py-2 rounded-full shadow-lg border border-texas-yellow/20">
                              ${item.price.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        <div className="p-6">
                          <h3 className="font-bold text-xl text-stone-900 mb-2 group-hover:text-texas-yellow transition-colors">
                            {item.name}
                          </h3>
                          <p className="text-stone-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                            {item.description}
                          </p>
                          
                          <div className="flex justify-between items-center pt-2 border-t border-stone-100">
                            <span className="text-sm text-stone-500 font-medium">{item.calories} cal</span>
                            <span className="font-bold text-xl text-texas-yellow">${item.price.toFixed(2)}</span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )
            })
          ) : (
            // Show single category
            <section>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-stone-900 mb-2">{selectedCategory}</h2>
                <div className="w-24 h-1 bg-texas-yellow mx-auto rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedItems.map(item => (
                  <article key={item.id} className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-stone-100">
                    <div className="relative h-48 bg-gradient-to-br from-texas-yellow/20 to-orange-100 flex items-center justify-center">
                      {/* Placeholder for menu item image */}
                      <div className="text-center p-4">
                        <div className="w-16 h-16 mx-auto mb-2 bg-texas-yellow/30 rounded-full flex items-center justify-center">
                          <Star className="h-8 w-8 text-texas-yellow" />
                        </div>
                        <p className="text-sm text-stone-600 font-medium">{item.name}</p>
                      </div>
                      
                      {item.isPopular && (
                        <div className="absolute top-3 left-3">
                          <span className="bg-texas-yellow text-texas-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                            <Star className="h-3 w-3 fill-current" />
                            Popular
                          </span>
                        </div>
                      )}
                      <div className="absolute bottom-3 right-3">
                        <span className="bg-white/95 backdrop-blur-sm text-texas-yellow font-bold text-lg px-3 py-2 rounded-full shadow-lg border border-texas-yellow/20">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-bold text-xl text-stone-900 mb-2 group-hover:text-texas-yellow transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-stone-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                        {item.description}
                      </p>
                      
                      <div className="flex justify-between items-center pt-2 border-t border-stone-100">
                        <span className="text-sm text-stone-500 font-medium">{item.calories} cal</span>
                        <span className="font-bold text-xl text-texas-yellow">${item.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* FAQ Section */}
      <section className="py-16 bg-stone-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-stone-600 text-lg">Everything you need to know about Texas Roadhouse menu prices</p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full px-6 py-6 text-left flex justify-between items-center hover:bg-stone-50 transition-colors group"
                >
                  <h3 className="font-semibold text-stone-900 text-lg pr-4 group-hover:text-texas-yellow transition-colors">
                    {faq.question}
                  </h3>
                  {openFaqIndex === index ? (
                    <ChevronUp className="h-6 w-6 text-stone-500 group-hover:text-texas-yellow transition-colors flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-6 w-6 text-stone-500 group-hover:text-texas-yellow transition-colors flex-shrink-0" />
                  )}
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 pb-6 border-t border-stone-100">
                    <p className="text-stone-600 leading-relaxed pt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section with SEO Text */}
      <footer className="py-16 text-white" style={{backgroundColor: '#110302'}}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-lg font-bold mb-4 text-texas-yellow">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/coupons" className="hover:text-texas-yellow transition-colors">Coupons & Deals</Link></li>
                <li><Link href="/about" className="hover:text-texas-yellow transition-colors">About Texas Roadhouse</Link></li>
                <li><Link href="/contact" className="hover:text-texas-yellow transition-colors">Contact Us</Link></li>
                <li><Link href="/posts" className="hover:text-texas-yellow transition-colors">Blog & News</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4 text-texas-yellow">Menu Categories</h3>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToCategory('Hand-Cut Steaks')} className="hover:text-texas-yellow transition-colors text-left">Hand-Cut Steaks</button></li>
                <li><button onClick={() => scrollToCategory('Ribs')} className="hover:text-texas-yellow transition-colors text-left">Fall-Off-The-Bone Ribs</button></li>
                <li><button onClick={() => scrollToCategory('Starters')} className="hover:text-texas-yellow transition-colors text-left">Starters & Appetizers</button></li>
                <li><button onClick={() => scrollToCategory('Kids')} className="hover:text-texas-yellow transition-colors text-left">Kids & Ranger Meals</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4 text-texas-yellow">Popular Items</h3>
              <ul className="space-y-2">
                <li className="text-stone-300">USDA Choice Sirloin - $10.99</li>
                <li className="text-stone-300">Cactus Blossom - $7.99</li>
                <li className="text-stone-300">Full Rack Ribs - $21.99</li>
                <li className="text-stone-300">Big Ol' Brownie - $6.99</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4 text-texas-yellow">Price Ranges</h3>
              <ul className="space-y-2">
                <li className="text-stone-300">Appetizers: $7.99 - $10.99</li>
                <li className="text-stone-300">Steaks: $10.99 - $24.99</li>
                <li className="text-stone-300">Ribs: $14.99 - $21.99</li>
                <li className="text-stone-300">Kids Meals: $5.99 - $7.99</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-stone-700 pt-8">
            <div className="text-center mb-6">
              <p className="text-stone-300 leading-relaxed max-w-4xl mx-auto">
                <strong className="text-white">Texas Roadhouse menu prices 2025 updated daily.</strong> Verified deals & accurate prices for steaks, ribs, chicken, sides & desserts. 
                Our comprehensive menu guide features hand-cut steaks, fall-off-the-bone ribs, fresh salads, hearty sides, kids meals, and decadent desserts with current pricing. 
                Find the best value meals and save with our latest coupons and promotional offers. All prices are verified and updated regularly to ensure accuracy.
              </p>
            </div>
            
            <div className="text-center text-stone-400 text-sm">
              <p>&copy; 2025 Texas Roadhouse Menu Guide. All rights reserved. Prices may vary by location.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}