'use client';

import { useEffect, useState } from 'react';
import type { UserData } from '../types/user';

export function useTelegramUser() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    let offThemeChange: (() => void) | undefined;

    (async () => {
      const { default: WebApp } = await import('@twa-dev/sdk');
      WebApp.ready();

      const onThemeChange = () => console.log('Theme changed');
      WebApp.onEvent('themeChanged', onThemeChange);
      offThemeChange = () => WebApp.offEvent?.('themeChanged', onThemeChange);

      const rawUser = WebApp.initDataUnsafe.user as UserData | null;
      setUserData(rawUser);
    })();

    return () => {
      offThemeChange?.();
    };
  }, []);

  return { userData };
}
