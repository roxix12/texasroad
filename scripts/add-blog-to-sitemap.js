#!/usr/bin/env node

/**
 * Helper script to add new blog posts to sitemap
 * Usage: node scripts/add-blog-to-sitemap.js "blog-post-slug" "Blog Post Title"
 */

const fs = require('fs');
const path = require('path');

const blogSlug = process.argv[2];
const blogTitle = process.argv[3];

if (!blogSlug) {
  console.error('❌ Please provide a blog slug');
  console.log('Usage: node scripts/add-blog-to-sitemap.js "blog-post-slug" "Blog Post Title"');
  process.exit(1);
}

const sitemapPath = path.join(__dirname, '../app/sitemap.ts');
let sitemapContent = fs.readFileSync(sitemapPath, 'utf8');

// Create the new blog entry
const newBlogEntry = `    {
      url: \`\${siteUrl}/posts/${blogSlug}\`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },`;

// Find the blog section and add the new entry
const blogSectionRegex = /(\/\/ Example: When you create blogs, add them like this:\s*\n)/;

if (sitemapContent.includes('// Example: When you create blogs')) {
  // Replace the comment with the actual blog entry
  sitemapContent = sitemapContent.replace(
    blogSectionRegex,
    `// Blog posts:\n${newBlogEntry}\n`
  );
} else {
  // Add to existing blog entries
  const insertPoint = sitemapContent.indexOf('  ]', sitemapContent.indexOf('const blogUrls'));
  if (insertPoint !== -1) {
    sitemapContent = sitemapContent.slice(0, insertPoint) + newBlogEntry + '\n' + sitemapContent.slice(insertPoint);
  }
}

// Write the updated sitemap
fs.writeFileSync(sitemapPath, sitemapContent);

console.log(`✅ Added blog post "${blogSlug}" to sitemap!`);
console.log(`📝 Title: ${blogTitle || blogSlug}`);
console.log(`🔗 URL: /posts/${blogSlug}`);
console.log(`\n🚀 Don't forget to:`);
console.log(`1. Create the actual blog post file`);
console.log(`2. Commit and push changes`);
console.log(`3. Submit updated sitemap to Google Search Console`);
