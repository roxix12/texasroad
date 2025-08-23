'use client'

import { useState, useMemo } from 'react'
import { Search, Filter, ChevronDown, ChevronUp, Star, Clock, Users } from 'lucide-react'

interface MenuItem {
  id: number
  name: string
  price: number
  description: string
  category: string
  calories: number
  isPopular: boolean
}

interface MenusClientProps {
  menuItems: MenuItem[]
}

const categories = ['Starters', 'Steaks', 'Ribs', 'Chicken', 'Seafood', 'Burgers', 'Sides', 'Salads', 'Desserts', 'Kids', 'Drinks']

// Menu data
const menuItems = [
  { id: 1, name: 'USDA Sirloin 6oz', price: 10.99, description: 'Juicy hand-cut sirloin cooked to perfection.', category: 'Steaks', calories: 340, isPopular: true },
  { id: 2, name: 'Cactus Blossom', price: 9.99, description: 'Awesome Blossom petals, served with Cajun horseradish sauce.', category: 'Starters', calories: 1620, isPopular: true },
  { id: 3, name: 'Full Rack of Ribs', price: 21.99, description: 'Full rack of St. Louis-style ribs with your choice of sauce.', category: 'Ribs', calories: 1540, isPopular: true },
  { id: 4, name: 'Big Ol\' Brownie', price: 6.99, description: 'Warm chocolate brownie with vanilla ice cream and chocolate sauce.', category: 'Desserts', calories: 1290, isPopular: true }
]

export default function MenusPageContent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  // Filter menu items
  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [menuItems, searchTerm, selectedCategory])

  const faqData = [
    {
      question: "Does Texas Roadhouse have kids' meals?",
      answer: "Yes, Texas Roadhouse offers a comprehensive Kids & Ranger Meals menu featuring smaller portions of popular items like grilled chicken, burgers, mac & cheese, and more."
    },
    {
      question: "What's the best steak at Texas Roadhouse?",
      answer: "The most popular steaks include the USDA Choice Ribeye, Filet Medallions, and the signature Dallas Filet. All steaks are hand-cut in-house daily."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-600 to-red-600 py-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Texas Roadhouse Menu Prices in USA
              <span className="block text-2xl sm:text-3xl mt-2 text-orange-200">
                (Updated August 2025)
              </span>
            </h1>
            
            <p className="text-lg text-orange-100 max-w-4xl mx-auto leading-relaxed mb-8">
              Discover the complete Texas Roadhouse menu with updated prices for 2025! From legendary hand-cut steaks and fall-off-the-bone ribs to fresh salads, hearty sides, and decadent desserts, our menu offers something delicious for every appetite and budget. Whether you're planning a family dinner, romantic date night, or kids' celebration, Texas Roadhouse prices 2025 provide exceptional value for premium quality meals.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm mb-8">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Star className="h-5 w-5 text-yellow-300" />
                <span className="text-white">Hand-Cut Steaks</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Clock className="h-5 w-5 text-orange-300" />
                <span className="text-white">Fresh Daily</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Users className="h-5 w-5 text-green-300" />
                <span className="text-white">Family Friendly</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="/coupons" 
                className="inline-flex items-center bg-white text-orange-600 px-6 py-3 rounded-full font-semibold hover:bg-orange-50 transition-colors"
              >
                View Latest Coupons
              </a>
              <a 
                href="/about" 
                className="inline-flex items-center border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
              >
                About Texas Roadhouse
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-400" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="text-sm text-stone-600">
              Showing {filteredItems.length} items
            </div>
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <article key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                  <span className="text-stone-400 text-sm">Menu Image</span>
                  {item.isPopular && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        Popular
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-3 right-3">
                    <span className="bg-white/90 text-orange-600 font-bold text-lg px-3 py-1 rounded-full">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-lg text-stone-900 mb-2">{item.name}</h3>
                  <p className="text-stone-600 text-sm mb-4">{item.description}</p>
                  
                  <div className="flex justify-between items-center text-sm text-stone-500">
                    <span>{item.calories} cal</span>
                    <span className="font-semibold text-orange-600">${item.price.toFixed(2)}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-stone-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-stone-600">Everything you need to know about Texas Roadhouse menu and prices</p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-stone-50"
                >
                  <h3 className="font-semibold text-stone-900">{faq.question}</h3>
                  {openFaqIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-stone-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-stone-500" />
                  )}
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-stone-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
