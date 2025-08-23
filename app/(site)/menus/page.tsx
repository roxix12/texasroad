import { Metadata } from 'next'
import { generatePageSEO } from '@/lib/seo-config'
import { generateMenuPageSchema } from '@/lib/seo/menu-schema'
import MenusPageContent from './content'

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    title: "Texas Roadhouse Menu Prices in USA (Updated 2025) | Steaks, Appetizers, Sides & More",
    description: "Explore the full Texas Roadhouse menu with updated prices for 2025. See steaks, ribs, appetizers, salads, sides, desserts, drinks & more. Find the best meals & save big.",
    path: "/menus",
    keywords: [
      "Texas Roadhouse menu prices 2025",
      "Texas Roadhouse menu",
      "steakhouse menu prices",
      "Texas Roadhouse prices",
      "restaurant menu USA",
      "steak prices 2025"
    ]
  })
}

export default function MenusPage() {
  return <MenusPageContent />
}