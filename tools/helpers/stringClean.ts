// Removes invisible characters such as zero-width spaces, zero-width joiners, and zero-width non-joiners
// Mainly used to remove Stega encoding from strings that come from Sanity.io Visual Editing tool
const stringClean = (str?: string) => {
  if (!str) return '';
  return str.replace(/[^\x20-\x7E]/g, '');
};

export default stringClean;
