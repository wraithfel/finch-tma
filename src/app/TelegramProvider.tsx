'use client';

import React, { useLayoutEffect, useRef } from 'react';
import {
  init,
  themeParams,
  bindThemeParamsCssVars,
} from '@telegram-apps/sdk-react';
import { enableTelegramMock } from '@/lib/hooks/mockTelegramEnv';

let cssVarsBound = false; 

export default function TelegramProvider({ children }: { children: React.ReactNode }) {
  const hasRun = useRef(false);

  useLayoutEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    (async () => {
      if (process.env.NODE_ENV === 'development') await enableTelegramMock();

      await init();
      themeParams.mountSync();

      if (!cssVarsBound) {
        try { bindThemeParamsCssVars(); } catch {}
        cssVarsBound = true;
      }

      const tg = window.Telegram?.WebApp;
      if (!tg?.onEvent) return;
      const upd = () => themeParams.mountSync();
      tg.onEvent('theme_changed', upd);
      tg.onEvent('themeChanged', upd);
    })();
  }, []);

  return <>{children}</>;
}
