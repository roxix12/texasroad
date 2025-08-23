import { Metadata } from 'next'
import { PageHero } from '@/components/layout'

export const metadata: Metadata = {
  title: 'Legal Information & Disclaimers | Texas Roadhouse Menu',
  description: 'Complete legal disclaimers, terms of use, and copyright information for Texas Roadhouse Menu. Independent informational website with official disclaimers.',
  keywords: ['legal information', 'disclaimers', 'terms of use', 'copyright', 'Texas Roadhouse Menu', 'independent website'],
  alternates: {
    canonical: '/legal',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: 'Legal Information | Texas Roadhouse Menu',
    description: 'Legal disclaimers and terms of use for Texas Roadhouse Menu - an independent informational website.',
    type: 'website',
    url: '/legal',
  },
}

export default function LegalPage() {
  const lastUpdated = 'December 2024'

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Legal Information',
    description: 'Legal disclaimers, terms of use, and copyright information for Texas Roadhouse Menu website',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/legal`,
    lastReviewed: '2024-12-01',
    publisher: {
      '@type': 'Organization',
      name: 'Texas Roadhouse Menu',
      url: process.env.NEXT_PUBLIC_SITE_URL,
    },
    mainContentOfPage: {
      '@type': 'WebPageElement',
      text: 'Legal disclaimers and terms of use for independent Texas Roadhouse menu information website',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PageHero
        title="Legal Information"
        subtitle="Disclaimers, terms of use, and copyright information"
      />
      
      <div className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 text-left">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
              <h2 className="font-slab font-slab-bold text-xl text-red-800 mb-4 mt-0">
                ⚠️ Important Disclaimer
              </h2>
              <p className="text-red-700 mb-0">
                <strong>This website is NOT affiliated with Texas Roadhouse.</strong> 
                We are an independent informational site. Texas Roadhouse Menu is not endorsed by, 
                sponsored by, or associated with Texas Roadhouse or any of its subsidiaries, 
                affiliates, or related companies.
              </p>
            </div>

            <section className="space-y-4">
              <h2 className="font-slab font-slab-bold text-2xl text-stone mb-4">Trademark and Copyright Notice</h2>
              <p className="text-stone/80 leading-relaxed">
                "Texas Roadhouse" is a registered trademark of Texas Roadhouse Holdings LLC. 
                We do not claim any ownership of this trademark or any related intellectual property. 
                This website is created for informational purposes only under fair use principles.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-slab font-slab-bold text-2xl text-stone mb-4">Website Disclaimer</h2>
              <p className="text-stone/80 leading-relaxed">
                The information provided on this website is for general informational purposes only. 
                We make no representations or warranties of any kind, express or implied, about the 
                completeness, accuracy, reliability, suitability, or availability of the information, 
                products, services, or related graphics contained on this website.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="font-slab font-slab-bold text-xl text-stone mb-3">Menu Information</h3>
              <ul className="space-y-2 text-stone/80 leading-relaxed list-disc list-inside">
                <li>Menu items, prices, and availability may vary by location</li>
                <li>Nutritional information is approximate and may not be current</li>
                <li>Allergen information should be verified with the restaurant</li>
                <li>Prices are subject to change without notice</li>
                <li>We are not responsible for any discrepancies in pricing or menu items</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h3 className="font-slab font-slab-bold text-xl text-stone mb-3">No Affiliation</h3>
              <p className="text-stone/80 leading-relaxed">
                This website is independently operated and maintained. We are not affiliated with, 
                endorsed by, or connected to Texas Roadhouse in any way. Any references to Texas Roadhouse 
                are made purely for informational and descriptive purposes.
              </p>
            </section>

            <h2>Terms of Use</h2>
            <p>
              By accessing and using this website, you accept and agree to be bound by the following terms:
            </p>

            <h3>Acceptable Use</h3>
            <ul>
              <li>You may use this website for personal, non-commercial purposes only</li>
              <li>You may not copy, reproduce, or distribute content without permission</li>
              <li>You may not use this website for any unlawful purpose</li>
              <li>You may not attempt to interfere with the website's operation</li>
            </ul>

            <h3>Limitation of Liability</h3>
            <p>
              In no event shall Texas Roadhouse Menu, its operators, or contributors be liable for any 
              direct, indirect, incidental, special, consequential, or punitive damages resulting from 
              your use of this website or the information contained herein.
            </p>

            <h2>Privacy Policy</h2>
            <p>
              We respect your privacy and are committed to protecting your personal information.
            </p>

            <h3>Information We Collect</h3>
            <ul>
              <li>Contact form submissions (name, email, message content)</li>
              <li>Newsletter subscriptions (email addresses only)</li>
              <li>Anonymous usage analytics through standard web technologies</li>
              <li>We do not sell, trade, or share your personal information with third parties</li>
            </ul>

            <h3>Cookies and Analytics</h3>
            <p>
              This website may use cookies and similar technologies to enhance user experience 
              and gather anonymous usage statistics. You can control cookie settings through 
              your browser preferences.
            </p>

            <h2>Content Policy</h2>
            <p>
              All content on this website is created for informational purposes. We strive to 
              provide accurate information but make no guarantees about its completeness or accuracy.
            </p>

            <h3>User-Generated Content</h3>
            <p>
              Any comments, suggestions, or other communications submitted to us may be used by 
              us without restriction. We reserve the right to remove any content that we deem 
              inappropriate or off-topic.
            </p>

            <h2>External Links</h2>
            <p>
              This website may contain links to external websites. We are not responsible for 
              the content, privacy policies, or practices of any third-party websites.
            </p>

            <h2>DMCA and Copyright</h2>
            <p>
              We respect intellectual property rights. If you believe any content on this website 
              infringes your copyright, please contact us with detailed information about the 
              alleged infringement.
            </p>

            <h2>Contact Information</h2>
            <p>
              For questions about these terms, privacy concerns, or to report issues, 
              please contact us through our <a href="/contact">contact page</a>.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this legal information from time to time. Any changes will be posted 
              on this page with an updated "last modified" date.
            </p>

            <div className="bg-sand/30 rounded-lg p-6 mt-8">
              <p className="text-sm text-stone/70 mb-0">
                <strong>Last Updated:</strong> {lastUpdated}
              </p>
            </div>

            <div className="bg-green/10 border border-green/20 rounded-lg p-6 mt-8">
              <h3 className="font-slab font-slab-bold text-lg text-stone mb-3 mt-0">
                Looking for Official Texas Roadhouse Information?
              </h3>
              <p className="mb-4">
                For official restaurant information, locations, hours, reservations, and customer service, 
                please visit the official Texas Roadhouse website.
              </p>
              <a
                href="https://www.texasroadhouse.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-green hover:text-green/80 transition-colors duration-200 font-medium"
              >
                Visit Official Website →
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
