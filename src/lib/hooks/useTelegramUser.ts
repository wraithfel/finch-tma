'use client';

import { useState, useEffect } from 'react';
import { retrieveLaunchParams, type LaunchParams } from '@telegram-apps/sdk';
import { themeParams, themeParamsState, useSignal } from '@telegram-apps/sdk-react';
import type { UserData } from '@/lib/types/user';
import type { ThemeParams } from '@/lib/types/theme';
import { toHex } from '../utils/converters';

export function useTelegramUser(): {
  userData: UserData | null;
  theme: ThemeParams | null;
} {

  const [launch, setLaunch] = useState<LaunchParams | null>(null);

  const palette = useSignal(themeParamsState);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const params = retrieveLaunchParams();
      setLaunch(params);
    } catch {
      setLaunch(null);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (themeParams.mountSync.isAvailable() && !themeParams.isMounted()) {
      themeParams.mountSync();
    }
  }, []);

  const theme: ThemeParams | null = palette
    ? {
        bg_color: toHex(palette.backgroundColor),
        text_color: toHex(palette.textColor),
        hint_color: toHex(palette.hintColor),
        button_color: toHex(palette.buttonColor),
        button_text_color: toHex(palette.buttonTextColor),
        accent_text_color: toHex(palette.accentTextColor),
        destructive_text_color: toHex(palette.destructiveTextColor),
        header_bg_color: toHex(palette.headerBackgroundColor),
        link_color: toHex(palette.linkColor),
        section_bg_color: toHex(palette.sectionBackgroundColor),
        secondary_bg_color: toHex(palette.secondaryBackgroundColor),
        section_header_text_color: toHex(palette.sectionHeaderTextColor),
        subtitle_text_color: toHex(palette.subtitleTextColor),
      }
    : null;

  return {
    userData: (launch?.tgWebAppData?.user ?? null) as UserData | null,
    theme,
  };
}
