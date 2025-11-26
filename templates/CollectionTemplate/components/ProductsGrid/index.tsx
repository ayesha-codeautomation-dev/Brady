'use client';

import { useState, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import Button from '@/components/Button';
import Text from '@/components/Text';
import QuoteOverlay from './components/QuoteOverlay';
import TextBlock from '@/components/TextBlock';
import Filters from './components/Filters';
import Layout from '@/components/Layout';
import useCollectionFilters from './hooks/useCollectionFilters';
import useScrollToGridTop from './hooks/useScrollToGridTop';
import {
  GetCollectionByHandleResponse,
  GetCollectionFiltersByHandleResponse,
  GetCollectionSubCollectionFiltersByIdResponse
} from '@/tools/apis/shopify';
import { ICollectionDocument } from '@/tools/sanity/schema/documents/collection';
import type { LayoutOption } from './components/LayoutOptions';
import QuoteCard from './components/QuoteCard';
import styles from './styles.module.scss';

const ProductsGrid = ({
  initialData,
  initialProductCount,
  sanityCollectionData,
  filters,
  subCollectionFilters,
  sectionsMiddle
}: {
  initialData: GetCollectionByHandleResponse;
  sanityCollectionData: ICollectionDocument;
  initialProductCount: number;
  filters: GetCollectionFiltersByHandleResponse;
  subCollectionFilters: GetCollectionSubCollectionFiltersByIdResponse;
  sectionsMiddle?: React.ReactNode;
}) => {
  const { shopifyCollectionData, productCount } = useCollectionFilters({
    initialData,
    initialProductCount,
    filters,
    collectionSlug: sanityCollectionData.store.slug.current
  });
  const hasQuotes = sanityCollectionData?.quotes?.length > 0;
  const layoutType = sanityCollectionData?.layout || 'fluidAndGrid';

  const [layout, setLayout] = useState<LayoutOption>('fluid');
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const numVisibleProducts = shopifyCollectionData?.products?.edges?.length || 0;

  // Scroll to top of grid after fetching new products or changing layout
  useScrollToGridTop({ shopifyCollectionData, layout, gridId: 'bl-collection-grid' });

  // When the user clicks the load more button, increment the page number in the URL
  const nextPage = () => {
    const params = new URLSearchParams(searchParams);
    const page = parseInt(params.get('page') || '1');
    params.set('page', (page + 1).toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const layoutVariant = useMemo(() => {
    if (layoutType === 'list') {
      return 'list';
    } else if (layoutType === 'fluidAndGrid' && layout === 'grid') {
      return 'grid';
    } else if (layoutType === 'fluidAndGrid' && layout === 'fluid' && hasQuotes) {
      return 'fluid-quotes';
    }
    return 'fluid';
  }, [layoutType, layout, hasQuotes]);

  // Generate a combined array of products, quotes and middle sections
  const renderItems = useMemo(() => {
    const items: React.ReactNode[] = [];

    shopifyCollectionData?.products?.edges?.forEach(({ node }, index) => {
      // Add the product
      items.push(
        <ProductCard
          key={node?.id}
          shopifyProduct={node}
          layoutType={layoutType}
          className={styles.productCard}
          overlayDetailsOnMobile={layout === 'fluid'}
          collectionId={sanityCollectionData?.store?.id}
          collectionTitle={sanityCollectionData?.store?.title}
        />
      );

      // Inject quotes
      // Add quote if this index matches one of our injection points and we have a quote available
      const injectQuotesAfterProductCardIndex = {
        0: 2,
        1: 3,
        2: 4,
        3: 13
      };

      const quotes = sanityCollectionData?.quotes; // Up to 4 quotes
      const quoteIndex = Object.values(injectQuotesAfterProductCardIndex).indexOf(index);
      if (layoutType === 'fluidAndGrid' && layout === 'fluid' && hasQuotes && quoteIndex !== -1 && quotes[quoteIndex]) {
        items.push(<QuoteCard className={styles.productCard} key={`quote-${quoteIndex}`} quote={quotes[quoteIndex]} />);
      }

      // Inject middle sections
      // Add middle sections if this index matches one of our injection points and we have middle sections available
      const injectMiddleSectionsAfterProductCardIndex = {
        grid: 7,
        fluid: 3
      }[layout];
      if (layoutType === 'fluidAndGrid' && index === injectMiddleSectionsAfterProductCardIndex && sectionsMiddle) {
        items.push(
          <div key="middle-sections" className={styles.middleSections}>
            {sectionsMiddle}
          </div>
        );
      }
    });

    return items;
  }, [layout, sanityCollectionData, sectionsMiddle, layoutType, shopifyCollectionData, layoutVariant]);

  return (
    <>
      {layoutType !== 'list' && (
        <Filters filters={filters} subCollectionFilters={subCollectionFilters} layout={layout} setLayout={setLayout} />
      )}
      {shopifyCollectionData?.products?.edges?.length === 0 && (
        <div className={styles.noProducts}>
          <Text text="No products found" size="b2" />
        </div>
      )}
      <Layout variant={layoutVariant} id="bl-collection-grid">
        <QuoteOverlay
          quote={sanityCollectionData?.quote}
          show={layoutType === 'list'}
          itemsCount={renderItems.length}
        />
        {renderItems}
      </Layout>
      {numVisibleProducts < productCount && (
        <div className={styles.loadMoreContainer}>
          <Button variant="square" onClick={nextPage}>
            Load More
          </Button>
          <Text text={`Showing ${numVisibleProducts}/${productCount}`} size="b3" />
        </div>
      )}
    </>
  );
};

export default ProductsGrid;
