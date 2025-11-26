import { groq } from 'next-sanity';

const imageProjection = groq`{
  asset->{
    ...,
    metadata
  },
  altText,
  aspectRatio,
}`;

export default imageProjection;
