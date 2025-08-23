import type { StorybookConfig } from "@storybook/svelte-vite";

const config: StorybookConfig = {
  //stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|ts|svelte)"],
  stories: ["../src/lib/**/*.stories.@(js|ts|svelte)"],
  staticDirs: ["../public"],
  addons: [
    "@storybook/addon-svelte-csf",
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y"
  ],
  framework: {
    name: "@storybook/svelte-vite",
    options: {},
  },
};
export default config;
