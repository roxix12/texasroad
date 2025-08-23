import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { PageHero } from '@/components/layout'
import { CategoryBreadcrumbs, PostGrid, CategoryPagination, CategoryPills } from '@/components/blog'
import { getPostsByCategory, getCategories } from '@/lib/data'

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{ after?: string; before?: string }>
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ params, searchParams }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const { after, before } = await searchParams
  const categories = await getCategories()
  const category = categories.find(cat => cat.slug === slug)
  
  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Texas Roadhouse Menu'
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
  const basePath = `/categories/${slug}`
  
  let title = `${category.name} Articles | ${siteName}`
  let description = `Browse all articles in the ${category.name} category on ${siteName}`
  
  if (after || before) {
    title = `${category.name} Articles - Page 2+ | ${siteName}`
    description = `Browse more articles in the ${category.name} category`
  }

  const metadata: Metadata = {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}${basePath}`,
      type: 'website',
    },
    alternates: {
      canonical: `${baseUrl}${basePath}`,
    },
  }

  // Add SEO pagination links for category pages
  try {
    const postsResponse = await getPostsByCategory(
      slug,
      before ? undefined : 12,
      after,
      before,
      before ? 12 : undefined
    )
    
    const { pageInfo } = postsResponse.posts
    
    if (pageInfo.hasNextPage && pageInfo.endCursor) {
      if (!metadata.alternates) metadata.alternates = {}
      // @ts-ignore
      metadata.alternates.next = `${baseUrl}${basePath}?after=${encodeURIComponent(pageInfo.endCursor)}`
    }
    
    if (pageInfo.hasPreviousPage && pageInfo.startCursor) {
      if (!metadata.alternates) metadata.alternates = {}
      // @ts-ignore
      metadata.alternates.prev = `${baseUrl}${basePath}?before=${encodeURIComponent(pageInfo.startCursor)}`
    }
    
    if ((after || before) && !pageInfo.hasPreviousPage) {
      if (!metadata.alternates) metadata.alternates = {}
      // @ts-ignore
      metadata.alternates.prev = `${baseUrl}${basePath}`
    }
  } catch (error) {
    console.error('Error generating category pagination metadata:', error)
  }

  return metadata
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params
  const { after, before } = await searchParams
  
  const [categories, postsResponse] = await Promise.all([
    getCategories(),
    getPostsByCategory(
      slug, 
      before ? undefined : 12, // first
      after, // after cursor
      before, // before cursor
      before ? 12 : undefined // last
    ),
  ])
  
  const category = categories.find(cat => cat.slug === slug)
  
  if (!category) {
    notFound()
  }

  const { posts } = postsResponse
  const { nodes: postNodes, pageInfo } = posts

  return (
    <>
      <PageHero
        title={`${category.name} Articles`}
        subtitle={`Discover all articles in the ${category.name} category`}
        breadcrumbs={<CategoryBreadcrumbs categoryName={category.name} />}
      />
      
      <div className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category filter pills - show all categories with current one highlighted */}
          {categories.length > 0 && (
            <div className="mb-8">
              <CategoryPills categories={categories} activeCategory={slug} />
            </div>
          )}

          <PostGrid posts={postNodes} />
          
          {postNodes.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-2xl font-slab font-slab-bold text-stone mb-4">
                No articles found
              </h3>
              <p className="text-stone/70 max-w-md mx-auto">
                There are no articles in the {category.name} category yet. 
                Check back soon for new content!
              </p>
            </div>
          )}

          {/* Category Pagination */}
          {postNodes.length > 0 && (
            <CategoryPagination
              categorySlug={slug}
              hasNextPage={pageInfo.hasNextPage}
              hasPreviousPage={pageInfo.hasPreviousPage}
              nextCursor={pageInfo.endCursor}
              previousCursor={pageInfo.startCursor}
            />
          )}
        </div>
      </div>
    </>
  )
}
