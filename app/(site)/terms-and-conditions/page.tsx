import { Metadata } from 'next'
import { PageHero } from '@/components/layout'

export const metadata: Metadata = {
  title: 'Terms and Conditions | Texas Roadhouse Menu Guide',
  description: 'Terms and conditions for using Texas Roadhouse Menu Guide. Read our terms of service and usage policies.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsAndConditionsPage() {
  return (
    <>
      <PageHero
        title="Terms and Conditions"
        subtitle="Terms of service and usage policies for our website"
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

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using Texas Roadhouse Menu Guide ("the Website"), you accept and agree 
              to be bound by the terms and provision of this agreement. If you do not agree to abide 
              by the above, please do not use this service.
            </p>

            <h2>2. Website Description</h2>
            <p>
              Texas Roadhouse Menu Guide is an independent website that provides information about 
              Texas Roadhouse menu items, prices, nutritional data, and promotional offers. 
              We are not affiliated with, endorsed by, or connected to Texas Roadhouse Inc.
            </p>

            <h2>3. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials on Texas Roadhouse Menu Guide 
              for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul>
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>

            <h2>4. Disclaimer</h2>
            <h3>Information Accuracy</h3>
            <p>
              While we strive to provide accurate and up-to-date information about Texas Roadhouse menu items, 
              prices, and nutritional data, we cannot guarantee the accuracy, completeness, or timeliness of this information.
            </p>
            
            <h3>Price Variations</h3>
            <p>
              Menu prices may vary by location and are subject to change without notice. 
              Please verify current prices and availability with your local Texas Roadhouse restaurant.
            </p>

            <h3>Nutritional Information</h3>
            <p>
              Nutritional information is provided for informational purposes only and may vary based on 
              preparation methods, ingredients, and portion sizes. Consult with restaurant staff about 
              allergens and dietary restrictions.
            </p>

            <h2>5. Limitations</h2>
            <p>
              In no event shall Texas Roadhouse Menu Guide or its suppliers be liable for any damages 
              (including, without limitation, damages for loss of data or profit, or due to business interruption) 
              arising out of the use or inability to use the materials on this website.
            </p>

            <h2>6. Accuracy of Materials</h2>
            <p>
              The materials appearing on Texas Roadhouse Menu Guide could include technical, typographical, 
              or photographic errors. We do not warrant that any of the materials on its website are accurate, 
              complete, or current.
            </p>

            <h2>7. Links</h2>
            <p>
              We have not reviewed all of the sites linked to our website and are not responsible for 
              the contents of any such linked site. The inclusion of any link does not imply endorsement 
              by us of the site.
            </p>

            <h2>8. Modifications</h2>
            <p>
              We may revise these terms of service for its website at any time without notice. 
              By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>

            <h2>9. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of 
              the United States and you irrevocably submit to the exclusive jurisdiction of the courts 
              in that state or location.
            </p>

            <h2>10. User Conduct</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the website for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Transmit viruses or malicious code</li>
              <li>Spam or harass other users</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>

            <h2>11. Intellectual Property</h2>
            <p>
              The content, layout, design, data, databases, and graphics on this website are protected by 
              intellectual property laws. Texas Roadhouse® is a registered trademark of Texas Roadhouse Inc. 
              We do not claim any ownership of the Texas Roadhouse trademark or brand.
            </p>

            <h2>12. Gift Card Services</h2>
            <p>
              Our gift card balance checker and related services are provided "as is" for convenience only. 
              For official gift card transactions and support, please visit the official Texas Roadhouse website 
              or contact Texas Roadhouse directly.
            </p>

            <h2>13. Contact Information</h2>
            <p>
              If you have any questions about these Terms and Conditions, please contact us at:
            </p>
            <ul>
              <li><strong>Email:</strong> legal@texasroadhouse-menus.us</li>
              <li><strong>Website:</strong> <a href="/contact" className="text-texas-yellow hover:underline">Contact Form</a></li>
            </ul>

            <div className="mt-12 p-6 bg-red-50 rounded-lg border border-red-200">
              <h3 className="text-red-800 font-bold mb-2">Disclaimer</h3>
              <p className="text-red-700 mb-0">
                This website is an independent menu information guide and is not affiliated with, 
                sponsored by, or endorsed by Texas Roadhouse Inc. All trademarks, service marks, 
                and trade names referenced are the property of their respective owners.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
