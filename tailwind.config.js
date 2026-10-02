// All values read from src/styles/tokens.css. Edit tokens there, not here.
const v = (n) => `var(--${n})`;
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: v('color-primary'), bg: v('color-primary-bg') },
        grey: { 10: v('grey-10'), 20: v('grey-20'), 35: v('grey-35'), 50: v('grey-50'), 65: v('grey-65'), 80: v('grey-80'), 90: v('grey-90') },
        alert: {
          red: v('alert-red'), 'red-bg': v('alert-red-bg'),
          green: v('alert-green'), 'green-bg': v('alert-green-bg'),
          yellow: v('alert-yellow'), 'yellow-bg': v('alert-yellow-bg'),
          info: v('alert-info'), 'info-bg': v('alert-info-bg'),
        },
      },
      fontFamily: { sans: v('font-sans'), mono: v('font-mono') },
      borderRadius: { sm: v('radius-sm'), md: v('radius-md'), lg: v('radius-lg'), full: v('radius-full') },
      boxShadow: { 1: v('shadow-1'), color: v('shadow-color') },
      spacing: { 'screen-x': v('space-screen-x') },
    },
  },
  plugins: [],
};
