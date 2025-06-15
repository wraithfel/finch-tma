import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import { AppRoot } from '@telegram-apps/telegram-ui';
import TelegramProvider from '@/app/TelegramProvider';
import '@telegram-apps/telegram-ui/dist/styles.css';

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Telegram Mini App for Finch',
  description: 'TMA for cafe staff training based on AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={`${nunito.variable} antialiased`}>
        <TelegramProvider>
          <AppRoot>{children}</AppRoot>
        </TelegramProvider>
      </body>
    </html>
  );
}
