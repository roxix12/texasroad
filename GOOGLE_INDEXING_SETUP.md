# 🔍 Google Indexing API Setup Guide

This guide will help you set up Google Indexing API for fast indexing of your Texas Roadhouse Menu website.

## 📋 Prerequisites

- Google Cloud Console account
- Google Search Console access
- Your website verified in Search Console

## 🚀 Step-by-Step Setup

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Note your **Project ID** (you'll need this later)

### 2. Enable Indexing API

1. In Google Cloud Console, go to **APIs & Services** > **Library**
2. Search for **"Indexing API"**
3. Click on **Indexing API**
4. Click **Enable**

### 3. Create Service Account

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **Service Account**
3. Fill in the details:
   - **Service account name**: `texas-roadhouse-indexing`
   - **Service account ID**: `texas-roadhouse-indexing-api`
   - **Description**: `Service account for Google Indexing API`
4. Click **Create and Continue**
5. Skip role assignment (click **Continue**)
6. Click **Done**

### 4. Generate JSON Key

1. Click on your newly created service account
2. Go to **Keys** tab
3. Click **Add Key** > **Create New Key**
4. Select **JSON** format
5. Click **Create**
6. Download the JSON file (keep it secure!)

### 5. Add Service Account to Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select your property (or add it if not already added)
3. Go to **Settings** > **Users and permissions**
4. Click **Add User**
5. Enter the **Client Email** from your JSON file
6. Set role to **Owner**
7. Click **Add**

### 6. Configure Environment Variables

Add these to your `.env.local`:

```bash
# Google Indexing API
GOOGLE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
SITE_URL=https://texasroadhousemenu.me
```

**Important**: 
- Copy the `client_email` from your JSON file
- Copy the `private_key` from your JSON file (keep the quotes and `\n` characters)
- Replace `your-service-account@project.iam.gserviceaccount.com` with your actual service account email

### 7. Test the Integration

Run the test script:

```bash
node scripts/test-google-indexing.js
```

## 🔧 API Endpoints

### Manual Reindexing

```bash
# Reindex homepage
curl http://localhost:3001/api/reindex

# Reindex specific URLs
curl -X POST http://localhost:3001/api/reindex \
  -H "Content-Type: application/json" \
  -d '{"urls": ["https://texasroadhousemenu.me/", "https://texasroadhousemenu.me/coupons"]}'

# Reindex coupon pages
curl -X POST http://localhost:3001/api/reindex \
  -H "Content-Type: application/json" \
  -d '{"type": "coupons"}'

# Bulk reindex
curl -X PUT http://localhost:3001/api/reindex \
  -H "Content-Type: application/json" \
  -d '{"action": "bulk"}'
```

### Automatic Reindexing

The system automatically notifies Google when:
- Coupons are updated via `/api/update-coupons`
- Daily cron job runs (8 AM Eastern Time)
- Manual force updates are triggered

## 📊 Monitoring

### Console Logs

Look for these log messages:

```
🔍 Starting Google Indexing notification for: https://texasroadhousemenu.me/
✅ Google authentication successful
📤 Sending notification to Google Indexing API
✅ Google Indexing API response received
```

### API Responses

Successful response:
```json
{
  "success": true,
  "message": "URL successfully submitted to Google for indexing",
  "data": {
    "urlNotificationMetadata": {
      "latestUpdate": {
        "url": "https://texasroadhousemenu.me/",
        "type": "URL_UPDATED",
        "notifyTime": "2025-08-22T12:00:00.000Z"
      }
    }
  }
}
```

## 🚨 Troubleshooting

### Common Issues

1. **403 Forbidden Error**
   - Service account not added to Search Console
   - Indexing API not enabled
   - Incorrect permissions

2. **Authentication Failed**
   - Check `GOOGLE_CLIENT_EMAIL` format
   - Verify `GOOGLE_PRIVATE_KEY` includes quotes and `\n`
   - Ensure JSON key file is valid

3. **Rate Limit Exceeded**
   - Indexing API has 200 requests/day limit
   - Implement request throttling if needed

### Debug Steps

1. **Validate Credentials**:
   ```bash
   node scripts/test-google-indexing.js
   ```

2. **Check Environment Variables**:
   ```bash
   echo $GOOGLE_CLIENT_EMAIL
   echo $GOOGLE_PRIVATE_KEY
   ```

3. **Verify Search Console**:
   - Ensure service account is added as Owner
   - Check property verification status

## 📈 Benefits

- **Faster Indexing**: URLs indexed within hours instead of days
- **Fresh Content**: Google knows when your content updates
- **Better SEO**: Improved crawl efficiency
- **Automated**: No manual intervention needed

## 🔒 Security Notes

- Keep your JSON key file secure
- Never commit credentials to version control
- Use environment variables in production
- Rotate keys periodically

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Verify all setup steps are completed
3. Test with the provided test script
4. Check Google Cloud Console logs
5. Review Search Console for indexing status

---

**🎉 Your website now has fast Google indexing!**
