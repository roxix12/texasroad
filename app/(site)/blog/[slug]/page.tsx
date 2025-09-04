import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import Image from 'next/image'
import { parseHtmlToNextImage, getBlurDataURL, getImageDimensions } from '../../../lib/imageHelpers'

// GraphQL query for single post with featured image
const GET_POST_BY_SLUG = `
  query PostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      title
      content
      date
      featuredImage {
        node {
          altText
          sourceUrl
          mediaDetails {
            width
            height
          }
        }
      }
      seo {
        fullHead
      }
    }
  }
`

interface Post {
  title: string
  content: string
  date: string
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
    fullHead: string
  }
}

interface GraphQLResponse {
  data: {
    post: Post | null
  }
}

async function fetchPostBySlug(slug: string): Promise<Post | null> {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: GET_POST_BY_SLUG,
        variables: { slug },
      }),
      next: { revalidate: 300 }, // 5 minutes cache
    })

    if (!response.ok) {
      console.error('Failed to fetch post:', response.status, response.statusText)
      return null
    }

    const result: GraphQLResponse = await response.json()
    return result.data?.post || null
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const post = await fetchPostBySlug(params.slug)
  
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

export default async function BlogPostPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const post = await fetchPostBySlug(params.slug)

  if (!post) {
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
        <div className="container mx-auto px-4 py-8">
          <article className="prose lg:prose-xl mx-auto p-6">
            {/* Post Title */}
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Post Date */}
            <div className="text-gray-600 mb-8 text-lg">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>

            {/* Featured Image - Optimized for mobile performance */}
            {post.featuredImage?.node?.sourceUrl && (
              <div className="mb-8 -mx-6 lg:-mx-0">
                {(() => {
                  const { width, height } = getImageDimensions(post.featuredImage.node.mediaDetails)
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
            <div className="prose-content responsive-blog-content">
              {parseHtmlToNextImage(post.content)}
            </div>
          </article>
        </div>
      </main>
    </>
  )
}

// Generate static params for popular blog posts (optional - for better performance)
export async function generateStaticParams() {
  // You can add logic here to pre-generate popular blog post pages
  // For now, we'll let them generate on-demand
  return []
}
