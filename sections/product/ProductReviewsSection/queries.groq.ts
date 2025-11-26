import { groq } from 'next-sanity';
import imageProjection from '@/tools/sanity/projections/common/image.groq';
import buttonProjection from '@/tools/sanity/projections/common/button.groq';

const productReviewsSectionProjection = groq`
  _type == 'productReviewsSection' => {
    
  },
`;

export default productReviewsSectionProjection;
