'use client';

import { useEffect } from 'react';
import { init } from '@telegram-apps/sdk-react';
import { enableTelegramMock } from '@/lib/hooks/mockTelegramEnv';

export default function TelegramProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    enableTelegramMock().then(() => {
      init();
    });
   }, []);

  return <>{children}</>;
}
