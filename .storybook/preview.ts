import type { Preview } from "@storybook/svelte-vite";

import "../src/index.css";

import { initialize, mswLoader } from "msw-storybook-addon";

// Registers the msw addon
initialize();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  loaders: [mswLoader],
};

export default preview;
