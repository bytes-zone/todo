import type { Config } from 'tailwindcss'

export default {
  content: ['./src/*.{html,ts,vue}', './src/**/*.{html,ts,vue'],
  theme: {
    extend: {}
  },
  plugins: []
} satisfies Config
