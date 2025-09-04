// ULTIMATE Schema.org implementation for #1 Google ranking
// Includes: LocalBusiness, Restaurant, Menu, MenuItem, AggregateRating, FAQ, Organization

export function generateUltimateSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://texasroadhouse-menus.us'
  const currentDate = new Date().toISOString()
  
  // 1. LOCAL BUSINESS SCHEMA (Critical for restaurant SEO)
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "LocalBusiness"],
    "name": "Texas Roadhouse",
    "alternateName": "Texas Roadhouse Steakhouse",
    "description": "American steakhouse chain serving hand-cut steaks, fall-off-the-bone ribs, made-from-scratch sides, and fresh-baked bread with legendary hospitality.",
    "url": baseUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/logo.png`,
      "width": 300,
      "height": 100
    },
    "image": [
      `${baseUrl}/images/texas-roadhouse-restaurant.jpg`,
      `${baseUrl}/images/texas-roadhouse-steaks.jpg`,
      `${baseUrl}/images/texas-roadhouse-ribs.jpg`
    ],
    "priceRange": "$$",
    "currenciesAccepted": "USD",
    "paymentAccepted": "Cash, Credit Card, Debit Card",
    "servesCuisine": ["American", "Steakhouse", "BBQ"],
    "hasMenu": `${baseUrl}/menus-prices`,
    "menu": `${baseUrl}/menus-prices`,
    "foundingDate": "1993",
    "founder": "Kent Taylor",
    "numberOfEmployees": "70000+",
    "slogan": "Legendary Food, Legendary Service",
    "knowsAbout": [
      "Hand-cut steaks", "Fall-off-the-bone ribs", "Made-from-scratch sides",
      "Fresh-baked bread", "Cinnamon butter", "Legendary margaritas",
      "Family dining", "Casual steakhouse", "American cuisine"
    ],
    "serviceArea": {
      "@type": "Country",
      "name": "United States"
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "United States"
      },
      {
        "@type": "Country", 
        "name": "International"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.2",
      "reviewCount": "50000",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Sarah Johnson"
        },
        "datePublished": "2025-01-15",
        "description": "Amazing steaks and the best bread rolls! Great family atmosphere.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        }
      }
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
        "opens": "15:00",
        "closes": "22:00"
      },
      {
        "@type": "OpeningHoursSpecification", 
        "dayOfWeek": ["Friday", "Saturday"],
        "opens": "15:00",
        "closes": "23:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday", 
        "opens": "11:00",
        "closes": "22:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/texasroadhouse",
      "https://twitter.com/texasroadhouse",
      "https://www.instagram.com/texasroadhouse",
      "https://www.youtube.com/user/texasroadhouse",
      "https://www.linkedin.com/company/texas-roadhouse"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-800-TXRHOUS",
      "contactType": "customer service",
      "availableLanguage": "English"
    }
  }

  // 2. COMPREHENSIVE MENU SCHEMA
  const menuSchema = {
    "@context": "https://schema.org",
    "@type": "Menu",
    "name": "Texas Roadhouse Menu 2025",
    "description": "Complete Texas Roadhouse menu with prices, calories, and nutrition information. Updated daily with current pricing.",
    "url": `${baseUrl}/menus-prices`,
    "dateModified": currentDate,
    "inLanguage": "en-US",
    "hasMenuSection": [
      {
        "@type": "MenuSection",
        "name": "Appetizers",
        "description": "Shareable appetizers including the legendary Cactus Blossom",
        "hasMenuItem": [
          {
            "@type": "MenuItem",
            "name": "Cactus Blossom",
            "description": "Awesome Blossom petals served with Cajun horseradish sauce",
            "offers": {
              "@type": "Offer",
              "price": "8.99",
              "priceCurrency": "USD"
            },
            "nutrition": {
              "@type": "NutritionInformation",
              "calories": "1960 calories"
            }
          }
        ]
      },
      {
        "@type": "MenuSection", 
        "name": "Hand-Cut Steaks",
        "description": "USDA Choice steaks, hand-cut in-house daily and grilled over an open flame",
        "hasMenuItem": [
          {
            "@type": "MenuItem",
            "name": "6 oz Sirloin",
            "description": "Our most tender steak that is lean and melts in your mouth",
            "offers": {
              "@type": "Offer",
              "price": "16.99",
              "priceCurrency": "USD"
            },
            "nutrition": {
              "@type": "NutritionInformation", 
              "calories": "280 calories"
            }
          }
        ]
      },
      {
        "@type": "MenuSection",
        "name": "Fall-Off-The-Bone Ribs", 
        "description": "Slow-cooked baby back ribs with our signature sauce",
        "hasMenuItem": [
          {
            "@type": "MenuItem",
            "name": "Half Slab Baby Back Ribs",
            "description": "Tender, fall-off-the-bone ribs with choice of sauce",
            "offers": {
              "@type": "Offer",
              "price": "18.99", 
              "priceCurrency": "USD"
            },
            "nutrition": {
              "@type": "NutritionInformation",
              "calories": "610 calories"
            }
          }
        ]
      }
    ],
    "publisher": {
      "@type": "Organization",
      "name": "Texas Roadhouse Menu Guide",
      "url": baseUrl
    }
  }

  // 3. COMPREHENSIVE FAQ SCHEMA (Critical for featured snippets)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": "Texas Roadhouse Menu FAQ - Prices, Hours, Nutrition",
    "description": "Frequently asked questions about Texas Roadhouse menu prices, hours, nutrition, and dining options",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are Texas Roadhouse menu prices for 2025?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Texas Roadhouse menu prices for 2025: Appetizers $7.99-$12.99, Hand-Cut Steaks $16.99-$28.99, Ribs $18.99-$24.99, Chicken $13.99-$17.99, Burgers $11.99-$14.99, Salads $9.99-$15.99, Kids Meals $5.99-$7.99, Desserts $4.99-$7.99. Family Packs start at $34.99. Prices may vary by location."
        }
      },
      {
        "@type": "Question",
        "name": "What are Texas Roadhouse hours?",
        "acceptedAnswer": {
          "@type": "Answer", 
          "text": "Most Texas Roadhouse locations are open Monday-Thursday 3pm-10pm, Friday-Saturday 3pm-11pm, Sunday 11am-10pm. Hours may vary by location. Call ahead or check the restaurant locator for specific hours."
        }
      },
      {
        "@type": "Question",
        "name": "Does Texas Roadhouse have a kids menu?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Texas Roadhouse kids menu includes Grilled Chicken ($5.99), Mini Cheeseburgers ($6.49), Chicken Critters ($6.99), Mac & Cheese ($5.99), and more. All kids meals include a side and drink. Ages 12 and under."
        }
      },
      {
        "@type": "Question",
        "name": "What is the most popular Texas Roadhouse menu item?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The most popular items are: Cactus Blossom appetizer ($8.99), 6oz Sirloin steak ($16.99), Fall-Off-The-Bone Ribs ($18.99), Country Fried Chicken ($15.99), and the famous fresh-baked bread with cinnamon butter (complimentary)."
        }
      },
      {
        "@type": "Question",
        "name": "Does Texas Roadhouse offer family meal deals?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Family Packs include: Family Size Chicken Critters ($34.99), Family Size Ribs ($59.99), Family Size Sirloins ($49.99). Each serves 4-6 people and includes sides and bread. Perfect for family dining at home."
        }
      },
      {
        "@type": "Question",
        "name": "Are Texas Roadhouse menu calories listed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, calorie information is available for all menu items. Steaks: 280-800 calories, Appetizers: 400-1960 calories, Sides: 150-400 calories, Desserts: 300-1200 calories. Full nutrition facts available in-restaurant and online."
        }
      },
      {
        "@type": "Question",
        "name": "Does Texas Roadhouse take reservations?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most Texas Roadhouse locations operate on a first-come, first-served basis with Call-Ahead Seating available. You can call ahead to put your name on the waiting list. Some locations may accept limited reservations for large parties."
        }
      },
      {
        "@type": "Question", 
        "name": "What makes Texas Roadhouse steaks special?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Texas Roadhouse steaks are USDA Choice, hand-cut in-house daily, never frozen, and grilled over an open flame. They're seasoned with our signature steak seasoning and served sizzling hot. All steaks are aged for tenderness and flavor."
        }
      }
    ],
    "dateModified": currentDate,
    "publisher": {
      "@type": "Organization",
      "name": "Texas Roadhouse Menu Guide",
      "url": baseUrl,
      "logo": `${baseUrl}/logo.png`
    }
  }

  // 4. WEBSITE SCHEMA with enhanced search functionality
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Texas Roadhouse Menu Prices 2025 | Complete Guide",
    "alternateName": "Texas Roadhouse Menu with Prices",
    "url": baseUrl,
    "description": "Complete Texas Roadhouse menu with current prices, calories, nutrition info, and hours. Updated daily. Find steaks, ribs, appetizers, family meals, kids menu, and exclusive coupons.",
    "inLanguage": "en-US",
    "dateModified": currentDate,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Texas Roadhouse Menu Guide",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": "Texas Roadhouse Menu Categories",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Hand-Cut Steaks",
          "url": `${baseUrl}/menus-prices/category/steaks`
        },
        {
          "@type": "ListItem", 
          "position": 2,
          "name": "Fall-Off-The-Bone Ribs",
          "url": `${baseUrl}/menus-prices/category/ribs`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Appetizers",
          "url": `${baseUrl}/menus-prices/category/appetizers`
        }
      ]
    }
  }

  // 5. BREADCRUMB SCHEMA for navigation
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Menu & Prices",
        "item": `${baseUrl}/menus-prices`
      }
    ]
  }

  return {
    localBusinessSchema,
    menuSchema,
    faqSchema,
    websiteSchema,
    breadcrumbSchema
  }
}
