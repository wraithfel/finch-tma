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

  const isSyrniki = selected === 'syrniki'
  const baseExtra = extras.find(e => e.id === 'syrniki_base')
  const toppingExtras = extras.filter(e => e.id !== 'syrniki_base')

  const defaultTitle =
    selected === 'pancakes'
      ? 'Состав теста для панкейков'
      : selected === 'eggs'
        ? 'Топпинги'
        : 'Добавки'

  return (
    <div className="min-h-dvh flex flex-col bg-[var(--tg-theme-bg-color)]">
      <DefaultHeader />
      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        <CategoryTabs categories={menu.categories} selectedKey={selected} onSelect={setSelected} />
        <h1 className="text-2xl font-extrabold text-[var(--tg-theme-text-color)]">{category.name}</h1>

        <MenuGrid items={category.items} />

        {isSyrniki ? (
          <>
            {baseExtra && <ExtrasBlock extras={[baseExtra]} title="Состав массы для сырников" />}
            {toppingExtras.length > 0 && (
              <ExtrasBlock extras={toppingExtras} title="Топпинги для классических сырников" />
            )}
          </>
        ) : (
          extras.length > 0 && <ExtrasBlock extras={extras} title={defaultTitle} />
        )}
      </main>
    </div>
  )
}
