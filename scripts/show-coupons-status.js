#!/usr/bin/env node

/**
 * Show current coupon status and daily update information
 * Usage: node scripts/show-coupons-status.js
 */

const fs = require('fs').promises;
const path = require('path');

async function showCouponStatus() {
  console.log('🎫 TEXAS ROADHOUSE MENU - COUPON STATUS\n');

  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'coupons.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const couponData = JSON.parse(data);

    // Show metadata
    console.log('📊 SYSTEM STATUS:');
    console.log(`✅ Total Active Coupons: ${couponData.metadata?.total_count || 0}`);
    console.log(`🕒 Last Updated: ${new Date(couponData.metadata?.last_updated || new Date()).toLocaleString()}`);
    console.log(`🤖 Source: ${couponData.metadata?.source || 'Unknown'}`);
    console.log(`📝 Version: ${couponData.metadata?.version || 'Unknown'}`);
    
    // Daily update message
    console.log('\n🔄 DAILY AUTO-UPDATE FEATURE:');
    console.log('✅ This site automatically updates coupons daily using AI');
    console.log('⏰ Updates scheduled: Every day at 8:00 AM UTC');
    console.log('🤖 AI Technology: Google Gemini API');
    console.log('💾 Storage: Local JSON file (public/data/coupons.json)');
    
    // Show active coupons
    console.log('\n🎯 ACTIVE COUPONS:');
    couponData.coupons.forEach((coupon, index) => {
      console.log(`\n${index + 1}. ${coupon.discount}`);
      console.log(`   📝 ${coupon.description}`);
      console.log(`   🏷️  Code: ${coupon.code || 'No code needed'}`);
      console.log(`   ⏳ Valid until: ${coupon.valid_until || 'Ongoing'}`);
      console.log(`   📂 Category: ${coupon.category || 'General'}`);
    });

    // Instructions
    console.log('\n📋 MANUAL COMMANDS:');
    console.log('• Update coupons: npm run update-coupons');
    console.log('• Test coupons: node scripts/test-coupons.js');
    console.log('• View status: node scripts/show-coupons-status.js');
    
    console.log('\n🌐 WEBSITE INTEGRATION:');
    console.log('• Coupons automatically load on homepage');
    console.log('• Daily update banner shows latest information');
    console.log('• Real-time last updated timestamp');
    console.log('• Copy-to-clipboard functionality for codes');

    console.log('\n✨ NEXT AUTOMATIC UPDATE:');
    const now = new Date();
    const nextUpdate = new Date(now);
    nextUpdate.setUTCHours(13, 0, 0, 0); // 1 PM UTC = 8 AM EST
    if (nextUpdate <= now) {
      nextUpdate.setUTCDate(nextUpdate.getUTCDate() + 1);
    }
    console.log(`📅 ${nextUpdate.toLocaleString()} (8 AM Eastern Time - ${Math.ceil((nextUpdate - now) / (1000 * 60 * 60))} hours from now)`);

  } catch (error) {
    console.error('❌ Error reading coupon status:', error.message);
    console.log('\n💡 Run this command to create coupons:');
    console.log('npm run update-coupons');
  }
}

// Run the status check
if (require.main === module) {
  showCouponStatus().catch(console.error);
}

module.exports = { showCouponStatus };
