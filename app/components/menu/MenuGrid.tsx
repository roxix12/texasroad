import { Menu } from '@/lib/types'
import { MenuCard, MenuListItem } from './MenuCard'
import { MenuSkeleton } from '@/components/ui'

interface MenuGridProps {
  menus: Menu[]
  loading?: boolean
  viewMode?: 'grid' | 'list'
  showCategory?: boolean
}

export function MenuGrid({ 
  menus, 
  loading = false, 
  viewMode = 'grid',
  showCategory = false
}: MenuGridProps) {
  if (loading) {
    return (
      <div className={viewMode === 'grid' ? 'grid gap-6 md:grid-cols-2 lg:grid-cols-3' : 'space-y-4'}>
        {Array.from({ length: 6 }).map((_, index) => (
          <MenuSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (menus.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-slab font-slab-bold text-stone mb-2">
          No menu items found
        </h3>
        <p className="text-stone/60">
          Try adjusting your filters or check back later for new items.
        </p>
      </div>
    )
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {menus.map((menu) => (
          <MenuListItem key={menu.id} menu={menu} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {menus.map((menu) => (
        <MenuCard key={menu.id} menu={menu} showCategory={showCategory} />
      ))}
    </div>
  )
}

interface FeaturedMenusProps {
  menus: Menu[]
  loading?: boolean
  title?: string
}

export function FeaturedMenus({ menus, loading = false, title = "Featured Items" }: FeaturedMenusProps) {
  if (loading) {
    return (
      <div>
        <h2 className="text-2xl font-slab font-slab-bold text-stone mb-6">
          {title}
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <MenuSkeleton key={index} />
          ))}
        </div>
      </div>
    )
  }

  if (menus.length === 0) {
    return null
  }

  return (
    <div>
      <h2 className="text-2xl font-slab font-slab-bold text-stone mb-6">
        {title}
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {menus.map((menu) => (
          <MenuCard key={menu.id} menu={menu} showCategory />
        ))}
      </div>
    </div>
  )
}
