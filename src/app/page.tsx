'use client';

import '@telegram-apps/telegram-ui/dist/styles.css';
import { Banner, Button } from '@telegram-apps/telegram-ui';
import React from 'react';
import { useTelegramUser } from '@/lib/hooks/useTelegramUser';
import Header from '@/components/header';
import Image from 'next/image';

export default function Page() {
  const { userData, theme } = useTelegramUser();

  if (!userData || !theme) {
    return (
      <div className="p-4 font-bold text-3xl text-cyan-300">
        Loading…
      </div>
    );
  }

  return (
    <>
      <Header
        logoUrl="/logo-finch.svg"
        avatarUrl={userData.photo_url || ''}
        firstName={userData.first_name}
        theme={theme}
      />

      <main className="p-1">
        <Banner
          type="section"
          header="Изучить меню"
          subheader="Карточки блюд с возможностью задать вопрос AI-помощнику"
          background={
            <div className="absolute inset-0 overflow-hidden rounded-xl">
              <Image
                src="/finch-dish.jpg"
                alt="Finch dish"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/50" />
            </div>
          }
        >
          <Button mode="outline" size="s">
            Перейти
          </Button>
        </Banner>
      </main>
    </>
  );
}
