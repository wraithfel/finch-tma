'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { MenuItem } from '@/lib/types/menu';

export interface CartItem {
  item: MenuItem;
  variantId?: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  add: (item: MenuItem, variantId?: string) => void;
  increase: (id: string, variantId?: string) => void;
  decrease: (id: string, variantId?: string) => void;
  remove: (id: string, variantId?: string) => void;
  clear: () => void;
}

interface CartItemV1 {
  item: MenuItem;
  quantity: number;
}
interface PersistedV1 {
  items?: CartItemV1[];
}

const migrateToV2 = (state: PersistedV1) => ({
  items: (state.items ?? []).map(({ item, quantity }) => ({
    item,
    quantity,
    variantId: undefined,
  })),
});


const VERSION = 2;

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      add: (item, variantId) => {
        const exists = get().items.find(
          (ci) => ci.item.id === item.id && ci.variantId === variantId,
        );

        if (exists) {
          set({
            items: get().items.map((ci) =>
              ci.item.id === item.id && ci.variantId === variantId
                ? { ...ci, quantity: ci.quantity + 1 }
                : ci,
            ),
          });
        } else {
          set({
            items: [...get().items, { item, variantId, quantity: 1 }],
          });
        }
      },

      increase: (id, variantId) =>
        set({
          items: get().items.map((ci) =>
            ci.item.id === id && ci.variantId === variantId
              ? { ...ci, quantity: ci.quantity + 1 }
              : ci,
          ),
        }),

      decrease: (id, variantId) =>
        set({
          items: get()
            .items.map((ci) =>
              ci.item.id === id && ci.variantId === variantId
                ? { ...ci, quantity: ci.quantity - 1 }
                : ci,
            )
            .filter((ci) => ci.quantity > 0),
        }),

      remove: (id, variantId) =>
        set({
          items: get().items.filter(
            (ci) => !(ci.item.id === id && ci.variantId === variantId),
          ),
        }),

      clear: () => set({ items: [] }),
    }),
    {
      name: 'finch-cart',
      storage: createJSONStorage(() => localStorage),
      version: VERSION,
      migrate: (persistedState, persistedVersion) =>
        persistedVersion === 1
          ? migrateToV2(persistedState as PersistedV1)
          : (persistedState as Pick<CartState, 'items'>),
    },
  ),
);
