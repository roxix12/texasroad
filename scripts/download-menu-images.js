#!/usr/bin/env node

/**
 * Menu Image Setup Script
 * 
 * This script creates placeholder images for Texas Roadhouse menu items
 * while we wait for actual food photography.
 */

const fs = require('fs').promises
const path = require('path')

// Menu items that need images
const menuItems = [
  // Starters
  { filename: 'cactus-blossom.jpg', name: 'Cactus Blossom', category: 'Starters' },
  { filename: 'fried-mozzarella.jpg', name: 'Fried Mozzarella', category: 'Starters' },
  { filename: 'rattlesnake-bites.jpg', name: 'Rattlesnake Bites', category: 'Starters' },
  { filename: 'buffalo-wings.jpg', name: 'Boneless Buffalo Wings', category: 'Starters' },
  { filename: 'loaded-sweet-potato.jpg', name: 'Loaded Sweet Potato', category: 'Starters' },
  
  // Steaks
  { filename: 'prime-ribeye.jpg', name: 'USDA Prime Ribeye', category: 'Steaks' },
  { filename: 'choice-sirloin.jpg', name: 'USDA Choice Sirloin', category: 'Steaks' },
  { filename: 'dallas-filet.jpg', name: 'Dallas Filet', category: 'Steaks' },
  { filename: 'ny-strip.jpg', name: 'New York Strip', category: 'Steaks' },
  
  // Ribs & BBQ
  { filename: 'fall-off-ribs.jpg', name: 'Fall-Off-The-Bone Ribs', category: 'Ribs' },
  { filename: 'bbq-combo.jpg', name: 'BBQ Combo', category: 'Combos' },
  
  // Chicken
  { filename: 'grilled-chicken.jpg', name: 'Grilled Chicken', category: 'Chicken' },
  { filename: 'chicken-critters.jpg', name: 'Chicken Critters', category: 'Chicken' },
  { filename: 'herb-crusted-chicken.jpg', name: 'Herb Crusted Chicken', category: 'Chicken' },
  
  // Seafood
  { filename: 'grilled-salmon.jpg', name: 'Grilled Salmon', category: 'Seafood' },
  { filename: 'grilled-shrimp.jpg', name: 'Grilled Shrimp', category: 'Seafood' },
  
  // Burgers
  { filename: 'roadhouse-burger.jpg', name: 'Roadhouse Burger', category: 'Burgers' },
  { filename: 'bbq-bacon-burger.jpg', name: 'BBQ Bacon Cheeseburger', category: 'Burgers' },
  { filename: 'pulled-pork-sandwich.jpg', name: 'Pulled Pork Sandwich', category: 'Burgers' },
  
  // Sides
  { filename: 'seasoned-rice.jpg', name: 'Seasoned Rice', category: 'Sides' },
  { filename: 'mashed-potatoes.jpg', name: 'Mashed Potatoes', category: 'Sides' },
  { filename: 'green-beans.jpg', name: 'Green Beans', category: 'Sides' },
  { filename: 'mac-cheese.jpg', name: 'Mac & Cheese', category: 'Sides' },
  { filename: 'steak-fries.jpg', name: 'Steak Fries', category: 'Sides' },
  
  // Salads
  { filename: 'house-salad.jpg', name: 'House Salad', category: 'Salads' },
  { filename: 'grilled-chicken-salad.jpg', name: 'Grilled Chicken Salad', category: 'Salads' },
  
  // Desserts
  { filename: 'big-ol-brownie.jpg', name: "Big Ol' Brownie", category: 'Desserts' },
  { filename: 'apple-pie.jpg', name: 'Apple Pie', category: 'Desserts' },
  
  // Kids
  { filename: 'kids-burger.jpg', name: 'Kids Burger', category: 'Kids' },
  { filename: 'kids-chicken.jpg', name: 'Kids Chicken', category: 'Kids' },
  
  // Drinks
  { filename: 'legendary-margarita.jpg', name: 'Legendary Margarita', category: 'Drinks' },
  { filename: 'texas-tea.jpg', name: 'Texas Tea', category: 'Drinks' },
  { filename: 'iced-tea.jpg', name: 'Fresh Brewed Iced Tea', category: 'Drinks' },
  { filename: 'coca-cola.jpg', name: 'Coca-Cola Products', category: 'Drinks' },
  { filename: 'fresh-coffee.jpg', name: 'Fresh Coffee', category: 'Drinks' }
]

