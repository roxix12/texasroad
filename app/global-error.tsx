'use client'

import { useEffect } from 'react'
import { Button } from './components/ui'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global error:', error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-cream px-4">
          <div className="text-center max-w-md">
            <div className="text-6xl font-slab font-slab-extra text-orange mb-6">
              500
            </div>
            
            <h1 className="font-slab font-slab-bold text-2xl text-stone mb-4">
              Something went wrong!
            </h1>
            
            <p className="text-stone/70 mb-8">
              We're sorry, but something unexpected happened. Please try again or contact us if the problem persists.
            </p>
            
            <div className="space-y-4">
              <Button onClick={reset} variant="primary" size="lg" className="w-full">
                Try Again
              </Button>
              
              <a href="/">
                <Button variant="outline" size="lg" className="w-full">
                  Go Home
                </Button>
              </a>
            </div>
            
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-8 text-left bg-red-50 border border-red-200 rounded-lg p-4">
                <summary className="cursor-pointer text-red-800 font-medium">
                  Error Details (Development Only)
                </summary>
                <pre className="mt-2 text-sm text-red-700 overflow-auto">
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
      </body>
    </html>
  )
}
