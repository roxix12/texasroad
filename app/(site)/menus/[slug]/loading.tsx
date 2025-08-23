import { PageHero } from '@/components/layout'
import { Skeleton } from '@/components/ui'

export default function MenuItemLoading() {
  return (
    <>
      <PageHero
        title="Loading..."
        subtitle="Please wait while we load the menu item details"
      />
      
      <div className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Back button skeleton */}
          <div className="mb-8">
            <Skeleton className="h-5 w-32" />
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Image skeleton */}
            <div>
              <Skeleton className="aspect-[4/3] rounded-lg" />
            </div>

            {/* Content skeleton */}
            <div className="space-y-6">
              {/* Price and badges */}
              <div className="flex items-start justify-between">
                <Skeleton className="h-10 w-24" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              </div>

              {/* Category */}
              <Skeleton className="h-7 w-20 rounded-full" />

              {/* Description */}
              <div className="space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
              </div>

              {/* Nutrition info */}
              <div className="bg-sand/30 rounded-lg p-4">
                <Skeleton className="h-5 w-full" />
              </div>

              {/* Allergen warning */}
              <div className="bg-orange/10 border border-orange/20 rounded-lg p-4">
                <Skeleton className="h-16 w-full" />
              </div>

              {/* CTAs */}
              <div className="space-y-3">
                <Skeleton className="h-12 w-full rounded-lg" />
                <Skeleton className="h-12 w-full rounded-lg" />
              </div>
            </div>
          </div>

          {/* Detailed nutrition facts skeleton */}
          <div className="mt-12">
            <div className="bg-sand/30 rounded-lg p-6">
              <Skeleton className="h-6 w-48 mb-4" />
              <div className="space-y-4">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
