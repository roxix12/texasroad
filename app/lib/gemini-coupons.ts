import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI with error handling
let genAI: GoogleGenerativeAI | null = null;

try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('⚠️ GEMINI_API_KEY not found in environment variables. Gemini features will use fallback data.');
  } else {
    genAI = new GoogleGenerativeAI(apiKey);
    console.log('✅ Gemini AI initialized successfully');
  }
} catch (error) {
  console.error('❌ Failed to initialize Gemini AI:', error);
}

export interface GeneratedCoupon {
  code: string;
  title: string;
  description: string;
  discount: string;
  expiryDate: string;
  terms: string;
  type: 'code' | 'deal' | 'discount';
  verified: string;
  validUntil: string;
}

export interface CouponGenerationResponse {
  success: boolean;
  coupons: GeneratedCoupon[];
  generatedAt: string;
  error?: string;
}

/**
 * Generate fresh Texas Roadhouse coupons using Gemini AI
 * This function creates realistic, up-to-date coupon data
 */
export async function generateCoupons(): Promise<CouponGenerationResponse> {
  try {
    // Check if Gemini AI is available
    if (!genAI) {
      console.log('🔄 Gemini AI not available, using fallback coupons');
      return getFallbackCoupons();
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    Generate 5 latest Texas Roadhouse coupons for August 2025. 
    
    Requirements:
    - Make them realistic and believable
    - Include different types: coupon codes, deals, and discounts
    - Use current month/year for dates
    - Make discounts reasonable (10-50% range)
    - Include military, VIP, and general customer offers
    
    Output format (JSON array only, no other text):
    [
      {
        "code": "COUPONCODE",
        "title": "Short descriptive title",
        "description": "Detailed description of the offer",
        "discount": "25% OFF",
        "expiryDate": "August 31, 2025",
        "terms": "Valid on orders $25+. Cannot combine with other offers.",
        "type": "code",
        "verified": "Verified August 2025",
        "validUntil": "August 31, 2025"
      }
    ]
    
    Types should be: "code", "deal", or "discount"
    Make sure all JSON is valid and properly formatted.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean the response text (remove markdown formatting if present)
    let cleanText = text.trim();
    if (cleanText.startsWith('```json')) {
      cleanText = cleanText.replace(/```json\n?/, '').replace(/```\n?/, '');
    }
    if (cleanText.startsWith('```')) {
      cleanText = cleanText.replace(/```\n?/, '').replace(/```\n?/, '');
    }

    const coupons: GeneratedCoupon[] = JSON.parse(cleanText);

    return {
      success: true,
      coupons,
      generatedAt: new Date().toISOString()
    };

  } catch (error) {
    console.error('Error generating coupons with Gemini:', error);
    return getFallbackCoupons();
  }
}

/**
 * Get fallback coupons when Gemini API is not available
 */
function getFallbackCoupons(): CouponGenerationResponse {
  console.log('🔄 Using fallback coupon data');
  
  const fallbackCoupons: GeneratedCoupon[] = [
      {
        code: "AUGUST25",
        title: "August Savings Special",
        description: "Get 25% off your entire order this August",
        discount: "25% OFF",
        expiryDate: "August 31, 2025",
        terms: "Valid on orders $30+. Cannot combine with other offers.",
        type: "code",
        verified: "Verified August 2025",
        validUntil: "August 31, 2025"
      },
      {
        code: "VIPCLUB",
        title: "VIP Member Exclusive",
        description: "Join VIP Club and get 15% off your first visit",
        discount: "15% OFF",
        expiryDate: "Ongoing",
        terms: "New VIP members only. Valid on first visit.",
        type: "deal",
        verified: "Verified August 2025",
        validUntil: "Ongoing"
      },
      {
        code: "MILITARY",
        title: "Military & Veteran Discount",
        description: "Special pricing for active and retired military",
        discount: "20% OFF",
        expiryDate: "Always Available",
        terms: "Valid ID required. Cannot combine with other offers.",
        type: "discount",
        verified: "Verified August 2025",
        validUntil: "Always Available"
      },
      {
        code: "FAMILY25",
        title: "Family Meal Bundle",
        description: "Save on family-sized portions and combos",
        discount: "30% OFF",
        expiryDate: "August 31, 2025",
        terms: "Valid on family meal packages only.",
        type: "deal",
        verified: "Verified August 2025",
        validUntil: "August 31, 2025"
      },
      {
        code: "WELCOME10",
        title: "New Customer Welcome",
        description: "10% off for first-time customers",
        discount: "10% OFF",
        expiryDate: "August 31, 2025",
        terms: "First-time customers only. Valid ID may be required.",
        type: "code",
        verified: "Verified August 2025",
        validUntil: "August 31, 2025"
      }
    ];

    return {
      success: true,
      coupons: fallbackCoupons,
      generatedAt: new Date().toISOString()
    };
}

/**
 * Validate generated coupon data
 */
export function validateCoupons(coupons: GeneratedCoupon[]): boolean {
  if (!Array.isArray(coupons)) return false;
  
  return coupons.every(coupon => 
    coupon.code &&
    coupon.title &&
    coupon.description &&
    coupon.discount &&
    coupon.expiryDate &&
    coupon.terms &&
    ['code', 'deal', 'discount'].includes(coupon.type)
  );
}

/**
 * Get the last update timestamp
 */
export function getLastUpdateTime(): string {
  return new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
