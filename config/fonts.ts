import localFont from 'next/font/local';

const primaryFont = localFont({
  src: [
    { path: '../assets/fonts/SuisseIntl-Light.woff2', style: 'normal', weight: '300' },
    { path: '../assets/fonts/SuisseIntl-Regular.woff2', style: 'normal', weight: '400' }
  ],
  display: 'swap',
  variable: '--primary-font'
});

const fonts = [primaryFont.variable].join(' ');

export default fonts;
