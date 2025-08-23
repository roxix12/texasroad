import { stripJsonLdFromText } from '@/lib/jsonld'

interface ArticleProseProps {
  html: string
  className?: string
}

// Function to wrap tables in responsive containers
function wrapTablesForResponsive(html: string): string {
  return html.replace(
    /<table([^>]*)>/g,
    '<div class="table-wrapper"><table$1>'
  ).replace(
    /<\/table>/g,
    '</table></div>'
  )
}

// Function to enhance images for better responsiveness and consistency
function enhanceImagesForResponsive(html: string): string {
  return html
    // Add loading="lazy" to all images for performance
    .replace(/<img([^>]*?)(?:\s+loading="[^"]*")?([^>]*?)>/gi, '<img$1 loading="lazy"$2>')
    // Ensure all images have proper alt attributes (add empty alt if missing)
    .replace(/<img(?![^>]*alt=)([^>]*?)>/gi, '<img alt=""$1>')
    // Remove any inline width/height attributes that might conflict with responsive CSS
    .replace(/<img([^>]*?)\s+(?:width|height)="[^"]*"([^>]*?)>/gi, '<img$1$2>')
    // Add decoding="async" for better performance
    .replace(/<img([^>]*?)(?:\s+decoding="[^"]*")?([^>]*?)>/gi, '<img$1 decoding="async"$2>')
}

export function ArticleProse({ html, className = '' }: ArticleProseProps) {
  const cleanedHtml = stripJsonLdFromText(html)
  const tableWrappedHtml = wrapTablesForResponsive(cleanedHtml)
  const responsiveHtml = enhanceImagesForResponsive(tableWrappedHtml)
  
  return (
    <div className="responsive-article-container">
      <article 
        className={`
          prose prose-sm sm:prose-base lg:prose-lg prose-stone max-w-none
          
          /* Mobile-first typography with clamp() for responsive scaling */
          prose-headings:font-slab prose-headings:font-bold prose-headings:leading-tight prose-headings:text-black prose-headings:text-left
          
          /* Responsive heading sizes using clamp() */
          prose-h1:text-xl sm:prose-h1:text-2xl lg:prose-h1:text-3xl xl:prose-h1:text-4xl
          prose-h1:border-b prose-h1:border-stone/20 prose-h1:pb-2 sm:prose-h1:pb-3 lg:prose-h1:pb-4
          prose-h1:mb-4 sm:prose-h1:mb-5 lg:prose-h1:mb-6
          prose-h1:mt-0
          
          prose-h2:text-lg sm:prose-h2:text-xl lg:prose-h2:text-2xl xl:prose-h2:text-3xl
          prose-h2:mt-6 sm:prose-h2:mt-8 lg:prose-h2:mt-10
          prose-h2:mb-3 sm:prose-h2:mb-4 lg:prose-h2:mb-5
          
          prose-h3:text-base sm:prose-h3:text-lg lg:prose-h3:text-xl xl:prose-h3:text-2xl
          prose-h3:mt-5 sm:prose-h3:mt-6 lg:prose-h3:mt-8
          prose-h3:mb-2 sm:prose-h3:mb-3 lg:prose-h3:mb-4
          
          prose-h4:text-sm sm:prose-h4:text-base lg:prose-h4:text-lg xl:prose-h4:text-xl
          prose-h4:mt-4 sm:prose-h4:mt-5 lg:prose-h4:mt-6
          prose-h4:mb-2 sm:prose-h4:mb-3
          
          /* Responsive paragraph spacing and line height for readability */
          prose-p:text-sm sm:prose-p:text-base lg:prose-p:text-lg
          prose-p:leading-relaxed sm:prose-p:leading-relaxed lg:prose-p:leading-relaxed
          prose-p:mb-3 sm:prose-p:mb-4 lg:prose-p:mb-5
          prose-p:text-stone/80
          prose-p:max-w-none
          
          /* Note: Image styling is handled by custom CSS in globals.css for better control */
          
          /* Mobile-friendly lists */
          prose-ul:my-3 sm:prose-ul:my-4 lg:prose-ul:my-5
          prose-ol:my-3 sm:prose-ol:my-4 lg:prose-ol:my-5
          prose-li:text-sm sm:prose-li:text-base lg:prose-li:text-lg
          prose-li:leading-relaxed prose-li:mb-1 sm:prose-li:mb-2
          
          /* Responsive blockquotes */
          prose-blockquote:border-l-2 sm:prose-blockquote:border-l-4
          prose-blockquote:pl-3 sm:prose-blockquote:pl-4 lg:prose-blockquote:pl-6
          prose-blockquote:italic prose-blockquote:text-stone/70
          prose-blockquote:text-sm sm:prose-blockquote:text-base lg:prose-blockquote:text-lg
          prose-blockquote:my-3 sm:prose-blockquote:my-4 lg:prose-blockquote:my-6
          prose-blockquote:bg-stone/5 prose-blockquote:py-2 sm:prose-blockquote:py-3 lg:prose-blockquote:py-4
          prose-blockquote:rounded
          
          /* Responsive code blocks */
          prose-code:text-xs sm:prose-code:text-sm lg:prose-code:text-base
          prose-code:font-medium prose-code:px-1 sm:prose-code:px-2 prose-code:py-0.5 sm:prose-code:py-1
          prose-code:rounded prose-code:bg-stone/10 prose-code:text-stone/80
          
          prose-pre:text-xs sm:prose-pre:text-sm lg:prose-pre:text-base
          prose-pre:rounded-md sm:prose-pre:rounded-lg
          prose-pre:p-3 sm:prose-pre:p-4 lg:prose-pre:p-6
          prose-pre:overflow-x-auto prose-pre:bg-stone/5
          prose-pre:my-3 sm:prose-pre:my-4 lg:prose-pre:my-6
          
          /* Strong/Bold text */
          prose-strong:font-semibold prose-strong:text-stone
          
          /* Links */
          prose-a:text-brand-red prose-a:no-underline hover:prose-a:underline
          prose-a:font-medium prose-a:transition-colors
          
          ${className}
        `}
      >
        <div 
          className="article-content"
          dangerouslySetInnerHTML={{ __html: responsiveHtml }}
        />
      </article>
    </div>
  )
}
