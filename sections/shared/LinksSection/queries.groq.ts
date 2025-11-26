import { groq } from 'next-sanity';
import buttonProjection from '@/tools/sanity/projections/common/button.groq';
import imageProjection from '@/tools/sanity/projections/common/image.groq';
import blockContentProjection from '@/tools/sanity/projections/common/blockContent.groq';

const linksSectionProjection = groq`
  _type == 'linksSection' => {
     links[]{
      groupTitle,
      links[]${buttonProjection},
    },
    additionalLinks {
      groupTitle,
      links[]${buttonProjection},
    }
  },
`;

export default linksSectionProjection;
