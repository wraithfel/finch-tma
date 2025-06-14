'use client';

import { useEffect } from 'react';
import { init, themeParams } from '@telegram-apps/sdk-react';
import { enableTelegramMock } from '@/lib/hooks/mockTelegramEnv';

export default function TelegramProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    (async () => {
      if (process.env.NODE_ENV === 'development') {
        await enableTelegramMock();
      }

      await init();
      themeParams.mountSync();

      window.Telegram?.WebApp?.onEvent?.('themeChanged', () => {
        themeParams.mountSync();
      });
    })();
  }, []);

  return <>{children}</>;
}
