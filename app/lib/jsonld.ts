/**
 * Utilities for handling JSON-LD scripts in WordPress content
 */

export interface JsonLdResult {
  cleanedHtml: string
  jsonLd: string[]
}

/**
 * Split HTML content and extract JSON-LD script blocks
 * Removes <script type="application/ld+json"> blocks from HTML and returns them separately
 */
export function splitContentAndJsonLd(html: string): JsonLdResult {
  const jsonLd: string[] = []
  
  // Find and extract all JSON-LD script blocks (case-insensitive)
  const cleanedHtml = html.replace(
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    (_match, jsonContent) => {
      const trimmedJson = String(jsonContent).trim()
      if (trimmedJson) {
        jsonLd.push(trimmedJson)
      }
      return '' // Remove the script block from HTML
    }
  )
  
  return { cleanedHtml, jsonLd }
}

/**
 * Remove all script tags from HTML content (fallback method)
 * Use this if script content is being displayed as text
 */
export function stripAllScriptTags(html: string): string {
  return html.replace(/<script[\s\S]*?<\/script>/gi, '')
}

/**
 * Remove script content that may have been sanitized but left as text
 * Looks for JSON-LD patterns and removes them
 */
export function stripJsonLdText(html: string): string {
  // Remove obvious JSON-LD text patterns that may appear when scripts are sanitized
  return html
    // Remove standalone JSON-LD objects that start with {"@context":"https://schema.org"
    .replace(/\{"@context":\s*"https:\/\/schema\.org"[\s\S]*?\}(?=\s*(?:<|$))/gi, '')
    // Remove any remaining large JSON blocks
    .replace(/\{[\s\S]*?"@context"[\s\S]*?\}/gi, '')
    // Clean up any double spaces or newlines left behind
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Validate if a string is valid JSON
 */
export function isValidJson(str: string): boolean {
  try {
    JSON.parse(str)
    return true
  } catch {
    return false
  }
}

/**
 * Process WordPress content to clean JSON-LD and extract valid schemas
 */
export function processWordPressContent(html: string): JsonLdResult {
  // First try to extract proper script tags
  const result = splitContentAndJsonLd(html)
  
  // If no script tags found, try to clean up any JSON text that may be visible
  if (result.jsonLd.length === 0) {
    result.cleanedHtml = stripJsonLdText(result.cleanedHtml)
  }
  
  // Validate JSON-LD objects and filter out invalid ones
  result.jsonLd = result.jsonLd.filter(isValidJson)
  
  return result
}

export function stripJsonLdFromText(html: string): string {
  if (!html) return ''

  let cleaned = html

  // Remove <script type="application/ld+json">...</script>
  cleaned = cleaned.replace(
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi,
    ''
  )

  // Remove raw JSON blobs starting with "@context"
  cleaned = cleaned.replace(/\{[\s]*"@context"[\s\S]*?\}(?=<|$)/gi, '')

  // Remove arrays of JSON-LD
  cleaned = cleaned.replace(/\[\s*\{[\s\S]*?"@type"[\s\S]*?\}\s*\](?=<|$)/gi, '')

  return cleaned
}
