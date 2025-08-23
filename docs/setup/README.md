# 🍽️ Texas Roadhouse Menu

A **production-ready blog and menu showcase** built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **WPGraphQL**.  
This is an **independent, unofficial informational website** about Texas Roadhouse menu items, coupons, and pricing.

---

## ⚠️ Legal Disclaimer
This website is **NOT affiliated with Texas Roadhouse**.  
It is an independent project created for **educational and reference purposes only**.  

Menu items, prices, and nutrition info may not reflect the latest restaurant offerings.  
For official information, visit [texasroadhouse.com](https://www.texasroadhouse.com).

---

## 🚀 Features

- ⚡ **Next.js 15** with App Router & Server Components  
- 🟦 **TypeScript** for type safety  
- 🎨 **Tailwind CSS** with steakhouse-inspired theme  
- 🔗 **WordPress + WPGraphQL integration** (with JSON fallback)  
- 🔍 **SEO optimized** with structured data, sitemap, and RSS  
- 📱 **Responsive mobile-first design**  
- ♿ **Accessibility features** (ARIA, keyboard navigation)  
- 🚀 **Performance optimized** (ISR + Image Optimization)  
- 🤖 **AI-powered coupons** (Gemini API)  
- 📈 **Google Indexing API** for faster SEO updates  

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15  
- **Language:** TypeScript  
- **Styling:** Tailwind CSS  
- **CMS:** WordPress + WPGraphQL (optional)  
- **Deployment:** Vercel / Netlify  
- **APIs:** Gemini AI, Google Indexing API  

---

## 📂 Project Structure

app/
├── (site)/ # Main routes (Home, Menus, Blog, etc.)
├── api/ # API routes (RSS, indexing, coupons)
├── components/ # Reusable UI components
├── data/ # JSON fallback data
├── lib/ # Utilities (SEO, WPGraphQL, data fetching)
└── globals.css # Global styles

yaml
Copy
Edit

---

## ⚡ Quick Start

### Prerequisites
- Node.js **18.17+**
- npm / yarn / pnpm

### Setup
```bash
# Clone repo
git clone https://github.com/roxix12/texasroad.git
cd texasroad

# Install dependencies
npm install

# Copy environment variables
cp env.example .env.local
Run Development Server
bash
Copy
Edit
npm run dev
Now open 👉 http://localhost:3000

🔧 Environment Variables
Create a .env.local file:

env
Copy
Edit
# WordPress GraphQL (optional)
NEXT_PUBLIC_WORDPRESS_API_URL=https://your-wordpress-site.com/graphql

# Site Info
NEXT_PUBLIC_SITE_NAME=Texas Roadhouse Menu
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Google Indexing API
GOOGLE_CLIENT_EMAIL=your_service_account_email
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY\n-----END PRIVATE KEY-----\n"
📊 SEO Features
✅ Structured Data (Organization, BlogPosting, MenuItem)

✅ Dynamic Sitemap (/sitemap.xml)

✅ RSS Feed (/api/rss)

✅ Canonical URLs & robots.txt

✅ OpenGraph + Twitter Card tags

🚀 Deployment
Vercel (Recommended)
Push to GitHub

Connect repo on Vercel

Add environment variables

Deploy 🚀

Netlify
Build command: npm run build

Publish directory: .next

🤝 Contributing
This is a demo project. If you want to use it in production:

Replace branding & legal disclaimers

Update schema, posts, and content

Configure your own SEO settings

📄 License
This project is for educational use only.
Do not use without respecting trademarks and copyrights.

✨ Built with ❤️ using Next.js + Tailwind + WPGraphQL + Gemini AI

yaml
Copy
Edit

---

👉 This version is **shorter, cleanly structured, and GitHub-ready**. It highlights features, setup, environment variables, and deployment in a professional way.

Do you want me to also **add screenshots / preview section with badges** (like Vercel deploy button, demo link, tech badges)? That will make your README look 🔥 professional.
