import { WORDPRESS_CONFIG } from '../config'

const siteName = WORDPRESS_CONFIG.SITE_NAME
const siteUrl = WORDPRESS_CONFIG.SITE_URL

// Restaurant Schema for the main menu page
export function generateRestaurantSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${siteUrl}#restaurant`,
    "name": "Texas Roadhouse",
    "url": siteUrl,
    "description": "Texas Roadhouse is a legendary steakhouse serving hand-cut steaks, fall-off-the-bone ribs, made-from-scratch sides, and fresh-baked bread with cinnamon butter.",
    "servesCuisine": ["American", "Steakhouse"],
    "priceRange": "$10-$30",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "hasMenu": {
      "@type": "Menu",
      "@id": `${siteUrl}/menus#menu`,
      "name": "Texas Roadhouse Menu",
      "description": "Complete Texas Roadhouse menu with steaks, ribs, appetizers, sides, salads, and desserts"
    },
    "image": [
      `${siteUrl}/og-image.jpg`
    ],
    "logo": {
      "@type": "ImageObject",
      "url": `${siteUrl}/Our Own Logo.png`
    }
  }
}

// Menu Schema for the menu page
export function generateMenuSchema(menuItems: Array<{
  name: string
  price: number
  description: string
  category: string
  image?: string
  calories?: number
}>) {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${siteUrl}/menus#menu`,
    "name": "Texas Roadhouse Menu Prices 2025",
    "description": "Complete Texas Roadhouse menu with updated prices for 2025. Featuring steaks, ribs, appetizers, sides, salads, desserts, and more.",
    "hasMenuSection": [
      {
        "@type": "MenuSection",
        "name": "Starters",
        "hasMenuItem": menuItems
          .filter(item => item.category === "Starters")
          .map(item => generateMenuItemSchema(item))
      },
      {
        "@type": "MenuSection", 
        "name": "Hand-Cut Steaks",
        "hasMenuItem": menuItems
          .filter(item => item.category === "Hand-Cut Steaks")
          .map(item => generateMenuItemSchema(item))
      },
      {
        "@type": "MenuSection",
        "name": "Fall-Off-The-Bone Ribs", 
        "hasMenuItem": menuItems
          .filter(item => item.category === "Fall-Off-The-Bone Ribs")
          .map(item => generateMenuItemSchema(item))
      },
      {
        "@type": "MenuSection",
        "name": "Texas Size Combos",
        "hasMenuItem": menuItems
          .filter(item => item.category === "Texas Size Combos")
          .map(item => generateMenuItemSchema(item))
      },
      {
        "@type": "MenuSection",
        "name": "Chicken Specialties",
        "hasMenuItem": menuItems
          .filter(item => item.category === "Chicken Specialties")
          .map(item => generateMenuItemSchema(item))
      },
      {
        "@type": "MenuSection",
        "name": "Dockside Favorites",
        "hasMenuItem": menuItems
          .filter(item => item.category === "Dockside Favorites")
          .map(item => generateMenuItemSchema(item))
      },
      {
        "@type": "MenuSection",
        "name": "Country Dinners",
        "hasMenuItem": menuItems
          .filter(item => item.category === "Country Dinners")
          .map(item => generateMenuItemSchema(item))
      },
      {
        "@type": "MenuSection",
        "name": "Burgers & Sandwiches",
        "hasMenuItem": menuItems
          .filter(item => item.category === "Burgers & Sandwiches")
          .map(item => generateMenuItemSchema(item))
      },
      {
        "@type": "MenuSection",
        "name": "Sides & Extras",
        "hasMenuItem": menuItems
          .filter(item => item.category === "Sides & Extras")
          .map(item => generateMenuItemSchema(item))
      },
      {
        "@type": "MenuSection",
        "name": "Salads",
        "hasMenuItem": menuItems
          .filter(item => item.category === "Salads")
          .map(item => generateMenuItemSchema(item))
      },
      {
        "@type": "MenuSection",
        "name": "Desserts",
        "hasMenuItem": menuItems
          .filter(item => item.category === "Desserts")
          .map(item => generateMenuItemSchema(item))
      },
      {
        "@type": "MenuSection",
        "name": "Kids & Ranger Meals",
        "hasMenuItem": menuItems
          .filter(item => item.category === "Kids & Ranger Meals")
          .map(item => generateMenuItemSchema(item))
      },
      {
        "@type": "MenuSection",
        "name": "Drinks",
        "hasMenuItem": menuItems
          .filter(item => item.category === "Drinks")
          .map(item => generateMenuItemSchema(item))
      }
    ]
  }
}

