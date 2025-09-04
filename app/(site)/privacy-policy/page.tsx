import { Metadata } from 'next'
import { PageHero } from '@/components/layout'

export const metadata: Metadata = {
  title: 'Privacy Policy | Texas Roadhouse Menu Guide',
  description: 'Privacy policy for Texas Roadhouse Menu Guide. Learn how we collect, use, and protect your personal information.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your information"
      />

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-stone-600 mb-8">
              <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>

            <h2>1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you:
            </p>
            <ul>
              <li>Contact us through our contact form</li>
              <li>Subscribe to our newsletter</li>
              <li>Use our gift card balance checker</li>
              <li>Browse our website and menu information</li>
            </ul>

            <h3>Types of Information</h3>
            <ul>
              <li><strong>Personal Information:</strong> Name, email address, phone number</li>
              <li><strong>Usage Information:</strong> Pages visited, time spent on site, browser type</li>
              <li><strong>Device Information:</strong> IP address, device type, operating system</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide and improve our menu information services</li>
              <li>Respond to your inquiries and support requests</li>
              <li>Send you updates about menu changes and promotions</li>
              <li>Analyze website usage to improve user experience</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. 
              We may share your information in the following circumstances:
            </p>
            <ul>
              <li><strong>Service Providers:</strong> With trusted third-party service providers who assist in operating our website</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction. However, no internet 
              transmission is 100% secure.
            </p>

            <h2>5. Cookies and Tracking</h2>
            <p>
              We use cookies and similar technologies to enhance your browsing experience. 
              You can control cookie settings through your browser preferences. 
              See our <a href="/cookies-policy" className="text-texas-yellow hover:underline">Cookies Policy</a> for more details.
            </p>

            <h2>6. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites, including the official Texas Roadhouse website. 
              We are not responsible for the privacy practices of these external sites.
            </p>

            <h2>7. Children's Privacy</h2>
            <p>
              Our website is not directed to children under 13. We do not knowingly collect 
              personal information from children under 13. If we learn we have collected such information, 
              we will delete it promptly.
            </p>

            <h2>8. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access the personal information we have about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>File a complaint with supervisory authorities</li>
            </ul>

            <h2>9. International Users</h2>
            <p>
              If you are visiting from outside the United States, please note that your information 
              may be transferred to and processed in the United States, where our servers are located.
            </p>

            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes 
              by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>

            <h2>11. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <ul>
              <li><strong>Email:</strong> privacy@texasroadhouse-menus.us</li>
              <li><strong>Website:</strong> <a href="/contact" className="text-texas-yellow hover:underline">Contact Form</a></li>
            </ul>

            <div className="mt-12 p-6 bg-texas-yellow/10 rounded-lg border border-texas-yellow/20">
              <h3 className="text-texas-black font-bold mb-2">Important Note</h3>
              <p className="text-stone-700 mb-0">
                This website is an independent menu information guide and is not affiliated with or endorsed by Texas Roadhouse Inc. 
                All menu items, prices, and nutritional information are provided for informational purposes only.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
