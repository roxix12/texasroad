/**
 * Utility functions for handling headings and table of contents
 */

export interface TocItem {
  id: string
  text: string
  level: 2 | 3
}

/**
 * Convert a string to a URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

/**
 * Inject stable ID attributes into H2 and H3 elements if they don't already have them
 */
export function injectIds(html: string): string {
  return html.replace(/<(h[23])([^>]*)>(.*?)<\/h[23]>/gi, (match, tag, attrs, content) => {
    // Check if ID already exists
    const hasId = /\bid\s*=/.test(attrs)
    
    if (hasId) {
      return match // Return unchanged if ID exists
    }
    
    // Strip HTML tags from content to get clean text
    const cleanText = content.replace(/<[^>]*>/g, '')
    const id = slugify(cleanText)
    
    // Add ID attribute
    const newAttrs = attrs.trim() ? `${attrs} id="${id}"` : `id="${id}"`
    return `<${tag} ${newAttrs}>${content}</${tag}>`
  })
}

/**
 * Extract table of contents items from HTML (H2 and H3 only)
 */
export function extractToc(html: string): TocItem[] {
  const tocItems: TocItem[] = []
  
  // Match H2 and H3 tags
  const headingRegex = /<h([23])([^>]*?)>(.*?)<\/h[23]>/gi
  let match
  
  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1]) as 2 | 3
    const attrs = match[2]
    const content = match[3]
    
    // Extract ID from attributes
    const idMatch = /\bid\s*=\s*["']([^"']+)["']/i.exec(attrs)
    let id = idMatch ? idMatch[1] : ''
    
    // If no ID found, generate one from content
    if (!id) {
      const cleanText = content.replace(/<[^>]*>/g, '')
      id = slugify(cleanText)
    }
    
    // Get clean text content
    const text = content.replace(/<[^>]*>/g, '').trim()
    
    if (text && id) {
      tocItems.push({ id, text, level })
    }
  }
  
  return tocItems
}

/**
 * Process HTML content: inject IDs and extract TOC
 */
export function processContent(html: string): {
  processedHtml: string
  tocItems: TocItem[]
} {
  const processedHtml = injectIds(html)
  const tocItems = extractToc(processedHtml)
  
  return {
    processedHtml,
    tocItems,
  }
}
