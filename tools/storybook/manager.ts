import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';
import svg from '../../assets/logo/logo.svg';

addons.setConfig({
  theme: {
    ...themes.dark,
    brandTitle: 'Documentation',
    brandUrl: '/',
    brandImage: svg.src,

    // Color
    // colorPrimary: 'blue',
    // colorSecondary: '#CCC',
    // textColor: '#FFF',

    // UI
    appBorderColor: '#1B1C1D',
    appBorderRadius: 0,

    // Typography
    fontBase: '"Roboto", sans-serif',
    fontCode: 'monospace',
    barBg: '#1B1C1D',
    inputBorderRadius: 4
  }
});
