import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type RecentlyViewedStore = {
  productIds: string[];
  add: (productId: string) => void;
};

export const useRecentlyViewed = create(
  persist<RecentlyViewedStore>(
    (set, get) => ({
      productIds: [],
      add: productId => {
        const productIds = get().productIds;
        if (productIds.includes(productId)) {
          return;
        }
        if (productIds.length >= 12) {
          productIds.pop();
        }
        productIds.unshift(productId);
        set({ productIds });
      }
    }),
    {
      name: 'rtl.localstorage.recently-viewed', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage) // (optional) by default, 'localStorage' is used
    }
  )
);
