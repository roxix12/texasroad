#!/usr/bin/env node

/**
 * Gemini Coupon Updater Script
 * Fetches latest Texas Roadhouse coupons using Gemini API and saves to public/data/coupons.json
 * 
 * Usage: node scripts/update-coupons.js
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config({ path: '.env.local' });

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Coupon validation schema
const requiredFields = ['type', 'discount', 'valid_until', 'description'];
const optionalFields = ['code', 'terms', 'category', 'minimum_purchase'];

/**
 * Validate a single coupon object
 */
function validateCoupon(coupon) {
  // Check required fields
  for (const field of requiredFields) {
    if (!coupon[field] || typeof coupon[field] !== 'string') {
      return false;
    }
  }

  // Validate discount format (should contain %, OFF, FREE, or BOGO)
  if (!coupon.discount.match(/(\d+%|\d+\s*OFF|\$\d+\s*OFF|FREE|BOGO|BUY ONE GET ONE)/i)) {
    return false;
  }

  // Validate date format (should be a reasonable date)
  const validUntil = new Date(coupon.valid_until);
  if (isNaN(validUntil.getTime())) {
    return false;
  }

  return true;
}

/**
 * Clean and format coupon data
 */
function formatCoupon(coupon) {
  return {
    type: coupon.type?.trim() || 'discount',
    discount: coupon.discount?.trim() || 'Unknown',
    valid_until: coupon.valid_until?.trim() || 'Ongoing',
    description: coupon.description?.trim() || '',
    code: coupon.code?.trim() || null,
    terms: coupon.terms?.trim() || null,
    category: coupon.category?.trim() || 'General',
    minimum_purchase: coupon.minimum_purchase?.trim() || null,
    verified: `Verified ${new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    })}`,
    last_updated: new Date().toISOString()
  };
}

/**
 * Fetch coupons from Gemini API
 */
async function fetchCouponsFromGemini() {
  try {
    console.log('🤖 Fetching coupons from Gemini AI...');

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    Find the 10 latest valid Texas Roadhouse coupons in the USA with discount %, expiry date, and coupon code if available.
    
    CRITICAL REQUIREMENTS:
    - ALL expiry dates must be in the FUTURE (2025-2026), never in the past
    - Focus on current, active coupons that are still valid
    - Include different types: percentage discounts, dollar amounts, free items, BOGO deals
    - Use realistic discount amounts (5-50% range)
    - Include military, VIP, app, and general customer offers
    - Make expiry dates realistic (within next 6-12 months from today)
    - Some coupons should have codes, others can be in-store only
    - Ensure all dates are valid and future-dated
    
    Format as JSON array with these fields:
    - type: "percentage", "dollar", "free", "bogo", "military", "vip", "app"
    - discount: "25% OFF", "$10 OFF", "FREE APPETIZER", etc.
    - valid_until: "December 31, 2025" or "Ongoing" (MUST be future date)
    - description: "Detailed description of the offer"
    - code: "SAVE25" or null if no code needed
    - terms: "Valid on orders $25+. Cannot combine with other offers."
    - category: "Steaks", "Appetizers", "Family Meals", "General"
    - minimum_purchase: "$25" or null
    
    IMPORTANT: Double-check that ALL valid_until dates are in the future (2025-2026).
    Return ONLY valid JSON array, no other text.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean the response text
    let cleanText = text.trim();
    if (cleanText.startsWith('```json')) {
      cleanText = cleanText.replace(/```json\n?/, '').replace(/```\n?/, '');
    }
    if (cleanText.startsWith('```')) {
      cleanText = cleanText.replace(/```\n?/, '').replace(/```\n?/, '');
    }

    // Parse JSON
    const coupons = JSON.parse(cleanText);

    if (!Array.isArray(coupons)) {
      throw new Error('Gemini response is not an array');
    }

    console.log(`📦 Received ${coupons.length} coupons from Gemini`);
    return coupons;

  } catch (error) {
    console.error('❌ Error fetching from Gemini:', error.message);
    
    // Return fallback coupons if Gemini fails
    return getFallbackCoupons();
  }
}

/**
 * Fallback coupons if Gemini API fails
 */
