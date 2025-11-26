import { groq } from 'next-sanity';

const productVariantProjection = groq`{
  store {
    createdAt,
    updatedAt,
    status,
    isDeleted,
    title,
    sku,
    id,
    gid,
    productId,
    productGid,
    price,
    compareAtPrice,
    inventory,
    option1,
    option2,
    option3,
    previewImageUrl
  }
}`;

export default productVariantProjection;
