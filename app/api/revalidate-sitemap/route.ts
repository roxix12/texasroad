import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag, revalidatePath } from 'next/cache'
import { notifyGoogle, batchNotifyUrls } from '@/lib/googleIndexing'

// API route for revalidating content and triggering Google Indexing
// This can be called by WordPress webhooks when content is updated

export async function POST(request: NextRequest) {
  try {
    // Optional: Add authentication for security
    const authHeader = request.headers.get('authorization')
    const expectedToken = process.env.REVALIDATION_TOKEN
    
    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Parse request body to get specific content information
    let body: any = {}
    try {
      body = await request.json()
    } catch {
      // If no body provided, proceed with general revalidation
    }

    const { post_type, post_slug, action, urls } = body

    console.log('🔄 Content update webhook received:', { post_type, post_slug, action })

    // Revalidate ALL content for immediate updates
    revalidateTag('sitemap')
    revalidateTag('posts')
    revalidateTag('pages')
    revalidateTag('categories')
    revalidateTag('menus')
    revalidateTag('site-seo')
    revalidateTag('general-settings')
    
    // Revalidate specific paths for immediate content updates
    const pathsToRevalidate = ['/posts', '/', '/menus-prices', '/coupons']
    
    // Add specific post/page path if provided
    if (post_slug) {
      if (post_type === 'post') {
        pathsToRevalidate.push(`/blog/${post_slug}`)
        pathsToRevalidate.push(`/posts/${post_slug}`)
      } else if (post_type === 'page') {
        pathsToRevalidate.push(`/${post_slug}`)
      }
    }

    // Revalidate paths
    for (const path of pathsToRevalidate) {
      try {
        revalidatePath(path)
        console.log(`✅ Revalidated path: ${path}`)
      } catch (error) {
        console.warn(`⚠️ Failed to revalidate path ${path}:`, error)
      }
    }

    // Prepare URLs for Google Indexing API
    const baseUrl = process.env.SITE_URL || 'https://texasroadhouse-menus.us'
    const urlsToIndex: string[] = []

    // Always reindex sitemap and homepage
    urlsToIndex.push(`${baseUrl}/sitemap.xml`)
    urlsToIndex.push(baseUrl)

    // Add specific URLs if provided
    if (urls && Array.isArray(urls)) {
      urlsToIndex.push(...urls)
    } else if (post_slug) {
      if (post_type === 'post') {
        urlsToIndex.push(`${baseUrl}/blog/${post_slug}`)
        urlsToIndex.push(`${baseUrl}/posts/${post_slug}`)
        urlsToIndex.push(`${baseUrl}/posts`) // Blog listing page
      } else if (post_type === 'page') {
        urlsToIndex.push(`${baseUrl}/${post_slug}`)
      }
    }

    // Trigger Google Indexing API for updated URLs
    let indexingResults: any[] = []
    try {
      console.log('🔍 Triggering Google Indexing API for URLs:', urlsToIndex)
      indexingResults = await batchNotifyUrls(urlsToIndex)
      
      const successCount = indexingResults.filter(result => result.success).length
      console.log(`✅ Google Indexing API: ${successCount}/${urlsToIndex.length} URLs submitted successfully`)
      
    } catch (error) {
      console.error('❌ Google Indexing API failed:', error)
      // Continue execution even if indexing fails
    }

    console.log('🔄 Content revalidation and indexing completed')

    return NextResponse.json({
      success: true,
      message: 'Content revalidated and submitted for indexing successfully',
      timestamp: new Date().toISOString(),
      revalidated_paths: pathsToRevalidate,
      indexed_urls: urlsToIndex,
      indexing_results: indexingResults,
      post_info: { post_type, post_slug, action }
    })

  } catch (error) {
    console.error('❌ Error revalidating sitemap:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to revalidate sitemap',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Sitemap revalidation endpoint',
    usage: 'POST to this endpoint to trigger sitemap regeneration',
    authentication: 'Optional: Include Authorization: Bearer <token> header',
  })
}