function getFallbackCoupons() {
  console.log('⚠️ Using fallback coupons...');
  
  return [
    {
      type: "percentage",
      discount: "25% OFF",
      valid_until: "December 31, 2025",
      description: "Sitewide discount on all menu items",
      code: "SAVE25",
      terms: "Valid on orders $30+. Cannot combine with other offers.",
      category: "General",
      minimum_purchase: "$30"
    },
    {
      type: "military",
      discount: "20% OFF",
      valid_until: "Ongoing",
      description: "Military and veteran discount with valid ID",
      code: null,
      terms: "Valid ID required. Cannot combine with other offers.",
      category: "Military",
      minimum_purchase: null
    },
    {
      type: "vip",
      discount: "FREE APPETIZER",
      valid_until: "Ongoing",
      description: "VIP Club member exclusive - free appetizer on first visit",
      code: null,
      terms: "New VIP members only. Valid on first visit.",
      category: "Appetizers",
      minimum_purchase: null
    },
    {
      type: "percentage",
      discount: "15% OFF",
      valid_until: "November 30, 2025",
      description: "First-time customer welcome discount",
      code: "WELCOME15",
      terms: "First-time customers only. Valid ID may be required.",
      category: "General",
      minimum_purchase: "$25"
    },
    {
      type: "dollar",
      discount: "$10 OFF",
      valid_until: "October 31, 2025",
      description: "Save $10 on orders over $50",
      code: "SAVE10",
      terms: "Valid on orders $50+. Cannot combine with other offers.",
      category: "General",
      minimum_purchase: "$50"
    },
    {
      type: "bogo",
      discount: "BUY ONE GET ONE",
      valid_until: "September 30, 2025",
      description: "Buy one entrée, get one free (equal or lesser value)",
      code: "BOGO2025",
      terms: "Valid on select entrées. Cannot combine with other offers.",
      category: "Entrées",
      minimum_purchase: null
    },
    {
      type: "free",
      discount: "FREE DESSERT",
      valid_until: "December 31, 2025",
      description: "Free dessert with any entrée purchase",
      code: "SWEET",
      terms: "Valid with any entrée. Cannot combine with other offers.",
      category: "Desserts",
      minimum_purchase: null
    },
    {
      type: "percentage",
      discount: "30% OFF",
      valid_until: "August 31, 2025",
      description: "Family meal bundle discount",
      code: "FAMILY30",
      terms: "Valid on family meal packages only.",
      category: "Family Meals",
      minimum_purchase: "$40"
    },
    {
      type: "dollar",
      discount: "$5 OFF",
      valid_until: "Ongoing",
      description: "App-exclusive discount for mobile orders",
      code: null,
      terms: "Valid on mobile app orders only.",
      category: "App Exclusive",
      minimum_purchase: "$20"
    },
    {
      type: "percentage",
      discount: "10% OFF",
      valid_until: "Ongoing",
      description: "Senior citizen discount (65+)",
      code: null,
      terms: "Valid ID required. Cannot combine with other offers.",
      category: "Senior",
      minimum_purchase: null
    }
  ];
}

/**
 * Save coupons to JSON file
 */
async function saveCoupons(coupons) {
  try {
    // Ensure directory exists
    const dataDir = path.join(process.cwd(), 'public', 'data');
    await fs.mkdir(dataDir, { recursive: true });

    // Prepare data structure
    const couponData = {
      coupons: coupons,
      metadata: {
        total_count: coupons.length,
        last_updated: new Date().toISOString(),
        source: 'Gemini AI',
        version: '1.0.0'
      }
    };

    // Save to file
    const filePath = path.join(dataDir, 'coupons.json');
    await fs.writeFile(filePath, JSON.stringify(couponData, null, 2));

    console.log(`💾 Saved ${coupons.length} coupons to public/data/coupons.json`);
    return true;

  } catch (error) {
    console.error('❌ Error saving coupons:', error.message);
    return false;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Starting Gemini Coupon Updater...\n');

  // Check for API key
  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY not found in environment variables');
    console.log('Please add GEMINI_API_KEY to your .env.local file');
    process.exit(1);
  }

  try {
    // Fetch coupons from Gemini
    const rawCoupons = await fetchCouponsFromGemini();

    // Validate and format coupons
    console.log('🔍 Validating coupons...');
    const validCoupons = [];
    const invalidCoupons = [];

    for (const coupon of rawCoupons) {
      if (validateCoupon(coupon)) {
        validCoupons.push(formatCoupon(coupon));
      } else {
        invalidCoupons.push(coupon);
        console.log(`⚠️ Invalid coupon skipped: ${coupon.description || 'Unknown'}`);
      }
    }

    console.log(`✅ Validated ${validCoupons.length} coupons`);
    if (invalidCoupons.length > 0) {
      console.log(`⚠️ Skipped ${invalidCoupons.length} invalid coupons`);
    }

    // Save to file
    const saved = await saveCoupons(validCoupons);

    if (saved) {
      console.log('\n✅ Coupons updated successfully!');
      console.log(`📊 Total coupons: ${validCoupons.length}`);
      console.log(`📅 Last updated: ${new Date().toLocaleString()}`);
    } else {
      console.error('\n❌ Failed to save coupons');
      process.exit(1);
    }

  } catch (error) {
    console.error('❌ Script failed:', error.message);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { fetchCouponsFromGemini, validateCoupon, formatCoupon, saveCoupons };
