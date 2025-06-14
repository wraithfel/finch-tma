'use client';

import { useLaunchParams, useSignal, themeParams } from '@telegram-apps/sdk-react';
import type { UserData } from '@/lib/types/user';
import type { ThemeParams } from '@/lib/types/theme';

export function useTelegramUser(): {
  userData: UserData | null;
  theme: ThemeParams | null;
} {
  // true – чтобы получить в camelCase (authDate, queryId и т.д.)
  const launch = useLaunchParams(true);
  // на v3 данные юзера лежат в launch.tgWebAppData.user
  const user = launch?.tgWebAppData?.user ?? null;

  // themeParams – это сигнал, подписываемся на него
  const theme = useSignal(themeParams);

  return {
    userData: user as UserData | null,
    theme: theme as ThemeParams | null,
  };
}
