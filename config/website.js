const website = {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"
  title: 'Brady Legler', // Default Site Title used for SEO & PWA
  titleTemplate: `%s - Brady Legler`, // Title Template
  description:
    'Brady Legler began designing jewelry in 2008 at the age of 19. Both his jewelry and his paintings have gained Brady a wide audience.', // Default Site Decription used for SEO
  siteName: 'Brady Legler', // Sitename for Facebook
  siteLanguage: 'en', // Language Tag on <html> element
  banner: '/open-graph.png', // Default OpenGraph image
  ogLanguage: 'en_AU', // Facebook Language
  socialLinks: ['https://www.instagram.com/bradylegler'], // Array of social links (facebook, insta, etc)
  icon: 'src/assets/images/icon.png', // Used for manifest favicon, splash screen, and icon generation
  shortName: 'Brady Legler', // shortname for manifest. MUST be shorter than 12 characters
  author: 'Brady Legler', // Author for schemaORGJSONLD
  themeColor: '#050321', // PWA Icon background & address bar colour if installed on desktop
  backgroundColor: '#050321', // PWA colour shown before styles and content loads, should match the background-color CSS property in the site’s stylesheet
  twitter: '', // Twitter Username,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL
};

export default website;
