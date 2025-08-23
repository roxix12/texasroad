import { Post } from '@/lib/types'
import { PostCard } from './PostCard'
import { PostSkeleton } from '@/components/ui'

interface PostGridProps {
  posts: Post[]
  loading?: boolean
  columns?: 1 | 2 | 3 | 4
}

export function PostGrid({ posts, loading = false, columns = 3 }: PostGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  }

  if (loading) {
    return (
      <div className={`grid gap-6 ${gridCols[columns]}`}>
        {Array.from({ length: columns * 2 }).map((_, index) => (
          <PostSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-slab font-slab-bold text-stone mb-2">
          No posts found
        </h3>
        <p className="text-stone/60">
          Check back later for new articles and updates.
        </p>
      </div>
    )
  }

  return (
    <div className={`grid gap-6 ${gridCols[columns]}`}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

interface FeaturedPostsProps {
  posts: Post[]
  loading?: boolean
}

export function FeaturedPosts({ posts, loading = false }: FeaturedPostsProps) {
  if (loading) {
    return (
      <div className="space-y-6">
        <PostSkeleton />
        <div className="grid gap-6 md:grid-cols-2">
          <PostSkeleton />
          <PostSkeleton />
        </div>
      </div>
    )
  }

  if (posts.length === 0) {
    return null
  }

  const [featured, ...rest] = posts

  return (
    <div className="space-y-8">
      {featured && (
        <PostCard post={featured} featured />
      )}
      
      {rest.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {rest.slice(0, 2).map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
