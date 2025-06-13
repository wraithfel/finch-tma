'use client';

import React from 'react';
import { Avatar } from '@telegram-apps/telegram-ui';

interface HeaderProps {
  logoUrl: string;
  avatarUrl: string | null;
  firstName: string;
}

export function Header({ logoUrl, avatarUrl, firstName }: HeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      {/* Левая часть: логотип */}
      <div className="flex items-center">
        <img
          src={logoUrl}
          alt="Логотип"
          className="h-8 w-auto"
        />
      </div>

      {/* Правая часть: имя и аватар */}
      <div className="flex items-center space-x-3">
        <span className="text-lg font-medium text-gray-800">
          Привет, {firstName}
        </span>
        <Avatar
          size={48}
          src={avatarUrl ? avatarUrl : 'https://avatars.githubusercontent.com/u/84640980?v=4'}
          alt={`${firstName}’s avatar`}
        />
      </div>
    </header>
  );
}

export default Header;
