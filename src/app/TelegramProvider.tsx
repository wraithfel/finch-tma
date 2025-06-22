// src/app/TelegramProvider.tsx
'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { init, themeParams, bindThemeParamsCssVars } from '@telegram-apps/sdk-react';
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

      const setChipColor = () => {
        const style = getComputedStyle(document.documentElement);
        const btn  = (style.getPropertyValue('--tg-theme-button-color')      || '#ffffff').trim().toLowerCase();
        const txt  = (style.getPropertyValue('--tg-theme-button-text-color') || '#ffffff').trim().toLowerCase();
        const hint = (style.getPropertyValue('--tg-theme-hint-color')       || style.getPropertyValue('--tg-theme-text-color') || '#000000').trim();
        const chip = btn === txt ? hint : txt;
        document.documentElement.style.setProperty('--finch-chip-text-color', chip);
      };

      setChipColor();

      if (!cssVarsBound) {
        try { bindThemeParamsCssVars(); } catch {}
        cssVarsBound = true;
      }

      const tg = window.Telegram?.WebApp;
      const upd = () => {
        themeParams.mountSync();
        setChipColor();
      };
      tg?.onEvent('theme_changed', upd);
      tg?.onEvent('themeChanged',  upd);
    })();
  }, []);

  return <>{children}</>;
}
