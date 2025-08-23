import { MenuFields } from '@/lib/types'
import { Badge } from '@/components/ui'

interface NutritionFactsProps {
  menuFields: MenuFields
  className?: string
}

export function NutritionFacts({ menuFields, className = '' }: NutritionFactsProps) {
  const { calories, allergens } = menuFields

  if (!calories && (!allergens || allergens.length === 0)) {
    return null
  }

  return (
    <div className={`bg-sand/30 rounded-lg p-6 ${className}`}>
      <h3 className="font-slab font-slab-bold text-lg text-stone mb-4">
        Nutrition & Allergen Information
      </h3>
      
      <div className="space-y-4">
        {calories && (
          <div className="flex items-center justify-between">
            <span className="text-stone/70">Calories:</span>
            <span className="font-medium text-stone">{calories}</span>
          </div>
        )}
        
        {allergens && allergens.length > 0 && (
          <div>
            <div className="text-stone/70 mb-2">Contains allergens:</div>
            <div className="flex flex-wrap gap-2">
              {allergens.map((allergen) => (
                <Badge key={allergen} variant="default" size="sm">
                  {allergen}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4 pt-4 border-t border-stone/20">
        <p className="text-xs text-stone/60">
          * Nutrition information is approximate and may vary based on preparation methods and ingredients.
          Please inform your server of any allergies or dietary restrictions.
        </p>
      </div>
    </div>
  )
}

interface AllergenWarningProps {
  allergens: string[]
  className?: string
}

export function AllergenWarning({ allergens, className = '' }: AllergenWarningProps) {
  if (!allergens || allergens.length === 0) {
    return null
  }

  return (
    <div className={`bg-orange/10 border border-orange/20 rounded-lg p-4 ${className}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-orange mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h4 className="text-sm font-medium text-orange">
            Allergen Information
          </h4>
          <div className="mt-1">
            <p className="text-sm text-stone/70">
              This item contains: {allergens.join(', ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
