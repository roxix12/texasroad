import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { PageHero } from '@/components/layout'
import { PostGrid } from '@/components/blog'
import { getPostsByCategory, getCategoryBySlug } from '@/lib/data'

// Enable ISR with 60-second revalidation for real-time WordPress updates
export const revalidate = 60

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const category = await getCategoryBySlug(slug)
    
    if (!category) {
      return {
        title: 'Category Not Found',
      }
    }

    const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Texas Roadhouse Menu'
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    
    const title = `${category.name} - Blog Posts | ${siteName}`
    const description = `Browse all posts in the ${category.name} category on ${siteName}`
    const canonical = `${siteUrl}/category/${category.slug}`

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: canonical,
        type: 'website',
        siteName,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
      alternates: {
        canonical,
      },
    }
  } catch (error) {
    console.error('Error generating category metadata:', error)
    return {
      title: 'Category - Texas Roadhouse Menu',
    }
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params

  try {
    const [category, postsResponse] = await Promise.all([
      getCategoryBySlug(slug),
      getPostsByCategory(slug)
    ])

    if (!category) {
      notFound()
    }

    const { posts } = postsResponse
    const { nodes: postNodes } = posts

    return (
      <>
                 <PageHero
           title={category.name}
           subtitle={`Browse all posts in the ${category.name} category`}
         />
        
        <div className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {postNodes.length > 0 ? (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-slab font-bold text-stone mb-2">
                    {postNodes.length} {postNodes.length === 1 ? 'Post' : 'Posts'} in {category.name}
                  </h2>
                                     <p className="text-stone/70">
                     Browse all posts in the {category.name} category
                   </p>
                </div>
                
                <PostGrid posts={postNodes} />
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-2xl font-slab font-bold text-stone mb-4">
                  No Posts Found
                </h3>
                <p className="text-stone/70 max-w-md mx-auto">
                  No posts were found in the {category.name} category. Check back later for new content.
                </p>
              </div>
            )}
          </div>
        </div>
      </>
    )
  } catch (error) {
    console.error('Error loading category page:', error)
    return (
      <>
        <PageHero
          title="Category Not Found"
          subtitle="The requested category could not be found"
        />
        
        <div className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center py-12">
              <h3 className="text-2xl font-slab font-bold text-stone mb-4">
                Unable to Load Category
              </h3>
              <p className="text-stone/70 max-w-md mx-auto">
                We're having trouble loading this category right now. Please try refreshing the page or check back later.
              </p>
            </div>
          </div>
        </div>
      </>
    )
  }
}
