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
      className="flex items-center justify-between px-4 py-3 shadow-sm"
      style={{
        backgroundColor: theme.bg_color,
        color: theme.text_color,
        borderBottom: `1px solid ${theme.button_color}`,
      }}
    >
      {/* логотип */}
      <Image
        src={logoUrl}
        alt="Finch logo"
        priority
        width={56}
        height={56}
        className="select-none"
      />

      {/* приветствие и аватар */}
      <div className="flex items-center gap-3">
        <span
          className="font-semibold text-base leading-none"
          style={{ color: theme.hint_color }}
        >
          Привет, {firstName}
        </span>
        <Avatar
          size={48}
          src={
            avatarUrl ??
            'https://telegrampics.firebaseio.com/default-avatar.png'
          }
          alt={`${firstName}'s avatar`}
          style={{
            border: `2px solid ${theme.button_color}`,
            borderRadius: '50%',
          }}
        />
      </div>
    </header>
  );
}
