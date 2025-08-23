import Link from 'next/link'
import { Button } from '@/components/ui'
import { PageHero } from '@/components/layout'

export default function NotFound() {
  return (
    <>
      <PageHero
        title="Page Not Found"
        subtitle="Sorry, we couldn't find the page you're looking for."
      />
      
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-6xl font-slab font-slab-extra text-orange mb-6">
              404
            </div>
            
            <p className="text-stone/70 mb-8">
              The page you're looking for might have been moved, deleted, or doesn't exist.
            </p>
            
            <div className="space-y-4">
              <Link href="/">
                <Button variant="primary" size="lg" className="w-full">
                  Go Home
                </Button>
              </Link>
              
              <Link href="/menus-prices">
                <Button variant="outline" size="lg" className="w-full">
                  Browse Menus
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
