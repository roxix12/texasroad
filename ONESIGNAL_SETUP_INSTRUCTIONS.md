# OneSignal Push Notifications Setup Guide
## Texas Roadhouse Menus - Complete Integration

### 🚀 **OVERVIEW**
This setup enables automatic push notifications for your headless WordPress + Next.js website. Users will receive notifications when new blog posts are published.

---

## 📱 **1. FRONTEND (Next.js) - COMPLETED**

### ✅ Files Updated/Created:
- `app/layout.tsx` - OneSignal SDK integration with custom styling
- `public/OneSignalSDKWorker.js` - Service worker file
- `public/OneSignalSDKUpdaterWorker.js` - Service worker updater

### ✅ Features Implemented:
- **Auto-prompt**: Users see notification permission popup after 20 seconds
- **Custom styling**: Texas Roadhouse red theme (#dc2626)
- **Welcome notification**: Sent when users first subscribe
- **Notification button**: Bottom-right corner subscription management
- **Production ready**: Proper Next.js Script components with afterInteractive strategy

---

## 🔧 **2. WORDPRESS BACKEND SETUP**

### Step 1: Get Your OneSignal REST API Key
1. Go to [OneSignal Dashboard](https://app.onesignal.com)
2. Select your app: **Texas Roadhouse Menu Updates**
3. Go to **Settings** → **Keys & IDs**
4. Copy your **REST API Key** (not the App ID)

### Step 2: Install WordPress Integration
Choose **ONE** of these methods:

#### **Option A: Add to functions.php (Recommended)**
1. Access your WordPress admin panel
2. Go to **Appearance** → **Theme Editor**
3. Select **functions.php**
4. Copy the entire content from `wordpress-onesignal-integration.php`
5. Paste it at the end of your functions.php file
6. Save the file

#### **Option B: Create a Custom Plugin**
1. Create a new file: `/wp-content/plugins/texas-roadhouse-onesignal/texas-roadhouse-onesignal.php`
2. Add this header to the top of the file:
```php
<?php
/**
 * Plugin Name: Texas Roadhouse OneSignal Integration
 * Description: Automatic push notifications for new blog posts
 * Version: 1.0.0
 * Author: Texas Roadhouse Menus
 */
```
3. Copy the rest of the content from `wordpress-onesignal-integration.php`
4. Activate the plugin in **Plugins** → **Installed Plugins**

### Step 3: Configure the Integration
1. In WordPress admin, go to **Settings** → **OneSignal Push**
2. Enter your **REST API Key** (from Step 1)
3. Click **Save Changes**
4. Test by clicking **Send Test Notification**

---

## 🧪 **3. TESTING GUIDE**

### Frontend Testing:
1. Visit `https://texasroadhouse-menus.us`
2. Wait 20 seconds - you should see a notification permission popup
3. Click **Allow** to subscribe
4. Check bottom-right corner for the red notification bell icon
5. You should receive a welcome notification

### Backend Testing:
1. In WordPress admin, go to **Settings** → **OneSignal Push**
2. Click **Send Test Notification**
3. All subscribed users should receive the test notification
4. Create and publish a new blog post
5. Check that the notification was sent (post editor will show status)

### Troubleshooting:
- **No popup appears**: Check browser console for JavaScript errors
- **Notifications not sending**: Verify REST API key in WordPress settings
- **Service worker errors**: Ensure both worker files are accessible at `/OneSignalSDKWorker.js` and `/OneSignalSDKUpdaterWorker.js`

---

## ⚙️ **4. CONFIGURATION OPTIONS**

### Notification Customization:
Edit the `$notification_data` array in the WordPress integration to customize:
- **Headings**: Notification title
- **Contents**: Notification message
- **URL**: Click destination
- **Icons**: Notification images
- **Buttons**: Action buttons

### Auto-prompt Settings:
In `app/layout.tsx`, modify the `promptOptions` to change:
- **Delay**: Time before showing permission popup
- **Page views**: Number of page visits before prompting
- **Message text**: Custom permission request text

### Styling:
Update the `colors` object in `app/layout.tsx` to match your brand:
```javascript
colors: {
  'circle.background': '#dc2626',  // Texas Roadhouse red
  'circle.foreground': 'white',
  'badge.background': '#dc2626',
  // ... more options
}
```

---

## 📊 **5. MONITORING & ANALYTICS**

### OneSignal Dashboard:
- **Delivery Reports**: Track notification open rates
- **Audience**: See subscriber count and segments  
- **Messages**: View sent notification history

### WordPress Admin:
- **Post Meta Box**: Shows notification status for each post
- **Settings Page**: Send test notifications and view configuration
- **Error Logs**: Check WordPress error logs for API issues

---

## 🔒 **6. SECURITY NOTES**

### API Key Protection:
- REST API key is stored securely in WordPress options
- Never expose REST API key in frontend code
- Use WordPress nonces for admin actions

### Service Worker Security:
- Service workers only load from HTTPS (production)
- OneSignal CDN provides secure, cached worker files
- Local development supports localhost as secure origin

---

## 🚀 **7. DEPLOYMENT CHECKLIST**

### Before Going Live:
- [ ] REST API key configured in WordPress
- [ ] Test notification sent successfully
- [ ] Service worker files accessible
- [ ] Permission popup appears on frontend
- [ ] New post triggers notification
- [ ] Welcome notification works
- [ ] Notification button visible and functional

### Post-Launch:
- [ ] Monitor delivery rates in OneSignal dashboard
- [ ] Check WordPress error logs for API issues
- [ ] Test notification sending with real blog posts
- [ ] Verify cross-browser compatibility
- [ ] Monitor subscriber growth

---

## 🆘 **8. SUPPORT & TROUBLESHOOTING**

### Common Issues:

**"No subscribers found"**
- Users need to visit the site and allow notifications first
- Check that the permission popup is appearing
- Verify service worker files are loading

**"API key invalid"**
- Double-check the REST API key in WordPress settings
- Ensure you're using REST API key, not App ID
- Check for extra spaces or characters

**"Service worker not found"**
- Verify files exist at `/public/OneSignalSDKWorker.js`
- Check that files contain the importScripts line
- Clear browser cache and try again

### Getting Help:
- OneSignal Documentation: https://documentation.onesignal.com/
- WordPress error logs: `/wp-content/debug.log`
- Browser developer tools: Console and Network tabs
- OneSignal Support: https://onesignal.com/support

---

## 🎯 **EXPECTED RESULTS**

✅ **User Experience:**
- Visitors see a friendly notification permission request
- Subscribers receive instant notifications for new blog posts
- Clean, branded notification button for managing preferences

✅ **Admin Experience:**  
- Automatic notifications when publishing posts
- Easy configuration through WordPress admin
- Clear status indicators and testing tools

✅ **Performance:**
- Fast loading with Next.js Script optimization
- Minimal impact on page speed
- Reliable delivery through OneSignal infrastructure

---

**🔥 Your Texas Roadhouse menu website now has professional-grade push notifications!**
