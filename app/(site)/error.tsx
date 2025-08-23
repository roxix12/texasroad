'use client'

import { useEffect } from 'react'
import { PageHero } from '@/components/layout'
import { Button } from '@/components/ui'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Page error:', error)
  }, [error])

  return (
    <>
      <PageHero
        title="Something went wrong"
        subtitle="We encountered an unexpected error while loading this page"
      />
      
      <div className="py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 mb-8">
            <h2 className="font-slab font-slab-bold text-xl text-red-800 mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-red-700 mb-6">
              We're sorry for the inconvenience. An unexpected error occurred while loading this page.
            </p>
            
            <div className="space-y-4">
              <Button onClick={reset} variant="primary" size="lg" className="w-full">
                Try Again
              </Button>
              
              <a href="/">
                <Button variant="outline" size="lg" className="w-full">
                  Go to Homepage
                </Button>
              </a>
            </div>
          </div>
          
          <div className="text-stone/60 text-sm">
            <p>
              If this problem continues, please{' '}
              <a href="/contact" className="text-orange hover:text-orange/80 underline">
                contact us
              </a>{' '}
              and let us know what you were trying to do.
            </p>
          </div>
          
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-8 text-left bg-red-50 border border-red-200 rounded-lg p-4">
              <summary className="cursor-pointer text-red-800 font-medium">
                Error Details (Development Only)
              </summary>
              <pre className="mt-2 text-sm text-red-700 overflow-auto whitespace-pre-wrap">
                {error.message}
                {error.stack && (
                  <>
                    {'\n\n'}
                    {error.stack}
                  </>
                )}
              </pre>
            </details>
          )}
        </div>
      </div>
    </>
  )
}
