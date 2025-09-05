import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { fetchAllPosts } from '../../lib/graphql/data-service'
import { getBlurDataURL, getImageDimensions } from '../../lib/imageHelpers'

// Post interface matching GraphQL response
interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  date: string
  content: string
  featuredImage?: {
    node?: {
      sourceUrl?: string
      altText?: string
      mediaDetails?: {
        width?: number
        height?: number
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
  seo?: {
    title?: string
    metaDesc?: string
    fullHead?: string
  }
}

// Generate metadata for the blog listing page
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Texas Roadhouse Menu Blog - Latest News & Updates',
    description: 'Stay updated with the latest Texas Roadhouse menu items, prices, promotions, and restaurant news. Get insider tips and food reviews.',
    keywords: 'Texas Roadhouse blog, menu updates, restaurant news, food reviews, promotions, latest menu items',
    openGraph: {
      title: 'Texas Roadhouse Menu Blog - Latest News & Updates',
      description: 'Stay updated with the latest Texas Roadhouse menu items, prices, promotions, and restaurant news.',
      url: 'https://texasroadhouse-menus.us/blog',
      siteName: 'Texas Roadhouse Menu',
      images: [
        {
          url: 'https://texasroadhouse-menus.us/texas-roadhouse-og.jpg',
          width: 1200,
          height: 630,
          alt: 'Texas Roadhouse Menu Blog'
        }
      ],
      locale: 'en_US',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Texas Roadhouse Menu Blog - Latest News & Updates',
      description: 'Stay updated with the latest Texas Roadhouse menu items, prices, promotions, and restaurant news.',
      images: ['https://texasroadhouse-menus.us/texas-roadhouse-og.jpg']
    },
    alternates: {
      canonical: 'https://texasroadhouse-menus.us/blog'
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    }
  }
}

// Blog listing page component
export default async function BlogPage() {
  let posts: Post[] = []
  let error: string | null = null

  try {
    // Fetch all posts from WordPress
    const fetchedPosts = await fetchAllPosts()
    posts = fetchedPosts || []
    
    console.log(`✅ Blog listing: Fetched ${posts.length} posts`)
  } catch (err) {
    console.error('❌ Error fetching blog posts:', err)
    error = 'Unable to load blog posts. Please try again later.'
  }

  return (
    <>
      {/* Structured Data for Blog */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Texas Roadhouse Menu Blog",
            "description": "Latest news, updates, and insights about Texas Roadhouse menu items, prices, and promotions",
            "url": "https://texasroadhouse-menus.us/blog",
            "publisher": {
              "@type": "Organization",
              "name": "Texas Roadhouse Menu",
              "url": "https://texasroadhouse-menus.us"
            },
            "blogPost": posts.slice(0, 10).map(post => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "url": `https://texasroadhouse-menus.us/blog/${post.slug}`,
              "datePublished": post.date,
              "author": {
                "@type": "Person",
                "name": post.author?.node?.name || "Texas Roadhouse Menu Team"
              }
            }))
          })
        }}
      />

      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Texas Roadhouse Menu Blog
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest menu items, prices, promotions, and restaurant news from Texas Roadhouse
            </p>
          </div>

          {/* Error State */}
          {error && (
            <div className="max-w-4xl mx-auto mb-8">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <div className="text-red-800 mb-2">
                  <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 15.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-red-800 mb-2">Connection Issue</h2>
                <p className="text-red-700">{error}</p>
                <p className="text-red-600 text-sm mt-2">
                  We're working to fix this issue. Please check back later or visit our main menu pages.
                </p>
                <div className="mt-4">
                  <Link
                    href="/menus-prices"
                    className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    View Menu & Prices
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Blog Posts Grid */}
          {posts.length > 0 ? (
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
                  >
                    {/* Featured Image */}
                    {post.featuredImage?.node?.sourceUrl && (
                      <div className="aspect-video relative overflow-hidden">
                        {(() => {
                          const { width, height } = getImageDimensions(post.featuredImage.node.mediaDetails)
                          
                          return (
                            <Image
                              src={post.featuredImage.node.sourceUrl}
                              alt={post.featuredImage.node.altText || post.title}
                              width={width}
                              height={height}
                              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              placeholder="blur"
                              blurDataURL={getBlurDataURL(width, height)}
                              loading="lazy"
                            />
                          )
                        })()}
                      </div>
                    )}

                    {/* Post Content */}
                    <div className="p-6">
                      {/* Categories */}
                      {post.categories?.nodes && post.categories.nodes.length > 0 && (
                        <div className="mb-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            {post.categories.nodes[0].name}
                          </span>
                        </div>
                      )}

                      {/* Title */}
                      <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-red-600 transition-colors">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h2>

                      {/* Excerpt */}
                      {post.excerpt && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {post.excerpt.replace(/<[^>]*>/g, '').substring(0, 150)}...
                        </p>
                      )}

                      {/* Meta */}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </time>
                        </div>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-red-600 hover:text-red-700 font-medium transition-colors"
                        >
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : !error && (
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Blog Posts Yet</h2>
                <p className="text-gray-600 mb-6">
                  We're working on creating great content for you. Check back soon for the latest Texas Roadhouse news and updates!
                </p>
                <Link
                  href="/menus-prices"
                  className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Explore Our Menu
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

// Enable static generation with revalidation
export const revalidate = 3600 // Revalidate every hour
