import { groq } from 'next-sanity';
import sectionsProjection from '../common/sections.groq';
import imageProjection from '../common/image.groq';

const artworkProjection = groq`{
  _createdAt,
  _updatedAt,
  title,
  slug,
  pathname,
  status,
  specification,
  content,
  featureImage${imageProjection},
  sections[]${sectionsProjection},
  seoData
}`;

export default artworkProjection;
