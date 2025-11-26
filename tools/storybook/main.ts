import type { StorybookConfig } from '@storybook/nextjs';
import { RuleSetRule } from 'webpack';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../../components/**/stories.@(ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/nextjs',
    options: {}
  },
  docs: {
    autodocs: true,
    defaultName: 'Documentation'
  },
  webpackFinal: async config => {
    // Alias
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@/components': path.resolve(__dirname, '../../components'),
        '@/helpers': path.resolve(__dirname, '../../tools/helpers'),
        '@/hooks': path.resolve(__dirname, '../../tools/hooks'),
        '@/sanity': path.resolve(__dirname, '../../tools/sanity'),
        '@/style': path.resolve(__dirname, '../../tools/style'),
        '@/assets': path.resolve(__dirname, '../../assets')
      };
    }

    if (config?.module?.rules) {
      const imageRule = (config.module.rules as RuleSetRule[]).find(rule => {
        // Add type assertion here
        if (rule?.test instanceof RegExp) {
          return rule.test.test('.svg');
        }
      });
      if (imageRule) {
        // Check if imageRule is not undefined and has 'exclude' property
        imageRule.exclude = /\.svg$/;
      }

      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack']
      });
    }

    return config;
  }
};
export default config;
