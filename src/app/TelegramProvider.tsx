'use client';
import { useEffect } from 'react';
import { init, themeParams, bindThemeParamsCssVars } from '@telegram-apps/sdk-react';
import { enableTelegramMock } from '@/lib/hooks/mockTelegramEnv';

export default function TelegramProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    (async () => {
      if (process.env.NODE_ENV === 'development') {
        await enableTelegramMock();
      }
      await init();
      themeParams.mountSync();
      bindThemeParamsCssVars();
      const tg = window.Telegram?.WebApp;
      if (tg?.onEvent) {
        const handler = () => {
          themeParams.mountSync();
          bindThemeParamsCssVars();
        };
        tg.onEvent('theme_changed', handler);
      }
    })();
  }, []);

  return <>{children}</>;
}
