'use client'

import React, { useState } from 'react'
import { menuData } from './data'
import DefaultHeader from '@/components/DefaultHeader'
import { CategoryTabs } from '@/components/CategoryTabs'
import { MenuGrid } from '@/components/MenuGrid'
import { ExtrasBlock } from '@/components/ExtrasBlock'
import type { Menu } from '@/lib/types/menu'

const menu = menuData as Menu

export default function MenuPage() {
  const [selected, setSelected] = useState(menu.categories[0].key)
  const category = menu.categories.find(c => c.key === selected)!
  const extras = category.extras ?? []

  const extrasTitle = extras.length > 0
    ? selected === 'pancakes'
      ? 'Состав теста для панкейков'
      : selected === 'syrniki'
        ? 'Топпинги для классических сырников'
        : selected === 'eggs'
          ? 'Топпинги'
          : 'Добавки'
    : undefined

  return (
    <div className="min-h-dvh flex flex-col bg-[var(--tg-theme-bg-color)]">
      <DefaultHeader />

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        <CategoryTabs
          categories={menu.categories}
          selectedKey={selected}
          onSelect={setSelected}
        />

        <h1 className="text-2xl font-extrabold text-[var(--tg-theme-text-color)]">
          {category.name}
        </h1>

        <MenuGrid items={category.items} />

        {extrasTitle && (
          <ExtrasBlock extras={extras} title={extrasTitle} />
        )}
      </main>
    </div>
  )
}
