'use client'

import { useEffect, useState } from 'react'
import { TocItem } from '@/lib/heading'

interface TableOfContentsProps {
  items: TocItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (items.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-100px 0px -66%',
        threshold: 0
      }
    )

    // Observe all headings
    items.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [items])

  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
      setActiveId(id)
    }
  }

  if (items.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-lg border border-stone/10 p-4 sm:p-6 shadow-sm">
      <h3 className="font-slab font-bold text-sm sm:text-base lg:text-lg mb-3 sm:mb-4 flex items-center">
        <svg 
          className="w-4 h-4 sm:w-5 sm:h-5 mr-2" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 6h16M4 10h16M4 14h16M4 18h16" 
          />
        </svg>
        Table of Contents
      </h3>
      
      <nav className="space-y-1">
        {items.map(({ id, text, level }) => (
          <button
            key={id}
            onClick={() => handleClick(id)}
            className={`
              block w-full text-left px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm rounded-md transition-colors duration-200 touch-manipulation
              ${level === 3 ? 'ml-3 sm:ml-4 text-xs sm:text-sm' : 'text-sm sm:text-base'}
              ${
                activeId === id
                  ? 'bg-stone/5 font-medium border-l-2 border-orange text-stone'
                  : 'hover:bg-stone/5 border-l-2 border-transparent hover:border-stone/20 text-stone/70 hover:text-stone'
              }
            `}
          >
            {text}
          </button>
        ))}
      </nav>
    </div>
  )
}
