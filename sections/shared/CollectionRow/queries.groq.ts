import { groq } from 'next-sanity';
import imageProjection from '@/tools/sanity/projections/common/image.groq';

const homeCollectionsSectionProjection = groq`
  _type == 'homeCollections' => {
    title,
    items[]{
      _key,
      name,
      href,
      image${imageProjection}
    }
  }
`;

export default homeCollectionsSectionProjection;
