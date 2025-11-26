export type Breakpoints = Partial<Record<keyof typeof breakpoints, string>> & { any?: string };

const breakpoints = {
  giant: '2200px',
  largeDesktop: '1600px',
  desktop: '1340px',
  smallDesktop: '1260px',
  largeTablet: '1025px',
  mediumTablet: '900px',
  tablet: '769px',
  smallTablet: '660px',
  largeMobile: '500px',
  mobile: '400px',
  smallMobile: '340px'
};

export default breakpoints;
