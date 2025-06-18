'use client'

import React from 'react'
import type { MenuItem } from '@/lib/types/menu'
import MenuCard from '@/components/MenuCard'

export function MenuGrid({ items }: { items: MenuItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <MenuCard
          key={item.id}
          id={item.id}
          chipText={item.chip ?? '220 ₽'}
          imageSrc={item.image}
          altText={item.name}
          title={item.name}
          subtitle={item.shortDescription}
        />
      ))}
    </div>
  )
}