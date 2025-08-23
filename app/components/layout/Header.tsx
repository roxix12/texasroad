'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui'
import { NavItem } from '@/lib/types'

const navigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Menu & Prices', href: '/menus-prices' },
  { label: 'Coupons', href: '/coupons' },
  { label: 'Blog', href: '/posts' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 shadow-md" style={{backgroundColor: '#110302'}}>
      <nav className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="relative h-8 sm:h-10 lg:h-12 w-auto">
                <Image
                  src="/Our Own Logo.png"
                  alt="Texas Roadhouse Menu Logo"
                  width={200}
                  height={48}
                  className="h-8 sm:h-10 lg:h-12 w-auto object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href as any}
                className={`text-white hover:text-texas-yellow transition-colors duration-200 font-medium ${
                  isActive(item.href) ? 'text-texas-yellow' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <Link href="/coupons">
              <Button variant="primary">
                View Coupons
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-brand-yellow transition-colors duration-200 p-2 -mr-2 touch-manipulation"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-white/20">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href as any}
                  className={`block px-3 py-2 text-white hover:text-brand-yellow hover:bg-brand-yellow/10 transition-colors duration-200 rounded-md font-medium ${
                    isActive(item.href) ? 'text-brand-yellow bg-brand-yellow/10' : ''
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="px-3 py-2">
                <Link href="/#coupons" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full">
                    View Coupons
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
