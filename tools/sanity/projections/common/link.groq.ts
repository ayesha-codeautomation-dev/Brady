import { groq } from 'next-sanity';

const linkProjection = groq`{
  linkType,
  internalLink->{
    title,
    slug,
    pathname,
    "pathnameShopify": select(
      defined(store.slug.current) => "/" + store.slug.current + "/",
      null
    )
  },
  externalLink,
  phone,
  email,
  action
}`;

export default linkProjection;
