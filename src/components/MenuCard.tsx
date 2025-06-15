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
      className="relative overflow-hidden rounded-[28px] shadow-xl ring-2 ring-[var(--tg-theme-accent-text-color)]/40 backdrop-blur-[2px] transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] active:scale-100"
      style={{ backgroundColor: 'var(--tg-theme-section-bg-color)' }}
    >
      <CardChip
        readOnly
        className="absolute z-10 top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold shadow-lg backdrop-blur-sm"
        style={{
          background:
            'linear-gradient(135deg, var(--tg-theme-button-color) 0%, var(--tg-theme-accent-text-color) 100%)',
          color: 'var(--tg-theme-button-text-color)'
        }}
      >
        {chipText}
      </CardChip>

      <img
        src={imageSrc}
        alt={altText}
        style={{
          display: 'block',
          width: '100%',
          height: 260,
          objectFit: 'cover',
        }}
      />

      <CardCell
        readOnly
        className="px-4 py-3"
        style={{ background: 'var(--tg-theme-secondary-bg-color)' }}
      >
        <div className="flex flex-col">
          <span className="font-bold text-lg" style={{ color: 'var(--tg-theme-text-color)' }}>
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
  );
}
