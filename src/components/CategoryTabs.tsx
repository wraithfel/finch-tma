'use client'

import React from 'react'
import clsx from 'clsx'

interface Category {
  key: string
  name: string
}

interface CategoryTabsProps {
  categories: Category[]
  selectedKey: string
  onSelect: (key: string) => void
}

export function CategoryTabs({
  categories,
  selectedKey,
  onSelect,
}: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap -mx-1">
      {categories.map((c) => {
        const active = c.key === selectedKey
        return (
          <button
            key={c.key}
            onClick={() => onSelect(c.key)}
            className={clsx(
              'w-1/4 px-1 mb-2 text-center py-2 rounded-full transition-all duration-200 backdrop-blur-sm',
              active
                ? 'bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)] font-bold shadow-md'
                : 'font-medium text-[var(--tg-theme-hint-color)] bg-[color-mix(in_srgb,var(--tg-theme-hint-color)_10%,transparent)] ring-1 ring-inset ring-[color-mix(in_srgb,var(--tg-theme-hint-color)_30%,transparent)] hover:bg-[color-mix(in_srgb,var(--tg-theme-hint-color)_16%,transparent)]'
            )}
          >
            {c.name}
          </button>
        )
      })}
    </div>
  )
}
