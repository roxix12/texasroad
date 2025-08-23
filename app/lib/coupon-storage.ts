import { GeneratedCoupon, CouponGenerationResponse } from './gemini-coupons';
import fs from 'fs/promises';
import path from 'path';

const COUPON_FILE_PATH = path.join(process.cwd(), 'public', 'data', 'coupons.json');

export interface StoredCoupons {
  coupons: GeneratedCoupon[];
  metadata: {
    total_count: number;
    last_updated: string;
    source: string;
    version: string;
  };
}

/**
 * Ensure the data directory exists
 */
async function ensureDataDirectory(): Promise<void> {
  const dataDir = path.dirname(COUPON_FILE_PATH);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

/**
 * Save coupons to local JSON file
 */
export async function saveCoupons(couponResponse: CouponGenerationResponse): Promise<void> {
  try {
    await ensureDataDirectory();
    
    const storedData: StoredCoupons = {
      coupons: couponResponse.coupons,
      metadata: {
        total_count: couponResponse.coupons.length,
        last_updated: new Date().toISOString(),
        source: 'Gemini AI',
        version: '1.0.0'
      }
    };

    await fs.writeFile(COUPON_FILE_PATH, JSON.stringify(storedData, null, 2));
    console.log('✅ Coupons saved successfully');
  } catch (error) {
    console.error('❌ Error saving coupons:', error);
    throw error;
  }
}

/**
 * Load coupons from local JSON file
 */
export async function loadCoupons(): Promise<StoredCoupons | null> {
  try {
    const data = await fs.readFile(COUPON_FILE_PATH, 'utf-8');
    const storedData: StoredCoupons = JSON.parse(data);
    
    // Validate the data structure
    if (!storedData.coupons || !Array.isArray(storedData.coupons)) {
      console.warn('⚠️ Invalid coupon data structure, returning null');
      return null;
    }
    
    return storedData;
  } catch (error) {
    console.log('📝 No existing coupon data found, will generate new ones');
    return null;
  }
}

/**
 * Check if coupons need to be updated (older than 24 hours)
 */
export function shouldUpdateCoupons(lastUpdated: string): boolean {
  const lastUpdate = new Date(lastUpdated);
  const now = new Date();
  const hoursSinceUpdate = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60);
  
  return hoursSinceUpdate >= 24;
}

/**
 * Get coupons with automatic update check
 */
export async function getCouponsWithUpdateCheck(): Promise<StoredCoupons> {
  const storedData = await loadCoupons();
  
  if (!storedData) {
    // No stored data, generate new coupons
    const { generateCoupons } = await import('./gemini-coupons');
    const newCoupons = await generateCoupons();
    await saveCoupons(newCoupons);
    
    return {
      coupons: newCoupons.coupons,
      metadata: {
        total_count: newCoupons.coupons.length,
        last_updated: new Date().toISOString(),
        source: 'Gemini AI',
        version: '1.0.0'
      }
    };
  }
  
  // Check if we need to update
  if (shouldUpdateCoupons(storedData.metadata.last_updated)) {
    console.log('🔄 Coupons are stale, generating new ones...');
    const { generateCoupons } = await import('./gemini-coupons');
    const newCoupons = await generateCoupons();
    await saveCoupons(newCoupons);
    
    return {
      coupons: newCoupons.coupons,
      metadata: {
        total_count: newCoupons.coupons.length,
        last_updated: new Date().toISOString(),
        source: 'Gemini AI',
        version: '1.0.0'
      }
    };
  }
  
  return storedData;
}

/**
 * Force update coupons (for manual refresh)
 */
export async function forceUpdateCoupons(): Promise<StoredCoupons> {
  const { generateCoupons } = await import('./gemini-coupons');
  const newCoupons = await generateCoupons();
  await saveCoupons(newCoupons);
  
  return {
    coupons: newCoupons.coupons,
    metadata: {
      total_count: newCoupons.coupons.length,
      last_updated: new Date().toISOString(),
      source: 'Gemini AI',
      version: '1.0.0'
    }
  };
}
