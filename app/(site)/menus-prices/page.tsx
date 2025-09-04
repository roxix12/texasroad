import { Metadata } from 'next'
import { generatePageSEO } from '@/lib/seo-config'
import { generateMenuPageSchema } from '@/lib/seo/menu-schema'
import { generateEnhancedMenuSchema } from '@/lib/seo/enhanced-menu-schema'
import MenusPricesContent from './content'

// Import the complete menu data with ALL 74 images
import { menuData } from '../../data/complete-menu-74.js'

// Transform the menu data to match the component interface
const menuItems = menuData.map(item => ({
  id: parseInt(item.id),
  name: item.title,
  price: item.menuFields.price,
  description: item.menuFields.description,
  category: item.menuFields.category,
  calories: item.menuFields.calories || 0,
  image: item.featuredImage.node.sourceUrl,
  isPopular: item.menuFields.isPopular || false
}))

// Generate comprehensive SEO metadata
export async function generateMetadata(): Promise<Metadata> {
  const title = "Texas Roadhouse Menu Prices 2025 | Complete Menu with Photos & Latest Prices"
  const description = "🥩 Official Texas Roadhouse Menu Prices 2025! ✅ 74 Items with Real Photos ✅ Hand-Cut Steaks ✅ Fall-Off-The-Bone Ribs ✅ Latest Prices ✅ Appetizers, Desserts & More!"
  const url = "/menus-prices"
  
  return {
    title,
    description,
    keywords: [
      // Primary keywords
      "Texas Roadhouse menu prices",
      "Texas Roadhouse menu 2025",
      "Texas Roadhouse prices",
      "Texas Roadhouse menu with prices",
      
      // Location-based keywords
      "Texas Roadhouse menu USA",
      "Texas Roadhouse menu near me",
      "Texas Roadhouse prices near me",
      
      // Food category keywords
      "Texas Roadhouse steak prices",
      "Texas Roadhouse ribs prices",
      "Texas Roadhouse appetizers menu",
      "Texas Roadhouse chicken menu",
      "Texas Roadhouse seafood menu",
      "Texas Roadhouse dessert menu",
      "Texas Roadhouse kids menu",
      "Texas Roadhouse drink menu",
      "Texas Roadhouse margarita prices",
      
      // Specific items
      "Cactus Blossom price",
      "Texas Roadhouse ribeye price",
      "Texas Roadhouse sirloin price",
      "Texas Roadhouse filet price",
      "fall off the bone ribs price",
      "rattlesnake bites price",
      "legendary margarita price",
      
      // Intent keywords
      "how much does Texas Roadhouse cost",
      "Texas Roadhouse menu cost",
      "Texas Roadhouse prices list",
      "Texas Roadhouse full menu",
      "Texas Roadhouse complete menu",
      "Texas Roadhouse menu photos",
      "Texas Roadhouse menu pictures",
      
      // Restaurant keywords
      "steakhouse menu prices",
      "American restaurant menu",
      "casual dining menu prices",
      "family restaurant menu",
      "restaurant menu 2025",
      
      // Long-tail keywords
      "Texas Roadhouse menu prices updated 2025",
      "Texas Roadhouse latest menu prices",
      "Texas Roadhouse current menu prices",
      "Texas Roadhouse new menu items 2025"
    ],
    authors: [{ name: "Texas Roadhouse Menu Guide" }],
    creator: "Texas Roadhouse Menu Guide",
    publisher: "Texas Roadhouse Menu Guide",
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title}`,
      description,
      url,
      siteName: "Texas Roadhouse Menu Guide",
      images: [
        {
          url: "/og-menus-prices.jpg",
          width: 1200,
          height: 630,
          alt: "Texas Roadhouse Menu Prices 2025 - 74 Items with Real Photos and Latest Prices",
          type: "image/jpeg",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Complete Price Guide`,
      description,
      images: ["/og-menus-prices.jpg"],
      creator: "@texasroadhousemenu",
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "last-modified": new Date().toISOString(),
    },
  }
}

// ISR for performance and SEO
export const revalidate = 1800 // Revalidate every 30 minutes for better performance

export default function MenusPricesPage() {
  const schemas = generateEnhancedMenuSchema(menuItems)
  
  return (
    <>
      {/* Enhanced Restaurant Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.restaurantSchema)
        }}
      />
      
      {/* Enhanced Menu Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.menuSchema)
        }}
      />
      
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumbSchema)
        }}
      />
      
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.faqSchema)
        }}
      />
      
      <MenusPricesContent menuItems={menuItems} />
    </>
  )
}
