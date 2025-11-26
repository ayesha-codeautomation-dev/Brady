import { SanityDocument } from 'next-sanity';
import { notFound } from 'next/navigation';
import { sanityFetch } from '@/tools/sanity/lib/fetch';
import { DOCUMENT_QUERY } from '@/tools/sanity/lib/queries.groq';
import { generateSanityMetadata } from '@/tools/sanity/helpers';
import PageTemplate from '@/templates/PageTemplate';

const Home = async (props: PageProps) => {
  const { params, searchParams } = props;

  const document = await sanityFetch<SanityDocument>({
    query: DOCUMENT_QUERY,
    params: { pathname: '/', shopifySlug: '/', types: ['page'] }
  });

  if (!document) return notFound();

  return <PageTemplate data={document?.page} searchParams={searchParams} params={params} />;
};

export const generateMetadata = generateSanityMetadata({
  query: async () => {
    const document = await sanityFetch<SanityDocument>({
      query: DOCUMENT_QUERY,
      params: { pathname: '/', shopifySlug: '/', types: ['page'] }
    });

    const page = document?.page;

    return {
      seoTitle: page?.seoData?.seoTitle,
      seoDescription: page?.seoData?.seoDescription,
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/`
      },
      robots: page?.seoData?.noIndex ? { index: false, googleBot: { index: false } } : undefined
    };
  }
});

export const dynamic = 'force-static';

export default Home;
