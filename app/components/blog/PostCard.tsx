import Image from 'next/image'
import Link from 'next/link'
import { Post } from '@/lib/types'
import { formatDate, createExcerpt } from '@/lib/format'
import { Badge } from '@/components/ui'

interface PostCardProps {
  post: Post
  featured?: boolean
}

export function PostCard({ post, featured = false }: PostCardProps) {
  const excerpt = createExcerpt(post.excerpt || '', 120)
  
  return (
    <article className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${featured ? 'lg:flex' : ''}`}>
      {post.featuredImage && (
        <div className={`relative ${featured ? 'lg:w-1/2' : 'h-48'} overflow-hidden`}>
          <Link href={`/${post.slug}`}>
            <Image
              src={post.featuredImage.node.sourceUrl}
              alt={post.featuredImage.node.altText || post.title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
            />
          </Link>
        </div>
      )}
      
      <div className={`p-6 ${featured ? 'lg:w-1/2 lg:flex lg:flex-col lg:justify-between' : ''}`}>
        <div>
          {post.categories.nodes.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.categories.nodes.slice(0, 2).map((category) => (
                <Badge key={category.slug} variant="category" size="sm">
                  {category.name}
                </Badge>
              ))}
            </div>
          )}
          
          <h2 className={`font-slab font-slab-bold text-stone mb-3 line-clamp-2 ${featured ? 'text-2xl lg:text-3xl' : 'text-xl'}`}>
            <Link 
              href={`/${post.slug}`}
              className="hover:text-orange transition-colors duration-200"
            >
              {post.title}
            </Link>
          </h2>
          
          {excerpt && (
            <p className="text-stone/70 mb-4 line-clamp-3">
              {excerpt}
            </p>
          )}
        </div>
        
        <div className="flex items-center justify-between text-sm text-stone/60">
          <time dateTime={post.date}>
            {formatDate(post.date)}
          </time>
          
          <Link 
            href={`/${post.slug}`}
            className="font-medium text-orange hover:text-orange/80 transition-colors duration-200"
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  )
}

export function FeaturedPostCard({ post }: { post: Post }) {
  return <PostCard post={post} featured />
}
