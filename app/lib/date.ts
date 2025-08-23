/**
 * Date utility functions for SEO freshness signals
 */

/**
 * Returns today's date in format: "Month Day, Year" (e.g., "August 22, 2025")
 * Used for displaying current dates in UI components
 */
export function getFormattedDate(): string {
  return new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long", 
    day: "numeric",
  })
}

/**
 * Returns today's date in ISO format for OpenGraph and SEO metadata
 * Used for machine-readable date formats
 */
export function getISODate(): string {
  return new Date().toISOString()
}

/**
 * Returns today's date in YYYY-MM-DD format for structured data
 * Used for schema.org markup
 */
export function getStructuredDate(): string {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Returns a human-readable relative date (e.g., "Today", "Yesterday", "2 days ago")
 * Used for enhanced user experience
 */
export function getRelativeDate(): string {
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  
  const diffTime = Math.abs(today.getTime() - yesterday.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return "Today"
  if (diffDays === 1) return "Yesterday"
  if (diffDays <= 7) return `${diffDays} days ago`
  
  return getFormattedDate()
}

/**
 * Returns date with timezone for better SEO
 * Used for location-specific freshness signals
 */
export function getLocalizedDate(): string {
  return new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/New_York", // Texas timezone
  })
}
