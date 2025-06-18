'use client'

import React from 'react'
import type { Extra } from '@/lib/types/menu'

interface ExtrasBlockProps {
  extras: Extra[]
  title?: string                
}

export function ExtrasBlock({ extras, title = 'Дополнения' }: ExtrasBlockProps) {
  if (!extras.length) return null
  return (
    <section>
      <h2 className="mt-10 mb-4 text-lg font-semibold text-[var(--tg-theme-text-color)]">
        {title}:
      </h2>
      <div className="flex flex-wrap gap-2">
        {extras.map((e) => (
          <span
            key={e.id}
            className="rounded-full bg-[var(--tg-theme-button-color)] px-4 py-1 text-sm font-medium text-[var(--tg-theme-button-text-color)]"
          >
            {e.name}
          </span>
        ))}
      </div>
    </section>
  )
}
