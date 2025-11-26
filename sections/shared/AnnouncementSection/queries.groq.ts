import { groq } from 'next-sanity';
import buttonProjection from '@/tools/sanity/projections/common/button.groq';

const announcementSectionProjection = groq`
  _type == 'announcementSection' => {
     title,
     content,
     addButton,
     button${buttonProjection},
     align,
     addDownloadButton,
     downloadFile {
      downloadButtonText,
      asset->{
        url
      }
     }
  },
`;

export default announcementSectionProjection;