async function createMenuImageDirectory() {
  try {
    await fs.mkdir('public/menu', { recursive: true })
    console.log('✅ Created public/menu directory')
  } catch (error) {
    console.log('📁 Menu directory already exists')
  }
}

async function createMenuImagesList() {
  console.log('📝 Creating menu images reference...')
  
  const imagesList = {
    lastUpdated: new Date().toISOString(),
    totalImages: menuItems.length,
    categories: {},
    images: menuItems.map(item => ({
      filename: item.filename,
      name: item.name,
      category: item.category,
      path: `/menu/${item.filename}`,
      status: 'placeholder_needed'
    }))
  }

  // Group by category
  menuItems.forEach(item => {
    if (!imagesList.categories[item.category]) {
      imagesList.categories[item.category] = []
    }
    imagesList.categories[item.category].push(item.filename)
  })

  await fs.writeFile(
    'public/menu/images-list.json', 
    JSON.stringify(imagesList, null, 2)
  )
  
  console.log('✅ Created images list at public/menu/images-list.json')
}

async function createPlaceholderReadme() {
  const readmeContent = `# Texas Roadhouse Menu Images

This directory contains images for Texas Roadhouse menu items.

## Image Requirements

### Format & Size
- **Format**: JPG or WebP for best performance
- **Dimensions**: 800x600px (4:3 aspect ratio)
- **File Size**: Under 200KB for fast loading
- **Quality**: High quality food photography

### Naming Convention
- Use descriptive filenames with hyphens
- Example: \`cactus-blossom.jpg\`, \`ribeye-steak.jpg\`

## Current Status

Total Images Needed: ${menuItems.length}

### By Category:
${Object.entries(
  menuItems.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1
    return acc
  }, {})
).map(([category, count]) => `- **${category}**: ${count} images`).join('\n')}

## Implementation

Images are automatically loaded in the menu components using Next.js Image optimization:

\`\`\`tsx
<Image
  src="/menu/cactus-blossom.jpg"
  alt="Cactus Blossom"
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, 33vw"
/>
\`\`\`

## Adding New Images

1. Place high-quality food images in this directory
2. Use the exact filenames listed in \`images-list.json\`
3. Images will automatically appear on the menu pages
4. Fallback to placeholder icons if images are missing

## Performance Notes

- Images are automatically optimized by Next.js
- WebP format is preferred for smaller file sizes
- Lazy loading is enabled for better performance
- Responsive sizing based on screen size

---

**Note**: All images should be original or properly licensed for commercial use.
`

  await fs.writeFile('public/menu/README.md', readmeContent)
  console.log('✅ Created README.md with image guidelines')
}

async function setupMenuImages() {
  console.log('🍽️  Setting up Texas Roadhouse Menu Images')
  console.log('==========================================')
  
  try {
    await createMenuImageDirectory()
    await createMenuImagesList()
    await createPlaceholderReadme()
    
    console.log('')
    console.log('🎉 Menu Images Setup Complete!')
    console.log('==============================')
    console.log(`✅ Directory created: public/menu/`)
    console.log(`✅ Images list: ${menuItems.length} items catalogued`)
    console.log(`✅ Documentation: README.md created`)
    console.log('')
    console.log('📋 Next Steps:')
    console.log('1. Add high-quality food images to public/menu/')
    console.log('2. Use exact filenames from images-list.json')
    console.log('3. Images will automatically appear on menu pages')
    console.log('4. Placeholders will show until real images are added')
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message)
    process.exit(1)
  }
}

// Run setup if called directly
if (require.main === module) {
  setupMenuImages()
}

module.exports = { setupMenuImages, menuItems }
