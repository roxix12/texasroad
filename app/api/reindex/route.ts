import { NextRequest, NextResponse } from 'next/server';
import { notifyGoogle, notifyHomepageUpdate, notifyCouponPageUpdate, validateGoogleCredentials } from '@/lib/googleIndexing';

/**
 * GET /api/reindex
 * Manually trigger Google indexing for the homepage
 */
export async function GET(request: NextRequest) {
  try {
    console.log('🔄 Manual reindex request received');

    // Validate Google credentials first
    const credentialsValid = await validateGoogleCredentials();
    if (!credentialsValid) {
      return NextResponse.json({
        success: false,
        message: 'Google credentials are invalid or not configured',
        error: 'Please check your GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY environment variables'
      }, { status: 500 });
    }

    // Get the site URL from environment
    const siteUrl = process.env.SITE_URL || 'https://texasroadhousemenu.me';
    const homepageUrl = siteUrl.endsWith('/') ? siteUrl : `${siteUrl}/`;

    console.log('🏠 Notifying Google about homepage update:', homepageUrl);

    // Notify Google about the homepage update
    const result = await notifyGoogle(homepageUrl);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Homepage successfully submitted to Google for indexing',
        url: homepageUrl,
        timestamp: new Date().toISOString(),
        googleResponse: result.data
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Failed to notify Google Indexing API',
        error: result.error,
        url: homepageUrl,
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }

  } catch (error) {
    console.error('❌ Error in GET /api/reindex:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

/**
 * POST /api/reindex
 * Manually trigger Google indexing for specific URLs or all pages
 */
export async function POST(request: NextRequest) {
  try {
    console.log('🔄 Manual reindex POST request received');

    // Validate Google credentials first
    const credentialsValid = await validateGoogleCredentials();
    if (!credentialsValid) {
      return NextResponse.json({
        success: false,
        message: 'Google credentials are invalid or not configured',
        error: 'Please check your GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY environment variables'
      }, { status: 500 });
    }

    const body = await request.json();
    const { urls, type } = body;

    let results;

    if (urls && Array.isArray(urls)) {
      // Notify specific URLs
      console.log('📦 Notifying Google for specific URLs:', urls);
      
      const promises = urls.map(url => notifyGoogle(url));
      results = await Promise.all(promises);
      
    } else if (type === 'coupons') {
      // Notify about coupon updates (homepage + coupon page)
      console.log('🎫 Notifying Google about coupon updates');
      
      const [homepageResult, couponPageResult] = await Promise.all([
        notifyHomepageUpdate(),
        notifyCouponPageUpdate(),
      ]);
      
      results = {
        homepage: homepageResult,
        couponPage: couponPageResult,
        type: 'coupon-updates'
      };
      
    } else {
      // Default: notify homepage
      console.log('🏠 Notifying Google about homepage update');
      
      const homepageResult = await notifyHomepageUpdate();
      results = {
        homepage: homepageResult,
        type: 'homepage-only'
      };
    }

    const successCount = Array.isArray(results) 
      ? results.filter(result => result.success).length 
      : (results.homepage?.success ? 1 : 0) + (results.couponPage?.success ? 1 : 0);

    return NextResponse.json({
      success: true,
      message: `Successfully submitted ${successCount} URL(s) to Google for indexing`,
      results,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error in POST /api/reindex:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

/**
 * PUT /api/reindex
 * Update indexing configuration or trigger bulk reindex
 */
export async function PUT(request: NextRequest) {
  try {
    console.log('🔄 Manual reindex PUT request received');

    // Validate Google credentials first
    const credentialsValid = await validateGoogleCredentials();
    if (!credentialsValid) {
      return NextResponse.json({
        success: false,
        message: 'Google credentials are invalid or not configured',
        error: 'Please check your GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY environment variables'
      }, { status: 500 });
    }

    const body = await request.json();
    const { action } = body;

    if (action === 'bulk') {
      // Bulk reindex of main pages
      console.log('📦 Performing bulk reindex of main pages');
      
      const siteUrl = process.env.SITE_URL || 'https://texasroadhousemenu.me';
      const urls = [
        siteUrl.endsWith('/') ? siteUrl : `${siteUrl}/`,
        `${siteUrl}/coupons`,
        `${siteUrl}/menus`,
        `${siteUrl}/posts`
      ];

      const promises = urls.map(url => notifyGoogle(url));
      const results = await Promise.all(promises);
      
      const successCount = results.filter(result => result.success).length;

      return NextResponse.json({
        success: true,
        message: `Bulk reindex complete: ${successCount}/${urls.length} URLs successfully submitted`,
        urls,
        results,
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json({
      success: false,
      message: 'Invalid action specified',
      error: 'Supported actions: bulk',
      timestamp: new Date().toISOString()
    }, { status: 400 });

  } catch (error) {
    console.error('❌ Error in PUT /api/reindex:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
