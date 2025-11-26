import type { Metadata } from 'next';
import { metadata as studioMetadata } from 'next-sanity/studio/metadata';
import SanityStudio from '../SanityStudio';

// Set the right `viewport`, `robots` and `referer` meta tags
export const metadata: Metadata = studioMetadata;

const SanityStudioPage = () => {
  return <SanityStudio />;
};

export default SanityStudioPage;
