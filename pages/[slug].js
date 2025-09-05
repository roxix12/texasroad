import Head from 'next/head'
import { gql } from '@apollo/client'
import client from '../lib/apolloClient'

// GraphQL query for Yoast SEO data
export const GET_POST_SEO = gql`
  query GetPostSEO($id: ID!, $idType: PostIdType!) {
    post(id: $id, idType: $idType) {
      id
      title
      content
      date
      slug
      excerpt
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
      author {
        node {
          name
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      seo {
        title
        metaDesc
        canonical
        metaKeywords
        metaRobotsNoindex
        metaRobotsNofollow
        opengraphTitle
        opengraphDescription
        opengraphImage {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
        twitterTitle
        twitterDescription
        twitterImage {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
        schema {
          raw
        }
        breadcrumbs {
          text
          url
        }
        fullHead
      }
    }
  }
`

export default function Post({ post }) {
  if (!post) {
    return (
      <>
        <Head>
          <title>Post Not Found - Texas Roadhouse Menu</title>
          <meta name="description" content="The requested blog post could not be found." />
        </Head>
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p>The requested blog post could not be found.</p>
        </main>
      </>
    )
  }

  // Extract SEO data with fallbacks
  const seoTitle = post.seo?.title || post.title
  const seoDescription = post.seo?.metaDesc || `Read about ${post.title} on Texas Roadhouse Menu blog.`
  const canonical = post.seo?.canonical || `https://texasroadhouse-menus.us/${post.slug}`
  
  // OpenGraph data
  const ogTitle = post.seo?.opengraphTitle || seoTitle
  const ogDescription = post.seo?.opengraphDescription || seoDescription
  const ogImage = post.seo?.opengraphImage?.sourceUrl || post.featuredImage?.node?.sourceUrl
  
  // Twitter data
  const twitterTitle = post.seo?.twitterTitle || seoTitle
  const twitterDescription = post.seo?.twitterDescription || seoDescription
  const twitterImage = post.seo?.twitterImage?.sourceUrl || ogImage

  // Check indexing settings
  const shouldIndex = !post.seo?.metaRobotsNoindex
  const shouldFollow = !post.seo?.metaRobotsNofollow

  return (
    <>
      <Head>
        {/* Basic SEO */}
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        {post.seo?.metaKeywords && (
          <meta name="keywords" content={post.seo.metaKeywords} />
        )}
        
        {/* Canonical URL */}
        <link rel="canonical" href={canonical} />
        
        {/* Robots */}
        <meta 
          name="robots" 
          content={`${shouldIndex ? 'index' : 'noindex'},${shouldFollow ? 'follow' : 'nofollow'}`} 
        />
        
        {/* OpenGraph Tags */}
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <meta property="og:site_name" content="Texas Roadhouse Menu" />
        {post.date && <meta property="article:published_time" content={post.date} />}
        {post.author?.node?.name && (
          <meta property="article:author" content={post.author.node.name} />
        )}
        {ogImage && (
          <>
            <meta property="og:image" content={ogImage} />
            {post.seo?.opengraphImage?.mediaDetails?.width && (
              <meta property="og:image:width" content={post.seo.opengraphImage.mediaDetails.width} />
            )}
            {post.seo?.opengraphImage?.mediaDetails?.height && (
              <meta property="og:image:height" content={post.seo.opengraphImage.mediaDetails.height} />
            )}
            {post.seo?.opengraphImage?.altText && (
              <meta property="og:image:alt" content={post.seo.opengraphImage.altText} />
            )}
          </>
        )}
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={twitterTitle} />
        <meta name="twitter:description" content={twitterDescription} />
        {twitterImage && <meta name="twitter:image" content={twitterImage} />}
        
        {/* Structured Data */}
        {post.seo?.schema?.raw ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: post.seo.schema.raw }}
          />
        ) : (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": post.title,
                "description": seoDescription,
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
                "url": canonical,
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": canonical
                },
                "image": ogImage || "https://texasroadhouse-menus.us/texas-roadhouse-og.jpg",
                "articleSection": post.categories?.nodes?.[0]?.name || "Restaurant News"
              })
            }}
          />
        )}
      </Head>

      <main className="container mx-auto px-4 py-8">
        {/* Post Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Post Meta */}
        <div className="text-gray-600 mb-8 text-lg">
          {post.date && (
            <time dateTime={post.date} className="inline-flex items-center mr-6">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          )}
          {post.author?.node?.name && (
            <span className="inline-flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              By {post.author.node.name}
            </span>
          )}
        </div>

        {/* Featured Image */}
        {post.featuredImage?.node?.sourceUrl && (
          <div className="mb-8">
            <img
              src={post.featuredImage.node.sourceUrl}
              alt={post.featuredImage.node.altText || post.title}
              className="w-full h-auto rounded-lg shadow-lg"
              style={{ maxHeight: '500px', objectFit: 'cover' }}
            />
          </div>
        )}

        {/* Post Content */}
        <div 
          className="prose lg:prose-xl mx-auto"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

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
      </main>
    </>
  )
}

// Server-side rendering for SEO
export async function getServerSideProps({ params }) {
  try {
    const { data } = await client.query({
      query: GET_POST_SEO,
      variables: { 
        id: params.slug, 
        idType: "SLUG" 
      },
      errorPolicy: 'all'
    })

    if (!data?.post) {
      return {
        notFound: true
      }
    }

    return {
      props: {
        post: data.post
      }
    }
  } catch (error) {
    console.error('Error fetching post:', error)
    return {
      notFound: true
    }
  }
}
