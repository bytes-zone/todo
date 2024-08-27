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
  },

  decorators: [
    withThemeByDataAttribute({
      themes: {
        // nameOfTheme: 'classNameForTheme',
        light: "",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
}

export default preview
