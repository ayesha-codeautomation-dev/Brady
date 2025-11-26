import Details from './components/Details';
import Sections from './components/Sections';
import { getProductByHandle, getProductRecommendations } from '@/tools/apis/shopify';
import { IProductDocument } from '@/tools/sanity/schema/documents/product';
import { sanityFetch } from '@/tools/sanity/lib/fetch';
import { SIZE_GUIDE_QUERY } from '@/tools/sanity/lib/queries.groq';
import { ISizeGuideDocument } from '@/tools/sanity/schema/documents/sizeGuideDocument';
import SplashScreen from '@/components/SplashScreen';
import { Analytics } from '@/tools/analytics';

interface WebPageProps extends PageProps {
  data: IProductDocument;
  setSelectedVariant?: (variant: any) => void;
}

const ProductTemplate = async (props: WebPageProps) => {
  const { data, params, searchParams } = props;
  const sanityProductData = data;

  // Fetch Shopify product safely
  const shopifyProductData = sanityProductData?.store?.slug?.current
    ? await getProductByHandle(sanityProductData.store.slug.current)
    : null;

  // Fetch recommendations safely, only if gid exists
  const shopifyProductRecommendations = sanityProductData?.store?.gid
    ? await getProductRecommendations(sanityProductData.store.gid)
    : [];

  // Fetch size guide
  const sanitySizeGuide = await sanityFetch<ISizeGuideDocument>({
    query: SIZE_GUIDE_QUERY,
    tags: ['sizeGuideDocument']
  });

  return (
    <>
      {shopifyProductData && (
        <Analytics
          trackViewItem={{
            item: {
              id: shopifyProductData.id || '',
              name: shopifyProductData.title || '',
              category: shopifyProductData.productType || '',
              price: shopifyProductData.priceRange?.minVariantPrice?.amount || 0
            },
            currency: shopifyProductData.priceRange?.minVariantPrice?.currencyCode || 'USD'
          }}
        />
      )}

      <SplashScreen title={sanityProductData.store.title} />

      <Details
        sanityProductData={sanityProductData}
        sanitySizeGuide={sanitySizeGuide}
        shopifyProductData={shopifyProductData}
        shopifyProductRecommendations={shopifyProductRecommendations}
      />

      <Sections sanityProductData={sanityProductData} params={params} searchParams={searchParams} />
    </>
  );
};

export default ProductTemplate;
