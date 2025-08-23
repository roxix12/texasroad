import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { PageHero } from '@/components/layout'
import { MenuBreadcrumbs } from '@/components/blog'
import { Badge, Button } from '@/components/ui'
import { NutritionFacts, AllergenWarning } from '@/components/menu'
import { getMenuBySlug, getMenus } from '@/lib/data'
import { formatPrice } from '@/lib/format'
import { stripJsonLdFromText } from '@/lib/jsonld'
import { Star, Flame, ArrowLeft } from 'lucide-react'

interface MenuPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const menus = await getMenus()
  return menus.map((menu) => ({
    slug: menu.slug,
  }))
}

export async function generateMetadata({ params }: MenuPageProps): Promise<Metadata> {
  const { slug } = await params
  const menu = await getMenuBySlug(slug)
  
  if (!menu) {
    return {
      title: 'Menu Item Not Found',
    }
  }

  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Texas Roadhouse Menu'
  
  return {
    title: `${menu.title} - ${formatPrice(menu.menuFields.price)}`,
    description: menu.menuFields.description,
    openGraph: {
      title: `${menu.title} - ${siteName}`,
      description: menu.menuFields.description,
      images: menu.featuredImage ? [menu.featuredImage.node.sourceUrl] : [],
    },
    alternates: {
      canonical: `/menus/${menu.slug}`,
    },
  }
}

export default async function MenuPage({ params }: MenuPageProps) {
  const { slug } = await params
  const menu = await getMenuBySlug(slug)
  
  if (!menu) {
    notFound()
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'MenuItem',
    name: menu.title,
    description: menu.menuFields.description,
    offers: {
      '@type': 'Offer',
      price: menu.menuFields.price,
      priceCurrency: 'USD',
    },
    ...(menu.menuFields.calories && {
      nutrition: {
        '@type': 'NutritionInformation',
        calories: menu.menuFields.calories,
      },
    }),
    ...(menu.featuredImage && {
      image: menu.featuredImage.node.sourceUrl,
    }),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <PageHero
        title={menu.title}
        subtitle={`${menu.menuFields.category} • ${formatPrice(menu.menuFields.price)}`}
        breadcrumbs={
          <MenuBreadcrumbs 
            menuTitle={menu.title}
            category={menu.menuFields.category}
          />
        }
      />
      
      <div className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <div className="mb-8">
            <Link href="/menus" className="inline-flex items-center text-stone/70 hover:text-orange transition-colors duration-200">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Menu
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Image */}
            <div>
              {menu.featuredImage && (
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={menu.featuredImage.node.sourceUrl}
                    alt={menu.featuredImage.node.altText || menu.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              )}
            </div>

            {/* Content */}
            <div>
              {/* Price and badges */}
              <div className="flex items-start justify-between mb-4">
                <div className="font-slab font-slab-extra text-3xl text-orange">
                  {formatPrice(menu.menuFields.price)}
                </div>
                
                <div className="flex gap-2">
                  {menu.menuFields.isNew && (
                    <Badge variant="new">
                      <Flame className="h-3 w-3 mr-1" />
                      New
                    </Badge>
                  )}
                  {menu.menuFields.isPopular && (
                    <Badge variant="popular">
                      <Star className="h-3 w-3 mr-1" />
                      Popular
                    </Badge>
                  )}
                </div>
              </div>

              {/* Category */}
              <div className="mb-4">
                <Badge variant="category" size="md">
                  {menu.menuFields.category}
                </Badge>
              </div>

              {/* Description */}
              <div className="prose prose-stone max-w-none mb-6">
                <p className="text-lg text-stone/80 leading-relaxed">
                  {menu.menuFields.description}
                </p>
                
                {menu.content && (
                  <div 
                    className="mt-4 text-stone/70"
                    dangerouslySetInnerHTML={{ __html: stripJsonLdFromText(menu.content) }}
                  />
                )}
              </div>

              {/* Quick nutrition info */}
              {menu.menuFields.calories && (
                <div className="bg-sand/30 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-stone">Calories:</span>
                    <span className="text-lg font-slab font-slab-bold text-stone">
                      {menu.menuFields.calories}
                    </span>
                  </div>
                </div>
              )}

              {/* Allergen warning */}
              {menu.menuFields.allergens && menu.menuFields.allergens.length > 0 && (
                <AllergenWarning 
                  allergens={menu.menuFields.allergens}
                  className="mb-6"
                />
              )}

              {/* CTA */}
              <div className="space-y-3">
                <Link href="/contact">
                  <Button variant="primary" size="lg" className="w-full">
                    Find a Location
                  </Button>
                </Link>
                <Link href="/menus">
                  <Button variant="outline" size="lg" className="w-full">
                    Browse More Items
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Detailed nutrition facts */}
          <div className="mt-12">
            <NutritionFacts menuFields={menu.menuFields} />
          </div>
        </div>
      </div>
    </>
  )
}
