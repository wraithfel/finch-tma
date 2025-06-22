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

      const parseColor = (val: string) => {
        const rgbMatch = val.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
        if (rgbMatch) {
          return { r: +rgbMatch[1], g: +rgbMatch[2], b: +rgbMatch[3] };
        }
        const hexMatch = val.match(/#([0-9a-f]{6})/i);
        if (hexMatch) {
          const hex = hexMatch[1];
          return {
            r: parseInt(hex.substr(0, 2), 16),
            g: parseInt(hex.substr(2, 2), 16),
            b: parseInt(hex.substr(4, 2), 16),
          };
        }
        return { r: 255, g: 255, b: 255 };
      };

      const setChipColor = () => {
        const style = getComputedStyle(document.documentElement);
        const btnRaw = style.getPropertyValue('--tg-theme-button-color') || '#ffffff';
        const btn = btnRaw.trim();
        const { r, g, b } = parseColor(btn);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000 / 255;
        const textRaw = style.getPropertyValue('--tg-theme-text-color') || '#000000';
        const textColor = textRaw.trim();
        const chipColor = brightness > 0.5 ? textColor : '#ffffff';
        document.documentElement.style.setProperty(
          '--finch-chip-text-color',
          chipColor
        );
      };

      setChipColor();

      if (!cssVarsBound) {
        try {
          bindThemeParamsCssVars();
        } catch {}
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
