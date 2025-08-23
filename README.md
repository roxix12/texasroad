# Texas Roadhouse Menu

A production-ready blog and menu showcase built with Next.js 15, TypeScript, Tailwind CSS, and WPGraphQL. This is an **independent, unofficial informational website** about Texas Roadhouse menu items and pricing.

## ⚠️ Important Legal Notice

This website is **NOT affiliated with Texas Roadhouse**. We are an independent informational site created for educational and reference purposes only. All menu items, prices, and nutritional information are provided for reference and may not reflect current offerings at Texas Roadhouse restaurants.

For official information, please visit [texasroadhouse.com](https://www.texasroadhouse.com).

## 🚀 Features

- **Next.js 15** with App Router and Server Components
- **TypeScript** for type safety
- **Tailwind CSS** with custom steakhouse-inspired theme
- **WPGraphQL integration** with JSON fallback
- **SEO optimized** with structured data, sitemap, and RSS
- **Responsive design** with mobile-first approach
- **Accessibility features** with ARIA labels and keyboard navigation
- **Performance optimized** with image optimization and ISR

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **CMS:** WordPress with WPGraphQL (optional)
- **Fonts:** Roboto Slab + Inter (Google Fonts)
- **Icons:** Lucide React
- **Deployment:** Vercel/Netlify ready

## 📁 Project Structure

```
├── app/
│   ├── (site)/                 # Main site routes
│   │   ├── page.tsx           # Homepage
│   │   ├── menus/             # Menu pages
│   │   ├── posts/             # Blog posts
│   │   ├── categories/        # Category pages
│   │   ├── about/             # About page
│   │   ├── contact/           # Contact page
│   │   └── legal/             # Legal page
│   ├── api/                   # API routes
│   │   └── rss/               # RSS feed
│   ├── components/            # React components
│   │   ├── ui/                # Base UI components
│   │   ├── blog/              # Blog-specific components
│   │   ├── menu/              # Menu-specific components
│   │   └── layout/            # Layout components
│   ├── data/                  # Fallback JSON data
│   │   └── menus.json         # Menu items fallback
│   ├── lib/                   # Utility functions
│   │   ├── data.ts            # Data fetching
│   │   ├── wp.ts              # WordPress GraphQL
│   │   ├── types.ts           # TypeScript types
│   │   ├── format.ts          # Formatting helpers
│   │   └── seo.ts             # SEO utilities
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   ├── robots.txt             # SEO robots file
│   └── sitemap.ts             # Dynamic sitemap
```

## 🎨 Design System

### Colors
- **Wood:** `#6B4F3A` - Primary brand color
- **Stone:** `#2F2F2F` - Text and dark elements
- **Sand:** `#F4E7D3` - Light backgrounds
- **Green:** `#1E6B55` - Secondary actions
- **Orange:** `#D26A28` - Accent and CTAs
- **Cream:** `#FFF9EF` - Page backgrounds

### Typography
- **Headings:** Roboto Slab (700, 800)
- **Body:** Inter (400, 500, 600)

## ⚡ Quick Start

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd texas-roadhouse-menu
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```

4. **Configure your environment** (see Environment Variables section)

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
# WordPress GraphQL API URL (optional)
NEXT_PUBLIC_WORDPRESS_API_URL=https://your-wordpress-site.com/graphql

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME="Texas Roadhouse Menu"
```

### WordPress Configuration (Optional)

If you want to use WordPress as a CMS:

1. **Install WordPress with WPGraphQL plugin**
2. **Create custom post types:**
   - `menu` for menu items
   - Standard `posts` for blog articles

3. **Add custom fields for menu items:**
   ```php
   // Menu item fields (using ACF or similar)
   - price (number)
   - description (textarea)
   - category (select)
   - calories (number)
   - allergens (multi-select)
   - isNew (checkbox)
   - isPopular (checkbox)
   ```

4. **Set your WordPress GraphQL URL** in `.env.local`

## 📱 Data Management

### JSON Fallback (Default)

The site works out-of-the-box with JSON data located in `app/data/menus.json`. This includes 12 sample menu items with realistic data.

### WordPress Integration

When `NEXT_PUBLIC_WORDPRESS_API_URL` is set, the site will:

1. **Attempt to fetch from WordPress GraphQL**
2. **Fall back to JSON data** if WordPress is unavailable
3. **Cache responses** for 5 minutes using Next.js ISR

### Adding Menu Items

**JSON Method:**
Edit `app/data/menus.json` and add new menu items following the existing structure.

**WordPress Method:**
Create new menu items in your WordPress admin with the required custom fields.

## 🔍 SEO Features

- **Structured Data:** Organization, MenuItem, BlogPosting schemas
- **Dynamic Sitemap:** Auto-generated from content
- **RSS Feed:** Available at `/api/rss`
- **OpenGraph:** Social media sharing optimization
- **Canonical URLs:** Proper URL canonicalization
- **Robots.txt:** Search engine crawling instructions

## 🎯 Key Routes

- `/` - Homepage with hero and featured content
- `/menus` - Complete menu with filtering and search
- `/menus/[slug]` - Individual menu item pages
- `/posts` - Blog articles listing
- `/posts/[slug]` - Individual blog posts
- `/categories/[slug]` - Category archive pages
- `/about` - About page with disclaimer
- `/contact` - Contact form
- `/legal` - Legal information and disclaimers

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
2. **Connect to Vercel**
3. **Set environment variables**
4. **Deploy**

### Netlify

1. **Build command:** `npm run build`
2. **Publish directory:** `.next`
3. **Set environment variables**

### Self-hosted

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

## 🧪 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run format   # Format with Prettier
```

### Code Organization

- **Components:** Modular, reusable React components
- **Server Components:** Used for data fetching
- **Client Components:** Used for interactivity
- **Utilities:** Helper functions for formatting, data, etc.
- **Types:** Comprehensive TypeScript definitions

## 🔒 Legal Compliance

This project includes:

- **Clear disclaimers** about non-affiliation
- **Proper attribution** where required
- **Fair use compliance** for informational content
- **Contact information** for takedown requests
- **Privacy policy** for user data handling

## 🤝 Contributing

This is a demonstration project. For production use:

1. **Remove all Texas Roadhouse references**
2. **Replace with your own branding**
3. **Update legal disclaimers**
4. **Modify content and imagery**

## 📄 License

This project is for educational purposes only. Please ensure compliance with applicable laws and trademark regulations before any commercial use.

## 🆘 Support

For technical questions about the codebase:

1. **Check the documentation** in this README
2. **Review the code comments** for implementation details
3. **Examine the component structure** for usage examples

---

**Remember:** This is an independent project not affiliated with Texas Roadhouse. Always respect intellectual property rights and trademarks when creating similar projects.
#   t e x a s r o a d 
 
 #   t e x a s r o a d 
 
 
