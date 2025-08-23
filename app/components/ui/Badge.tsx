import { clsx } from 'clsx'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'new' | 'popular' | 'default' | 'category'
  size?: 'sm' | 'md'
  className?: string
}

export function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
  const baseClasses = 'inline-flex items-center font-medium rounded-full'
  
  const variantClasses = {
    new: 'bg-green text-white',
    popular: 'bg-orange text-white',
    default: 'bg-stone/10 text-stone',
    category: 'bg-sand text-wood border border-wood/20',
  }
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  }

  return (
    <span
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  )
}

interface TagProps {
  children: React.ReactNode
  onClick?: () => void
  isActive?: boolean
  className?: string
}

export function Tag({ children, onClick, isActive, className }: TagProps) {
  const Component = onClick ? 'button' : 'span'
  
  return (
    <Component
      onClick={onClick}
      className={clsx(
        'inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200',
        onClick && 'cursor-pointer hover:bg-orange/10 focus:outline-none focus:ring-2 focus:ring-orange',
        isActive ? 'bg-orange text-white' : 'bg-stone/10 text-stone hover:bg-stone/20',
        className
      )}
    >
      {children}
    </Component>
  )
}
