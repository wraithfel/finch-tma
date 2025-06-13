'use client';

import '@telegram-apps/telegram-ui/dist/styles.css';
import { Banner, Button, Image } from '@telegram-apps/telegram-ui';
import React from 'react';
import { useTelegramUser } from '@/lib/hooks/useTelegramUser';
import Header from '@/components/header';

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
        before={<Image size={48} />}
        callout="Urgent notification"
        description="Start exploring TON in a new, better way"
        header="Introducing TON Space"
        onCloseIcon={() => {}}
        type="section"
      >
        <>
          <Button size="s">Try it out</Button>
          <Button mode="plain" size="s">
            Maybe later
          </Button>
        </>
      </Banner>
    </main>
  </>
  );
}
