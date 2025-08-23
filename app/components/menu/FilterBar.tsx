'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, X } from 'lucide-react'
import { Input, Select, Button } from '@/components/ui'
import { MenuFilters } from '@/lib/types'
import { formatPrice } from '@/lib/format'

interface FilterBarProps {
  categories: string[]
  priceRange: { min: number; max: number }
  initialFilters?: MenuFilters
  onFiltersChange: (filters: MenuFilters) => void
  className?: string
}

export function FilterBar({ 
  categories, 
  priceRange, 
  initialFilters = {}, 
  onFiltersChange,
  className = ''
}: FilterBarProps) {
  const [filters, setFilters] = useState<MenuFilters>(initialFilters)
  const [isExpanded, setIsExpanded] = useState(false)

  // Category options for select
  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...categories.map(cat => ({ value: cat, label: cat }))
  ]

  // Price range options
  const priceOptions = [
    { value: '', label: 'Any Price' },
    { value: `0-10`, label: 'Under $10' },
    { value: `10-15`, label: '$10 - $15' },
    { value: `15-20`, label: '$15 - $20' },
    { value: `20-30`, label: '$20 - $30' },
    { value: `30-999`, label: '$30+' }
  ]

  const updateFilters = (newFilters: Partial<MenuFilters>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    onFiltersChange(updatedFilters)
  }

  const clearFilters = () => {
    const clearedFilters: MenuFilters = {}
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== undefined && value !== '' && value !== null
  )

  const handlePriceRangeChange = (value: string) => {
    if (!value) {
      updateFilters({ minPrice: undefined, maxPrice: undefined })
      return
    }

    const [min, max] = value.split('-').map(Number)
    updateFilters({ 
      minPrice: min, 
      maxPrice: max === 999 ? undefined : max 
    })
  }

  const getCurrentPriceRange = () => {
    if (!filters.minPrice && !filters.maxPrice) return ''
    if (filters.minPrice === 0 && filters.maxPrice === 10) return '0-10'
    if (filters.minPrice === 10 && filters.maxPrice === 15) return '10-15'
    if (filters.minPrice === 15 && filters.maxPrice === 20) return '15-20'
    if (filters.minPrice === 20 && filters.maxPrice === 30) return '20-30'
    if (filters.minPrice === 30 && !filters.maxPrice) return '30-999'
    return ''
  }

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      {/* Mobile filter toggle */}
      <div className="flex items-center justify-between mb-4 lg:hidden">
        <h3 className="font-slab font-slab-bold text-lg text-stone">
          Filters
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center"
        >
          <Filter className="h-4 w-4 mr-2" />
          {isExpanded ? 'Hide' : 'Show'} Filters
        </Button>
      </div>

      {/* Filter content */}
      <div className={`space-y-4 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stone/40" />
          <Input
            type="text"
            placeholder="Search menus..."
            value={filters.search || ''}
            onChange={(e) => updateFilters({ search: e.target.value })}
            className="pl-10"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Category filter */}
          <Select
            label="Category"
            options={categoryOptions}
            value={filters.category || ''}
            onChange={(e) => updateFilters({ category: e.target.value })}
          />

          {/* Price range filter */}
          <Select
            label="Price Range"
            options={priceOptions}
            value={getCurrentPriceRange()}
            onChange={(e) => handlePriceRangeChange(e.target.value)}
          />

          {/* Clear filters */}
          <div className="flex items-end">
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="md"
                onClick={clearFilters}
                className="w-full flex items-center justify-center"
              >
                <X className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Active filters display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-stone/10">
            <span className="text-sm text-stone/60">Active filters:</span>
            
            {filters.search && (
              <span className="inline-flex items-center px-2 py-1 bg-orange/10 text-orange text-sm rounded-md">
                Search: "{filters.search}"
                <button
                  onClick={() => updateFilters({ search: '' })}
                  className="ml-1 hover:text-orange/70"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            
            {filters.category && (
              <span className="inline-flex items-center px-2 py-1 bg-orange/10 text-orange text-sm rounded-md">
                {filters.category}
                <button
                  onClick={() => updateFilters({ category: '' })}
                  className="ml-1 hover:text-orange/70"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            
            {(filters.minPrice !== undefined || filters.maxPrice !== undefined) && (
              <span className="inline-flex items-center px-2 py-1 bg-orange/10 text-orange text-sm rounded-md">
                {filters.minPrice !== undefined && filters.maxPrice !== undefined
                  ? `${formatPrice(filters.minPrice)} - ${formatPrice(filters.maxPrice)}`
                  : filters.minPrice !== undefined
                  ? `${formatPrice(filters.minPrice)}+`
                  : `Under ${formatPrice(filters.maxPrice!)}`
                }
                <button
                  onClick={() => updateFilters({ minPrice: undefined, maxPrice: undefined })}
                  className="ml-1 hover:text-orange/70"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
