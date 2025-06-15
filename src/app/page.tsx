'use client';

import React, { useEffect, useState } from 'react';

import Header from '@/components/Header';
import FullScreenLoader from '@/components/FullScreenLoader';
import SectionCard from '@/components/SectionCard';
import { useTelegramUser } from '@/lib/hooks/useTelegramUser';
import { sections } from '@/lib/utils/constants';

export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false);
  const { userData, theme } = useTelegramUser();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !userData || !theme) {
    return <FullScreenLoader />;
  }

  return (
    <>
      <Header
        logoUrl="/logo-finch.svg"
        avatarUrl={userData.photo_url || ''}
        firstName={userData.first_name}
      />

      <main className="flex flex-col gap-5 p-4 pb-8">
        {sections.map((section, idx) => (
          <SectionCard key={section.key} section={section} index={idx} />
        ))}
      </main>
    </>
  );
}
