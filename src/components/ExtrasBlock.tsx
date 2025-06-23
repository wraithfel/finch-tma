'use client'

import React from 'react'
import type { Extra } from '@/lib/types/menu'

export function ExtrasBlock({ extras, title }: { extras: Extra[]; title: string }) {
  const chips = extras.flatMap(e =>
    e.description
      ? e.description.split(',').map((part, i) => ({
          key: `${e.id}-${i}`,
          text: part.trim(),
          outlined: true
        }))
      : [{ key: e.id, text: e.name, outlined: false }]
  )

  const baseChipClass =
    'px-4 py-1 rounded-full text-sm font-medium backdrop-blur-sm transition-all duration-300 will-change-transform'

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-[var(--tg-theme-text-color)]">
        {title}
      </h2>

      <div className="flex flex-wrap gap-2">
        {chips.map(({ key, text, outlined }) => (
          <span
            key={key}
            className={
              (outlined
                ? `ring-1 ring-[var(--tg-theme-hint-color)] text-[var(--tg-theme-text-color)]/85 hover:bg-[color-mix(in_srgb,var(--tg-theme-hint-color)_12%,transparent)]`
                : `bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)] shadow-md hover:brightness-110`) +
              ` ${baseChipClass} hover:-translate-y-0.5 hover:shadow-lg`
            }
          >
            {text}
          </span>
        ))}
      </div>
    </section>
  )
}
