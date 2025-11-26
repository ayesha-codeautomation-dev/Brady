'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { sanityFetch } from '@/tools/sanity/lib/fetchFromSection';
import { ARTWORKS_QUERY, PRODUCTS_QUERY } from '@/tools/sanity/lib/queries.groq';
import {
  getCollectionByHandle,
  GetCollectionByHandleResponse,
  GetCollectionByHandleSortBy,
  GetCollectionFiltersByHandleResponse,
  getCollectionProductCountByHandle
} from '@/tools/apis/shopify';

/**
 * useCollectionFilters
 *
 * @param initialData - The initial collection data to display
 * @param initialProductCount - The initial product count to display
 * @param filters - The filters for the collection
 * @param collectionSlug - The slug of the collection
 *
 * @returns shopifyCollectionData - The collection data to display
 * @returns productCount - The product count to display
 *
 * @description
 * This hook is used to fetch and refetch the collection data and product count based on the current URL search params
 * It uses the search params to determine the selected filters, page number, and sort by value
 * It then fetches the collection data and product count based on the selected filters, page number, and sort by value
 *
 */

const useCollectionFilters = ({
  initialData,
  initialProductCount,
  filters,
  collectionSlug
}: {
  initialData: GetCollectionByHandleResponse;
  initialProductCount: number;
  filters: GetCollectionFiltersByHandleResponse;
  collectionSlug: string;
}): {
  shopifyCollectionData: GetCollectionByHandleResponse;
  productCount: number;
} => {
  const searchParams = useSearchParams(); // searchParams updates when the URL changes - including query params
  const [shopifyCollectionData, setShopifyCollectionData] = useState(initialData);
  const [productCount, setProductCount] = useState(initialProductCount);

  useEffect(() => {
    async function fetchShopifyCollectionData() {
      const params = new URLSearchParams(searchParams);
      const selectedFilterIds: string[] = [];
      for (const [key, value] of params) {
        if (key.split('.')?.[0] !== 'filter') continue;
        selectedFilterIds.push(`${key}.${value}`);
      }
      const selectedFilters = selectedFilterIds.map(id => {
        const filterMatch = filters?.find(filter => filter.values.some(value => value.id === id));
        return filterMatch?.values.find(value => value.id === id)?.input || '';
      });
      const selectedFiltersParsed = selectedFilters
        ?.map(filter => {
          try {
            return JSON.parse(filter);
          } catch (error) {
            return undefined;
          }
        })
        .filter(Boolean);
      const page = parseInt(params.get('page') || '1');
      const sortBy = (params.get('sort_by') || 'best-selling') as GetCollectionByHandleSortBy;
      return await getCollectionByHandle(collectionSlug, page, selectedFiltersParsed, sortBy);
    }

    async function fetchProductCount() {
      const params = new URLSearchParams(searchParams);
      const selectedFilterIds: string[] = [];
      for (const [key, value] of params) {
        if (key.split('.')?.[0] !== 'filter') continue;
        selectedFilterIds.push(`${key}.${value}`);
      }
      const selectedFilters = selectedFilterIds.map(id => {
        const filterMatch = filters?.find(filter => filter.values.some(value => value.id === id));
        return filterMatch?.values.find(value => value.id === id)?.input || '';
      });

      const selectedFiltersParsed = selectedFilters
        ?.map(filter => {
          try {
            return JSON.parse(filter);
          } catch (e) {
            return undefined;
          }
        })
        .filter(Boolean);

      return await getCollectionProductCountByHandle(collectionSlug, selectedFiltersParsed);
    }

    async function fetchData() {
      const newShopifyCollectionData = await fetchShopifyCollectionData();
      const newProductCount = await fetchProductCount();

      // Enrich the collection data with product media from Sanity
      const productIds = newShopifyCollectionData?.products?.edges?.map(({ node }) => node.id) || [];
      const sanityProductData = await sanityFetch<{ id: string; collectionMedia: any }[]>({
        query: PRODUCTS_QUERY,
        params: {
          productIds
        }
      });
      const enrichedNewShopifyCollectionData = newShopifyCollectionData?.products?.edges?.map(({ node }) => {
        const sanityProduct = sanityProductData.find(({ id }) => id === node.id);
        return {
          node: {
            ...node,
            ...(sanityProduct?.collectionMedia ? { collectionMedia: sanityProduct.collectionMedia } : {})
          }
        };
      });

      setShopifyCollectionData({
        ...newShopifyCollectionData,
        products: {
          edges: enrichedNewShopifyCollectionData
        }
      });

      setProductCount(newProductCount);
    }

    fetchData();
  }, [searchParams]);

  return {
    shopifyCollectionData,
    productCount
  };
};

export default useCollectionFilters;
