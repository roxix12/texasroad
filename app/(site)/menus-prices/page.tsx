import { Metadata } from 'next'
import { generatePageSEO } from '@/lib/seo-config'
import { generateMenuPageSchema } from '@/lib/seo/menu-schema'
import MenusPricesContent from './content'

// Extended menu data with more items and categories
const menuItems = [
  // Starters
  { id: 1, name: 'Cactus Blossom', price: 7.99, description: 'Awesome Blossom petals served with Cajun horseradish sauce for dipping.', category: 'Starters', calories: 1620, image: '/menu/cactus-blossom.jpg', isPopular: true },
  { id: 2, name: 'Fried Mozzarella', price: 8.99, description: 'Hand-battered jack and cheddar cheese fried golden brown. Served with marinara sauce.', category: 'Starters', calories: 1410, image: '/menu/fried-mozzarella.jpg', isPopular: false },
  { id: 3, name: 'Rattlesnake Bites', price: 9.49, description: 'Diced jalapeños and jack cheese, hand-battered and fried. Served with Cajun horseradish sauce.', category: 'Starters', calories: 1200, image: '/menu/rattlesnake-bites.jpg', isPopular: false },
  { id: 4, name: 'Boneless Buffalo Wings', price: 10.99, description: 'Boneless wings tossed in mild or hot sauce. Served with celery sticks and bleu cheese.', category: 'Starters', calories: 890, image: '/menu/buffalo-wings.jpg', isPopular: true },
  { id: 5, name: 'Loaded Sweet Potato', price: 7.99, description: 'Topped with butter, brown sugar, mini marshmallows and caramel sauce.', category: 'Starters', calories: 540, image: '/menu/loaded-sweet-potato.jpg', isPopular: false },

  // Hand-Cut Steaks
  { id: 6, name: 'USDA Prime Ribeye 12oz', price: 24.99, description: 'Hand-cut USDA Prime ribeye with exceptional marbling for maximum tenderness and flavor.', category: 'Hand-Cut Steaks', calories: 920, image: '/menu/prime-ribeye.jpg', isPopular: true },
  { id: 7, name: 'USDA Choice Sirloin 6oz', price: 10.99, description: 'Our most popular steak! Lean and full of flavor, seasoned and grilled to perfection.', category: 'Hand-Cut Steaks', calories: 340, image: '/menu/sirloin-6oz.jpg', isPopular: true },
  { id: 8, name: 'USDA Choice Sirloin 8oz', price: 13.99, description: 'Larger cut of our most popular steak. Lean and full of flavor.', category: 'Hand-Cut Steaks', calories: 450, image: '/menu/sirloin-8oz.jpg', isPopular: false },
  { id: 9, name: 'Dallas Filet 6oz', price: 18.99, description: 'The most tender steak we offer, seasoned and seared to lock in flavor.', category: 'Hand-Cut Steaks', calories: 320, image: '/menu/dallas-filet.jpg', isPopular: true },
  { id: 10, name: 'Porterhouse T-Bone 23oz', price: 23.99, description: 'A T-Bone and filet combined! For the truly ambitious appetite.', category: 'Hand-Cut Steaks', calories: 1150, image: '/menu/porterhouse.jpg', isPopular: false },
  { id: 11, name: 'Fort Worth Ribeye 12oz', price: 19.99, description: 'Marbled and juicy USDA Choice ribeye with bold flavor.', category: 'Hand-Cut Steaks', calories: 720, image: '/menu/ribeye-12oz.jpg', isPopular: true },

  // Fall-Off-The-Bone Ribs
  { id: 12, name: 'Full Rack of Ribs', price: 21.99, description: 'Full rack of St. Louis-style ribs with your choice of sauce.', category: 'Ribs', calories: 1540, image: '/menu/full-rack-ribs.jpg', isPopular: true },
  { id: 13, name: 'Half Rack of Ribs', price: 14.99, description: 'Half rack of St. Louis-style ribs with your choice of sauce.', category: 'Ribs', calories: 770, image: '/menu/half-rack-ribs.jpg', isPopular: true },

  // Texas Size Combos
  { id: 14, name: 'Sirloin & Ribs Combo', price: 18.99, description: '6oz sirloin paired with half rack of fall-off-the-bone ribs.', category: 'Combos', calories: 1110, image: '/menu/sirloin-ribs-combo.jpg', isPopular: true },
  { id: 15, name: 'Ribeye & Ribs Combo', price: 22.99, description: '12oz ribeye paired with half rack of fall-off-the-bone ribs.', category: 'Combos', calories: 1490, image: '/menu/ribeye-ribs-combo.jpg', isPopular: false },
  { id: 16, name: 'Filet & Ribs Combo', price: 24.99, description: '6oz filet paired with half rack of fall-off-the-bone ribs.', category: 'Combos', calories: 1090, image: '/menu/filet-ribs-combo.jpg', isPopular: false },

  // Chicken Specialties
  { id: 17, name: 'Grilled BBQ Chicken', price: 12.99, description: 'Grilled chicken breast basted with BBQ sauce and served hot.', category: 'Chicken', calories: 460, image: '/menu/grilled-bbq-chicken.jpg', isPopular: true },
  { id: 18, name: 'Country Fried Chicken', price: 13.99, description: 'Hand-battered and fried golden brown. Served with white pepper gravy.', category: 'Chicken', calories: 680, image: '/menu/country-fried-chicken.jpg', isPopular: false },
  { id: 19, name: 'Herb Crusted Chicken', price: 14.99, description: 'Grilled chicken breast with herb seasoning and natural juices.', category: 'Chicken', calories: 390, image: '/menu/herb-crusted-chicken.jpg', isPopular: false },

  // Dockside Favorites
  { id: 20, name: 'Grilled Salmon', price: 16.99, description: 'Fresh Atlantic salmon, grilled and seasoned to perfection.', category: 'Seafood', calories: 350, image: '/menu/grilled-salmon.jpg', isPopular: true },
  { id: 21, name: 'Fish & Chips', price: 14.99, description: 'Hand-battered white fish with seasoned steak fries.', category: 'Seafood', calories: 1120, image: '/menu/fish-chips.jpg', isPopular: false },
  { id: 22, name: 'Grilled Shrimp', price: 15.99, description: 'Grilled shrimp skewer seasoned and served over rice.', category: 'Seafood', calories: 280, image: '/menu/grilled-shrimp.jpg', isPopular: false },

  // Burgers & Sandwiches
  { id: 23, name: 'Roadhouse Burger', price: 10.99, description: 'Seasoned and grilled to order with lettuce, tomato, onion, and pickles.', category: 'Burgers', calories: 870, image: '/menu/roadhouse-burger.jpg', isPopular: true },
  { id: 24, name: 'BBQ Bacon Cheeseburger', price: 12.99, description: 'Topped with BBQ sauce, crispy bacon, and melted cheddar cheese.', category: 'Burgers', calories: 1120, image: '/menu/bbq-bacon-burger.jpg', isPopular: true },
  { id: 25, name: 'Pulled Pork Sandwich', price: 11.99, description: 'Slow-smoked pulled pork with coleslaw and BBQ sauce.', category: 'Burgers', calories: 680, image: '/menu/pulled-pork-sandwich.jpg', isPopular: false },

  // Sides & Extras
  { id: 26, name: 'Seasoned Rice', price: 3.99, description: 'Perfectly seasoned and fluffy rice with herbs.', category: 'Sides', calories: 180, image: '/menu/seasoned-rice.jpg', isPopular: false },
  { id: 27, name: 'Mashed Potatoes', price: 3.99, description: 'Creamy mashed potatoes with butter and seasonings.', category: 'Sides', calories: 320, image: '/menu/mashed-potatoes.jpg', isPopular: true },
  { id: 28, name: 'Green Beans', price: 3.99, description: 'Fresh green beans sautéed with onions and seasonings.', category: 'Sides', calories: 60, image: '/menu/green-beans.jpg', isPopular: false },
  { id: 29, name: 'Mac & Cheese', price: 4.99, description: 'Creamy three-cheese mac and cheese, a customer favorite.', category: 'Sides', calories: 480, image: '/menu/mac-cheese.jpg', isPopular: true },
  { id: 30, name: 'Steak Fries', price: 3.99, description: 'Thick-cut seasoned steak fries, crispy outside and fluffy inside.', category: 'Sides', calories: 420, image: '/menu/steak-fries.jpg', isPopular: true },

  // Salads
  { id: 31, name: 'House Salad', price: 6.99, description: 'Mixed greens, tomatoes, cucumbers, croutons, and cheddar cheese.', category: 'Salads', calories: 240, image: '/menu/house-salad.jpg', isPopular: false },
  { id: 32, name: 'Grilled Chicken Salad', price: 11.99, description: 'Grilled chicken breast over mixed greens with all the fixings.', category: 'Salads', calories: 480, image: '/menu/grilled-chicken-salad.jpg', isPopular: true },
  { id: 33, name: 'Steakhouse Salad', price: 13.99, description: 'Sirloin steak over mixed greens with blue cheese crumbles.', category: 'Salads', calories: 620, image: '/menu/steakhouse-salad.jpg', isPopular: false },

  // Desserts
  { id: 34, name: 'Big Ol\' Brownie', price: 6.99, description: 'Warm chocolate brownie with vanilla ice cream and hot fudge sauce.', category: 'Desserts', calories: 1290, image: '/menu/big-ol-brownie.jpg', isPopular: true },
  { id: 35, name: 'Strawberry Cheesecake', price: 5.99, description: 'Classic New York-style cheesecake with fresh strawberry topping.', category: 'Desserts', calories: 620, image: '/menu/strawberry-cheesecake.jpg', isPopular: true },
  { id: 36, name: 'Apple Pie A La Mode', price: 5.99, description: 'Warm apple pie with vanilla ice cream and caramel sauce.', category: 'Desserts', calories: 780, image: '/menu/apple-pie.jpg', isPopular: false },

  // Kids & Ranger Meals
  { id: 37, name: 'Kids Grilled Chicken', price: 6.99, description: 'Grilled chicken breast with choice of side and drink.', category: 'Kids', calories: 240, image: '/menu/kids-grilled-chicken.jpg', isPopular: true },
  { id: 38, name: 'Kids Mac & Cheese', price: 5.99, description: 'Creamy mac and cheese with choice of side and drink.', category: 'Kids', calories: 480, image: '/menu/kids-mac-cheese.jpg', isPopular: true },
  { id: 39, name: 'Kids Sirloin', price: 7.99, description: '4oz sirloin steak with choice of side and drink.', category: 'Kids', calories: 220, image: '/menu/kids-sirloin.jpg', isPopular: false },
  { id: 40, name: 'Kids Burger', price: 6.99, description: 'Mini burger with fries and choice of drink.', category: 'Kids', calories: 520, image: '/menu/kids-burger.jpg', isPopular: true },

  // Drinks
  { id: 41, name: 'Legendary Margarita', price: 7.99, description: 'Our signature margarita made with premium tequila and fresh lime.', category: 'Drinks', calories: 280, image: '/menu/legendary-margarita.jpg', isPopular: true },
  { id: 42, name: 'Texas Tea', price: 8.99, description: 'Long Island Iced Tea with a Texas twist and premium spirits.', category: 'Drinks', calories: 320, image: '/menu/texas-tea.jpg', isPopular: false },
  { id: 43, name: 'Fresh Brewed Iced Tea', price: 2.99, description: 'Sweet or unsweet, freshly brewed daily with real tea leaves.', category: 'Drinks', calories: 70, image: '/menu/iced-tea.jpg', isPopular: true },
  { id: 44, name: 'Coca-Cola Products', price: 2.99, description: 'Coke, Diet Coke, Sprite, Dr Pepper, and more fountain drinks.', category: 'Drinks', calories: 150, image: '/menu/coca-cola.jpg', isPopular: true },
  { id: 45, name: 'Fresh Coffee', price: 2.49, description: 'Freshly brewed coffee, hot and rich. Free refills.', category: 'Drinks', calories: 5, image: '/menu/fresh-coffee.jpg', isPopular: false }
]

