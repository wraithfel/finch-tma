'use client';

import React from 'react';
import { Card } from '@telegram-apps/telegram-ui';
import { CardChip } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardChip/CardChip';
import { CardCell } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell';

export interface MenuCardProps {
  chipText: string;
  imageSrc: string;
  altText: string;
  title: string;
  subtitle?: string;
}

export default function MenuCard({
  chipText,
  imageSrc,
  altText,
  title,
  subtitle,
}: MenuCardProps) {
  return (
    <Card
      className="relative overflow-hidden rounded-2xl shadow-lg transition-transform duration-200 hover:scale-105"
      style={{ backgroundColor: 'var(--tg-theme-section-bg-color)' }}
    >
      <CardChip
        readOnly
        className="absolute top-3 left-3 inline-flex items-center rounded-2xl px-2.5 py-0.5 text-xs font-medium shadow-sm"
        style={{
          backgroundColor: 'var(--tg-theme-button-color)',
          color: 'var(--tg-theme-button-text-color)',
          width: 'max-content',
        }}
      >
        {chipText}
      </CardChip>

      <img
        src={imageSrc}
        alt={altText}
        style={{ display: 'block', width: '100%', height: 260, objectFit: 'cover' }}
      />

      <CardCell
        readOnly
        className="px-4 py-3"
        style={{ backgroundColor: 'var(--tg-theme-secondary-bg-color)' }}
      >
        <div className="flex flex-col">
          <span className="font-bold text-lg" style={{ color: 'var(--tg-theme-text-color)' }}>
            {title}
          </span>
          {subtitle && (
            <span className="mt-1 text-sm" style={{ color: 'var(--tg-theme-text-color)', opacity: 0.6 }}>
              {subtitle}
            </span>
          )}
        </div>
      </CardCell>
    </Card>
  );
}
