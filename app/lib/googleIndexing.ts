import { google } from 'googleapis';

export interface GoogleIndexingResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

export interface IndexingNotification {
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
 * Initialize Google Auth with JWT credentials
 */
function getGoogleAuth() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!clientEmail || !privateKey) {
    throw new Error('Google credentials not found in environment variables. Please set GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY in .env.local');
  }

  // Clean up the private key (remove extra quotes and newlines)
  const cleanPrivateKey = privateKey
    .replace(/\\n/g, '\n')
    .replace(/^["']|["']$/g, '');

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: cleanPrivateKey,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });

  return auth;
}

/**
 * Notify Google Indexing API about URL updates
 */
export async function notifyGoogle(url: string): Promise<GoogleIndexingResponse> {
  try {
    console.log('🔍 Starting Google Indexing notification for:', url);

    // Validate URL
    if (!url || !url.startsWith('http')) {
      throw new Error('Invalid URL provided');
    }

    // Get authenticated client
    const auth = getGoogleAuth();
    await auth.authorize();

    console.log('✅ Google authentication successful');

    // Initialize the indexing API
    const indexing = google.indexing({
      version: 'v3',
      auth,
    });

    // Prepare the notification request
    const requestBody = {
      url: url,
      type: 'URL_UPDATED' as const,
    };

    console.log('📤 Sending notification to Google Indexing API:', requestBody);

    // Send the notification
    const response = await indexing.urlNotifications.publish({
      requestBody,
    });

    console.log('✅ Google Indexing API response received:', response.data);

    return {
      success: true,
      message: 'URL successfully submitted to Google for indexing',
      data: response.data,
    };

  } catch (error) {
    console.error('❌ Google Indexing API error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return {
      success: false,
      message: 'Failed to notify Google Indexing API',
      error: errorMessage,
    };
  }
}

/**
 * Notify Google about homepage updates
 */
export async function notifyHomepageUpdate(): Promise<GoogleIndexingResponse> {
  const siteUrl = process.env.SITE_URL || 'https://texasroadhousemenu.me';
  const homepageUrl = siteUrl.endsWith('/') ? siteUrl : `${siteUrl}/`;
  
  console.log('🏠 Notifying Google about homepage update:', homepageUrl);
  return notifyGoogle(homepageUrl);
}

/**
 * Notify Google about coupon page updates
 */
export async function notifyCouponPageUpdate(): Promise<GoogleIndexingResponse> {
  const siteUrl = process.env.SITE_URL || 'https://texasroadhousemenu.me';
  const couponUrl = `${siteUrl}/coupons`;
  
  console.log('🎫 Notifying Google about coupon page update:', couponUrl);
  return notifyGoogle(couponUrl);
}

/**
 * Batch notify multiple URLs
 */
export async function batchNotifyUrls(urls: string[]): Promise<GoogleIndexingResponse[]> {
  console.log('📦 Batch notifying Google for URLs:', urls);
  
  const promises = urls.map(url => notifyGoogle(url));
  const results = await Promise.all(promises);
  
  const successCount = results.filter(result => result.success).length;
  console.log(`✅ Batch notification complete: ${successCount}/${urls.length} successful`);
  
  return results;
}

/**
 * Notify Google about coupon updates (homepage + coupon page)
 */
export async function notifyCouponUpdates(): Promise<{
  homepage: GoogleIndexingResponse;
  couponPage: GoogleIndexingResponse;
}> {
  console.log('🔄 Notifying Google about coupon updates...');
  
  const [homepageResult, couponPageResult] = await Promise.all([
    notifyHomepageUpdate(),
    notifyCouponPageUpdate(),
  ]);

  console.log('📊 Coupon update notifications complete:', {
    homepage: homepageResult.success ? '✅' : '❌',
    couponPage: couponPageResult.success ? '✅' : '❌',
  });

  return {
    homepage: homepageResult,
    couponPage: couponPageResult,
  };
}

/**
 * Validate Google credentials
 */
export async function validateGoogleCredentials(): Promise<boolean> {
  try {
    const auth = getGoogleAuth();
    await auth.authorize();
    console.log('✅ Google credentials are valid');
    return true;
  } catch (error) {
    console.error('❌ Google credentials validation failed:', error);
    return false;
  }
}

/**
 * Get setup instructions for Google Indexing API
 */
export function getSetupInstructions(): string {
  return `
🔧 Google Indexing API Setup Instructions:

1. Go to Google Cloud Console (https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Indexing API:
   - Go to "APIs & Services" > "Library"
   - Search for "Indexing API"
   - Click "Enable"
4. Create a Service Account:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Fill in details and create
5. Generate JSON Key:
   - Click on the service account
   - Go to "Keys" tab
   - Click "Add Key" > "Create New Key" > "JSON"
   - Download the JSON file
6. Add to Google Search Console:
   - Go to Google Search Console
   - Add your property if not already added
   - Go to "Settings" > "Users and permissions"
   - Add the service account email as an owner
7. Set Environment Variables:
   - GOOGLE_CLIENT_EMAIL: from the JSON file
   - GOOGLE_PRIVATE_KEY: from the JSON file (with quotes)
   - SITE_URL: your website URL

Required Environment Variables:
- GOOGLE_CLIENT_EMAIL: Service account email
- GOOGLE_PRIVATE_KEY: Private key from JSON file
- SITE_URL: Your website URL

Note: This API has rate limits (200 requests per day for most sites)
  `;
}
