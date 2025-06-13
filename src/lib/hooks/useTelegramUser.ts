'use client';

import { useEffect, useState } from 'react';
import type { UserData } from '../types/user';
import type { ThemeParams } from '../types/theme';

interface UseTelegramUserResult {
  userData: UserData | null;
  theme: ThemeParams | null;
}

export function useTelegramUser(): UseTelegramUserResult {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [theme,   setTheme]   = useState<ThemeParams | null>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    (async () => {
      const { default: WebApp } = await import('@twa-dev/sdk');
      WebApp.ready();

      setUserData(WebApp.initDataUnsafe?.user as UserData);
      setTheme(WebApp.themeParams as ThemeParams);

      const onThemeChange = () => {
        setTheme(WebApp.themeParams as ThemeParams);
      };
      WebApp.onEvent('themeChanged', onThemeChange);
      cleanup = () => WebApp.offEvent?.('themeChanged', onThemeChange);
    })();

    return () => cleanup?.();
  }, []);

  return { userData, theme };
}
