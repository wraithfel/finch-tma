'use client';

import { useEffect } from 'react';
import { init, themeParams } from '@telegram-apps/sdk-react';
import { enableTelegramMock } from '@/lib/hooks/mockTelegramEnv';

export default function TelegramProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const initializeApp = async () => {
      await enableTelegramMock();
      init();
      if (themeParams.mountSync.isAvailable() && !themeParams.isMounted()) {
        themeParams.mountSync();
      }
      const tg = window.Telegram?.WebApp;
      if (tg?.onEvent) {
        tg.onEvent('theme_changed', () => {
          themeParams.mountSync();
        });
      }
    };
    initializeApp();
  }, []);

  return <>{children}</>;
}
