import { PageHero } from '@/components/layout'
import { MenuSkeleton } from '@/components/ui'

export default function MenusLoading() {
  return (
    <>
      <PageHero
        title="Menu & Prices"
        subtitle="Explore our complete menu with detailed pricing and nutritional information"
      />
      
      <div className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filter Bar Skeleton */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="animate-pulse">
              <div className="h-6 bg-stone/10 rounded w-24 mb-4"></div>
              <div className="space-y-4">
                <div className="h-12 bg-stone/10 rounded"></div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="h-12 bg-stone/10 rounded"></div>
                  <div className="h-12 bg-stone/10 rounded"></div>
                  <div className="h-12 bg-stone/10 rounded"></div>
                </div>
              </div>
            </div>
          </div>

          {/* View Mode Toggle Skeleton */}
          <div className="flex justify-between items-center mb-6">
            <div className="h-5 bg-stone/10 rounded w-32 animate-pulse"></div>
            <div className="h-10 bg-stone/10 rounded w-20 animate-pulse"></div>
          </div>

          {/* Menu Grid Skeleton */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, index) => (
              <MenuSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
