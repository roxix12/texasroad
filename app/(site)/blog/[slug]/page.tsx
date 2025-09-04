import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Script from 'next/script'

// GraphQL query for single post
const GET_POST_BY_SLUG = `
  query GetPostBySlug($slug: String!) {
    postBy(slug: $slug) {
      title
      content
      date
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
  seo: {
    fullHead: string
  }
}

interface GraphQLResponse {
  data: {
    postBy: Post | null
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
    return result.data?.postBy || null
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

            {/* Post Content */}
            <div 
              className="prose-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
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
