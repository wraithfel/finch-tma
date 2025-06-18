"use client";

import React, { useState, useRef, useEffect } from "react";
import { menuData } from "./data";
import MenuCard from "@/components/MenuCard";
import DefaultHeader from "@/components/DefaultHeader";
import type { Menu } from "@/lib/types/menu";

import {
  SegmentedControl
} from "@telegram-apps/telegram-ui";
import { SegmentedControlItem } from "@telegram-apps/telegram-ui/dist/components/Navigation/SegmentedControl/components/SegmentedControlItem/SegmentedControlItem";

const menu = menuData as Menu;

/**
 * Page with Telegram‑styled segmented control.
 * Uses outer wrapper <div> to handle horizontal scroll —
 * SegmentedControl не принимает `ref`, поэтому реф кладём на контейнер.
 */
export default function MenuPage() {
  const [selectedKey, setSelectedKey] = useState<string>(menu.categories[0].key);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Центрируем выбранный сегмент
  useEffect(() => {
    const wrapper = scrollRef.current;
    const active = wrapper?.querySelector<HTMLElement>("[data-active='true']");
    if (wrapper && active) {
      const { offsetLeft, offsetWidth } = active;
      const target = offsetLeft - (wrapper.clientWidth - offsetWidth) / 2;
      wrapper.scrollTo({ left: target, behavior: "smooth" });
    }
  }, [selectedKey]);

  const category = menu.categories.find((c) => c.key === selectedKey);
  if (!category) return null;
  const extras = category.extras ?? [];

  return (
    <div className="min-h-dvh flex flex-col bg-[var(--tg-theme-bg-color)]">
      <DefaultHeader />

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Категории */}
        <div
          ref={scrollRef}
          className="no-scrollbar flex overflow-x-auto gap-2 pb-2 scroll-snap-x mandatory whitespace-nowrap"
        >
          <SegmentedControl className="flex gap-2">
            {menu.categories.map((c) => {
              const active = selectedKey === c.key;
              return (
                <SegmentedControlItem
                  key={c.key}
                  data-active={active}
                  onClick={() => setSelectedKey(c.key)}
                  className={`scroll-snap-align-center truncate max-w-[150px] shrink-0 px-4 py-1 rounded-full transition-colors ${
                    active
                      ? "bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)]"
                      : "bg-[var(--tg-theme-secondary-bg-color,rgba(255,255,255,0.08))] text-[var(--tg-theme-hint-color)]"
                  }`}
                >
                  {c.name}
                </SegmentedControlItem>
              );
            })}
          </SegmentedControl>
        </div>

        {/* Название категории */}
        <h1 className="text-2xl font-extrabold text-[var(--tg-theme-text-color)]">
          {category.name}
        </h1>

        {/* Товары */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {category.items.map((item) => (
            <MenuCard
              key={item.id}
              chipText={item.chip ?? "220 ₽"}
              imageSrc={item.image}
              altText={item.name}
              title={item.name}
              subtitle={item.description || item.method}
            />
          ))}
        </div>

        {/* Топпинги */}
        {extras.length > 0 && (
          <section>
            <h2 className="mt-10 mb-4 text-lg font-semibold text-[var(--tg-theme-text-color)]">
              Возможные топпинги:
            </h2>
            <div className="flex flex-wrap gap-2">
              {extras.map((extra) => (
                <span
                  key={extra.id}
                  className="rounded-full bg-[var(--tg-theme-button-color)] px-4 py-1 text-sm font-medium text-[var(--tg-theme-button-text-color)]"
                >
                  {extra.name}
                </span>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}