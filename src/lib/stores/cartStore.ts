'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { MenuItem } from '@/lib/types/menu';

interface CartItem {
  item: MenuItem;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  add: (item: MenuItem) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) => {
        const exists = get().items.find((ci) => ci.item.id === item.id);
        if (exists) {
          set({
            items: get().items.map((ci) =>
              ci.item.id === item.id
                ? { ...ci, quantity: ci.quantity + 1 }
                : ci
            ),
          });
        } else {
          set({ items: [...get().items, { item, quantity: 1 }] });
        }
      },
      increase: (id) =>
        set({
          items: get().items.map((ci) =>
            ci.item.id === id ? { ...ci, quantity: ci.quantity + 1 } : ci
          ),
        }),
      decrease: (id) =>
        set({
          items: get().items
            .map((ci) =>
              ci.item.id === id ? { ...ci, quantity: ci.quantity - 1 } : ci
            )
            .filter((ci) => ci.quantity > 0),
        }),
      remove: (id) =>
        set({
          items: get().items.filter((ci) => ci.item.id !== id),
        }),
      clear: () => set({ items: [] }),
    }),
    {
      name: 'finch-cart',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);
