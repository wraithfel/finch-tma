'use client'

import React from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { menuData } from './data'
import DefaultHeader from '@/components/DefaultHeader'
import { CategoryTabs } from '@/components/CategoryTabs'
import { MenuGrid } from '@/components/MenuGrid'
import { ExtrasBlock } from '@/components/ExtrasBlock'
import type { Menu } from '@/lib/types/menu'

const menu = menuData as Menu

export default function MenuPage() {
  const search   = useSearchParams()
  const router   = useRouter()
  const active   = search.get('cat') ?? menu.categories[0].key

  const category = menu.categories.find(c => c.key === active)!
  const extras   = category.extras ?? []

  const isSyrniki      = active === 'syrniki'
  const baseExtra      = extras.find(e => e.id === 'syrniki_base')
  const toppingExtras  = extras.filter(e => e.id !== 'syrniki_base')

  const defaultTitle =
    active === 'pancakes'
      ? 'Состав теста для панкейков'
      : active === 'eggs'
      ? 'Топпинги'
      : 'Добавки'

  const handleSelect = (key: string) => {
    if (key === active) return
    router.replace(`?cat=${key}`, { scroll: false })
  }

  return (
    <div className="min-h-dvh flex flex-col bg-[var(--tg-theme-bg-color)]">
      <DefaultHeader />

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        <CategoryTabs
          categories={menu.categories}
          selectedKey={active}
          onSelect={handleSelect}
        />

        <h1 className="text-2xl font-extrabold text-[var(--tg-theme-text-color)]">
          {category.name}
        </h1>

        <MenuGrid items={category.items} categoryKey={active} />

        {isSyrniki ? (
          <>
            {baseExtra && (
              <ExtrasBlock
                extras={[baseExtra]}
                title="Состав массы для сырников"
              />
            )}
            {toppingExtras.length > 0 && (
              <ExtrasBlock
                extras={toppingExtras}
                title="Топпинги для классических сырников"
              />
            )}
          </>
        ) : (
          extras.length > 0 && (
            <ExtrasBlock extras={extras} title={defaultTitle} />
          )
        )}
      </main>
    </div>
  )
}
