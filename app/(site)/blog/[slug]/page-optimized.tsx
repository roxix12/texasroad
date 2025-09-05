import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import Image from 'next/image'
import { getClient } from '../../../../lib/apolloClient'
import { GET_POST_SEO, GET_ALL_POSTS_SLUGS } from '../../../../lib/graphql/seo-queries'

// TypeScript interfaces
interface PostSEO {
  title?: string
  metaDesc?: string
  canonical?: string
  metaKeywords?: string
  metaRobotsNoindex?: boolean
  metaRobotsNofollow?: boolean
  opengraphTitle?: string
  opengraphDescription?: string
  opengraphImage?: {
    sourceUrl?: string
    altText?: string
    mediaDetails?: {
      width?: number
      height?: number
    }
  }
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: {
    sourceUrl?: string
    altText?: string
    mediaDetails?: {
      width?: number
      height?: number
    }
  }
  schema?: {
    raw?: string
  }
  breadcrumbs?: Array<{
    text: string
    url: string
  }>
  fullHead?: string
}

interface Post {
  id: string
  title: string
  content: string
  date: string
  slug: string
  excerpt: string
  featuredImage?: {
    node: {
      sourceUrl: string
      altText: string
      mediaDetails: {
        width: number
        height: number
      }
    }
  }
  author?: {
    node?: {
      name?: string
    }
  }
  categories?: {
    nodes?: Array<{
      name: string
      slug: string
    }>
  }
  seo: PostSEO
}

// Fetch post data server-side
async function getPostData(slug: string): Promise<Post | null> {
  try {
    console.log(`🔍 Fetching post data for slug: ${slug}`)
    
    const client = getClient()
    const { data, errors } = await client.query({
      query: GET_POST_SEO,
      variables: { 
        id: slug, 
        idType: "SLUG" 
      },
      errorPolicy: 'all',
      fetchPolicy: 'no-cache', // Always fetch fresh data for SEO
    })

    if (errors) {
      console.error('GraphQL errors:', errors)
    }

    if (!data?.post) {
      console.warn(`❌ Post not found for slug: ${slug}`)
      return null
    }

    console.log(`✅ Post fetched successfully: ${data.post.title}`)
    return data.post as Post
  } catch (error) {
    console.error('❌ Error fetching post:', error)
    return null
  }
}

// Generate metadata for SEO (runs server-side)
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const post = await getPostData(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found - Texas Roadhouse Menu',
      description: 'The requested blog post could not be found.'
    }
  }

  // Extract Yoast SEO data with fallbacks
  const seoTitle = post.seo?.title || post.title
  const seoDescription = post.seo?.metaDesc || post.excerpt || `Read about ${post.title} on Texas Roadhouse Menu blog.`
  const canonical = post.seo?.canonical || `https://texasroadhouse-menus.us/blog/${params.slug}`
  const keywords = post.seo?.metaKeywords || `Texas Roadhouse, menu, prices, ${post.title}`
  
  // OpenGraph data from Yoast SEO
  const ogTitle = post.seo?.opengraphTitle || seoTitle
  const ogDescription = post.seo?.opengraphDescription || seoDescription
  const ogImage = post.seo?.opengraphImage?.sourceUrl || post.featuredImage?.node?.sourceUrl
  
  // Twitter data from Yoast SEO  
  const twitterTitle = post.seo?.twitterTitle || seoTitle
  const twitterDescription = post.seo?.twitterDescription || seoDescription
  const twitterImage = post.seo?.twitterImage?.sourceUrl || ogImage

  // Respect Yoast indexing settings
  const shouldIndex = !post.seo?.metaRobotsNoindex
  const shouldFollow = !post.seo?.metaRobotsNofollow

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    
    // OpenGraph tags
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: 'article',
      publishedTime: post.date,
      siteName: 'Texas Roadhouse Menu',
      url: canonical,
      images: ogImage ? [
        {
          url: ogImage,
          width: post.seo?.opengraphImage?.mediaDetails?.width || post.featuredImage?.node?.mediaDetails?.width || 1200,
          height: post.seo?.opengraphImage?.mediaDetails?.height || post.featuredImage?.node?.mediaDetails?.height || 630,
          alt: post.seo?.opengraphImage?.altText || post.featuredImage?.node?.altText || seoTitle
        }
      ] : []
    },
    
    // Twitter Card tags
    twitter: {
      card: 'summary_large_image',
      title: twitterTitle,
      description: twitterDescription,
      images: twitterImage ? [twitterImage] : []
    },
    
    // Canonical URL
    alternates: {
      canonical
    },
    
    // Robots meta
    robots: {
      index: shouldIndex,
      follow: shouldFollow,
      googleBot: {
        index: shouldIndex,
        follow: shouldFollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    }
  }
}

