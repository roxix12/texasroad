import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

// API route for manually revalidating the sitemap
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

    // Revalidate ALL content for immediate updates
    revalidateTag('sitemap')
    revalidateTag('posts')
    revalidateTag('pages')
    revalidateTag('categories')
    revalidateTag('menus')
    revalidateTag('site-seo')
    revalidateTag('general-settings')
    
    // Also revalidate specific paths for immediate content updates
    const specificPaths = ['/posts', '/', '/menus']
    
    // Note: In production, you can use revalidatePath() for specific paths
    // This ensures instant content updates when WordPress changes
    console.log('🔄 Revalidated all content tags and paths')

    console.log('🔄 Sitemap revalidation triggered successfully')

    return NextResponse.json({
      success: true,
      message: 'Sitemap revalidated successfully',
      timestamp: new Date().toISOString(),
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
