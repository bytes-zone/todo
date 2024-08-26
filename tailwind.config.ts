import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'
import daisyui from 'daisyui'

export default {
  content: ['./src/*.{html,ts,vue}', './src/**/*.{html,ts,vue'],
  theme: {
    extend: {}
  },
  plugins: [typography, daisyui]
} satisfies Config
