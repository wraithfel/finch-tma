'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

export default function DefaultHeader() {
  const router = useRouter();

  return (
    <header
      className="relative h-16 flex items-center justify-center
                 border-b border-[var(--tg-theme-hint-color,rgba(0,0,0,.2))]
                 bg-[var(--tg-theme-header-bg-color,transparent)] px-3"
    >
      <button
        onClick={() => router.back()}
        aria-label="Назад"
        className="absolute left-3 flex items-center gap-1
                   h-8 px-2 rounded-full
                   bg-[var(--tg-theme-button-color)]
                   text-[var(--tg-theme-button-text-color)]
                   hover:opacity-90 active:scale-95 transition"
      >
        <ArrowLeft size={18} />
        <span className="text-sm font-medium">Назад</span>
      </button>
      <div className="relative h-13 w-32 select-none">
        <Image
          src="/logo-finch.svg"
          alt="Finch Logo"
          fill
          priority
          className="object-contain"
        />
      </div>
    </header>
  );
}
