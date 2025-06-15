'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { menuData } from './data';
import MenuCard from '@/components/MenuCard';
import type { Menu } from '@/lib/types/menu';

const menu = menuData as Menu;

export default function MenuPage() {
  const router = useRouter();
  const category = menu.categories.find(c => c.key === 'eggs');
  const extras = category?.extras ?? [];

  if (!category) return null;

  return (
    <div className="min-h-dvh flex flex-col bg-[var(--tg-theme-bg-color)]">
      <header className="relative h-16 flex items-center justify-center border-b border-[var(--tg-theme-hint-color,rgba(0,0,0,.2))] bg-[var(--tg-theme-header-bg-color,transparent)] px-3">
        <button
          onClick={() => router.back()}
          aria-label="Назад"
          className="absolute left-3 flex items-center gap-1 h-8 px-2 rounded-full bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)] hover:opacity-90 active:scale-95 transition"
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
      </header>
      <main className="flex-1 overflow-y-auto p-4">
        <h1 className="mb-6 text-3xl font-extrabold text-[var(--tg-theme-text-color)]">
          {category.name}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {category.items.map(item => (
            <MenuCard
              key={item.id}
              chipText="220 ₽"
              imageSrc={item.image}
              altText={item.name}
              title={item.name}
              subtitle={item.description || item.method}
            />
          ))}
        </div>
        {extras.length > 0 && (
          <>
            <h2 className="mt-10 mb-4 text-lg font-semibold text-[var(--tg-theme-text-color)]">
              Возможные топпинги:
            </h2>
            <div className="flex flex-wrap gap-2">
              {extras.map(extra => (
                <span
                  key={extra.id}
                  className="rounded-full px-4 py-1 text-sm font-medium bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)]"
                >
                  {extra.name}
                </span>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

