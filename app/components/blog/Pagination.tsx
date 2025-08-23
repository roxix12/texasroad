'use client'

import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui'

interface PaginationProps {
  hasNextPage: boolean
  hasPreviousPage: boolean
  nextCursor?: string | null
  previousCursor?: string | null
  basePath?: string
  className?: string
  disabled?: boolean
}

export function Pagination({
  hasNextPage,
  hasPreviousPage,
  nextCursor,
  previousCursor,
  basePath = '/posts',
  className = '',
  disabled = false
}: PaginationProps) {
  if (!hasNextPage && !hasPreviousPage) {
    return null
  }

  const nextUrl = hasNextPage && nextCursor 
    ? `${basePath}?after=${encodeURIComponent(nextCursor)}`
    : null

  const previousUrl = hasPreviousPage && previousCursor 
    ? `${basePath}?before=${encodeURIComponent(previousCursor)}`
    : null

  return (
    <div className={`flex justify-center items-center gap-4 sm:gap-6 py-8 sm:py-12 ${className}`}>
      {/* Previous Page Button */}
      {hasPreviousPage && previousUrl ? (
        <Link href={previousUrl as any} className="group">
          <Button 
            variant="outline" 
            size="lg"
            disabled={disabled}
            className="flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium border-2 border-licorice/20 hover:border-licorice hover:bg-licorice hover:text-white transition-all duration-200 touch-manipulation min-w-[120px] sm:min-w-[140px]"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="hidden sm:inline">Previous Page</span>
            <span className="sm:hidden">Previous</span>
          </Button>
        </Link>
      ) : (
        <div className="min-w-[120px] sm:min-w-[140px]" /> // Spacer to maintain layout
      )}

      {/* Page Indicator */}
      <div className="flex items-center gap-2 px-3 py-2 text-xs sm:text-sm text-licorice/60 bg-school-bus-yellow/10 rounded-full border border-school-bus-yellow/20">
        <span className="hidden sm:inline">Browse</span>
        <span className="font-medium text-licorice">Articles</span>
      </div>

      {/* Next Page Button */}
      {hasNextPage && nextUrl ? (
        <Link href={nextUrl as any} className="group">
          <Button 
            variant="primary" 
            size="lg"
            disabled={disabled}
            className="flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium bg-school-bus-yellow hover:bg-school-bus-yellow/90 text-licorice hover:text-licorice/90 transition-all duration-200 touch-manipulation min-w-[120px] sm:min-w-[140px]"
          >
            <span className="hidden sm:inline">Next Page</span>
            <span className="sm:hidden">Next</span>
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Button>
        </Link>
      ) : (
        <div className="min-w-[120px] sm:min-w-[140px]" /> // Spacer to maintain layout
      )}
    </div>
  )
}

// Specialized pagination for category pages
export function CategoryPagination({
  categorySlug,
  ...props
}: PaginationProps & { categorySlug: string }) {
  return (
    <Pagination
      {...props}
      basePath={`/categories/${categorySlug}`}
    />
  )
}

// Loading state for pagination
export function PaginationSkeleton() {
  return (
    <div className="flex justify-center items-center gap-4 sm:gap-6 py-8 sm:py-12">
      <div className="min-w-[120px] sm:min-w-[140px] h-12 sm:h-14 bg-licorice/10 rounded-lg animate-pulse" />
      <div className="w-20 sm:w-24 h-8 bg-school-bus-yellow/20 rounded-full animate-pulse" />
      <div className="min-w-[120px] sm:min-w-[140px] h-12 sm:h-14 bg-school-bus-yellow/20 rounded-lg animate-pulse" />
    </div>
  )
}