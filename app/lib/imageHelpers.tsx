import Image from 'next/image'
import parse, { HTMLReactParserOptions, Element } from 'html-react-parser'
import { ReactNode } from 'react'

/**
 * Generate a shimmer SVG for blur placeholders
 * @param width - Width of the shimmer
 * @param height - Height of the shimmer
 * @returns SVG string for blur placeholder
 */
export const shimmer = (width: number, height: number): string => `
<svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f6f7f8" offset="20%" />
      <stop stop-color="#edeef1" offset="50%" />
      <stop stop-color="#f6f7f8" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="#f6f7f8" />
  <rect id="r" width="${width}" height="${height}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${width}" to="${width}" dur="1s" repeatCount="indefinite"  />
</svg>`

/**
 * Convert string to base64 (server-safe)
 * @param str - String to encode
 * @returns Base64 encoded string
 */
export const toBase64 = (str: string): string => {
  // Use Buffer for server-side, fallback to btoa for client-side
  if (typeof window === 'undefined') {
    return Buffer.from(str).toString('base64')
  } else {
    return window.btoa(str)
  }
}

/**
 * Check if URL is from WordPress media (our domains)
 * @param src - Image source URL
 * @returns boolean indicating if it's WordPress media
 */
const isWordPressMedia = (src: string): boolean => {
  const wordpressDomains = [
    'admin.texasroadhouse-menus.us',
    'texasroadhouse-menus.us'
  ]
  
  try {
    const url = new URL(src)
    return wordpressDomains.some(domain => url.hostname.includes(domain))
  } catch {
    return false
  }
}

/**
 * Parse HTML content and replace <img> tags with optimized components
 * - WordPress media images → Next.js <Image> component
 * - External images → responsive <img> with proper styling
 * @param html - HTML string to parse
 * @returns ReactNode with optimized images
 */
export function parseHtmlToNextImage(html: string): ReactNode {
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      // Check if it's an img element
      if (domNode instanceof Element && domNode.name === 'img') {
        const { attribs } = domNode
        
        // Extract image attributes
        const src = attribs.src
        const alt = attribs.alt || ''
        const width = parseInt(attribs.width) || 1200
        const height = parseInt(attribs.height) || 800
        
        // Skip if no src
        if (!src) return domNode
        
        // Debug logging for content images
        console.log('Content Image Debug:', {
          src,
          alt,
          width,
          height,
          isWordPressMedia: isWordPressMedia(src)
        })
        
        // If it's WordPress media, use Next.js Image for optimization
        if (isWordPressMedia(src)) {
          return (
            <div className="my-6 mx-auto max-w-full">
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 800px"
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(16, 10))}`}
                loading="lazy"
                style={{ 
                  height: 'auto', 
                  width: '100%',
                  maxWidth: '100%',
                  display: 'block',
                  margin: '0 auto'
                }}
                className="rounded-lg shadow-sm"
              />
            </div>
          )
        } else {
          // For external images, use responsive img tag with proper styling
          return (
            <div className="my-6 mx-auto max-w-full">
              <img
                src={src}
                alt={alt}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  display: 'block',
                  margin: '0 auto'
                }}
                className="rounded-lg shadow-sm"
                loading="lazy"
              />
            </div>
          )
        }
      }
      
      // Return original node if not an img
      return domNode
    }
  }
  
  return parse(html, options)
}

/**
 * Get optimized blur data URL for featured images
 * @param width - Image width
 * @param height - Image height
 * @returns Blur data URL
 */
export const getBlurDataURL = (width: number = 16, height: number = 10): string => {
  return `data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`
}

/**
 * Extract image dimensions from WordPress media details
 * @param mediaDetails - WordPress media details object
 * @returns Object with width and height
 */
export const getImageDimensions = (mediaDetails: any) => {
  return {
    width: mediaDetails?.width || 1200,
    height: mediaDetails?.height || 800
  }
}
