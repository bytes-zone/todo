import type { Config } from "tailwindcss"
import typography from "@tailwindcss/typography"
import daisyui from "daisyui"

export default {
  content: ["./src/**/*.{vue,ts,html}"],
  theme: {
    extend: {},
  },
  plugins: [typography, daisyui],
  daisyui: {
    themes: ["emerald", "dracula"],
    darkTheme: "dracula",
  },
  darkMode: ["selector", '[data-theme="dracula"]'],
} satisfies Config
