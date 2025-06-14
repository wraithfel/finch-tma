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
      const tg = window.Telegram?.WebApp;
      if (tg?.onEvent) {
        ['theme_changed', 'themeChanged'].forEach(evt => {
          alert('Works')
          tg.onEvent(evt, () => themeParams.mountSync())
        }
        );
      }
    })();
  }, []);
  return <>{children}</>;
}
