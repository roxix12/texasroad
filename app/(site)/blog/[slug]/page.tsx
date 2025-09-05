import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import Image from 'next/image'
import { parseHtmlToNextImage, getBlurDataURL, getImageDimensions } from '../../../lib/imageHelpers'
import { fetchPostBySlug, fetchAllPosts } from '../../../lib/graphql/data-service'

interface Post {
  id: string
  title: string
  content: string
  date: string
  slug: string
  excerpt: string
  featuredImage?: {
    node: {
      altText: string
      sourceUrl: string
      mediaDetails: {
        width: number
        height: number
      }
    }
  }
  seo: {
    title: string
    metaDesc: string
    canonical: string
    fullHead: string
  }
}

export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const { post } = await fetchPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found - Texas Roadhouse Menu',
      description: 'The requested blog post could not be found.'
    }
  }

  // Extract basic meta from Yoast SEO fullHead if available
  let title = post.title
  let description = `Read about ${post.title} on Texas Roadhouse Menu blog.`

  // Try to extract title and description from Yoast SEO fullHead
  if (post.seo?.fullHead) {
    const titleMatch = post.seo.fullHead.match(/<title[^>]*>(.*?)<\/title>/i)
    const descMatch = post.seo.fullHead.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/i)
    
    if (titleMatch?.[1]) {
      title = titleMatch[1]
    }
    if (descMatch?.[1]) {
      description = descMatch[1]
    }
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.date,
      siteName: 'Texas Roadhouse Menu',
      url: `https://texasroadhouse-menus.us/blog/${params.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://texasroadhouse-menus.us/blog/${params.slug}`,
    },
  }
}

// Generate static params for popular blog posts (for static generation)
export async function generateStaticParams() {
  try {
    console.log('🔍 Generating static params for blog posts...')
    
    const posts = await fetchAllPosts()
    
    // Generate params for the first 20 most recent posts
    const staticParams = posts.slice(0, 20).map((post: any) => ({
      slug: post.slug
    }))
    
    console.log(`✅ Generated static params for ${staticParams.length} blog posts`)
    return staticParams
  } catch (error) {
    console.error('❌ Error generating static params:', error)
    return []
  }
}

export default async function BlogPostPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const { post, error } = await fetchPostBySlug(params.slug)

  // Debug logging for post data
  console.log('Blog Post Debug:', {
    slug: params.slug,
    post: post ? {
      title: post.title,
      hasContent: !!post.content,
      hasFeaturedImage: !!post.featuredImage?.node?.sourceUrl,
      featuredImageUrl: post.featuredImage?.node?.sourceUrl
    } : null,
    error
  })

  if (!post) {
    // If there's a network error, show a helpful message instead of 404
    if (error && error.networkError) {
      return (
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="max-w-md mx-auto text-center p-6">
            <div className="mb-4">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Connection Issue</h1>
            <p className="text-gray-600 mb-4">
              We're having trouble connecting to our content server. Please try again in a few moments.
            </p>
            <div className="text-sm text-gray-500">
              <p>Blog post slug: <code className="bg-gray-100 px-2 py-1 rounded">{params.slug}</code></p>
              <p className="mt-2">If this problem persists, please contact support.</p>
            </div>
            <a 
              href={`/blog/${params.slug}`}
              className="mt-4 inline-block px-4 py-2 bg-texas-red text-white rounded hover:bg-red-700 transition-colors"
            >
              Try Again
            </a>
          </div>
        </div>
      )
    }
    
    // Otherwise, show 404
    notFound()
  }

  return (
    <>
      {/* Inject Yoast SEO fullHead meta tags */}
      {post.seo?.fullHead && (
        <Script
          id={`yoast-seo-${params.slug}`}
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Inject Yoast SEO meta tags into document head
              const yoastMeta = \`${post.seo.fullHead.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
              
              // Create a temporary div to parse the HTML
              const tempDiv = document.createElement('div');
              tempDiv.innerHTML = yoastMeta;
              
              // Extract and inject meta tags
              const metaTags = tempDiv.querySelectorAll('meta, link[rel="canonical"], link[rel="next"], link[rel="prev"]');
              metaTags.forEach(tag => {
                const existingTag = document.querySelector(\`[\${tag.getAttribute('name') ? 'name' : 'property'}="\${tag.getAttribute('name') || tag.getAttribute('property')}"]\`);
                if (existingTag) {
                  existingTag.remove();
                }
                document.head.appendChild(tag.cloneNode(true));
              });
            `
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

            {/* Post Date */}
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
            </div>

            {/* Featured Image - Optimized for mobile performance */}
            {post.featuredImage?.node?.sourceUrl && (
              <div className="mb-8 sm:mb-10 lg:mb-12 -mx-6 sm:-mx-8 lg:-mx-12">
                {(() => {
                  const { width, height } = getImageDimensions(post.featuredImage.node.mediaDetails)
                  
                  // Debug logging for image loading
                  console.log('Featured Image Debug:', {
                    src: post.featuredImage.node.sourceUrl,
                    alt: post.featuredImage.node.altText,
                    width,
                    height,
                    mediaDetails: post.featuredImage.node.mediaDetails
                  })
                  
                  return (
                    <Image
                      src={post.featuredImage.node.sourceUrl}
                      alt={post.featuredImage.node.altText || post.title}
                      width={width}
                      height={height}
                      priority={true} // Above the fold
                      sizes="(max-width: 768px) 100vw, 1024px"
                      placeholder="blur"
                      blurDataURL={getBlurDataURL(16, 10)}
                      className="w-full h-auto rounded-lg shadow-lg"
                      style={{ 
                        height: 'auto', 
                        width: '100%',
                        maxWidth: '100%'
                      }}
                    />
                  )
                })()}
              </div>
            )}

            {/* Post Content - Images optimized with Next.js Image component */}
            {/* TODO: Test on mobile with network throttling - images should load progressively with blur */}
            {/* TODO: Check page source - WordPress images should be served via _next/image?... */}
            {/* TODO: Run Lighthouse - LCP/CLS should improve significantly */}
            {/* TODO: Test responsive scaling - images should fit screen width on all devices */}
            <div className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl max-w-none responsive-blog-content">
              <div className="text-gray-800 leading-relaxed sm:leading-loose text-sm sm:text-base lg:text-lg">
                {parseHtmlToNextImage(post.content)}
              </div>
            </div>
            </div>
          </article>
        </div>
      </main>
    </>
  )
}

// Enable static generation with revalidation
export const revalidate = 3600 // Revalidate every hour
