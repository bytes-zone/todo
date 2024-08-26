import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'

export default {
  content: ['./src/*.{html,ts,vue}', './src/**/*.{html,ts,vue'],
  theme: {
    extend: {}
  },
  plugins: [daisyui]
} satisfies Config
