'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  collectionFiltersChanged,
  removeCollectionFiltersChangedProperty,
  setCollectionFiltersChangedProperty
} from '../helpers';
import { GetCollectionByHandleResponse } from '@/tools/apis/shopify';
import { LayoutOption } from '../components/LayoutOptions';

const useScrollToGridTop = ({
  shopifyCollectionData,
  gridId
}: {
  shopifyCollectionData: GetCollectionByHandleResponse;
  gridId: string;
}) => {
  const [firstMount, setFirstMount] = useState(true);

  const scrollToGridTop = useCallback(() => {
    const collectionProductsGrid = document.getElementById(gridId);
    if (collectionProductsGrid) {
      const scrollTo = collectionProductsGrid.offsetTop + window.innerHeight;
      window.scrollTo({ top: scrollTo, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    if (collectionFiltersChanged()) {
      scrollToGridTop();
      setCollectionFiltersChangedProperty(false);
    }
  }, [shopifyCollectionData]);

  useEffect(() => {
    if (firstMount) {
      setFirstMount(false);
      return;
    }

    scrollToGridTop();
  });

  useEffect(() => {
    return () => {
      removeCollectionFiltersChangedProperty();
    };
  }, []);
};

export default useScrollToGridTop;
