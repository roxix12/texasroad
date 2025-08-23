# 🚀 Auto-Updating Coupons with Gemini AI + Next.js

This implementation automatically generates fresh Texas Roadhouse coupons daily using Google's Gemini AI, ensuring your homepage always has current content for better SEO.

## 📋 Features

- ✅ **Daily Auto-Updates**: Coupons refresh automatically every 24 hours
- ✅ **Gemini AI Integration**: Uses Google's latest AI to generate realistic coupons
- ✅ **SEO Optimized**: Fresh content signals for Google indexing
- ✅ **Fallback System**: Static coupons if AI fails
- ✅ **Vercel Cron Jobs**: Automated daily updates
- ✅ **Google Indexing API**: Fast indexing of updated content
- ✅ **Local Storage**: JSON-based coupon storage
- ✅ **TypeScript**: Full type safety

## 🔧 Setup Instructions

### 1. Get Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Create a new API key
3. Copy the API key

### 2. Update Environment Variables

Add to your `.env.local`:

```bash
# Gemini AI API for dynamic coupon generation
GEMINI_API_KEY=your_actual_gemini_api_key_here

# Google Indexing API (for fast indexing)
GOOGLE_CLIENT_EMAIL=your_service_account_email@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
SITE_URL=https://texasroadhousemenu.me
```

### 3. Deploy to Vercel

1. Push your code to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

The cron job will automatically run daily at 8 AM Eastern Time.

## 🎯 How It Works

### Daily Flow:
1. **8 AM Eastern**: Vercel cron triggers `/api/update-coupons`
2. **Gemini AI**: Generates 5 fresh, realistic coupons
3. **Local Storage**: Saves to `data/coupons.json`
4. **Homepage**: Displays updated coupons with current date
5. **Google Indexing**: Notifies Google of content updates
6. **SEO Boost**: Fresh content signals improve rankings

### Manual Updates:
- **Force Update**: `GET /api/update-coupons?force=true`
- **Manual Trigger**: `POST /api/update-coupons`
- **Manual Reindex**: `GET /api/reindex`
- **Bulk Reindex**: `PUT /api/reindex` with `{"action": "bulk"}`

## 📊 API Endpoints

### GET `/api/update-coupons`
Retrieves current coupons (auto-updates if stale)

### POST `/api/update-coupons`
Force updates coupons using Gemini AI

### GET `/api/update-coupons?force=true`
Forces immediate coupon regeneration

### GET `/api/reindex`
Manually trigger Google indexing for homepage

### POST `/api/reindex`
Trigger indexing for specific URLs or coupon updates

### PUT `/api/reindex`
Bulk reindex multiple pages

## 🔍 Monitoring

Check your Vercel function logs to monitor:
- ✅ Successful coupon generation
- ⚠️ Fallback to static coupons
- ❌ API errors

## 🎨 Customization

### Modify Coupon Generation:
Edit `app/lib/gemini-coupons.ts` to change:
- Number of coupons generated
- Coupon types and categories
- AI prompt for different styles

### Update Frequency:
Edit `vercel.json` to change cron schedule:
```json
{
  "crons": [
    {
      "path": "/api/update-coupons",
      "schedule": "0 13 * * *"  // Daily at 8 AM Eastern (1 PM UTC)
    }
  ]
}
```

## 🚨 Troubleshooting

### Common Issues:

1. **Gemini API Errors**:
   - Check API key is valid
   - Verify quota limits
   - System falls back to static coupons

2. **Cron Job Not Running**:
   - Check Vercel function logs
   - Verify environment variables
   - Test endpoint manually

3. **Storage Issues**:
   - Check `data/` directory permissions
   - Verify file system access

## 📈 SEO Benefits

- **Fresh Content**: Daily updates signal content freshness
- **Structured Data**: Enhanced JSON-LD schemas
- **Fast Indexing**: Google Indexing API integration
- **Rich Snippets**: FAQ and offer schemas
- **Mobile Optimized**: Responsive design

## 🔮 Future Enhancements

- [x] Google Indexing API integration ✅
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] WordPress REST API integration
- [ ] Advanced coupon analytics
- [ ] A/B testing for coupon effectiveness
- [ ] Social media integration

## 📞 Support

For issues or questions:
1. Check Vercel function logs
2. Test API endpoints manually
3. Verify environment variables
4. Review this documentation

---

**🎉 Your homepage now automatically updates with fresh coupons daily!**
