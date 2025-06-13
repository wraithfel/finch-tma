'use client';

import { useEffect, useState } from 'react';
import type { UserData } from '../types/user';

export function useTelegramUser() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    (async () => {
      const { default: WebApp } = await import('@twa-dev/sdk');
      WebApp.ready();
      WebApp.onEvent('themeChanged', () => console.log('Theme changed'));

      const user = WebApp.initDataUnsafe?.user as UserData || null;
      setUserData(user);

      cleanup = () => WebApp.offEvent?.('themeChanged', () => {});
    })();

    return () => cleanup?.();
  }, []);

  useEffect(() => {
    if (!userData) return;
    fetch(`/api/avatar?user_id=${userData.id}`)
      .then(res => {
        if (res.redirected) {
          setAvatarUrl(res.url);
        } else {
          return res.json().then(data => setAvatarUrl(data.photoUrl));
        }
      })
      .catch(console.error);
  }, [userData]);

  return { userData, avatarUrl };
}
