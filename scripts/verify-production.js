/**
 * Production Verification Script
 * Tests all critical functionality before deployment
 */

const https = require('https');
const fs = require('fs');

const PRODUCTION_CHECKS = {
  'Environment Variables': checkEnvVars,
  'WordPress GraphQL': checkWordPressAPI,
  'Google APIs': checkGoogleAPIs,
  'Build Configuration': checkBuildConfig,
  'Static Assets': checkStaticAssets
};

async function runProductionChecks() {
  console.log('🔍 Running Production Readiness Checks...\n');
  
  const results = {};
  
  for (const [checkName, checkFunction] of Object.entries(PRODUCTION_CHECKS)) {
    try {
      console.log(`⏳ Checking: ${checkName}`);
      const result = await checkFunction();
      results[checkName] = { status: 'PASS', details: result };
      console.log(`✅ ${checkName}: PASSED\n`);
    } catch (error) {
      results[checkName] = { status: 'FAIL', error: error.message };
      console.log(`❌ ${checkName}: FAILED - ${error.message}\n`);
    }
  }
  
  // Summary
  const totalChecks = Object.keys(results).length;
  const passedChecks = Object.values(results).filter(r => r.status === 'PASS').length;
  
  console.log('📊 PRODUCTION READINESS SUMMARY');
  console.log('='.repeat(50));
  console.log(`✅ Passed: ${passedChecks}/${totalChecks}`);
  console.log(`❌ Failed: ${totalChecks - passedChecks}/${totalChecks}`);
  
  if (passedChecks === totalChecks) {
    console.log('\n🎉 ALL CHECKS PASSED! Ready for production deployment.');
  } else {
    console.log('\n⚠️  Some checks failed. Please fix issues before deployment.');
  }
  
  return results;
}

function checkEnvVars() {
  const requiredVars = [
    'NEXT_PUBLIC_WORDPRESS_API_URL',
    'NEXT_PUBLIC_SITE_NAME', 
    'NEXT_PUBLIC_SITE_URL',
    'GEMINI_API_KEY',
    'GOOGLE_CLIENT_EMAIL',
    'GOOGLE_PRIVATE_KEY'
  ];
  
  const missing = requiredVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(', ')}`);
  }
  
  return `All ${requiredVars.length} required environment variables present`;
}

function checkWordPressAPI() {
  return new Promise((resolve, reject) => {
    const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
    
    if (!apiUrl) {
      reject(new Error('WordPress API URL not configured'));
      return;
    }
    
    const testQuery = {
      query: `
        query TestConnection {
          posts(first: 1) {
            nodes {
              id
              title
            }
          }
        }
      `
    };
    
    const postData = JSON.stringify(testQuery);
    const url = new URL(apiUrl);
    
    const options = {
      hostname: url.hostname,
      port: url.port || 443,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.data && response.data.posts) {
            resolve('WordPress GraphQL connection successful');
          } else {
            reject(new Error('WordPress GraphQL returned unexpected response'));
          }
        } catch (error) {
          reject(new Error(`WordPress GraphQL parse error: ${error.message}`));
        }
      });
    });
    
    req.on('error', (error) => {
      reject(new Error(`WordPress GraphQL connection failed: ${error.message}`));
    });
    
    req.write(postData);
    req.end();
  });
}

function checkGoogleAPIs() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;
  
  if (!clientEmail || !privateKey) {
    throw new Error('Google service account credentials missing');
  }
  
  if (!geminiKey) {
    throw new Error('Gemini API key missing');
  }
  
  // Basic validation of private key format
  if (!privateKey.includes('BEGIN PRIVATE KEY')) {
    throw new Error('Google private key appears to be malformed');
  }
  
  return 'Google API credentials present and properly formatted';
}

function checkBuildConfig() {
  const configs = [
    { file: 'package.json', required: true },
    { file: 'next.config.js', required: true },
    { file: 'vercel.json', required: true },
    { file: 'tailwind.config.js', required: true }
  ];
  
  for (const config of configs) {
    if (!fs.existsSync(config.file)) {
      throw new Error(`Missing required config file: ${config.file}`);
    }
  }
  
  // Check package.json for required scripts
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredScripts = ['build', 'start', 'dev'];
  
  for (const script of requiredScripts) {
    if (!packageJson.scripts[script]) {
      throw new Error(`Missing required script in package.json: ${script}`);
    }
  }
  
  return 'All configuration files present and valid';
}

function checkStaticAssets() {
  const requiredAssets = [
    'public/data/coupons.json',
    'app/globals.css',
    'app/sitemap.ts'
  ];
  
  for (const asset of requiredAssets) {
    if (!fs.existsSync(asset)) {
      throw new Error(`Missing required asset: ${asset}`);
    }
  }
  
  return 'All required static assets present';
}

// Run checks if called directly
if (require.main === module) {
  runProductionChecks().catch(error => {
    console.error('❌ Production check script failed:', error);
    process.exit(1);
  });
}

module.exports = { runProductionChecks };
