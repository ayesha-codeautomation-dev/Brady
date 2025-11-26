import { groq } from 'next-sanity';
import imageProjection from '@/tools/sanity/projections/common/image.groq';
import buttonProjection from '@/tools/sanity/projections/common/button.groq';

const viewedProductsSectionProjection = groq`
  _type == 'viewedProductsSection' => {
    _type
  },
`;

export default viewedProductsSectionProjection;
