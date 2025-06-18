'use client'

import React, { useState } from 'react'
import { menuData } from './data'
import MenuCard from '@/components/MenuCard'
import DefaultHeader from '@/components/DefaultHeader'
import type { Menu } from '@/lib/types/menu'
import { Breadcrumbs } from '@telegram-apps/telegram-ui'
import { BreadCrumbsItem } from '@telegram-apps/telegram-ui/dist/components/Navigation/Breadcrumbs/components/BreadCrumbsItem/BreadCrumbsItem'

const menu = menuData as Menu

export default function MenuPage() {
  const [selected, setSelected] = useState(menu.categories[0].key)
  const category = menu.categories.find(c => c.key === selected)!
  const extras = category.extras ?? []

  return (
    <div className="min-h-dvh flex flex-col bg-[var(--tg-theme-bg-color)]">
      <DefaultHeader />

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        <Breadcrumbs
          divider="dot"
          className="flex flex-wrap text-[var(--tg-theme-text-color)]"
        >
          {menu.categories.map(c => (
            <BreadCrumbsItem
              key={c.key}
              selected={c.key === selected}
              onClick={() => setSelected(c.key)}
              className={`
                px-4 py-2 rounded-full cursor-pointer transition
                ${c.key === selected
                  ? 'bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)] font-bold'
                  : 'bg-transparent text-[var(--tg-theme-text-color)] font-semibold'
                }
              `}
            >
              {c.name}
            </BreadCrumbsItem>
          ))}
        </Breadcrumbs>


        <h1 className="text-2xl font-extrabold text-[var(--tg-theme-text-color)]">
          {category.name}
        </h1>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {category.items.map(item => (
            <MenuCard
              key={item.id}
              chipText={item.chip ?? '220 ₽'}
              imageSrc={item.image}
              altText={item.name}
              title={item.name}
              subtitle={item.description || item.method}
            />
          ))}
        </div>

        {extras.length > 0 && (
          <section>
            <h2 className="mt-10 mb-4 text-lg font-semibold text-[var(--tg-theme-text-color)]">
              Возможные топпинги:
            </h2>
            <div className="flex flex-wrap gap-2">
              {extras.map(extra => (
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
  )
}
