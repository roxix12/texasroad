import Link from 'next/link'
import { WPCategory } from '@/lib/types'
import { Tag } from '@/components/ui'

interface CategoryPillsProps {
  categories: WPCategory[]
  activeCategory?: string
  showAll?: boolean
}

export function CategoryPills({ categories, activeCategory, showAll = true }: CategoryPillsProps) {
  if (categories.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-3">
      {showAll && (
        <Link href="/posts">
          <Tag isActive={!activeCategory}>
            All Posts
          </Tag>
        </Link>
      )}
      
      {categories.map((category) => (
        <Link key={category.slug} href={`/categories/${category.slug}`}>
          <Tag isActive={activeCategory === category.slug}>
            {category.name}
            {category.count && (
              <span className="ml-1 text-xs opacity-75">
                ({category.count})
              </span>
            )}
          </Tag>
        </Link>
      ))}
    </div>
  )
}

interface CategoryListProps {
  categories: WPCategory[]
  activeCategory?: string
}

export function CategoryList({ categories, activeCategory }: CategoryListProps) {
  if (categories.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-stone/60">No categories available.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="font-slab font-slab-bold text-lg text-stone mb-4">
        Categories
      </h3>
      
      <div className="space-y-2">
        <Link 
          href="/posts"
          className={`block px-3 py-2 rounded-md transition-colors duration-200 ${
            !activeCategory 
              ? 'bg-orange text-white' 
              : 'text-stone hover:bg-stone/5'
          }`}
        >
          All Posts
        </Link>
        
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/categories/${category.slug}`}
            className={`block px-3 py-2 rounded-md transition-colors duration-200 ${
              activeCategory === category.slug
                ? 'bg-orange text-white'
                : 'text-stone hover:bg-stone/5'
            }`}
          >
            <div className="flex justify-between items-center">
              <span>{category.name}</span>
              {category.count && (
                <span className="text-sm opacity-75">
                  {category.count}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
