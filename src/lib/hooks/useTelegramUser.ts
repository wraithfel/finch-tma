'use client';

import {
  useLaunchParams,
  useSignal,
  themeParams,
  themeParamsState,
} from '@telegram-apps/sdk-react';

import type { UserData } from '@/lib/types/user';
import type { ThemeParams } from '@/lib/types/theme';
import { toHex } from '../utils/converters';


export function useTelegramUser(): {
  userData: UserData | null;
  theme: ThemeParams | null;
} {
  const launch = useLaunchParams(true);
  const user = launch?.tgWebAppData?.user ?? null;

  if (themeParams.mountSync.isAvailable() && !themeParams.isMounted()) {
    themeParams.mountSync();
  }
  const palette = useSignal(themeParamsState);

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
    userData: user as UserData | null,
    theme,
  };
}
