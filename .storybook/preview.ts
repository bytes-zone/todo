import type { Preview } from "@storybook/vue3"
import "../src/assets/main.css"

import { withThemeByDataAttribute } from "@storybook/addon-themes"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    chromatic: {
      modes: {
        light: { theme: "light" },
        dark: { theme: "dracula" },
      },
    },
  },

  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: "",
        dark: "dracula",
      },
      defaultTheme: "light",
    }),
  ],
}

export default preview
