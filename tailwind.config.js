/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        github: {
          dark: '#0d1117',
          darker: '#010409',
          surface: '#161b22',
          border: '#30363d',
          accent: '#238636',
          accentHover: '#2ea043',
          blue: '#58a6ff',
          purple: '#bc8cff',
          orange: '#f0883e',
          red: '#f85149',
          yellow: '#d29922',
          text: '#c9d1d9',
          muted: '#8b949e',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      }
    },
  },
  plugins: [],
}
