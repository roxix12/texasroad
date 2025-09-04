import Link from 'next/link'
import { Button } from '@/components/ui'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-sand flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="text-6xl font-slab font-slab-extra text-orange mb-6">
          404
        </div>
        
        <h1 className="text-2xl font-slab font-slab-extra text-stone mb-4">
          Page Not Found
        </h1>
        
        <p className="text-stone/70 mb-8">
          Sorry, we couldn't find the page you're looking for.
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
  )
}
