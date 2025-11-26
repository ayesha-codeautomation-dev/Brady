import { groq } from 'next-sanity';
import blockContentProjection from '@/tools/sanity/projections/common/blockContent.groq';

const twoColTextSectionProjection = groq`
  _type == 'twoColTextSection' => {
     contentSideA[]${blockContentProjection},
     contentSideB[]${blockContentProjection},
  },
`;

export default twoColTextSectionProjection;
