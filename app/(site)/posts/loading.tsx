import { PageHero } from '@/components/layout'
import { PostSkeleton } from '@/components/ui'

export default function PostsLoading() {
  return (
    <>
      <PageHero
        title="Blog & News"
        subtitle="Stay updated with the latest menu additions, cooking tips, and restaurant news"
      />
      
      <div className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category pills skeleton */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="h-8 w-20 bg-stone/10 rounded-full animate-pulse" />
              ))}
            </div>
          </div>

          {/* Posts grid skeleton */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, index) => (
              <PostSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
