import { NextResponse } from 'next/server'
import { getPosts } from '@/lib/data'
import { formatDate } from '@/lib/format'

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Texas Roadhouse Menu'
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'

export async function GET() {
  try {
    const postsResponse = await getPosts(20)
    const posts = postsResponse.posts.nodes

    const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteName}</title>
    <description>Your independent guide to Texas Roadhouse menu items, prices, and nutritional information</description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/api/rss" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <webMaster>info@${new URL(siteUrl).hostname} (${siteName})</webMaster>
    <managingEditor>info@${new URL(siteUrl).hostname} (${siteName})</managingEditor>
    <copyright>© ${new Date().getFullYear()} ${siteName}. All rights reserved.</copyright>
    <category>Food &amp; Dining</category>
    <category>Restaurant Menus</category>
    <ttl>60</ttl>
    <image>
      <url>${siteUrl}/og-image.jpg</url>
      <title>${siteName}</title>
      <link>${siteUrl}</link>
      <width>1200</width>
      <height>630</height>
    </image>
${posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt || ''}]]></description>
      <link>${siteUrl}/posts/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/posts/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category><![CDATA[${post.categories.nodes.map(cat => cat.name).join(', ')}]]></category>
      ${post.featuredImage ? `<enclosure url="${post.featuredImage.node.sourceUrl}" type="image/jpeg" />` : ''}
    </item>`).join('')}
  </channel>
</rss>`

    return new NextResponse(rssFeed, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error('Error generating RSS feed:', error)
    
    // Return a basic RSS feed with just the site info
    const basicRssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteName}</title>
    <description>Your independent guide to Texas Roadhouse menu items, prices, and nutritional information</description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/api/rss" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <ttl>60</ttl>
  </channel>
</rss>`

    return new NextResponse(basicRssFeed, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  }
}
