# Texas Roadhouse Menu Images

This directory contains images for Texas Roadhouse menu items.

## Image Requirements

### Format & Size
- **Format**: JPG or WebP for best performance
- **Dimensions**: 800x600px (4:3 aspect ratio)
- **File Size**: Under 200KB for fast loading
- **Quality**: High quality food photography

### Naming Convention
- Use descriptive filenames with hyphens
- Example: `cactus-blossom.jpg`, `ribeye-steak.jpg`

## Current Status

Total Images Needed: 35

### By Category:
- **Starters**: 5 images
- **Steaks**: 4 images
- **Ribs**: 1 images
- **Combos**: 1 images
- **Chicken**: 3 images
- **Seafood**: 2 images
- **Burgers**: 3 images
- **Sides**: 5 images
- **Salads**: 2 images
- **Desserts**: 2 images
- **Kids**: 2 images
- **Drinks**: 5 images

## Implementation

Images are automatically loaded in the menu components using Next.js Image optimization:

```tsx
<Image
  src="/menu/cactus-blossom.jpg"
  alt="Cactus Blossom"
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, 33vw"
/>
```

## Adding New Images

1. Place high-quality food images in this directory
2. Use the exact filenames listed in `images-list.json`
3. Images will automatically appear on the menu pages
4. Fallback to placeholder icons if images are missing

## Performance Notes

- Images are automatically optimized by Next.js
- WebP format is preferred for smaller file sizes
- Lazy loading is enabled for better performance
- Responsive sizing based on screen size

---

**Note**: All images should be original or properly licensed for commercial use.
