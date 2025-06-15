'use client';

import React from 'react';
import Image from 'next/image';
import { Avatar } from '@telegram-apps/telegram-ui';

interface HeaderProps {
  logoUrl: string;
  avatarUrl: string | null;
  firstName: string;
}

export default function Header({
  logoUrl,
  avatarUrl,
  firstName,
}: HeaderProps) {
  return (
    <header
      className="flex items-center justify-between h-20 px-3"
      style={{
        backgroundColor: 'var(--tg-theme-header-bg-color)',
        borderBottom: '1px solid var(--tg-theme-hint-color, rgba(0,0,0,.25))',
      }}
    >
      <div className="relative flex-1 h-16">
        <Image
          src={logoUrl}
          alt="Логотип"
          fill
          priority
          className="object-contain object-left"
        />
      </div>
      <div className="flex items-center gap-2 pr-2">
        <span
          className="text-sm font-medium leading-none"
          style={{ color: 'var(--tg-theme-text-color)' }}
        >
          Привет, {firstName}
        </span>
        <Avatar
          size={40}
          src={avatarUrl || ''}
          alt={`${firstName} avatar`}
          style={{
            border: '1px solid var(--tg-theme-button-color)',
            borderRadius: '50%',
          }}
        />
      </div>
    </header>
  );
}
