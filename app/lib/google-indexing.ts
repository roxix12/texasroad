/**
 * Google Indexing API Helper
 * For fast indexing of updated content
 */

export interface IndexingRequest {
  url: string;
  type: 'URL_UPDATED' | 'URL_DELETED';
}

export interface IndexingResponse {
  success: boolean;
  message: string;
  urlNotificationMetadata?: {
    latestUpdate?: {
      url: string;
      type: string;
      notifyTime: string;
    };
    oldestPending?: {
      url: string;
      type: string;
      notifyTime: string;
    };
  };
}

/**
 * Send URL to Google for indexing
 * Note: This requires Google Search Console setup and proper authentication
 */
export async function notifyGoogleIndexing(
  url: string, 
  type: 'URL_UPDATED' | 'URL_DELETED' = 'URL_UPDATED'
): Promise<IndexingResponse> {
  try {
    // Check if we have the required environment variables
    if (!process.env.GOOGLE_INDEXING_ACCESS_TOKEN) {
      console.warn('⚠️ Google Indexing API access token not configured');
      return {
        success: false,
        message: 'Google Indexing API not configured'
      };
    }

    const response = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GOOGLE_INDEXING_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url,
        type: type
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Google Indexing API error:', errorText);
      
      return {
        success: false,
        message: `Google Indexing API error: ${response.status} ${response.statusText}`
      };
    }

    const data = await response.json();
    
    return {
      success: true,
      message: 'URL submitted to Google for indexing',
      urlNotificationMetadata: data.urlNotificationMetadata
    };

  } catch (error) {
    console.error('❌ Error notifying Google Indexing API:', error);
    
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Notify Google about homepage updates
 */
export async function notifyHomepageUpdate(): Promise<IndexingResponse> {
  const homepageUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://texasroadhousemenu.me';
  return notifyGoogleIndexing(homepageUrl, 'URL_UPDATED');
}

/**
 * Notify Google about coupon page updates
 */
export async function notifyCouponPageUpdate(): Promise<IndexingResponse> {
  const couponUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://texasroadhousemenu.me'}/coupons`;
  return notifyGoogleIndexing(couponUrl, 'URL_UPDATED');
}

/**
 * Batch notify multiple URLs
 */
export async function batchNotifyUrls(urls: string[]): Promise<IndexingResponse[]> {
  const promises = urls.map(url => notifyGoogleIndexing(url, 'URL_UPDATED'));
  return Promise.all(promises);
}

/**
 * Setup instructions for Google Indexing API
 */
export function getSetupInstructions(): string {
  return `
🔧 Google Indexing API Setup Instructions:

1. Go to Google Search Console (https://search.google.com/search-console)
2. Add your property if not already added
3. Go to Settings > API Access
4. Create a new service account or use existing one
5. Download the JSON key file
6. Set the GOOGLE_INDEXING_ACCESS_TOKEN environment variable

Required Environment Variables:
- GOOGLE_INDEXING_ACCESS_TOKEN: Your Google API access token

Note: This API has rate limits (200 requests per day for most sites)
  `;
}
