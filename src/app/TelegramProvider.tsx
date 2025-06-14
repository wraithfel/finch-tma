'use client';

import { useLayoutEffect } from 'react';
import { init, themeParams, bindThemeParamsCssVars } from '@telegram-apps/sdk-react';
import { enableTelegramMock } from '@/lib/hooks/mockTelegramEnv';

export default function TelegramProvider({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
    (async () => {
      if (process.env.NODE_ENV === 'development') {
        await enableTelegramMock();
      }
      await init();
      themeParams.mountSync();
      bindThemeParamsCssVars();

      const tg = window.Telegram?.WebApp;
      if (!tg?.onEvent) return;
      const handler = () => {
        themeParams.mountSync();
        bindThemeParamsCssVars();
      };
      ['theme_changed', 'themeChanged'].forEach(evt => tg.onEvent(evt, handler));
    })();
  }, []);

  return <>{children}</>;
}
