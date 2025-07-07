'use client';

import React from 'react';
import clsx from 'clsx';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: React.ReactNode;
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <div
      className={clsx(
        'max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow',
        isUser
          ? 'ml-auto bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)]'
          : 'mr-auto bg-[var(--tg-theme-secondary-bg-color)] text-[var(--tg-theme-text-color)]'
      )}
    >
      {content}
    </div>
  );
}
