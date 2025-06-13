'use client';

import { useEffect, useState } from 'react';
import '@telegram-apps/telegram-ui/dist/styles.css';
import { Banner, Button, Image } from '@telegram-apps/telegram-ui';
import React from 'react';

interface UserData {
  id: number,
  first_name: string,
  last_name?: string,
  username: string,
  language_code: string,
  is_premium?: boolean
}


export default function Page() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    (async () => {
      const { default: WebApp } = await import('@twa-dev/sdk');

      WebApp.ready();
      WebApp.onEvent('themeChanged', () => console.log('Theme changed'));

      setUserData(WebApp.initDataUnsafe?.user as UserData ?? null);
    })();

    return () => {
      import('@twa-dev/sdk').then(({ default: WebApp }) =>
        WebApp.offEvent?.('themeChanged', (() => {})),
      );
    };
  }, []);

  return (
    <main className="p-4">
      {userData ? (
        <ul className="text-2xl font-bold mb-4 space-y-1 list-none">
          <li>ID: {userData.id}</li>
          <li>First name: {userData.first_name}</li>
          <li>Last name: {userData.last_name}</li>
          <li>Username: {userData.username}</li>
          <li>Language: {userData.language_code}</li>
          <li>Is Premium: {userData.is_premium ? 'Yes' : 'No'}</li>
        </ul>
      ) : (
        <div className="font-bold text-3xl text-amber-300">Loading…</div>
      )}

      <Banner
  before={<Image size={48} />}
  callout="Urgent notification"
  description="Start exploring TON in a new, better way"
  header="Introducing TON Space"
  onCloseIcon={function noRefCheck(){}}
  type="section"
>
  <React.Fragment key=".0">
    <Button size="s">
      Try it out
    </Button>
    <Button
      mode="plain"
      size="s"
    >
      Maybe later
    </Button>
  </React.Fragment>
</Banner>
    </main>
  );
}
