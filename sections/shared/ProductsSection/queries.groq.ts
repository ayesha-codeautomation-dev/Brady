import { groq } from 'next-sanity';
import productPreviewProjection from '@/tools/sanity/projections/documents/productPreview.groq';

const productsSectionProjection = groq`
  _type == 'productsSection' => {
    title,
    products[]->${productPreviewProjection}
  },
`;

export default productsSectionProjection;
