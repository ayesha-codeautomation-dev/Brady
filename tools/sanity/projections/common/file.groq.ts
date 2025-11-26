import { groq } from 'next-sanity';

const fileProjection = groq`{
  asset->{
    ...,
    metadata,
    key
  },
}`;

export default fileProjection;
