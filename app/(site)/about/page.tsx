import { Metadata } from 'next'
import { PageHero } from '@/components/layout'
import { Button } from '@/components/ui'
import { ConditionalYoastSEOHead } from '@/components/seo'
import Link from 'next/link'
import { getPageSEOData, COMMON_PAGE_SLUGS } from '@/lib/page-queries'
import { convertYoastToMetadata } from '@/lib/yoast-seo'

export async function generateMetadata(): Promise<Metadata> {
  // Try to get Yoast SEO data from WordPress about page
  const aboutPageSEO = await getPageSEOData(
    COMMON_PAGE_SLUGS.ABOUT,
    'About Us',
    'Learn about Texas Roadhouse Menu - your independent source for menu information, prices, and nutritional details.'
  )
  
  // If Yoast SEO data exists, use it
  if (aboutPageSEO.hasYoastSEO && aboutPageSEO.seoData) {
    return convertYoastToMetadata(
      aboutPageSEO.seoData,
      aboutPageSEO.title,
      aboutPageSEO.description
    )
  }
  
  // Fallback to static metadata
  return {
    title: 'About Us',
    description: 'Learn about Texas Roadhouse Menu - your independent source for menu information, prices, and nutritional details.',
    alternates: {
      canonical: '/about',
    },
  }
}

export default async function AboutPage() {
  // Get Yoast SEO data for head injection
  const aboutPageSEO = await getPageSEOData(COMMON_PAGE_SLUGS.ABOUT, '', '')
  
  return (
    <>
      {/* Yoast SEO Integration */}
      <ConditionalYoastSEOHead seoData={aboutPageSEO.seoData} />
      <PageHero
        title="About Texas Roadhouse Menu"
        subtitle="Your independent source for menu information and prices"
      />
      
      <div className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg prose-stone max-w-none">
            <div className="bg-orange/10 border border-orange/20 rounded-lg p-6 mb-8">
              <h2 className="font-slab font-slab-bold text-xl text-stone mb-4 mt-0">
                Important Disclaimer
              </h2>
              <p className="mb-0">
                <strong>Texas Roadhouse Menu is an independent informational website.</strong> 
                We are not affiliated with, endorsed by, or connected to Texas Roadhouse in any way. 
                All menu items, prices, and nutritional information are provided for reference purposes only 
                and may not reflect current offerings at Texas Roadhouse restaurants.
              </p>
            </div>

            <h2>Our Mission</h2>
            <p>
              We created this website to provide food enthusiasts and Texas Roadhouse fans with 
              easy access to menu information, pricing details, and nutritional facts. Our goal 
              is to help you make informed dining decisions and discover new favorite dishes.
            </p>

            <h2>What We Offer</h2>
            <ul>
              <li><strong>Comprehensive Menu Information</strong> - Detailed descriptions of popular menu items</li>
              <li><strong>Pricing Reference</strong> - General pricing information to help you plan your visit</li>
              <li><strong>Nutritional Details</strong> - Calorie counts and allergen information when available</li>
              <li><strong>Latest Updates</strong> - News and information about menu changes and new offerings</li>
              <li><strong>Easy Search & Filtering</strong> - Find exactly what you're looking for quickly</li>
            </ul>

            <h2>Accuracy & Updates</h2>
            <p>
              While we strive to keep our information current and accurate, menu items, prices, 
              and availability can vary by location and change without notice. We recommend 
              contacting your local Texas Roadhouse restaurant to confirm current offerings 
              and pricing before visiting.
            </p>

            <h2>For Official Information</h2>
            <p>
              For the most up-to-date and official information about Texas Roadhouse, including 
              locations, hours, and current promotions, please visit the official Texas Roadhouse website 
              at <a href="https://www.texasroadhouse.com" target="_blank" rel="noopener noreferrer">texasroadhouse.com</a>.
            </p>

            <h2>Contact Us</h2>
            <p>
              Have questions, suggestions, or found outdated information? We'd love to hear from you! 
              Please reach out through our contact page and we'll do our best to respond promptly.
            </p>

            <div className="bg-sand/30 rounded-lg p-6 mt-8">
              <h3 className="font-slab font-slab-bold text-lg text-stone mb-4 mt-0">
                Love Texas Roadhouse?
              </h3>
              <p className="mb-4">
                If you're a fan of Texas Roadhouse, make sure to visit their official website 
                and follow their social media channels for the latest news, promotions, and updates 
                directly from the restaurant.
              </p>
              <div className="flex gap-4">
                <Link href="/contact">
                  <Button variant="primary">
                    Contact Us
                  </Button>
                </Link>
                <a
                  href="https://www.texasroadhouse.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline">
                    Official Website
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
