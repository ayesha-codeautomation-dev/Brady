import { groq } from 'next-sanity';
import blockContentProjection from '@/tools/sanity/projections/common/blockContent.groq';
import imageProjection from '@/tools/sanity/projections/common/image.groq';
import buttonProjection from '@/tools/sanity/projections/common/button.groq';

const twoColMediaSectionProjection = groq`
  _type == 'twoColMediaSection' => {
      
    imageSideA${imageProjection},
    addButtonSideA,
    buttonSideA${buttonProjection},
    
    imageSideB${imageProjection},
    addButtonSideB,
    buttonSideB${buttonProjection},
    
    invertLayout,
  },
`;

export default twoColMediaSectionProjection;
