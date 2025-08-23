#!/usr/bin/env node

/**
 * Test WordPress API connection and latest posts
 * Run this to verify your WordPress integration is working
 */

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://texasroadhousemenu.me/graphql';

async function testWordPressConnection() {
  console.log('🔍 Testing WordPress API connection...\n');
  console.log(`📡 API URL: ${WORDPRESS_API_URL}\n`);

  const query = `
    query TestConnection {
      posts(first: 3, where: { status: PUBLISH }) {
        nodes {
          id
          slug
          title
          date
          excerpt
          seo {
            title
            metaDesc
            fullHead
          }
        }
      }
      generalSettings {
        title
        description
        url
      }
    }
  `;

  try {
    console.log('⏳ Fetching latest posts...');
    
    const response = await fetch(WORDPRESS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Texas-Roadhouse-Menu-Test/1.0'
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.errors) {
      console.error('❌ GraphQL Errors:', result.errors);
      return false;
    }

    if (!result.data) {
      console.error('❌ No data returned');
      return false;
    }

    console.log('✅ WordPress connection successful!\n');
    
    // Display site info
    const siteInfo = result.data.generalSettings;
    console.log('🏠 Site Information:');
    console.log(`   Title: ${siteInfo.title}`);
    console.log(`   Description: ${siteInfo.description}`);
    console.log(`   URL: ${siteInfo.url}\n`);
    
    // Display latest posts
    const posts = result.data.posts.nodes;
    console.log(`📝 Latest ${posts.length} Posts:`);
    
    posts.forEach((post, index) => {
      console.log(`   ${index + 1}. ${post.title}`);
      console.log(`      Slug: ${post.slug}`);
      console.log(`      Date: ${new Date(post.date).toLocaleDateString()}`);
      console.log(`      SEO Title: ${post.seo?.title || 'No SEO title'}`);
      console.log(`      Has fullHead: ${post.seo?.fullHead ? 'Yes' : 'No'}`);
      console.log('');
    });

    console.log('🎉 All tests passed! Your WordPress integration is working correctly.');
    return true;

  } catch (error) {
    console.error('❌ WordPress connection failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Check if WordPress is accessible');
    console.log('   2. Verify GraphQL endpoint is working');
    console.log('   3. Ensure Yoast SEO plugin is installed');
    console.log('   4. Check WPGraphQL plugin is active');
    return false;
  }
}

if (require.main === module) {
  testWordPressConnection().then(success => {
    process.exit(success ? 0 : 1);
  });
}

module.exports = { testWordPressConnection };
