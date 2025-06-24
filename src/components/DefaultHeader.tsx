'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/stores/cartStore';

export default function DefaultHeader() {
  const router = useRouter();
  const totalQty = useCart(
    (s) => s.items.reduce((sum, ci) => sum + ci.quantity, 0),
  );

  return (
    <header
      className="relative h-16 flex items-center justify-center
                 border-b border-[var(--tg-theme-hint-color,rgba(0,0,0,.2))]
                 bg-[var(--tg-theme-header-bg-color,transparent)] px-3"
    >
      <button
        onClick={() => router.back()}
        aria-label="Назад"
        className="absolute left-3 flex items-center gap-1
                   h-8 px-2 rounded-full
                   bg-[var(--tg-theme-button-color)]
                   text-[var(--tg-theme-button-text-color)]
                   hover:opacity-90 active:scale-95 transition"
      >
        <ArrowLeft size={18} />
        <span className="text-sm font-medium">Назад</span>
      </button>

      <div className="relative h-13 w-32 select-none">
        <Image
          src="/logo-finch.svg"
          alt="Finch Logo"
          fill
          priority
          className="object-contain"
        />
      </div>

      <Link
        href="/cart"
        aria-label="Корзина"
        className="absolute right-3 flex items-center"
      >
        <div className="relative">
          <ShoppingCart
            size={24}
            className="text-[var(--tg-theme-text-color)] hover:opacity-80 transition"
          />
          {totalQty > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
              {totalQty}
            </span>
          )}
        </div>
      </Link>
    </header>
  );
}
