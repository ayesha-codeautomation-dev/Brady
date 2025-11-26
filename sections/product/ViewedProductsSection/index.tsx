'use client';

import { useEffect, useState } from 'react';
import Text from '@/components/Text';
import Section from '@/components/Section';
import ProductCard from '@/components/ProductCard';
import { getProducts, ShopifyProduct } from '@/tools/apis/shopify';
import { useRecentlyViewed } from '@/tools/store/useRecentlyViewed';
// import { IViewedProductsSection } from '@/tools/sanity/schema/sections/viewedProductsSection';
import styles from './styles.module.scss';

type Props = {
  currentProductId?: string;
  extraData?: {
    ViewedProductsSection?: {
      currentProductId: string;
    };
  };
};

const ViewedProductsSection: React.FC<Props> = props => {
  const currentProductId = props.currentProductId || props?.extraData?.ViewedProductsSection?.currentProductId;
  const productIds = useRecentlyViewed(state => state.productIds);
  const addToRecentlyViewed = useRecentlyViewed(state => state.add);
  const [products, setProducts] = useState<ShopifyProduct[]>();

  useEffect(() => {
    const fetchProducts = async () => {
      let fetchedProducts = await getProducts(productIds);

      if (fetchedProducts) {
        // Remove the current product from the list of recently viewed products
        fetchedProducts = fetchedProducts.filter(product => product.id !== currentProductId);

        setProducts(fetchedProducts);
      }
    };
    if (productIds.length > 0) {
      fetchProducts();
    }

    return () => {
      if (currentProductId) {
        addToRecentlyViewed(currentProductId);
      }
    };
  }, [productIds, currentProductId, addToRecentlyViewed]);

  if (!products) return null;

  return (
    <Section name="ViewedProductsSection" className={styles.section} containerClassName={styles.container}>
      <Text as="h2" text="Recently viewed" size="2xl" />
      <div className={styles.grid}>
        {products.map(product => (
          <ProductCard key={product.id} shopifyProduct={product} />
        ))}
      </div>
    </Section>
  );
};

export default ViewedProductsSection;
