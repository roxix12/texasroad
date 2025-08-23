# 🎫 Gemini Coupon Updater

A Node.js script that automatically fetches the latest Texas Roadhouse coupons using Google's Gemini AI and saves them to your Next.js project.

## 🚀 Features

- ✅ **AI-Powered**: Uses Gemini AI to find real, current coupons
- ✅ **Validation**: Ensures all coupons have required fields
- ✅ **Fallback System**: Uses static coupons if AI fails
- ✅ **Daily Updates**: Overwrites old data with fresh coupons
- ✅ **JSON Output**: Saves to `public/data/coupons.json`
- ✅ **Error Handling**: Comprehensive error handling and logging

## 📋 Requirements

- Node.js 16+
- Gemini API key
- `.env.local` file with `GEMINI_API_KEY`

## 🔧 Setup

### 1. Install Dependencies

```bash
npm install @google/generative-ai
```

### 2. Configure Environment

Add to your `.env.local`:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Get Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Create a new API key
3. Copy the key to your `.env.local`

## 🎯 Usage

### Manual Update

```bash
# Update coupons manually
npm run update-coupons

# Or run directly
node scripts/update-coupons.js
```

### Test Coupons

```bash
# Test the generated coupons.json file
node scripts/test-coupons.js
```

### Automated Daily Updates

Add to your `package.json` scripts:

```json
{
  "scripts": {
    "update-coupons": "node scripts/update-coupons.js",
    "update-coupons-daily": "node scripts/update-coupons.js && echo 'Coupons updated at $(date)'"
  }
}
```

## 📊 Output Format

The script creates `public/data/coupons.json`:

```json
{
  "coupons": [
    {
      "type": "percentage",
      "discount": "25% OFF",
      "valid_until": "December 31, 2025",
      "description": "Sitewide discount on all menu items",
      "code": "SAVE25",
      "terms": "Valid on orders $30+. Cannot combine with other offers.",
      "category": "General",
      "minimum_purchase": "$30",
      "verified": "Verified August 2025",
      "last_updated": "2025-08-22T12:00:00.000Z"
    }
  ],
  "metadata": {
    "total_count": 10,
    "last_updated": "2025-08-22T12:00:00.000Z",
    "source": "Gemini AI",
    "version": "1.0.0"
  }
}
```

## 🔍 Validation Rules

Each coupon must have:

- ✅ **type**: "percentage", "dollar", "free", "bogo", "military", "vip"
- ✅ **discount**: Must contain % or OFF (e.g., "25% OFF", "$10 OFF")
- ✅ **valid_until**: Valid date format
- ✅ **description**: Non-empty string

Optional fields:
- **code**: Coupon code (can be null)
- **terms**: Terms and conditions
- **category**: Coupon category
- **minimum_purchase**: Minimum purchase amount

## 🎨 Coupon Types

The script generates various coupon types:

- **Percentage**: "25% OFF", "15% OFF"
- **Dollar**: "$10 OFF", "$5 OFF"
- **Free**: "FREE APPETIZER", "FREE DESSERT"
- **BOGO**: "BUY ONE GET ONE"
- **Military**: Military and veteran discounts
- **VIP**: VIP Club member exclusives

## 🚨 Error Handling

### Common Issues

1. **Missing API Key**:
   ```
   ❌ GEMINI_API_KEY not found in environment variables
   ```

2. **Invalid Response**:
   ```
   ❌ Error fetching from Gemini: Invalid JSON
   ⚠️ Using fallback coupons...
   ```

3. **Validation Errors**:
   ```
   ⚠️ Invalid coupon skipped: [description]
   ```

### Fallback System

If Gemini API fails, the script uses 10 pre-defined fallback coupons:

- 25% OFF sitewide discount
- 20% OFF military discount
- FREE appetizer for VIP members
- 15% OFF first-time customers
- $10 OFF orders over $50
- BOGO entrée deal
- FREE dessert with entrée
- 30% OFF family meals
- $5 OFF app orders
- 10% OFF senior discount

