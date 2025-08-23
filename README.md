# 🏠 Texas Roadhouse Menu - Next.js Application

A modern, high-performance Next.js application for displaying Texas Roadhouse menu items and blog content, powered by WordPress as a headless CMS.

## 🚀 Features

- **Dynamic Content**: Real-time data from WordPress GraphQL API
- **SEO Optimized**: Full Yoast SEO integration with automatic URL sanitization
- **Auto-Updating Sitemap**: Dynamic XML sitemap generation
- **Performance**: Optimized caching and image handling
- **Responsive Design**: Mobile-first, modern UI
- **Domain Separation**: Frontend (`texasroadhouse-menus.us`) + WordPress backend

## 🛠️ Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Clean start (fixes port conflicts)
npm run dev:clean
```

### Production

```bash
# Build for production
npm run build

# Start production server
npm start

# Deploy (with verification)
npm run deploy
```

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── (site)/            # Main site pages
│   ├── api/               # API routes
│   ├── components/        # React components
│   └── lib/               # Utilities and configurations
├── docs/                  # Documentation
│   ├── guides/           # Operational guides
│   └── setup/            # Installation & setup
├── public/               # Static assets
├── scripts/              # Build and utility scripts
└── data/                 # Static data files
```

## 🔧 Configuration

### Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://texasroadhouse-menus.us
NEXT_PUBLIC_WORDPRESS_API_URL=https://texasroadhousemenu.me/graphql
NEXT_PUBLIC_SITE_NAME=Texas Roadhouse Menu
```

### Key Scripts

| Command | Description |
|---------|------------|
| `npm run dev` | Development server (port 3002) |
| `npm run dev:clean` | Clean development start |
| `npm run build` | Production build |
| `npm run fix-ports` | Fix port conflicts |
| `npm run update-coupons` | Update coupon data |

## 📖 Documentation

- **[Setup Guides](docs/setup/)** - Installation and configuration
- **[Operational Guides](docs/guides/)** - SEO, deployment, and maintenance

## 🌐 Architecture

- **Frontend**: Next.js 15 with App Router
- **Backend**: WordPress with GraphQL (WPGraphQL + Yoast SEO)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel-ready
- **SEO**: Automated sitemap + Yoast integration

## 🎯 Key Features

### ✅ SEO & Performance
- Dynamic sitemap generation
- Yoast SEO metadata integration
- URL sanitization for domain separation
- Image optimization
- Static generation where possible

### ✅ Content Management
- WordPress admin for content
- Real-time content updates
- Webhook support for instant revalidation
- Comprehensive error handling

### ✅ Developer Experience
- TypeScript throughout
- ESLint + Prettier
- Hot reload in development
- Automated deployment checks

## 📞 Support

For setup questions, check the [documentation](docs/) or the specific guide files in `docs/setup/` and `docs/guides/`.

---

Built with ❤️ using Next.js and WordPress
