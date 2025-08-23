import { NextRequest, NextResponse } from 'next/server';
import { generateCoupons } from '@/lib/gemini-coupons';
import { saveCoupons, getCouponsWithUpdateCheck } from '@/lib/coupon-storage';
import { notifyCouponUpdates } from '@/lib/googleIndexing';

/**
 * GET /api/update-coupons
 * Retrieve current coupons (with auto-update if needed)
 */
export async function GET(request: NextRequest) {
  console.log('GET /api/update-coupons - Request received');
  
  try {
    const { searchParams } = new URL(request.url);
    const force = searchParams.get('force') === 'true';
    
    console.log('📊 Request parameters:', { force });
    
    let coupons;
    
    if (force) {
      // Force update coupons
      const { generateCoupons } = await import('@/lib/gemini-coupons');
      const newCoupons = await generateCoupons();
      await saveCoupons(newCoupons);
      
      coupons = {
        coupons: newCoupons.coupons,
        lastUpdated: new Date().toISOString(),
        generatedAt: newCoupons.generatedAt,
        version: '1.0.0'
      };

      // Notify Google about coupon updates
      console.log('🎫 Coupons updated, notifying Google Indexing API...');
      try {
        const indexingResults = await notifyCouponUpdates();
        console.log('✅ Google Indexing notification results:', indexingResults);
      } catch (indexingError) {
        console.error('⚠️ Google Indexing notification failed:', indexingError);
      }
    } else {
      // Get coupons with automatic update check
      coupons = await getCouponsWithUpdateCheck();
    }

    return NextResponse.json({
      success: true,
      data: coupons,
      message: force ? 'Coupons force updated successfully' : 'Coupons retrieved successfully'
    });

  } catch (error) {
    console.error('❌ Error in GET /api/update-coupons:', error);
    console.error('❌ Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    // Check if it's a missing API key error
    const isApiKeyError = error instanceof Error && error.message.includes('API key');
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      message: isApiKeyError 
        ? 'API configuration missing. Using fallback data.' 
        : 'Failed to retrieve coupons',
      timestamp: new Date().toISOString(),
      endpoint: 'GET /api/update-coupons'
    }, { status: isApiKeyError ? 503 : 500 });
  }
}

/**
 * POST /api/update-coupons
 * Force update coupons (for cron jobs or manual triggers)
 */
export async function POST(request: NextRequest) {
  console.log('POST /api/update-coupons - Request received');
  
  try {
    // Generate new coupons using Gemini
    console.log('🎫 Generating new coupons...');
    const couponResponse = await generateCoupons();
    
    // Save to local storage
    await saveCoupons(couponResponse);
    
    // Return the updated coupons
    const updatedCoupons = {
      coupons: couponResponse.coupons,
      lastUpdated: new Date().toISOString(),
      generatedAt: couponResponse.generatedAt,
      version: '1.0.0'
    };

    // Notify Google about coupon updates
    console.log('🎫 Coupons updated via POST, notifying Google Indexing API...');
    let indexingResults = null;
    try {
      indexingResults = await notifyCouponUpdates();
      console.log('✅ Google Indexing notification results:', indexingResults);
    } catch (indexingError) {
      console.error('⚠️ Google Indexing notification failed:', indexingError);
    }

    return NextResponse.json({
      success: true,
      data: updatedCoupons,
      message: 'Coupons updated successfully',
      generatedBy: 'Gemini AI',
      googleIndexing: indexingResults,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error in POST /api/update-coupons:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      message: 'Failed to update coupons'
    }, { status: 500 });
  }
}

/**
 * PUT /api/update-coupons
 * Update specific coupon or bulk update
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    // For now, just regenerate all coupons
    // In the future, this could update specific coupons
    const couponResponse = await generateCoupons();
    await saveCoupons(couponResponse);
    
    // Notify Google about coupon updates
    console.log('🎫 Coupons updated via PUT, notifying Google Indexing API...');
    let indexingResults = null;
    try {
      indexingResults = await notifyCouponUpdates();
      console.log('✅ Google Indexing notification results:', indexingResults);
    } catch (indexingError) {
      console.error('⚠️ Google Indexing notification failed:', indexingError);
    }
    
    return NextResponse.json({
      success: true,
      message: 'Coupons updated successfully',
      googleIndexing: indexingResults,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error in PUT /api/update-coupons:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      message: 'Failed to update coupons'
    }, { status: 500 });
  }
}
