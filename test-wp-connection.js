#!/usr/bin/env node

/**
 * Quick WordPress Connection Test
 * Run this to test if your WordPress GraphQL endpoint is accessible
 */

const https = require('https');
const http = require('http');

// Get WordPress API URL from environment or use default
const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://admin.texasroadhouse-menus.us/graphql';

console.log('🔍 Testing WordPress Connection...');
console.log('📡 API URL:', WORDPRESS_API_URL);
console.log('=====================================\n');

// Simple GraphQL query to test connection
const testQuery = {
  query: `
    query TestConnection {
      generalSettings {
        title
        description
        url
      }
    }
  `
};

function testConnection() {
  const url = new URL(WORDPRESS_API_URL);
  const postData = JSON.stringify(testQuery);
  
  const options = {
    hostname: url.hostname,
    port: url.port || (url.protocol === 'https:' ? 443 : 80),
    path: url.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
      'User-Agent': 'Texas-Roadhouse-Menu-Test/1.0'
    },
    timeout: 10000 // 10 second timeout
  };

  console.log('⏳ Attempting connection...');
  
  const client = url.protocol === 'https:' ? https : http;
  
  const req = client.request(options, (res) => {
    console.log(`📊 Status Code: ${res.statusCode}`);
    console.log(`📋 Headers:`, res.headers);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log('\n📄 Response:');
      try {
        const response = JSON.parse(data);
        if (response.data && response.data.generalSettings) {
          console.log('✅ SUCCESS! WordPress is accessible');
          console.log('🏷️  Site Title:', response.data.generalSettings.title);
          console.log('📝 Description:', response.data.generalSettings.description);
          console.log('🌐 Site URL:', response.data.generalSettings.url);
        } else if (response.errors) {
          console.log('⚠️  GraphQL errors:', response.errors);
        } else {
          console.log('❓ Unexpected response:', response);
        }
      } catch (error) {
        console.log('❌ Invalid JSON response:', data);
      }
    });
  });
  
  req.on('error', (error) => {
    console.log('❌ Connection Error:', error.message);
    console.log('💡 Common causes:');
    console.log('   - WordPress site is down');
    console.log('   - GraphQL endpoint is not enabled');
    console.log('   - Firewall blocking requests');
    console.log('   - DNS resolution issues');
    console.log('   - SSL certificate problems');
  });
  
  req.on('timeout', () => {
    console.log('⏰ Connection timed out after 10 seconds');
    console.log('💡 This usually means:');
    console.log('   - Server is slow to respond');
    console.log('   - Network connectivity issues');
    console.log('   - Server is overloaded');
    req.destroy();
  });
  
  req.write(postData);
  req.end();
}

// Test basic DNS resolution first
const url = new URL(WORDPRESS_API_URL);
console.log(`🔍 Testing DNS resolution for ${url.hostname}...`);

require('dns').lookup(url.hostname, (err, address, family) => {
  if (err) {
    console.log('❌ DNS Resolution Failed:', err.message);
    console.log('💡 Check if the domain exists and is accessible');
    return;
  }
  
  console.log(`✅ DNS OK: ${url.hostname} → ${address} (IPv${family})`);
  console.log('');
  
  // Proceed with connection test
  testConnection();
});
