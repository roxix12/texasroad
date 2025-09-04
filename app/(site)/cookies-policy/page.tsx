import { Metadata } from 'next'
import { PageHero } from '@/components/layout'

export const metadata: Metadata = {
  title: 'Cookies Policy | Texas Roadhouse Menu Guide',
  description: 'Learn about how we use cookies and similar technologies on Texas Roadhouse Menu Guide to improve your browsing experience.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function CookiesPolicyPage() {
  return (
    <>
      <PageHero
        title="Cookies Policy"
        subtitle="How we use cookies and similar technologies"
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

            <h2>What Are Cookies?</h2>
            <p>
              Cookies are small text files that are stored on your computer or mobile device when you visit a website. 
              They allow the website to recognize your device and remember certain information about your visit.
            </p>

            <h2>How We Use Cookies</h2>
            <p>
              Texas Roadhouse Menu Guide uses cookies to enhance your browsing experience and provide better services. 
              We use cookies for the following purposes:
            </p>

            <h3>Essential Cookies</h3>
            <p>These cookies are necessary for the website to function properly:</p>
            <ul>
              <li><strong>Session Management:</strong> To maintain your session while browsing</li>
              <li><strong>Security:</strong> To protect against fraud and unauthorized access</li>
              <li><strong>Basic Functionality:</strong> To remember your preferences and settings</li>
            </ul>

            <h3>Performance Cookies</h3>
            <p>These cookies help us understand how visitors interact with our website:</p>
            <ul>
              <li><strong>Analytics:</strong> To analyze website traffic and usage patterns</li>
              <li><strong>Performance Monitoring:</strong> To identify and fix technical issues</li>
              <li><strong>Load Optimization:</strong> To improve page loading speeds</li>
            </ul>

            <h3>Functional Cookies</h3>
            <p>These cookies enhance your experience on our website:</p>
            <ul>
              <li><strong>Preferences:</strong> To remember your menu filter settings</li>
              <li><strong>User Interface:</strong> To remember your display preferences</li>
              <li><strong>Location Services:</strong> To provide location-relevant information</li>
            </ul>

            <h2>Third-Party Cookies</h2>
            <p>
              We may also use third-party cookies from trusted partners to provide additional functionality:
            </p>

            <h3>Google Analytics</h3>
            <p>
              We use Google Analytics to understand how visitors use our website. 
              These cookies collect information about your visit, including pages viewed, 
              time spent on the site, and traffic sources.
            </p>

            <h3>Social Media</h3>
            <p>
              We may use cookies from social media platforms to enable sharing features 
              and to measure the effectiveness of our social media campaigns.
            </p>

            <h2>Managing Your Cookie Preferences</h2>
            <p>
              You have several options for managing cookies:
            </p>

            <h3>Browser Settings</h3>
            <p>
              Most web browsers allow you to control cookies through their settings preferences. 
              You can typically:
            </p>
            <ul>
              <li>View which cookies are stored on your device</li>
              <li>Delete existing cookies</li>
              <li>Block cookies from being set</li>
              <li>Set preferences for specific websites</li>
            </ul>

            <h3>Opt-Out Tools</h3>
            <p>
              You can opt-out of certain third-party cookies using these tools:
            </p>
            <ul>
              <li><strong>Google Analytics:</strong> <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-texas-yellow hover:underline">Google Analytics Opt-out Browser Add-on</a></li>
              <li><strong>Network Advertising:</strong> <a href="http://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-texas-yellow hover:underline">NAI Opt-out Tool</a></li>
            </ul>

            <h2>Cookie Categories</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-stone-200 rounded-lg">
                <thead className="bg-stone-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-stone-700 border-b border-stone-200">Cookie Type</th>
                    <th className="px-4 py-3 text-left font-semibold text-stone-700 border-b border-stone-200">Purpose</th>
                    <th className="px-4 py-3 text-left font-semibold text-stone-700 border-b border-stone-200">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-stone-100">
                    <td className="px-4 py-3 font-medium">Essential</td>
                    <td className="px-4 py-3">Website functionality and security</td>
                    <td className="px-4 py-3">Session/1 year</td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="px-4 py-3 font-medium">Performance</td>
                    <td className="px-4 py-3">Analytics and performance monitoring</td>
                    <td className="px-4 py-3">2 years</td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="px-4 py-3 font-medium">Functional</td>
                    <td className="px-4 py-3">User preferences and settings</td>
                    <td className="px-4 py-3">1 year</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Marketing</td>
                    <td className="px-4 py-3">Targeted advertising and social media</td>
                    <td className="px-4 py-3">1-2 years</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>Impact of Disabling Cookies</h2>
            <p>
              If you choose to disable cookies, some features of our website may not function properly:
            </p>
            <ul>
              <li>Menu filter preferences may not be saved</li>
              <li>Gift card balance checker may not work correctly</li>
              <li>Contact form submissions may be affected</li>
              <li>Analytics data will not be collected</li>
            </ul>

            <h2>Local Storage</h2>
            <p>
              In addition to cookies, we may use local storage technologies to store information 
              locally on your device. This helps improve website performance and user experience.
            </p>

            <h2>Updates to This Policy</h2>
            <p>
              We may update this Cookies Policy from time to time to reflect changes in our practices 
              or for other operational, legal, or regulatory reasons. We will notify you of any changes 
              by posting the new policy on this page.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about our use of cookies or this Cookies Policy, please contact us at:
            </p>
            <ul>
              <li><strong>Email:</strong> cookies@texasroadhouse-menus.us</li>
              <li><strong>Website:</strong> <a href="/contact" className="text-texas-yellow hover:underline">Contact Form</a></li>
            </ul>

            <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-blue-800 font-bold mb-2">Your Consent</h3>
              <p className="text-blue-700 mb-0">
                By continuing to use our website, you consent to our use of cookies as described in this policy. 
                You can withdraw your consent at any time by adjusting your browser settings or contacting us directly.
              </p>
            </div>

            <div className="mt-8 p-6 bg-texas-yellow/10 rounded-lg border border-texas-yellow/20">
              <h3 className="text-texas-black font-bold mb-2">Related Policies</h3>
              <p className="text-stone-700 mb-2">
                For more information about how we handle your data, please review our related policies:
              </p>
              <ul className="mb-0">
                <li><a href="/privacy-policy" className="text-texas-yellow hover:underline">Privacy Policy</a></li>
                <li><a href="/terms-and-conditions" className="text-texas-yellow hover:underline">Terms and Conditions</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
