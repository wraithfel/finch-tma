'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar } from '@telegram-apps/telegram-ui';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/stores/cartStore';

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
  const { items } = useCart()
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

      <div className="flex items-center gap-8">
        <Link href="/cart" aria-label="Корзина" className="relative">
          <ShoppingCart
            size={24}
            className="text-[var(--tg-theme-text-color)] hover:opacity-80 transition"
          />
          <span className="absolute bg-red-500 -top-2 -right-2 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {items.length}
          </span>
        </Link>

        <span
          className="text-sm font-medium leading-none -mr-6"
          style={{ color: 'var(--tg-theme-text-color)' }}
        >
          {firstName}
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
