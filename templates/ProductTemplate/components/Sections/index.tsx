import Sections from '@/components/Sections';
import { ProductReviewsSection, ViewedProductsSection } from '@/sections';
import { getReviews } from '@/tools/apis/okendo';
import { IProductDocument } from '@/tools/sanity/schema/documents/product';

const ProductSections = async ({
  sanityProductData,
  params,
  searchParams
}: {
  sanityProductData: IProductDocument;
  params?: { [key: string]: string } | undefined;
  searchParams?: { [key: string]: string } | undefined;
}) => {
  // const reviewsData = await getReviews('7128075108521', 'product');
  const reviewsData = await getReviews(sanityProductData.store.gid, 'product');

  // Use sections from Sanity if they exist
  if (sanityProductData?.sections && sanityProductData?.sections.length > 0) {
    return (
      <Sections
        sections={sanityProductData?.sections}
        params={params}
        searchParams={searchParams}
        extraData={[
          {
            // ViewedProductsSection: { currentProductId: sanityProductData?.store?.gid },
            ProductReviewsSection: { reviewsData: reviewsData }
          }
        ]}
      />
    );
  }
  // Otherwise, use the default sections
  return (
    <>
      {/* <ViewedProductsSection currentProductId={sanityProductData?.store?.gid} /> */}
      <ProductReviewsSection reviewsData={reviewsData} />
    </>
  );
};

export default ProductSections;
