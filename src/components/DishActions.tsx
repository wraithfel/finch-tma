'use client';

import React from 'react';
import Link from 'next/link';

interface DishActionsProps {
  dishId: string;
}

export default function DishActions({ dishId }: DishActionsProps) {
  const handleAddToCart = () => {
    console.log('Добавлено в заказ:', dishId);
  };

  return (
    <div className="sticky bottom-0 flex gap-3 p-4 bg-[var(--tg-theme-bg-color)]/80 backdrop-blur-md">
      <Link
        href={`/ask?dish=${dishId}`}
        className="flex-1 text-center py-3 rounded-full font-bold
          bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
          text-white shadow-lg active:scale-95 transition"
      >
        Спросить AI
      </Link>

      <button
        onClick={handleAddToCart}
        className="flex-1 py-3 rounded-full font-bold
          bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600
          text-white shadow-lg active:scale-95 transition"
      >
        Добавить в заказ
      </button>
    </div>
  );
}
