import { Metadata } from 'next'
import { PageHero } from '@/components/layout'
import { GiftCardsSEOSection } from '@/components/seo/gift-cards-seo-section'
import GiftCardContent from './content'

export const metadata: Metadata = {
  title: 'Texas Roadhouse Gift Cards - Perfect for Any Occasion',
  description: 'Give the gift of legendary steaks and fall-off-the-bone ribs. Texas Roadhouse gift cards are perfect for birthdays, holidays, and special occasions. Check your balance and purchase online.',
  keywords: [
    'Texas Roadhouse gift cards',
    'restaurant gift cards',
    'gift card balance',
    'buy gift cards online',
    'Texas Roadhouse presents',
    'dining gift cards'
  ],
  openGraph: {
    title: 'Texas Roadhouse Gift Cards - Perfect for Any Occasion',
    description: 'Give the gift of legendary steaks and fall-off-the-bone ribs. Purchase Texas Roadhouse gift cards online.',
    type: 'website',
    images: [
      {
        url: '/images/gift-cards/hero-gift-cards.jpg',
        width: 1200,
        height: 630,
        alt: 'Texas Roadhouse Gift Cards'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Texas Roadhouse Gift Cards - Perfect for Any Occasion',
    description: 'Give the gift of legendary steaks and fall-off-the-bone ribs.',
    images: ['/images/gift-cards/hero-gift-cards.jpg']
  }
}

export default function GiftCardsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <PageHero
        title="Texas Roadhouse Gift Cards"
        subtitle="Give the gift of legendary steaks, fall-off-the-bone ribs, and our famous fresh-baked bread"
        backgroundImage="/images/gift-cards/hero-gift-cards.jpg"
        className="bg-gradient-to-r from-red-900 via-red-800 to-amber-600"
      />
      
      {/* SEO-Optimized Gift Cards Content Section */}
      <GiftCardsSEOSection />
      
      <GiftCardContent />
    </div>
  )
}
