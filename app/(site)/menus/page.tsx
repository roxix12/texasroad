'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { PageHero } from '@/components/layout'
import { FilterBar, MenuGrid } from '@/components/menu'
import { Button } from '@/components/ui'
import { MenuFilters, Menu } from '@/lib/types'
import { getMenus, getFilteredMenus, getMenuCategories, getPriceRange, sortMenus } from '@/lib/data'
import { Grid, List } from 'lucide-react'

export default function MenusPage() {
  const searchParams = useSearchParams()
  const [menus, setMenus] = useState<Menu[]>([])
  const [filteredMenus, setFilteredMenus] = useState<Menu[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 })
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Initialize filters from URL params
  const initialFilters = useMemo(() => {
    const filters: MenuFilters = {}
    
    const category = searchParams.get('category')
    if (category) filters.category = category
    
    const search = searchParams.get('search')
    if (search) filters.search = search
    
    const minPrice = searchParams.get('minPrice')
    if (minPrice) filters.minPrice = parseFloat(minPrice)
    
    const maxPrice = searchParams.get('maxPrice')
    if (maxPrice) filters.maxPrice = parseFloat(maxPrice)
    
    return filters
  }, [searchParams])

  // Load data
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const [menusData, categoriesData] = await Promise.all([
          getMenus(),
          getMenuCategories(),
        ])
        
        setMenus(menusData)
        setCategories(categoriesData)
        setPriceRange(getPriceRange(menusData))
        
        // Apply initial filters
        const filtered = await getFilteredMenus(initialFilters)
        setFilteredMenus(sortMenus(filtered, 'popularity', 'desc'))
      } catch (error) {
        console.error('Error loading menus:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [initialFilters])

  const handleFiltersChange = async (filters: MenuFilters) => {
    try {
      const filtered = await getFilteredMenus(filters)
      setFilteredMenus(sortMenus(filtered, 'popularity', 'desc'))
      
      // Update URL without causing a navigation
      const params = new URLSearchParams()
      if (filters.category) params.set('category', filters.category)
      if (filters.search) params.set('search', filters.search)
      if (filters.minPrice !== undefined) params.set('minPrice', filters.minPrice.toString())
      if (filters.maxPrice !== undefined) params.set('maxPrice', filters.maxPrice.toString())
      
      const newUrl = params.toString() ? `?${params.toString()}` : '/menus'
      window.history.replaceState({}, '', newUrl)
    } catch (error) {
      console.error('Error filtering menus:', error)
    }
  }

  return (
    <>
      <PageHero
        title="Menu & Prices"
        subtitle="Explore our complete menu with detailed pricing and nutritional information"
      />
      
      <div className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <div className="mb-8">
            <FilterBar
              categories={categories}
              priceRange={priceRange}
              initialFilters={initialFilters}
              onFiltersChange={handleFiltersChange}
            />
          </div>

          {/* View Mode Toggle & Results Count */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-stone/70">
              {loading ? (
                'Loading...'
              ) : (
                `Showing ${filteredMenus.length} of ${menus.length} items`
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-stone/70 mr-2">View:</span>
              <div className="flex border border-stone/20 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-orange text-white'
                      : 'text-stone hover:bg-stone/5'
                  }`}
                  aria-label="Grid view"
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors duration-200 ${
                    viewMode === 'list'
                      ? 'bg-orange text-white'
                      : 'text-stone hover:bg-stone/5'
                  }`}
                  aria-label="List view"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Menu Grid */}
          <MenuGrid
            menus={filteredMenus}
            loading={loading}
            viewMode={viewMode}
            showCategory
          />
        </div>
      </div>
    </>
  )
}
