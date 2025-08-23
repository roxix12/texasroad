'use client'

import { ReactNode, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface ArticleLayoutProps {
  sidebar: ReactNode
  children: ReactNode
}

export function ArticleLayout({ sidebar, children }: ArticleLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="mx-auto max-w-6xl px-3 sm:px-6 lg:px-8">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center justify-between w-full p-3 bg-sand/10 rounded-lg border border-stone/10 text-stone font-medium touch-manipulation"
          aria-expanded={sidebarOpen}
          aria-controls="mobile-sidebar"
        >
          <span>Article Navigation & Info</span>
          {sidebarOpen ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 lg:gap-8">
        {/* Sidebar */}
        <aside className={`
          order-2 lg:order-1
          ${sidebarOpen ? 'block' : 'hidden lg:block'}
        `} id="mobile-sidebar">
          <div className="lg:sticky lg:top-24 space-y-4 lg:space-y-6">
            {sidebar}
          </div>
        </aside>

        {/* Main Content */}
        <main className="order-1 lg:order-2 min-w-0">
          {children}
        </main>
      </div>
    </div>
  )
}
