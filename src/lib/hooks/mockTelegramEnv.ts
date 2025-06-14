'use client';

import { mockTelegramEnv, isTMA, emitEvent } from '@telegram-apps/sdk-react';

let isMockEnabled = false;

export async function enableTelegramMock(): Promise<void> {
  if (isMockEnabled || process.env.NODE_ENV !== 'development') return;
  if (await isTMA('complete')) return;
  
  isMockEnabled = true;

  const themeParams = {
    accent_text_color: '#6ab2f2',
    bg_color: '#17212b',
    button_color: '#5288c1',
    button_text_color: '#ffffff',
    destructive_text_color: '#ec3942',
    header_bg_color: '#17212b',
    hint_color: '#708499',
    link_color: '#6ab3f3',
    secondary_bg_color: '#232e3c',
    section_bg_color: '#17212b',
    section_header_text_color: '#6ab3f3',
    subtitle_text_color: '#708499',
    text_color: '#f5f5f5',
  } as const;

  const noInsets = { top: 0, right: 0, bottom: 0, left: 0 } as const;

  // Формируем tgWebAppData как строку запроса
  const tgWebAppData = new URLSearchParams([
    ['auth_date', `${Math.floor(Date.now() / 1000)}`],
    ['hash', 'mocked-hash'],
    ['user', JSON.stringify({ id: 42, first_name: 'Dev' })],
  ]).toString();

  const launchParams = new URLSearchParams();
  launchParams.set('tgWebAppData', tgWebAppData);
  launchParams.set('tgWebAppVersion', '8.4');
  launchParams.set('tgWebAppPlatform', 'tdesktop');
  launchParams.set('tgWebAppThemeParams', JSON.stringify(themeParams));

  mockTelegramEnv({
    launchParams,
    onEvent(e) {
      if (e[0] === 'web_app_request_theme') {
        emitEvent('theme_changed', { theme_params: themeParams });
      }
      if (e[0] === 'web_app_request_viewport') {
        emitEvent('viewport_changed', {
          height: window.innerHeight,
          width: window.innerWidth,
          is_expanded: true,
          is_state_stable: true,
        });
      }
      if (e[0] === 'web_app_request_safe_area') {
        emitEvent('safe_area_changed', noInsets);
      }
      if (e[0] === 'web_app_request_content_safe_area') {
        emitEvent('content_safe_area_changed', noInsets);
      }
    },
  });
}