'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const router = useRouter()
  
  return (
    <nav className={`flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm breadcrumb-container ${className}`} aria-label="Breadcrumb">
      <button 
        onClick={() => {
          console.log('Home breadcrumb clicked');
          router.push('/');
        }}
        className="text-white/80 hover:text-texas-yellow transition-colors duration-200 flex items-center flex-shrink-0 p-1 touch-manipulation cursor-pointer pointer-events-auto"
      >
        <Home className="h-3 w-3 sm:h-4 sm:w-4" />
        <span className="sr-only">Home</span>
      </button>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-white/60" />
          
          {item.href && index < items.length - 1 ? (
            <button 
              onClick={() => {
                console.log('Breadcrumb clicked:', item.label, 'href:', item.href);
                router.push(item.href! as any);
              }}
              className="text-white/80 hover:text-texas-yellow transition-colors duration-200 whitespace-nowrap p-1 touch-manipulation cursor-pointer pointer-events-auto"
            >
              <span className="hidden sm:inline">{item.label}</span>
              <span className="sm:hidden">{item.label.length > 15 ? `${item.label.slice(0, 15)}...` : item.label}</span>
            </button>
          ) : (
            <span className="text-white font-medium whitespace-nowrap">
              <span className="hidden sm:inline">{item.label}</span>
              <span className="sm:hidden">{item.label.length > 20 ? `${item.label.slice(0, 20)}...` : item.label}</span>
            </span>
          )}
        </div>
      ))}
    </nav>
  )
}

// Common breadcrumb configurations
export function PostBreadcrumbs({ 
  categoryName, 
  categorySlug, 
  postTitle 
}: { 
  categoryName?: string
  categorySlug?: string
  postTitle: string 
}) {
  const items: BreadcrumbItem[] = [
    { label: 'Blog', href: '/posts' }
  ]
  
  if (categoryName && categorySlug) {
    items.push({ label: categoryName, href: `/categories/${categorySlug}` })
  }
  
  items.push({ label: postTitle })
  
  return <Breadcrumbs items={items} />
}

export function CategoryBreadcrumbs({ categoryName }: { categoryName: string }) {
  const items: BreadcrumbItem[] = [
    { label: 'Blog', href: '/posts' },
    { label: categoryName }
  ]
  
  return <Breadcrumbs items={items} />
}

export function MenuBreadcrumbs({ 
  menuTitle,
  category 
}: { 
  menuTitle: string
  category?: string 
}) {
  const items: BreadcrumbItem[] = [
            { label: 'Menus', href: '/menus-prices' }
  ]
  
  if (category) {
            items.push({ label: category, href: `/menus-prices?category=${encodeURIComponent(category)}` })
  }
  
  items.push({ label: menuTitle })
  
  return <Breadcrumbs items={items} />
}
