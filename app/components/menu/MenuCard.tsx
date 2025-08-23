import Image from 'next/image'
import Link from 'next/link'
import { Menu } from '@/lib/types'
import { formatPrice } from '@/lib/format'
import { Badge } from '@/components/ui'
import { Star, Flame } from 'lucide-react'

interface MenuCardProps {
  menu: Menu
  showCategory?: boolean
}

export function MenuCard({ menu, showCategory = false }: MenuCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {menu.featuredImage && (
        <div className="relative h-32 overflow-hidden">
          <Link href={`/menus/${menu.slug}`}>
            <Image
              src={menu.featuredImage.node.sourceUrl}
              alt={menu.featuredImage.node.altText || menu.title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Link>
          
          {/* Price badge overlay */}
          <div className="absolute top-3 right-3">
            <div className="bg-orange text-white px-2 py-1 rounded-md font-slab font-slab-bold text-sm shadow-lg">
              {formatPrice(menu.menuFields.price)}
            </div>
          </div>
        </div>
      )}
      
      <div className="p-4">
        {/* Title and badges */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-slab font-slab-bold text-lg text-stone line-clamp-2 flex-1">
            <Link 
              href={`/menus/${menu.slug}`}
              className="hover:text-orange transition-colors duration-200"
            >
              {menu.title}
            </Link>
          </h3>
          
          <div className="flex gap-1 ml-2">
            {menu.menuFields.isNew && (
              <Badge variant="new" size="sm">
                <Flame className="h-3 w-3 mr-1" />
                New
              </Badge>
            )}
            {menu.menuFields.isPopular && (
              <Badge variant="popular" size="sm">
                <Star className="h-3 w-3 mr-1" />
                Popular
              </Badge>
            )}
          </div>
        </div>
        
        {/* Category */}
        {showCategory && (
          <div className="mb-2">
            <Badge variant="category" size="sm">
              {menu.menuFields.category}
            </Badge>
          </div>
        )}
        
        {/* Description */}
        <p className="text-stone/70 text-sm mb-3 line-clamp-3">
          {menu.menuFields.description}
        </p>
        
        {/* Bottom row: Calories and Price */}
        <div className="flex justify-between items-center">
          <div className="text-xs text-stone/60">
            {menu.menuFields.calories && (
              <span>{menu.menuFields.calories} cal</span>
            )}
          </div>
          
          {!menu.featuredImage && (
            <div className="font-slab font-slab-bold text-orange">
              {formatPrice(menu.menuFields.price)}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

interface MenuListItemProps {
  menu: Menu
}

export function MenuListItem({ menu }: MenuListItemProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-stone/10 p-6 transition-all duration-300 hover:shadow-md">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-start gap-4">
            {menu.featuredImage && (
              <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={menu.featuredImage.node.sourceUrl}
                  alt={menu.featuredImage.node.altText || menu.title}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-slab font-slab-bold text-lg text-stone mb-1">
                    <Link 
                      href={`/menus/${menu.slug}`}
                      className="hover:text-orange transition-colors duration-200"
                    >
                      {menu.title}
                    </Link>
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="category" size="sm">
                      {menu.menuFields.category}
                    </Badge>
                    
                    {menu.menuFields.isNew && (
                      <Badge variant="new" size="sm">
                        New
                      </Badge>
                    )}
                    
                    {menu.menuFields.isPopular && (
                      <Badge variant="popular" size="sm">
                        Popular
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-stone/70 text-sm line-clamp-2">
                    {menu.menuFields.description}
                  </p>
                </div>
                
                <div className="text-right flex-shrink-0">
                  <div className="font-slab font-slab-bold text-xl text-orange mb-1">
                    {formatPrice(menu.menuFields.price)}
                  </div>
                  {menu.menuFields.calories && (
                    <div className="text-xs text-stone/60">
                      {menu.menuFields.calories} cal
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
