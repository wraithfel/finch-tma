'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const AppRoot = dynamic(
  () => import('@telegram-apps/telegram-ui').then((m) => m.AppRoot),
  { ssr: false }
);
const TelegramProvider = dynamic(
  () => import('@/app/TelegramProvider'),
  { ssr: false }
);

import '@telegram-apps/telegram-ui/dist/styles.css';

export default function TelegramShell({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  if (!ready) return null;

  return (
    <AppRoot>
      <TelegramProvider>{children}</TelegramProvider>
    </AppRoot>
  );
}
