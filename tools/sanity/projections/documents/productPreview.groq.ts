import { groq } from 'next-sanity';

const productPreviewProjection = groq`{
  _id,
  store {
    title,
    slug,
    previewImageUrl,
    priceRange {
      minVariantPrice,
      maxVariantPrice
    },
  }
}`;

export default productPreviewProjection;
