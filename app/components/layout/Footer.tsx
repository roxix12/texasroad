'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Mail, ExternalLink } from 'lucide-react'
import { Input, Button } from '@/components/ui'
import { isValidEmail } from '@/lib/format'

const footerLinks = {
  menu: [
            { label: 'All Menus', href: '/menus-prices' },
        { label: 'Steaks', href: '/menus-prices?category=Steaks' },
        { label: 'Ribs', href: '/menus-prices?category=Ribs' },
        { label: 'Chicken', href: '/menus-prices?category=Chicken' },
        { label: 'Appetizers', href: '/menus-prices?category=Appetizers' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Blog', href: '/posts' },
    { label: 'Legal', href: '/legal' },
  ],
  social: [
    { 
      label: 'Official Texas Roadhouse', 
      href: 'https://www.texasroadhouse.com',
      external: true 
    },
  ],
}

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [error, setError] = useState('')

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email) {
      setError('Please enter your email address')
      return
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    // Simulate newsletter subscription (client-side only)
    setTimeout(() => {
      setSubscribed(true)
      setEmail('')
    }, 500)
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="text-white" style={{backgroundColor: '#110302'}}>
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Newsletter signup */}
            <div className="sm:col-span-2 lg:col-span-2">
              <h3 className="font-slab font-slab-bold text-lg sm:text-xl mb-3 sm:mb-4 text-texas-yellow">
                Stay Updated
              </h3>
              <p className="text-white/80 text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed">
                Get the latest menu updates, special offers, and food news delivered to your inbox.
              </p>
              
              {subscribed ? (
                <div className="flex items-center text-texas-yellow text-sm sm:text-base">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  <span>Thanks for subscribing!</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={error}
                    className="bg-white/10 border-white/20 text-white placeholder-white/60 text-sm sm:text-base"
                  />
                  <Button type="submit" className="w-full touch-manipulation bg-texas-yellow hover:bg-texas-yellow/90 text-texas-black font-bold">
                    Subscribe
                  </Button>
                </form>
              )}
            </div>

            {/* Menu links */}
            <div>
              <h3 className="font-slab font-slab-bold text-base sm:text-lg mb-3 sm:mb-4 text-texas-yellow">
                Menu
              </h3>
              <ul className="space-y-1.5 sm:space-y-2">
                {footerLinks.menu.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href as any}
                      className="text-white/80 hover:text-texas-yellow transition-colors duration-200 text-sm sm:text-base touch-manipulation block py-1"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company links */}
            <div>
              <h3 className="font-slab font-slab-bold text-base sm:text-lg mb-3 sm:mb-4 text-texas-yellow">
                Company
              </h3>
              <ul className="space-y-1.5 sm:space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href as any}
                      className="text-white/80 hover:text-texas-yellow transition-colors duration-200 text-sm sm:text-base touch-manipulation block py-1"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              
              <div className="mt-4 sm:mt-6">
                <h4 className="font-medium mb-2 text-texas-yellow text-sm sm:text-base">Official Site</h4>
                <a
                  href="https://www.texasroadhouse.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-texas-yellow transition-colors duration-200 flex items-center text-sm sm:text-base touch-manipulation py-1"
                >
                  Texas Roadhouse
                  <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-white/20 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="relative h-6 sm:h-8 w-auto">
                <Image
                  src="/Our Own Logo.png"
                  alt="Texas Roadhouse Menu Logo"
                  width={120}
                  height={32}
                  className="h-6 sm:h-8 w-auto object-contain opacity-80"
                />
              </div>
              <p className="text-white/80 text-xs sm:text-sm text-center sm:text-left">
                © {currentYear} Texas Roadhouse Menu. All rights reserved.
              </p>
            </div>
            
            <div className="text-center sm:text-right max-w-full sm:max-w-md">
              <p className="text-white/60 text-xs leading-relaxed px-2 sm:px-0">
                <strong>Disclaimer:</strong> Texas Roadhouse Menu is an independent informational site. 
                We are not affiliated with or endorsed by Texas Roadhouse. 
                All menu items, prices, and nutritional information are for reference only.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
