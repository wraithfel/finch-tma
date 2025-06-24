'use client';

import React from 'react';
import Link from 'next/link';
import { Minus, Plus } from 'lucide-react';

import { menuData } from '@/app/menu/data';
import type { MenuItem } from '@/lib/types/menu';
import { useCart } from '@/lib/stores/cartStore';

interface DishActionsProps {
  dishId: string;
}

export default function DishActions({ dishId }: DishActionsProps) {
  const { add, increase, decrease, items } = useCart();

  const allItems: MenuItem[] = menuData.categories.flatMap((c) => c.items);
  const item = allItems.find((i) => i.id === dishId);

  const cartItem = items.find((ci) => ci.item.id === dishId);
  const qty = cartItem?.quantity ?? 0;

  const inc = () => increase(dishId);
  const dec = () => decrease(dishId);
  const firstAdd = () => item && add(item);

  return (
    <div className="sticky bottom-0 flex gap-3 p-4 bg-[var(--tg-theme-bg-color)]/80 backdrop-blur-md">
      <Link
        href={`/ask?dish=${dishId}`}
        className="flex-1 text-center py-3 rounded-full font-bold
                   bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                   text-white shadow-lg active:scale-95 transition"
      >
        Спросить&nbsp;AI
      </Link>

      {qty === 0 ? (
        <button
          onClick={firstAdd}
          className="flex-1 py-3 rounded-full font-bold
                     bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600
                     text-white shadow-lg active:scale-95 transition"
        >
          Добавить в заказ
        </button>
      ) : (
        <div className="flex-1 flex items-center justify-between rounded-full
                        bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600
                        text-white shadow-lg">
          <button
            onClick={dec}
            className="flex-1 h-full flex items-center justify-center py-3
                       hover:bg-emerald-700/30 active:scale-95 transition"
            aria-label="Минус"
          >
            <Minus size={20} />
          </button>

          <span className="w-10 text-center font-bold select-none">
            {qty}
          </span>

          <button
            onClick={inc}
            className="flex-1 h-full flex items-center justify-center py-3
                       hover:bg-emerald-700/30 active:scale-95 transition"
            aria-label="Плюс"
          >
            <Plus size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
