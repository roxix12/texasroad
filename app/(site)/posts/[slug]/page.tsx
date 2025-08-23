import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Metadata } from 'next'
import { PageHero } from '@/components/layout'
import { PostBreadcrumbs } from '@/components/blog'
import { Badge } from '@/components/ui'
import { ArticleLayout, TableOfContents, ArticleProse } from '@/components/article'
import { getPostBySlug } from '@/lib/data'
import { formatDate } from '@/lib/format'
import { processContent } from '@/lib/heading'
import { convertYoastToMetadata } from '@/lib/yoast-seo'
import { ConditionalYoastSEOHead } from '@/components/seo'
import { stripJsonLdFromText } from '@/lib/jsonld'
import { WORDPRESS_CONFIG } from '@/lib/config'

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Texas Roadhouse Menu'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const fallbackTitle = post.title
  const fallbackDescription = post.excerpt || `Read ${post.title} on ${siteName}`
  const fallbackCanonical = `${siteUrl}/posts/${post.slug}`
  
  // Use Yoast SEO data if available, otherwise fallback to basic metadata
  if (post.seo) {
    const metadata = convertYoastToMetadata(post.seo, fallbackTitle, fallbackDescription)
    
    // Ensure canonical URL is properly formatted
    if (metadata.alternates?.canonical && !metadata.alternates.canonical.startsWith('http')) {
      metadata.alternates.canonical = metadata.alternates.canonical.startsWith('/') 
        ? `${siteUrl}${metadata.alternates.canonical}`
        : `${siteUrl}/${metadata.alternates.canonical}`
    }
    
    // Add article-specific OpenGraph data  
    if (metadata.openGraph) {
      const existingOG = metadata.openGraph
      metadata.openGraph = {
        ...existingOG,
        type: 'article',
        publishedTime: post.date,
        siteName,
        url: metadata.alternates?.canonical || fallbackCanonical,
      } as any // TypeScript workaround for OpenGraph type limitations
    }
    
    return metadata
  }
  
  // Fallback metadata when Yoast SEO is not available
  return {
    title: fallbackTitle,
    description: fallbackDescription,
    openGraph: {
      title: fallbackTitle,
      description: fallbackDescription,
      type: 'article',
      publishedTime: post.date,
      siteName,
      url: fallbackCanonical,
      images: post.featuredImage ? [post.featuredImage.node.sourceUrl] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: fallbackTitle,
      description: fallbackDescription,
      images: post.featuredImage ? [post.featuredImage.node.sourceUrl] : [],
    },
    alternates: {
      canonical: fallbackCanonical,
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // Clean HTML to remove JSON-LD before processing
  const safeHtml = stripJsonLdFromText(post.content || '')
  
  // Process content to inject IDs and extract TOC  
  const { processedHtml, tocItems } = processContent(safeHtml)

  const primaryCategory = post.categories.nodes[0]

  return (
    <>
      {/* Yoast SEO Integration */}
      <ConditionalYoastSEOHead seoData={post.seo} />
      <PageHero
        title={post.title}
        breadcrumbs={
          <PostBreadcrumbs 
            categoryName={primaryCategory?.name}
            categorySlug={primaryCategory?.slug}
            postTitle={post.title}
          />
        }
      />
      
      <div className="py-6 sm:py-8 lg:py-12 bg-white">
        <ArticleLayout
          sidebar={
            <>
              <TableOfContents items={tocItems} />
              
              <div className="bg-white rounded-lg border border-stone/10 p-4 sm:p-6 shadow-sm">
                <h4 className="font-slab font-bold text-sm sm:text-base mb-3">Article Info</h4>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div>
                    <span className="font-medium text-stone/80">Published:</span>
                    <time dateTime={post.date} className="ml-2 text-stone/60">
                      {formatDate(post.date)}
                    </time>
                  </div>
                  
                  {post.categories.nodes.length > 0 && (
                    <div>
                      <span className="font-medium text-stone/80 block mb-2">Categories:</span>
                      <div className="flex flex-wrap gap-2">
                        {post.categories.nodes.slice(0, 3).map((category) => (
                          <Badge key={category.slug} variant="category" size="sm">
                            {category.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-3 border-t border-stone/10">
                    <p className="text-xs text-stone/60 leading-relaxed">
                      This article is part of our Texas Roadhouse menu information series.
                      All information is independently researched and not affiliated with Texas Roadhouse.
                    </p>
                  </div>
                </div>
              </div>
            </>
          }
        >
          {/* Article Header */}
          <header className="mb-6 sm:mb-8">
            {post.categories.nodes.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                {post.categories.nodes.slice(0, 3).map((category) => (
                  <Badge key={category.slug} variant="category" size="sm">
                    {category.name}
                  </Badge>
                ))}
              </div>
            )}
            
            <div className="text-xs sm:text-sm text-stone/60 font-medium mb-4 sm:mb-6">
              Published on {formatDate(post.date)}
            </div>
            

          </header>

          {/* Featured image */}
          {post.featuredImage && (
            <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9] rounded-md sm:rounded-lg overflow-hidden shadow-md sm:shadow-lg mb-6 sm:mb-8 lg:mb-12">
              <Image
                src={post.featuredImage.node.sourceUrl}
                alt={post.featuredImage.node.altText || post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 800px"
              />
            </div>
          )}

          {/* Article Content */}
          <ArticleProse html={processedHtml} />
          
        </ArticleLayout>
      </div>
    </>
  )
}