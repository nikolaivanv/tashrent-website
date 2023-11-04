import path from 'path';
import type { StorybookConfig } from "@storybook/nextjs";
//import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';


const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    'storybook-css-modules',
    //'@storybook/addon-themes'
    //'storybook-addon-themes'
    'storybook-tailwind-dark-mode',
    "@storybook/addon-styling",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, '../src'),
      };
    }
    return config;
  }
};


export default config;
