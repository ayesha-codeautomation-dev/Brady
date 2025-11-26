import { groq } from 'next-sanity';
import sectionsProjection from '../common/sections.groq';

const pageProjection = groq`{
  _createdAt,
  _updatedAt,
  title,
  slug,
  pathname,
  breadcrumbs[]->{
    slug,
    pathname,
    title
  },
  sections[]${sectionsProjection},
  seoData,
}`;

export default pageProjection;
