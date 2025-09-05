import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getClient } from '../../../../lib/apolloClient'
import { GET_POST_SEO, GET_ALL_POSTS_SLUGS } from '../../../../lib/graphql/seo-queries'

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
  seo: {
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
}

// Fetch post data using Apollo Client
async function fetchPostData(slug: string) {
  try {
    const client = getClient()
    
    const { data, error } = await client.query({
      query: GET_POST_SEO,
      variables: { 
        id: slug, 
        idType: 'SLUG' 
      },
      errorPolicy: 'all',
      fetchPolicy: 'cache-first',
    })

    if (error) {
      console.error('Apollo Client error:', error)
      return { post: null, error }
    }

    return { post: data?.post || null, error: null }
  } catch (error) {
    console.error('Error fetching post data:', error)
    return { post: null, error }
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { data } = await getClient().query({
    query: GET_POST_SEO,
    variables: { id: params.slug, idType: "SLUG" },
  });

  const post = data?.post;
  const seo = post?.seo;

  // Normalize admin domain -> public domain for meta images only
  const normalizeImageUrl = (url?: string) =>
    url?.replace(
      "https://admin.texasroadhouse-menus.us",
      "https://texasroadhouse-menus.us"
    );

  const ogImage = seo?.opengraphImage?.sourceUrl
    ? normalizeImageUrl(seo.opengraphImage.sourceUrl)
    : undefined;

  const twImage = seo?.twitterImage?.sourceUrl
    ? normalizeImageUrl(seo.twitterImage.sourceUrl)
    : ogImage; // fallback to OG image if twitter image missing

  return {
    title: seo?.title || post?.title,
    description: seo?.metaDesc,
    openGraph: {
      title: seo?.opengraphTitle || seo?.title || post?.title,
      description: seo?.opengraphDescription || seo?.metaDesc,
      images: ogImage ? [{ url: ogImage }] : [],
      url: `https://texasroadhouse-menus.us/blog/${params.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.twitterTitle || seo?.opengraphTitle || seo?.title || post?.title,
      description: seo?.twitterDescription || seo?.opengraphDescription || seo?.metaDesc,
      images: twImage ? [twImage] : [],
    },
  };
}

// Generate static params for popular blog posts (for static generation)
export async function generateStaticParams() {
  try {
    console.log('🔍 Generating static params for blog posts...')
    
    const client = getClient()
    const { data } = await client.query({
      query: GET_ALL_POSTS_SLUGS,
      errorPolicy: 'all',
      fetchPolicy: 'cache-first',
    })
    
    const posts = data?.posts?.nodes || []
    
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
  const { post, error } = await fetchPostData(params.slug)

  // Debug logging for post data
  console.log('Blog Post Debug:', {
    slug: params.slug,
    post: post ? {
      title: post.title,
      hasContent: !!post.content,
      hasFeaturedImage: !!post.featuredImage?.node?.sourceUrl,
      hasSchema: !!post.seo?.schema?.raw
    } : null,
    error
  })

  if (!post) {
    // If there's a network error, show a helpful message instead of 404
    if (error) {
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
      {/* Yoast SEO Structured Data (JSON-LD) - Critical for Google Rich Results */}
      {post.seo?.schema?.raw && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: post.seo.schema.raw }}
        />
      )}

      {/* Fallback Structured Data if Yoast schema is not available */}
      {!post.seo?.schema?.raw && (
        <script
          type="application/ld+json"
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

              {/* Featured Image */}
              {post.featuredImage?.node?.sourceUrl && (
                <div className="mb-8 sm:mb-10 lg:mb-12 -mx-6 sm:-mx-8 lg:-mx-12">
                  <img
                    src={post.featuredImage.node.sourceUrl}
                    alt={post.featuredImage.node.altText || post.title}
                    className="w-full h-auto rounded-lg shadow-lg"
                    style={{ 
                      height: 'auto', 
                      width: '100%',
                      maxWidth: '100%'
                    }}
                  />
                </div>
              )}

              {/* Post Content */}
              <div className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl max-w-none responsive-blog-content">
                <div 
                  className="text-gray-800 leading-relaxed sm:leading-loose text-sm sm:text-base lg:text-lg"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
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