// Individual Menu Item Schema
export function generateMenuItemSchema(item: {
  name: string
  price: number
  description: string
  category: string
  image?: string
  calories?: number
}) {
  const menuItem: any = {
    "@type": "MenuItem",
    "name": item.name,
    "description": item.description,
    "offers": {
      "@type": "Offer",
      "price": item.price.toFixed(2),
      "priceCurrency": "USD"
    },
    "menuAddOn": {
      "@type": "MenuSection",
      "name": item.category
    }
  }

  if (item.image) {
    menuItem.image = item.image
  }

  if (item.calories) {
    menuItem.nutrition = {
      "@type": "NutritionInformation",
      "calories": `${item.calories} calories`
    }
  }

  return menuItem
}

// FAQ Schema for the FAQ section
export function generateFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Does Texas Roadhouse have kids' meals?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Texas Roadhouse offers a comprehensive Kids & Ranger Meals menu featuring smaller portions of popular items like grilled chicken, burgers, mac & cheese, and more. All kids meals come with a choice of side and drink, perfect for children ages 12 and under."
        }
      },
      {
        "@type": "Question", 
        "name": "What's the best steak at Texas Roadhouse?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The most popular steaks at Texas Roadhouse include the USDA Choice Ribeye, Filet Medallions, and the signature Dallas Filet. All steaks are hand-cut in-house daily and seasoned with their signature blend of spices. The Ribeye is particularly popular for its marbling and flavor."
        }
      },
      {
        "@type": "Question",
        "name": "How much is Texas Roadhouse early dine?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Texas Roadhouse Early Dine specials typically range from $10.99 to $16.99 and are available Monday through Thursday before 6 PM. These specials include popular menu items at discounted prices, such as steaks, ribs, and chicken dishes with choice of two sides."
        }
      },
      {
        "@type": "Question",
        "name": "What are Texas Roadhouse prices in 2025?",
        "acceptedAnswer": {
          "@type": "Answer", 
          "text": "Texas Roadhouse prices in 2025 range from $6.99 for appetizers and sides to $24.99 for premium steaks. Appetizers: $6.99-$12.99, Steaks: $10.99-$24.99, Ribs: $14.99-$21.99, Chicken: $12.99-$16.99, Burgers: $10.99-$13.99. Prices may vary by location."
        }
      },
      {
        "@type": "Question",
        "name": "Does Texas Roadhouse offer vegetarian options?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Texas Roadhouse offers several vegetarian options including salads (House Salad, Caesar Salad), sides (Green Beans, Mashed Potatoes, Mac & Cheese), appetizers (Fried Mozzarella, Loaded Sweet Potato), and vegetarian-friendly burgers and sandwiches."
        }
      }
    ]
  }
}

// Breadcrumb Schema
export function generateBreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem", 
        "position": 2,
        "name": "Menu & Prices",
        "item": `${siteUrl}/menus`
      }
    ]
  }
}

// Combined schema for the menu page
export function generateMenuPageSchema(menuItems: Array<{
  name: string
  price: number
  description: string
  category: string
  image?: string
  calories?: number
}>) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      generateRestaurantSchema(),
      generateMenuSchema(menuItems),
      generateFAQSchema(),
      generateBreadcrumbSchema()
    ]
  }
}
