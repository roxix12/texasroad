import { NextRequest, NextResponse } from 'next/server'
import { notifyGoogle, batchNotifyUrls } from '@/lib/googleIndexing'
import { revalidateTag, revalidatePath } from 'next/cache'

// Automatic indexing API - triggered by content updates
// This endpoint handles automatic Google Indexing API calls for new/updated content

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Auto-indexing request received')

    // Parse request body
    const body = await request.json()
    const { 
      urls, 
      trigger_type, 
      post_data, 
      priority = 'normal',
      revalidate_cache = true 
    } = body

    // Validate required parameters
    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'URLs array is required and must not be empty'
      }, { status: 400 })
    }

    console.log('🔍 Auto-indexing URLs:', urls)
    console.log('📝 Trigger type:', trigger_type)

    // Optional: Revalidate cache first if requested
    if (revalidate_cache) {
      console.log('🔄 Revalidating cache before indexing...')
      
      // Revalidate relevant cache tags
      revalidateTag('sitemap')
      revalidateTag('posts')
      revalidateTag('pages')
      
      // Revalidate specific paths if post data is provided
      if (post_data && post_data.slug) {
        const pathsToRevalidate = []
        
        if (post_data.type === 'post') {
          pathsToRevalidate.push(`/blog/${post_data.slug}`)
          pathsToRevalidate.push(`/posts/${post_data.slug}`)
          pathsToRevalidate.push('/posts') // Blog listing
        } else if (post_data.type === 'page') {
          pathsToRevalidate.push(`/${post_data.slug}`)
        }
        
        // Always revalidate homepage for any content change
        pathsToRevalidate.push('/')
        
        for (const path of pathsToRevalidate) {
          try {
            revalidatePath(path)
            console.log(`✅ Revalidated: ${path}`)
          } catch (error) {
            console.warn(`⚠️ Failed to revalidate ${path}:`, error)
          }
        }
      }
    }

    // Determine indexing priority based on content type and trigger
    const indexingOptions = {
      priority,
      batch_size: priority === 'high' ? 5 : 10, // High priority = smaller batches
      delay_between_batches: priority === 'high' ? 1000 : 2000 // High priority = less delay
    }

    // Process URLs in batches to respect API limits
    const batchSize = indexingOptions.batch_size
    const urlBatches = []
    
    for (let i = 0; i < urls.length; i += batchSize) {
      urlBatches.push(urls.slice(i, i + batchSize))
    }

    console.log(`📦 Processing ${urls.length} URLs in ${urlBatches.length} batches`)

    const allResults = []
    let successCount = 0
    let errorCount = 0

    for (let batchIndex = 0; batchIndex < urlBatches.length; batchIndex++) {
      const batch = urlBatches[batchIndex]
      
      console.log(`🔄 Processing batch ${batchIndex + 1}/${urlBatches.length}`)
      
      try {
        const batchResults = await batchNotifyUrls(batch)
        allResults.push(...batchResults)
        
        const batchSuccessCount = batchResults.filter(result => result.success).length
        successCount += batchSuccessCount
        errorCount += (batchResults.length - batchSuccessCount)
        
        console.log(`✅ Batch ${batchIndex + 1} completed: ${batchSuccessCount}/${batch.length} successful`)
        
        // Add delay between batches to respect rate limits
        if (batchIndex < urlBatches.length - 1) {
          await new Promise(resolve => setTimeout(resolve, indexingOptions.delay_between_batches))
        }
        
      } catch (error) {
        console.error(`❌ Batch ${batchIndex + 1} failed:`, error)
        errorCount += batch.length
        
        // Add failed URLs to results
        const failedResults = batch.map(url => ({
          success: false,
          message: 'Batch processing failed',
          error: error instanceof Error ? error.message : 'Unknown error',
          url
        }))
        allResults.push(...failedResults)
      }
    }

    // Log final results
    console.log(`🎯 Auto-indexing completed: ${successCount} successful, ${errorCount} failed`)

    // Prepare response
    const response = {
      success: successCount > 0,
      message: `Auto-indexing completed: ${successCount}/${urls.length} URLs successfully submitted to Google`,
      summary: {
        total_urls: urls.length,
        successful: successCount,
        failed: errorCount,
        success_rate: Math.round((successCount / urls.length) * 100)
      },
      trigger_info: {
        trigger_type,
        priority,
        post_data,
        revalidated_cache: revalidate_cache
      },
      results: allResults,
      timestamp: new Date().toISOString()
    }

    // Return appropriate status code based on results
    const statusCode = successCount > 0 ? 200 : 500

    return NextResponse.json(response, { status: statusCode })

  } catch (error) {
    console.error('❌ Auto-indexing error:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Auto-indexing failed',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const action = searchParams.get('action')

  if (action === 'status') {
    // Return indexing status and configuration
    return NextResponse.json({
      service: 'Auto-indexing API',
      status: 'active',
      endpoints: {
        auto_index: '/api/auto-index (POST)',
        manual_reindex: '/api/reindex',
        revalidate: '/api/revalidate-sitemap'
      },
      configuration: {
        google_indexing_enabled: !!(process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY),
        site_url: process.env.SITE_URL || 'https://texasroadhouse-menus.us',
        rate_limits: {
          default_batch_size: 10,
          high_priority_batch_size: 5,
          delay_between_batches: '1-2 seconds'
        }
      },
      usage: {
        method: 'POST',
        required_fields: ['urls'],
        optional_fields: ['trigger_type', 'post_data', 'priority', 'revalidate_cache'],
        example_body: {
          urls: ['https://texasroadhouse-menus.us/blog/new-post'],
          trigger_type: 'post_published',
          post_data: {
            type: 'post',
            slug: 'new-post',
            title: 'New Blog Post'
          },
          priority: 'high',
          revalidate_cache: true
        }
      },
      timestamp: new Date().toISOString()
    })
  }

  return NextResponse.json({
    message: 'Auto-indexing API endpoint',
    usage: 'POST to this endpoint with URLs array to trigger automatic Google indexing',
    status_check: 'GET with ?action=status for configuration info'
  })
}
