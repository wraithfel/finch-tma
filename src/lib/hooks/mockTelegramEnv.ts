'use client';

import { mockTelegramEnv, isTMA, emitEvent } from '@telegram-apps/sdk-react';

let isMockEnabled = false;

export async function enableTelegramMock(): Promise<void> {
  if (isMockEnabled || process.env.NODE_ENV !== 'development') return;
  if (await isTMA('complete')) return;
  isMockEnabled = true;

  const themeParams = {
    accent_text_color: '#6ab3f2',
    bg_color: '#17212b',
    bottom_bar_bg_color: '#17212b',
    button_color: '#5289c1',
    button_text_color: '#ffffff',
    destructive_text_color: '#ec3942',
    header_bg_color: '#17212b',
    hint_color: '#708599',
    link_color: '#6ab3f3',
    secondary_bg_color: '#232e3c',
    section_bg_color: '#17212b',
    section_header_text_color: '#6ab3f3',
    section_separator_color: '#111921',
    subtitle_text_color: '#708599',
    text_color: '#f5f5f5',
  } as const;

  const inner = new URLSearchParams([
    [
      'user',
      JSON.stringify({
        id: 279058397,
        first_name: 'Vladislav',
        last_name: 'Kibenko',
        username: 'vdkfrost',
        language_code: 'ru',
        is_premium: true,
        allows_write_to_pm: true,
        photo_url:
          'https://t.me/i/userpic/320/4FPEE4tmP3ATHa57u6MqTDih13LTOiMoKoLDRG4PnSA.svg',
      }),
    ],
    ['chat_instance', '-9019086117643313246'],
    ['chat_type', 'sender'],
    ['auth_date', '1736409902'],
    [
      'signature',
      'FNWSy6kv5n4kkmYYmfTbrgRtswTvwXgHTRWBVjp-YOv2srtMFSYCWZ9nGr_PohWZeWcooFo_oQgsnTJge3JdBA',
    ],
    ['hash', '4c710b1d446dd4fd301c0efbf7c31627eca193a2e657754c9e0612cb1eb71d90'],
  ]).toString();

  const launchParams = new URLSearchParams({
    tgWebAppData: inner,
    tgWebAppVersion: '8.0',
    tgWebAppPlatform: 'tdesktop',
    tgWebAppThemeParams: JSON.stringify(themeParams),
  }).toString();

  mockTelegramEnv({
    launchParams,
    onEvent([evt]) {
      switch (evt) {
        case 'web_app_request_theme':
          emitEvent('themeChanged', { theme_params: themeParams });
          break;
        case 'web_app_request_viewport':
          emitEvent('viewport_changed', {
            height: window.innerHeight,
            width: window.innerWidth,
            is_expanded: true,
            is_state_stable: true,
          });
          break;
        case 'web_app_request_safe_area':
          emitEvent('safe_area_changed', { top: 0, right: 0, bottom: 0, left: 0 });
          break;
        case 'web_app_request_content_safe_area':
          emitEvent('content_safe_area_changed', { top: 0, right: 0, bottom: 0, left: 0 });
          break;
      }
    },
  });
}
