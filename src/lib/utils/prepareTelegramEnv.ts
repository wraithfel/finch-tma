'use client';

import { init } from '@telegram-apps/sdk-react';
import { enableTelegramMock } from '@/lib/hooks/mockTelegramEnv';

if (typeof window !== 'undefined') {
  init();               
  enableTelegramMock();
}
