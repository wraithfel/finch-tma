"use client";

import React, { useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

import DefaultHeader from "@/components/DefaultHeader";
import { CategoryTabs } from "@/components/CategoryTabs";
import { MenuGrid } from "@/components/MenuGrid";
import type { Menu } from "@/lib/types/menu";
import { drinksData } from "./data";

const Gradient = dynamic(() => import("@/components/GradientBackdrop"), {
  ssr: false,
});

const menu = drinksData as Menu;

export default function DrinksPage() {
  const search = useSearchParams();
  const router = useRouter();
  const active = search.get("cat") ?? menu.categories[0].key;

  const category = useMemo(() => menu.categories.find((c) => c.key === active)!, [active]);

  const handleSelect = (key: string) => {
    if (key === active) return;
    router.replace(`?cat=${key}`, { scroll: false });
  };

  return (
    <div className="relative min-h-dvh flex flex-col overflow-hidden bg-[var(--tg-theme-bg-color)]">
      <Gradient className="pointer-events-none" />

      <DefaultHeader />

      <section className="relative overflow-hidden p-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl shadow-xl ring-1 ring-[color-mix(in_srgb,var(--tg-theme-hint-color)_50%,transparent)] bg-[url('/finch-drinks.jpg')] bg-cover bg-center h-52 sm:h-72 md:h-80 lg:h-[360px]"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/5" />
          <h1 className="absolute bottom-4 left-6 right-6 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white drop-shadow-lg">
            Напитки Finch
          </h1>
        </motion.div>
      </section>

      <main className="relative -mt-14 z-10 flex-1 overflow-y-auto rounded-t-[40px] bg-[var(--tg-theme-bg-color)] p-4 space-y-6 shadow-[0_-12px_20px_-8px_rgba(0,0,0,0.15)]">
        <CategoryTabs
          categories={menu.categories}
          selectedKey={active}
          onSelect={handleSelect}
        />

        <motion.h2
          key={category.key}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-2xl font-extrabold text-[var(--tg-theme-text-color)]"
        >
          {category.name}
        </motion.h2>

        <MenuGrid items={category.items} categoryKey={active} />
      </main>
    </div>
  );
}
