export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#111827',
        panel: '#f8fafc',
        brand: '#2563eb',
        accent: '#0f766e'
      },
      boxShadow: {
        soft: '0 12px 32px rgba(15, 23, 42, 0.08)'
      }
    }
  },
  plugins: []
};

