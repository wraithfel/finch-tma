'use client'

import React from 'react'
import Link from 'next/link'
import { Card } from '@telegram-apps/telegram-ui'
import { CardCell } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell'
import { CardChip } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardChip/CardChip'

interface MenuCardProps {
  id: string
  chipText: string
  imageSrc: string
  altText: string
  title: string
  subtitle?: string
  queryCat: string
}

export default function MenuCard({
  id,
  chipText,
  imageSrc,
  altText,
  title,
  subtitle,
  queryCat,
}: MenuCardProps) {
  return (
    <Link
      href={{ pathname: `/menu/${id}`, query: { cat: queryCat } }}
      className="block w-full"
    >
      <Card
        className="block w-full relative overflow-hidden rounded-2xl shadow-lg transition-transform duration-200 hover:scale-105 border border-[var(--tg-theme-hint-color)]"
        style={{ backgroundColor: 'var(--tg-theme-section-bg-color)' }}
      >
        <CardChip
          readOnly
          className="absolute top-3 left-3 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium shadow-sm"
          style={{
            backgroundColor: 'var(--tg-theme-button-color)',
            color: 'var(--finch-chip-text-color)',
            width: 'max-content',
          }}
        >
          {chipText}
        </CardChip>

        <div
          role="img"
          aria-label={altText}
          className="w-full aspect-[4/3] bg-center bg-cover"
          style={{ backgroundImage: `url(${imageSrc})` }}
        />

        <CardCell
          readOnly
          className="px-4 py-3"
          style={{ backgroundColor: 'var(--tg-theme-secondary-bg-color)' }}
        >
          <div className="flex flex-col">
            <span
              className="font-bold text-lg"
              style={{ color: 'var(--tg-theme-text-color)' }}
            >
              {title}
            </span>
            {subtitle && (
              <span
                className="mt-1 text-sm"
                style={{ color: 'var(--tg-theme-text-color)', opacity: 0.6 }}
              >
                {subtitle}
              </span>
            )}
          </div>
        </CardCell>
      </Card>
    </Link>
  )
}
