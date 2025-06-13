'use client';

import Image from 'next/image';
import { Avatar } from '@telegram-apps/telegram-ui';
import type { ThemeParams } from '@/lib/types/theme';

interface HeaderProps {
  logoUrl: string;
  avatarUrl: string | null;
  firstName: string;
  theme: ThemeParams;
}

export default function Header({
  logoUrl,
  avatarUrl,
  firstName,
  theme,
}: HeaderProps) {
  return (
    <header
      className="flex items-center justify-between h-12 px-3"
      style={{
        backgroundColor: theme.bg_color,
        borderBottom: `1px solid ${theme.hint_color}40`, 
      }}
    >
      <div className="relative flex-1 h-full">
        <Image
          src={logoUrl}
          alt="Логотип"
          fill
          className="object-contain"
          priority
        />
      </div>
      
      <div className="flex items-center gap-2">
        <span
          className="text-sm font-medium leading-none"
          style={{ color: theme.text_color }}
        >
          Привет, {firstName}
        </span>

        <Avatar
          size={40}
          src={avatarUrl ?? ''}
          alt={`${firstName} avatar`}
          style={{
            border: `1px solid ${theme.button_color}`,
            borderRadius: '50%',
          }}
        />
      </div>
    </header>
  );
}
