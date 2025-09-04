const fs = require('fs');
const path = require('path');

console.log('🔍 Testing Texas Roadhouse Menu Images...\n');

// Check if all required image files exist
const menuData = JSON.parse(fs.readFileSync('app/data/menus-with-images.json', 'utf8'));
const publicMenuDir = path.join('public', 'menu');

let totalImages = 0;
let foundImages = 0;
let missingImages = [];

console.log('📋 Menu Items with Images:');
console.log('========================\n');

menuData.forEach(item => {
  totalImages++;
  const imagePath = item.featuredImage.node.sourceUrl;
  const fullPath = path.join('public', imagePath);
  
  if (fs.existsSync(fullPath)) {
    foundImages++;
    console.log(`✅ ${item.title}`);
    console.log(`   📁 ${imagePath}`);
    console.log(`   💰 $${item.menuFields.price}`);
    console.log(`   📊 ${item.menuFields.category}\n`);
  } else {
    missingImages.push({
      name: item.title,
      path: imagePath,
      fullPath: fullPath
    });
    console.log(`❌ ${item.title}`);
    console.log(`   📁 MISSING: ${imagePath}\n`);
  }
});

console.log('📊 Summary:');
console.log('===========');
console.log(`✅ Found Images: ${foundImages}/${totalImages}`);
console.log(`❌ Missing Images: ${totalImages - foundImages}`);
console.log(`📈 Success Rate: ${((foundImages / totalImages) * 100).toFixed(1)}%\n`);

if (missingImages.length > 0) {
  console.log('🔧 Missing Images:');
  console.log('==================');
  missingImages.forEach(img => {
    console.log(`- ${img.name}: ${img.path}`);
  });
  console.log('\n💡 Note: Missing images will show placeholders with "Photo coming soon"');
} else {
  console.log('🎉 All images found! Your menu should display perfectly!\n');
}

console.log('🌐 Visit: http://localhost:3002/menus-prices to see your menu with real images!');
