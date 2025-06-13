'use client';

import { useEffect, useState } from 'react';

interface UserData {
  id: number,
  first_name: string,
  last_name?: string,
  username: string,
  language_code: string,
  is_premium?: boolean
}


export default function Page() {
  // храним все данные юзера, а не только username
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // код ниже выполнится только в браузере
    (async () => {
      const { default: WebApp } = await import('@twa-dev/sdk');

      WebApp.ready();
      WebApp.onEvent('themeChanged', () => console.log('Theme changed'));

      // initDataUnsafe доступна сразу после ready()
      setUserData(WebApp.initDataUnsafe?.user as UserData ?? null);
    })();

    // отписываемся при размонтировании
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
    </main>
  );
}
