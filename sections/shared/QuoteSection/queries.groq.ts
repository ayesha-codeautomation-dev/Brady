import { groq } from 'next-sanity';
import blockContentProjection from '@/tools/sanity/projections/common/blockContent.groq';
import imageProjection from '@/tools/sanity/projections/common/image.groq';

const quoteSectionProjection = groq`
  _type == 'quoteSection' => {
    content[]${blockContentProjection},
    theme,
    image${imageProjection}
  },
`;

export default quoteSectionProjection;
