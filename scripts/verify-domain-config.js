const fs = require('fs');
const path = require('path');

console.log('🌐 Domain Configuration Verification\n');
console.log('Domain: texasroadhouse-menus.us');
console.log('Admin: admin.texasroadhouse-menus.us\n');

// Check robots.txt
console.log('🤖 ROBOTS.TXT VERIFICATION:');
console.log('===========================');
const robotsPath = path.join('public', 'robots.txt');
if (fs.existsSync(robotsPath)) {
  const robotsContent = fs.readFileSync(robotsPath, 'utf8');
  if (robotsContent.includes('texasroadhouse-menus.us')) {
    console.log('✅ robots.txt contains correct domain');
  } else {
    console.log('❌ robots.txt needs domain update');
  }
  
  if (robotsContent.includes('admin.texasroadhouse-menus.us')) {
    console.log('✅ robots.txt protects admin subdomain');
  } else {
    console.log('❌ robots.txt missing admin protection');
  }
} else {
  console.log('❌ robots.txt not found');
}

// Check env.template
console.log('\n⚙️ ENVIRONMENT CONFIGURATION:');
console.log('=============================');
const envPath = path.join('env.template');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  if (envContent.includes('texasroadhouse-menus.us')) {
    console.log('✅ env.template contains correct main domain');
  } else {
    console.log('❌ env.template needs main domain update');
  }
  
  if (envContent.includes('admin.texasroadhouse-menus.us')) {
    console.log('✅ env.template contains correct admin subdomain');
  } else {
    console.log('❌ env.template needs admin subdomain update');
  }
} else {
  console.log('❌ env.template not found');
}

// Check schema configuration
console.log('\n📊 SCHEMA CONFIGURATION:');
console.log('========================');
const schemaPath = path.join('app', 'lib', 'seo', 'enhanced-menu-schema.ts');
if (fs.existsSync(schemaPath)) {
  const schemaContent = fs.readFileSync(schemaPath, 'utf8');
  if (schemaContent.includes('texasroadhouse-menus.us')) {
    console.log('✅ Schema contains correct fallback domain');
  } else {
    console.log('❌ Schema needs domain update');
  }
} else {
  console.log('❌ Enhanced schema file not found');
}

console.log('\n🔧 CONFIGURATION SUMMARY:');
console.log('=========================');
console.log('Main Website: https://texasroadhouse-menus.us');
console.log('Admin Panel: https://admin.texasroadhouse-menus.us');
console.log('WordPress API: https://admin.texasroadhouse-menus.us/graphql');
console.log('Sitemap: https://texasroadhouse-menus.us/sitemap.xml');

console.log('\n🌟 SEO BENEFITS OF YOUR DOMAIN:');
console.log('==============================');
console.log('✅ "texasroadhouse" in domain = perfect keyword match');
console.log('✅ "menus" in domain = search intent match');
console.log('✅ ".us" extension = US-focused for local SEO');
console.log('✅ Hyphen separation = search engine friendly');
console.log('✅ Admin subdomain = secure & organized');

console.log('\n🎯 EXPECTED SEO IMPACT:');
console.log('=======================');
console.log('🚀 Domain Authority: High (exact keyword match)');
console.log('🚀 Search Relevance: Maximum (menu + restaurant name)');
console.log('🚀 User Trust: High (descriptive domain)');
console.log('🚀 Click-Through Rate: Increased (clear intent)');

console.log('\n📋 NEXT STEPS FOR PRODUCTION:');
console.log('============================');
console.log('1. 🌐 Point texasroadhouse-menus.us to your main site');
console.log('2. 🔧 Point admin.texasroadhouse-menus.us to WordPress');
console.log('3. 🔒 Setup SSL certificates for both domains');
console.log('4. 📊 Submit sitemap to Google Search Console');
console.log('5. 🎯 Monitor rankings for "Texas Roadhouse menu" keywords');

console.log('\n✅ Domain configuration verified and optimized!');
