import { groq } from 'next-sanity';
import buttonProjection from '@/tools/sanity/projections/common/button.groq';
import imageProjection from '@/tools/sanity/projections/common/image.groq';
import blockContentProjection from '@/tools/sanity/projections/common/blockContent.groq';

const fullscreenImageSectionProjection = groq`
  _type == 'fullscreenImageSection' => {
    tagline,
    title,
    content[]${blockContentProjection},
    addButton,
    button${buttonProjection},
    image${imageProjection}
  },
`;

export default fullscreenImageSectionProjection;
