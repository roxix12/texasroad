/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Texas Roadhouse Core Brand Colors - Simple & Clean
        'texas-red': '#ED1C24',      // Your main red
        'texas-black': '#110302',    // Your main black  
        'texas-yellow': '#FCD705',   // Your main yellow
        'texas-green': '#719372',    // Your main green
        
        // Legacy compatibility (keeping existing)
        'school-bus-yellow': '#FCD705',
        'licorice': '#110302',
        'night': '#151515',
        'reseda-green': '#719372',
        'red-cmyk': '#ED1C24',
        
        // Brand aliases for easy use
        'brand-red': '#ED1C24',
        'brand-black': '#110302',
        'brand-yellow': '#FCD705',
        'brand-green': '#719372',
        
        // Semantic colors
        primary: '#ED1C24',          // Red
        secondary: '#FCD705',        // Yellow
        accent: '#719372',           // Green
        dark: '#110302',             // Black
        light: '#FFFFFF',            // Clean white
        
        // Supporting colors (keeping some for compatibility)
        wood: '#6B4F3A',
        stone: '#2F2F2F',
        sand: '#F4E7D3',
        green: '#719372',
        orange: '#ED1C24',           // Using red instead
        cream: '#FFF9EF',
      },
      fontFamily: {
        'slab': ['Roboto Slab', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      fontWeight: {
        'slab-bold': '700',
        'slab-extra': '800',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  typography: {
    DEFAULT: {
      css: {
        // Typography settings - spacing and layout only, no colors
        maxWidth: '75ch', // Optimal for readability (Google guidelines)
        lineHeight: '1.6', // Google recommended line height
        
        // Headings - spacing and weights only
        'h1, h2, h3, h4, h5, h6': {
          fontWeight: '700',
          lineHeight: '1.3',
          marginTop: '0',
        },
        h1: {
          fontSize: '2.25rem',
          marginBottom: '2rem',
          fontWeight: '800',
        },
        h2: {
          fontSize: '1.875rem',
          marginTop: '3rem',
          marginBottom: '1.5rem',
        },
        h3: {
          fontSize: '1.5rem',
          marginTop: '2.5rem',
          marginBottom: '1rem',
        },
        h4: {
          fontSize: '1.25rem',
          marginTop: '2rem',
          marginBottom: '0.75rem',
        },
        
        // Paragraphs and text
        p: {
          marginTop: '0',
          marginBottom: '1.5rem',
          lineHeight: '1.7',
        },
        
        // Lists
        'ul, ol': {
          marginTop: '1.5rem',
          marginBottom: '1.5rem',
          paddingLeft: '1.5rem',
        },
        li: {
          marginTop: '0.5rem',
          marginBottom: '0.5rem',
          lineHeight: '1.6',
        },
        'li > p': {
          marginTop: '0.75rem',
          marginBottom: '0.75rem',
        },
        
        // Images
        img: {
          marginTop: '2rem',
          marginBottom: '2rem',
          borderRadius: '0.75rem',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
        'figure > img': {
          marginTop: '0',
          marginBottom: '0',
        },
        figcaption: {
          fontSize: '0.875rem',
          marginTop: '0.75rem',
          textAlign: 'center',
        },
        
        // Tables
        table: {
          width: '100%',
          tableLayout: 'auto',
          textAlign: 'left',
          marginTop: '2rem',
          marginBottom: '2rem',
          fontSize: '0.875rem',
          borderRadius: '0.5rem',
          overflow: 'hidden',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
        thead: {
          fontWeight: '600',
        },
        'thead th': {
          padding: '1rem',
          fontWeight: '600',
        },
        'tbody td': {
          padding: '1rem',
          borderTopWidth: '1px',
        },
        
        // Blockquotes
        blockquote: {
          fontWeight: '500',
          fontStyle: 'italic',
          borderLeftWidth: '4px',
          padding: '1.5rem',
          marginTop: '2rem',
          marginBottom: '2rem',
          borderRadius: '0 0.5rem 0.5rem 0',
        },
        
        // Code
        code: {
          fontWeight: '600',
          fontSize: '0.875rem',
          padding: '0.25rem 0.375rem',
          borderRadius: '0.25rem',
        },
        'code::before': {
          content: '""',
        },
        'code::after': {
          content: '""',
        },
        pre: {
          padding: '1.5rem',
          borderRadius: '0.5rem',
          marginTop: '1.5rem',
          marginBottom: '1.5rem',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          overflow: 'auto',
        },
        'pre code': {
          padding: '0',
          borderRadius: '0',
          fontSize: 'inherit',
        },
      },
    },
  },
}
