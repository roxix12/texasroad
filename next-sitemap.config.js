/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://texasroadhouse-menus.us',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/api/*', '/_next/*', '/admin/*'],
  generateIndexSitemap: false,

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/']
      }
    ],
    additionalSitemaps: [
      'https://texasroadhouse-menus.us/sitemap.xml'
    ]
  },

  transform: async (config, path) => {
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      }
    }
    
    if (path.startsWith('/blog/')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      }
    }
    
    if (path.startsWith('/menus-prices')) {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      }
    }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    }
  },

  // 👇 Yeh add karna hai: WordPress se blog slugs fetch kar ke sitemap me inject karega
  additionalPaths: async (config) => {
    const res = await fetch('https://admin.texasroadhouse-menus.us/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          {
            posts(first: 1000) {
              nodes {
                slug
              }
            }
          }
        `
      }),
    });

    const { data } = await res.json();

    return data.posts.nodes.map((post) => ({
      loc: `/blog/${post.slug}`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }));
  },
};