// Generate comprehensive SEO metadata
export async function generateMetadata(): Promise<Metadata> {
  const title = "Texas Roadhouse Menu Prices USA (Updated 2025)"
  const description = "Discover updated Texas Roadhouse menu prices 2025. Hand-cut steaks, fall-off-the-bone ribs, salads, sides, appetizers, kids' meals & desserts with prices."
  const url = "/menus-prices"
  
  return {
    title,
    description,
    keywords: [
      "Texas Roadhouse menu prices 2025",
      "Texas Roadhouse menu",
      "steakhouse menu prices",
      "Texas Roadhouse prices USA",
      "restaurant menu 2025",
      "steak prices",
      "ribs menu prices",
      "Texas Roadhouse appetizers",
      "Texas Roadhouse desserts",
      "family restaurant menu",
      "steakhouse dining prices",
      "Texas Roadhouse kids menu",
      "Texas Roadhouse drinks menu"
    ],
    authors: [{ name: "Texas Roadhouse Menu Guide" }],
    creator: "Texas Roadhouse Menu Guide",
    publisher: "Texas Roadhouse Menu Guide",
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | Complete Price Guide`,
      description,
      url,
      siteName: "Texas Roadhouse Menu Guide",
      images: [
        {
          url: "/og-menus-prices.jpg",
          width: 1200,
          height: 630,
          alt: "Texas Roadhouse Menu Prices 2025 - Complete Guide",
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
export const revalidate = 3600 // Revalidate every hour

export default function MenusPricesPage() {
  return (
    <>
      {/* Enhanced JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateMenuPageSchema(menuItems))
        }}
      />
      
      <MenusPricesContent menuItems={menuItems} />
    </>
  )
}
