#!/usr/bin/env node

/**
 * Test Google Indexing API configuration and functionality
 * This will verify if your API key works with texasroadhouse-menus.us
 */

require('dotenv').config({ path: '.env.local' });

async function testGoogleIndexingAPI() {
  console.log('🔍 Testing Google Indexing API Configuration...\n');

  // Check environment variables
  console.log('📋 Checking Environment Variables:');
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://texasroadhouse-menus.us';
  
  // Override with production URL for testing
  const testUrl = 'https://texasroadhouse-menus.us';

  console.log(`   GOOGLE_CLIENT_EMAIL: ${clientEmail ? '✅ Set' : '❌ Missing'}`);
  console.log(`   GOOGLE_PRIVATE_KEY: ${privateKey ? '✅ Set' : '❌ Missing'}`);
  console.log(`   SITE_URL: ${siteUrl}\n`);

  if (!clientEmail || !privateKey) {
    console.log('❌ Google API credentials not configured!\n');
    console.log('🔧 Setup Instructions:');
    console.log('1. Go to Google Cloud Console');
    console.log('2. Create a Service Account with Indexing API access');
    console.log('3. Download the JSON key file');
    console.log('4. Add these to your 
      .env.local:');
    console.log('   GOOGLE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com');
    console.log('   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n"');
    console.log('5. Add the service account email as Owner in Google Search Console\n');
    return false;
  }

  // Test URL notification
  console.log('🚀 Testing URL Notification...');
  
  try {
    // Dynamic import since googleapis might not be installed
    const { google } = await import('googleapis').catch(() => {
      throw new Error('googleapis package not installed. Run: npm install googleapis');
    });

    // Clean up the private key
    const cleanPrivateKey = privateKey
      .replace(/\\n/g, '\n')
      .replace(/^["']|["']$/g, '');

    // Create JWT auth
    const auth = new google.auth.JWT({
      email: clientEmail,
      key: cleanPrivateKey,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    console.log('🔐 Authenticating with Google...');
    await auth.authorize();
    console.log('✅ Authentication successful!\n');

    // Initialize indexing API
    const indexing = google.indexing({
      version: 'v3',
      auth,
    });

    // Test with your production homepage
    console.log(`📤 Testing URL notification for: ${testUrl}`);

    const requestBody = {
      url: testUrl,
      type: 'URL_UPDATED',
    };

    const response = await indexing.urlNotifications.publish({
      requestBody,
    });

    console.log('✅ SUCCESS! Google Indexing API Response:');
    console.log(`   URL: ${response.data.urlNotificationMetadata?.url}`);
    console.log(`   Latest Update: ${response.data.urlNotificationMetadata?.latestUpdate?.url}`);
    console.log(`   Notify Time: ${response.data.urlNotificationMetadata?.latestUpdate?.notifyTime}\n`);

    // Test quota check
    console.log('📊 Checking API quota...');
    try {
      const metadataResponse = await indexing.urlNotifications.getMetadata({
        url: testUrl,
      });
      console.log('✅ Quota check successful - API is working properly!\n');
    } catch (quotaError) {
      console.log('⚠️ Quota check failed, but URL notification worked\n');
    }

    console.log('🎉 Google Indexing API is working correctly!');
    console.log('✅ Your site can now get instant indexing for new content\n');

    console.log('💡 Next Steps:');
    console.log('1. New posts will be automatically submitted to Google');
    console.log('2. Check Google Search Console for indexing status');
    console.log('3. Monitor your indexing quota (200 URLs per day for most sites)');

    return true;

  } catch (error) {
    console.error('❌ Google Indexing API Test Failed:');
    console.error(`   Error: ${error.message}\n`);

    if (error.message.includes('401')) {
      console.log('🔧 Authentication Issue:');
      console.log('1. Check if service account email is added as Owner in Search Console');
      console.log('2. Verify GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY are correct');
      console.log('3. Make sure the service account has Indexing API permissions');
    } else if (error.message.includes('403')) {
      console.log('🔧 Permission Issue:');
      console.log('1. Enable Indexing API in Google Cloud Console');
      console.log('2. Add service account as Owner (not just User) in Search Console');
      console.log('3. Wait a few minutes for permissions to propagate');
    } else if (error.message.includes('429')) {
      console.log('🔧 Rate Limit Issue:');
      console.log('1. You\'ve hit the daily quota (200 requests/day)');
      console.log('2. Try again tomorrow or request quota increase');
    }

    return false;
  }
}

if (require.main === module) {
  testGoogleIndexingAPI().then(success => {
    process.exit(success ? 0 : 1);
  });
}

module.exports = { testGoogleIndexingAPI };
