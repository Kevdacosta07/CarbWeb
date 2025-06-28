const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Activation du mode sombre avec la classe 'dark'
  theme: {
    extend: {
      colors: {
        // Couleurs personnalisées pour l'application
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        // Couleurs grises améliorées pour le contraste
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db', // Remplace gray-500 pour un meilleur contraste
          400: '#9ca3af', // Couleur alternative avec bon contraste
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin': 'spin 1s linear infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionProperty: {
        'colors': 'background-color, border-color, color, fill, stroke',
        'all': 'all',
      }
    },
  },

  plugins: ["@tailwindcss/postcss"],
};

export default config;