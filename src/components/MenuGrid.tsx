'use client'

import React from 'react'
import MenuCard from '@/components/MenuCard'
import type { MenuItem } from '@/lib/types/menu'

export function MenuGrid({
  items,
  categoryKey,
}: {
  items: MenuItem[]
  categoryKey: string        
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <MenuCard
          key={item.id}
          id={item.id}
          chipText={item.chip}
          imageSrc={item.image}
          altText={item.name}
          title={item.name}
          subtitle={item.shortDescription}
          queryCat={categoryKey}
        />
      ))}
    </div>
  )
}