// Generate static params for popular posts
export async function generateStaticParams() {
  try {
    console.log('🔍 Generating static params for blog posts...')
    
    const client = getClient()
    const { data } = await client.query({
      query: GET_ALL_POSTS_SLUGS,
      errorPolicy: 'all',
    })

    if (!data?.posts?.nodes) {
      console.warn('❌ No posts found for static generation')
      return []
    }

    // Generate params for the first 20 most recent posts
    const staticParams = data.posts.nodes
      .slice(0, 20)
      .map((post: any) => ({
        slug: post.slug
      }))
    
    console.log(`✅ Generated static params for ${staticParams.length} blog posts`)
    return staticParams
  } catch (error) {
    console.error('❌ Error generating static params:', error)
    return []
  }
}

// Main blog post page component
export default async function BlogPostPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const post = await getPostData(params.slug)

  // Handle 404
  if (!post) {
    notFound()
  }

  return (
    <>
      {/* Yoast SEO Structured Data (JSON-LD) */}
      {post.seo?.schema?.raw && (
        <Script
          id={`yoast-schema-${params.slug}`}
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: post.seo.schema.raw
          }}
        />
      )}

      {/* Fallback Structured Data */}
      {!post.seo?.schema?.raw && (
        <Script
          id={`fallback-schema-${params.slug}`}
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.seo?.metaDesc || post.excerpt || `Read about ${post.title}`,
              "author": {
                "@type": "Person",
                "name": post.author?.node?.name || "Texas Roadhouse Menu Team"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Texas Roadhouse Menu",
                "url": "https://texasroadhouse-menus.us"
              },
              "datePublished": post.date,
              "dateModified": post.date,
              "url": `https://texasroadhouse-menus.us/blog/${params.slug}`,
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://texasroadhouse-menus.us/blog/${params.slug}`
              },
              "image": post.featuredImage?.node?.sourceUrl || "https://texasroadhouse-menus.us/texas-roadhouse-og.jpg",
              "articleSection": post.categories?.nodes?.[0]?.name || "Restaurant News"
            })
          }}
        />
      )}

      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 sm:px-8 lg:px-12 py-8 sm:py-10 lg:py-12">
              
              {/* Post Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight tracking-tight">
                {post.title}
              </h1>

              {/* Post Meta */}
              <div className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg font-medium">
                <time dateTime={post.date} className="inline-flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                {post.author?.node?.name && (
                  <span className="ml-4 inline-flex items-center">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    By {post.author.node.name}
                  </span>
                )}
              </div>

              {/* Featured Image */}
              {post.featuredImage?.node?.sourceUrl && (
                <div className="mb-8 sm:mb-10 lg:mb-12 -mx-6 sm:-mx-8 lg:-mx-12">
                  <Image
                    src={post.featuredImage.node.sourceUrl}
                    alt={post.featuredImage.node.altText || post.title}
                    width={post.featuredImage.node.mediaDetails.width}
                    height={post.featuredImage.node.mediaDetails.height}
                    priority={true}
                    sizes="(max-width: 768px) 100vw, 1024px"
                    className="w-full h-auto object-cover"
                    style={{ 
                      height: 'auto', 
                      width: '100%',
                      maxWidth: '100%'
                    }}
                  />
                </div>
              )}

              {/* Post Content */}
              <div className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl max-w-none">
                <div 
                  className="text-gray-800 leading-relaxed sm:leading-loose text-sm sm:text-base lg:text-lg"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>

              {/* Categories */}
              {post.categories?.nodes && post.categories.nodes.length > 0 && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories:</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.categories.nodes.map((category) => (
                      <span
                        key={category.slug}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>
        </div>
      </main>
    </>
  )
}

// Enable static generation with revalidation
export const revalidate = 3600 // Revalidate every hour