## 📈 Integration with Next.js

### 1. Access in Components

```javascript
// In your Next.js component
import couponData from '@/public/data/coupons.json';

export default function CouponSection() {
  return (
    <div>
      {couponData.coupons.map((coupon, index) => (
        <div key={index}>
          <h3>{coupon.discount}</h3>
          <p>{coupon.description}</p>
          {coupon.code && <code>{coupon.code}</code>}
        </div>
      ))}
    </div>
  );
}
```

### 2. API Route Integration

```javascript
// app/api/coupons/route.js
import { readFile } from 'fs/promises';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await readFile('public/data/coupons.json', 'utf-8');
    const coupons = JSON.parse(data);
    return NextResponse.json(coupons);
  } catch (error) {
    return NextResponse.json({ error: 'Coupons not found' }, { status: 404 });
  }
}
```

## 🔄 Automation

### Cron Job (Linux/Mac)

Add to crontab:

```bash
# Update coupons daily at 8 AM
0 8 * * * cd /path/to/your/project && npm run update-coupons
```

### Windows Task Scheduler

1. Open Task Scheduler
2. Create Basic Task
3. Set trigger to daily at 8 AM
4. Action: Start a program
5. Program: `npm`
6. Arguments: `run update-coupons`
7. Start in: Your project directory

### GitHub Actions

```yaml
# .github/workflows/update-coupons.yml
name: Update Coupons

on:
  schedule:
    - cron: '0 13 * * *'  # Daily at 8 AM Eastern (1 PM UTC)
  workflow_dispatch:  # Manual trigger

jobs:
  update-coupons:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run update-coupons
        env:
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
      - run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add public/data/coupons.json
          git commit -m "Update coupons" || exit 0
          git push
```

## 📊 Monitoring

### Console Output

Successful run:
```
🚀 Starting Gemini Coupon Updater...

🤖 Fetching coupons from Gemini AI...
📦 Received 10 coupons from Gemini
🔍 Validating coupons...
✅ Validated 10 coupons
💾 Saved 10 coupons to public/data/coupons.json

✅ Coupons updated successfully!
📊 Total coupons: 10
📅 Last updated: 8/22/2025, 12:00:00 PM
```

### Log Files

The script logs to console. For production, redirect to log files:

```bash
npm run update-coupons >> logs/coupons.log 2>&1
```

## 🔧 Customization

### Modify Prompt

Edit the prompt in `scripts/update-coupons.js`:

```javascript
const prompt = `
Find the 10 latest valid Texas Roadhouse coupons in the USA...
// Customize your requirements here
`;
```

### Add Validation Rules

Modify the `validateCoupon` function:

```javascript
function validateCoupon(coupon) {
  // Add your custom validation rules
  if (coupon.discount.includes('100%')) {
    return false; // Reject unrealistic discounts
  }
  // ... existing validation
}
```

### Change Output Format

Modify the `formatCoupon` function:

```javascript
function formatCoupon(coupon) {
  return {
    // Add custom fields
    custom_field: 'value',
    // ... existing fields
  };
}
```

## 🚨 Troubleshooting

### API Key Issues

```bash
# Check if API key is set
echo $GEMINI_API_KEY

# Test API key
curl -H "Authorization: Bearer $GEMINI_API_KEY" \
  https://generativelanguage.googleapis.com/v1beta/models
```

### File Permission Issues

```bash
# Ensure write permissions
chmod 755 scripts/update-coupons.js
chmod 755 public/data/
```

### Network Issues

```bash
# Test internet connection
ping google.com

# Test Gemini API endpoint
curl -I https://generativelanguage.googleapis.com/
```

## 📞 Support

For issues:

1. Check the troubleshooting section above
2. Verify your Gemini API key is valid
3. Check network connectivity
4. Review console output for specific errors
5. Test with fallback coupons

---

**🎉 Your coupons are now automatically updated with AI!**
