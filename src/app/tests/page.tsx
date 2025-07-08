'use client';

import React, { useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, ClipboardEdit, ListChecks, Home } from 'lucide-react';

import DefaultHeader from '@/components/DefaultHeader';
import { CategoryTabs } from '@/components/CategoryTabs';
import { menuData } from '@/app/menu/data';
import type { Menu, MenuItem } from '@/lib/types/menu';

type Mode = 'composition' | 'general' | null;
const menu = menuData as Menu;

export default function TestsPage() {
  const router = useRouter();
  const search = useSearchParams();
  const [mode, setMode] = useState<Mode>(null);

  const activeKey = search.get('cat') ?? menu.categories[0].key;
  const category = useMemo(
    () => menu.categories.find(c => c.key === activeKey) || menu.categories[0],
    [activeKey]
  );

  const handleCategorySelect = (key: string) => {
    router.push(`/tests?cat=${key}`, { scroll: false });
  };

  const handleDishTest = (item: MenuItem) => {
    router.push(`/tests/composition/${item.id}`, { scroll: false });
  };

  const handleStartGeneral = () => {
    console.log('Starting general test');
  };

  const handleBackToTests = () => {
    setMode(null);
    router.push('/tests');
  };

  const handleBackHome = () => {
    router.push('/');
  };

  if (mode === null) {
    return (
      <div className="min-h-dvh flex flex-col bg-[var(--tg-theme-bg-color)]">
        <DefaultHeader showBack={false} />

        <section className="relative flex-1 flex flex-col items-center justify-center gap-12 p-6 text-center bg-gradient-to-br from-purple-700/30 via-indigo-700/20 to-teal-700/30 backdrop-blur-lg">
          <button
            onClick={handleBackHome}
            className="absolute top-4 right-4 inline-flex items-center gap-2 text-sm text-[var(--tg-theme-link-color)] hover:underline"
          >
            <Home size={18} /> Главная
          </button>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--tg-theme-text-color)] drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)]">
            Выберите&nbsp;тип&nbsp;теста
          </h1>

          <div className="flex flex-col sm:flex-row gap-6">
            <button
              onClick={() => setMode('general')}
              className="inline-flex items-center gap-3 px-10 py-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-lg font-semibold shadow-2xl shadow-indigo-800/40 hover:scale-[1.03] active:scale-100 transition-transform duration-150"
            >
              <ListChecks size={24} />
              Общий&nbsp;тест
            </button>

            <button
              onClick={() => setMode('composition')}
              className="inline-flex items-center gap-3 px-10 py-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-lg font-semibold shadow-2xl shadow-emerald-800/40 hover:scale-[1.03] active:scale-100 transition-transform duration-150"
            >
              <ClipboardEdit size={24} />
              Тест&nbsp;по&nbsp;составам
            </button>
          </div>
        </section>
      </div>
    );
  }

  if (mode === 'general') {
    return (
      <div className="min-h-dvh flex flex-col bg-[var(--tg-theme-bg-color)]">
        <DefaultHeader />

        <main className="flex-1 w-full max-w-xl mx-auto p-6">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={handleBackHome}
              className="inline-flex items-center gap-1 text-sm text-[var(--tg-theme-link-color)] hover:underline"
            >
              <Home size={16} /> Главная
            </button>

            <h1 className="text-2xl font-extrabold text-[var(--tg-theme-text-color)]">
              Общий&nbsp;тест
            </h1>

            <button
              onClick={handleBackToTests}
              className="inline-flex items-center gap-1 text-sm text-[var(--tg-theme-link-color)] hover:underline"
            >
              <ArrowLeft size={16} /> К&nbsp;выбору
            </button>
          </div>

          <div className="flex flex-col items-center gap-8">
            <button
              onClick={handleStartGeneral}
              className="px-8 py-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:brightness-110 active:scale-95 transition-all"
            >
              Начать
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-dvh flex flex-col bg-[var(--tg-theme-bg-color)]">
      <DefaultHeader />

      <main className="flex-1 overflow-y-auto p-4 space-y-6 max-w-3xl mx-auto w-full">
        <div className="flex items-center justify-between">
          <button
            onClick={handleBackHome}
            className="inline-flex items-center gap-1 text-sm text-[var(--tg-theme-link-color)] hover:underline"
          >
            <Home size={16} /> Главная
          </button>

          <h1 className="text-2xl font-extrabold text-[var(--tg-theme-text-color)]">
            Тест&nbsp;по&nbsp;составам
          </h1>

          <button
            onClick={handleBackToTests}
            className="inline-flex items-center gap-1 text-sm text-[var(--tg-theme-link-color)] hover:underline"
          >
            <ArrowLeft size={16} /> К&nbsp;выбору
          </button>
        </div>

        <CategoryTabs
          categories={menu.categories.map(c => ({ key: c.key, name: c.name }))}
          selectedKey={activeKey}
          onSelect={handleCategorySelect}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {category.items.map(item => (
            <button
              key={item.id}
              onClick={() => handleDishTest(item)}
              className="aspect-square flex items-center justify-center rounded-2xl bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)] text-center text-sm font-medium shadow-lg shadow-black/20 hover:scale-105 active:scale-95 transition-transform"
            >
              {item.name}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
